#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'app', 'data');
const OUTPUT_PATH = join(OUTPUT_DIR, 'aquarius.generated.ts');

const GITHUB_API = 'https://api.github.com';
const ORG = process.env.GITHUB_ORG || 'Project-Aquarius-White';
const TOKEN = process.env.GITHUB_TOKEN;
const RESULTS_DIR = '.aquarius/results';
const FETCH_TIMEOUT = 30000;
const MAX_RETRIES = 3;

const StageCodeMap = {
  1: 'S1-SPEC',
  2: 'S2-PROTO',
  3: 'S3-LIB',
  4: 'S4-BENCH',
  5: 'S5-MATCH',
  6: 'S6-SHIP',
};

function getHeaders() {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (TOKEN) {
    headers['Authorization'] = `Bearer ${TOKEN}`;
  }
  return headers;
}

async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      
      if (response.status === 429 || response.status === 403) {
        const retryAfter = response.headers.get('Retry-After');
        const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : 60000;
        if (attempt < retries) {
          console.warn(`[sync] Rate limited, waiting ${waitMs/1000}s (attempt ${attempt}/${retries})`);
          await new Promise(r => setTimeout(r, Math.min(waitMs, 60000)));
          continue;
        }
      }
      
      if (response.status >= 500 && attempt < retries) {
        console.warn(`[sync] Server error ${response.status}, retrying (attempt ${attempt}/${retries})`);
        await new Promise(r => setTimeout(r, 1000 * attempt));
        continue;
      }
      
      return response;
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        if (attempt < retries) {
          console.warn(`[sync] Request timeout, retrying (attempt ${attempt}/${retries})`);
          continue;
        }
        throw new Error(`Request timeout after ${FETCH_TIMEOUT}ms: ${url}`);
      }
      throw err;
    }
  }
}

async function fetchReposByTopic(org, topic) {
  const repos = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `${GITHUB_API}/search/repositories?q=org:${org}+topic:${topic}&per_page=${perPage}&page=${page}`;
    const response = await fetchWithRetry(url, { headers: getHeaders() });
    
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`GitHub API error: ${response.status} - ${text}`);
    }
    
    const data = await response.json();
    repos.push(...data.items);
    
    if (data.items.length < perPage) break;
    page++;
  }

  return repos;
}

async function fetchRawFile(owner, repo, path, branch) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const headers = { ...getHeaders(), 'Accept': 'application/vnd.github.raw+json' };
  
  const response = await fetchWithRetry(url, { headers });
  
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub API error fetching ${path}: ${response.status}`);
  
  return response.text();
}

async function fetchDirectoryContents(owner, repo, path, branch) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const response = await fetchWithRetry(url, { headers: getHeaders() });
  
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub API error listing ${path}: ${response.status}`);
  
  const data = await response.json();
  return Array.isArray(data) ? data : null;
}

function inferResultStatus(metrics) {
  const deltaPct = metrics['delta_pct'];
  if (typeof deltaPct === 'number') {
    if (Math.abs(deltaPct) <= 5) return 'pass';
    if (Math.abs(deltaPct) <= 15) return 'partial';
    return 'fail';
  }
  
  const result = metrics['result'];
  if (typeof result === 'string') {
    const lower = result.toLowerCase();
    if (lower === 'pass' || lower === 'passed') return 'pass';
    if (lower === 'fail' || lower === 'failed') return 'fail';
    if (lower === 'partial') return 'partial';
  }
  
  return 'unknown';
}

function validateManifest(data) {
  const required = ['schema_version', 'id', 'name', 'paper', 'stage', 'status'];
  for (const field of required) {
    if (!(field in data)) return { success: false, error: `Missing required field: ${field}` };
  }
  
  if (typeof data.stage !== 'number' || data.stage < 1 || data.stage > 6) {
    return { success: false, error: 'stage must be a number 1-6' };
  }
  
  if (!['active', 'pending', 'blocked', 'completed'].includes(data.status)) {
    return { success: false, error: 'status must be one of: active, pending, blocked, completed' };
  }
  
  if (!data.paper?.title || typeof data.paper.year !== 'number') {
    return { success: false, error: 'paper must have title and year' };
  }
  
  return { success: true, data };
}

function validateResultArtifact(data) {
  const required = ['schema_version', 'result_id', 'title', 'updated_at', 'summary', 'metrics'];
  for (const field of required) {
    if (!(field in data)) return { success: false, error: `Missing required field: ${field}` };
  }
  return { success: true, data };
}

async function main() {
  console.log(`[sync] Fetching Aquarius data from ${ORG}...`);
  console.log(`[sync] Token: ${TOKEN ? 'present' : 'NOT SET (rate limits apply)'}`);

  const dataset = {
    generatedAt: new Date().toISOString(),
    org: ORG,
    projects: [],
    results: [],
    skipped: [],
  };

  let repos;
  try {
    repos = await fetchReposByTopic(ORG, 'project-aquarius');
    console.log(`[sync] Found ${repos.length} repos with topic 'project-aquarius'`);
  } catch (err) {
    console.error(`[sync] Failed to fetch repos: ${err.message}`);
    writeEmptyDataset(dataset);
    return;
  }

  for (const repo of repos) {
    const [owner, repoName] = repo.full_name.split('/');
    console.log(`[sync] Processing ${repo.full_name}...`);
    
    let manifestContent;
    try {
      manifestContent = await fetchRawFile(owner, repoName, 'aquarius.project.json', repo.default_branch);
    } catch (err) {
      console.warn(`[sync]   Error fetching manifest: ${err.message}`);
      dataset.skipped.push({ repo: repo.full_name, reason: 'fetch_error', detail: err.message });
      continue;
    }
    
    if (!manifestContent) {
      console.warn(`[sync]   Missing aquarius.project.json`);
      dataset.skipped.push({ repo: repo.full_name, reason: 'missing_manifest' });
      continue;
    }

    let manifestJson;
    try {
      manifestJson = JSON.parse(manifestContent);
    } catch {
      console.warn(`[sync]   Invalid JSON in manifest`);
      dataset.skipped.push({ repo: repo.full_name, reason: 'invalid_manifest', detail: 'Invalid JSON' });
      continue;
    }

    const validationResult = validateManifest(manifestJson);
    if (!validationResult.success) {
      console.warn(`[sync]   Invalid manifest: ${validationResult.error}`);
      dataset.skipped.push({ repo: repo.full_name, reason: 'invalid_manifest', detail: validationResult.error });
      continue;
    }

    const manifest = validationResult.data;
    const projectResults = [];

    let resultsDir;
    try {
      resultsDir = await fetchDirectoryContents(owner, repoName, RESULTS_DIR, repo.default_branch);
    } catch (err) {
      console.warn(`[sync]   Error fetching results dir: ${err.message}`);
    }
    
    if (resultsDir) {
      const jsonFiles = resultsDir.filter(f => f.type === 'file' && f.name.endsWith('.json'));
      console.log(`[sync]   Found ${jsonFiles.length} result artifacts`);
      
      for (const file of jsonFiles) {
        try {
          const content = await fetchRawFile(owner, repoName, file.path, repo.default_branch);
          if (!content) continue;
          
          const artifactJson = JSON.parse(content);
          const artifactValidation = validateResultArtifact(artifactJson);
          
          if (artifactValidation.success) {
            const artifact = artifactValidation.data;
            projectResults.push({
              resultId: artifact.result_id,
              projectId: manifest.id,
              projectName: manifest.name,
              repoUrl: repo.html_url,
              title: artifact.title,
              summary: artifact.summary,
              updatedAt: artifact.updated_at,
              metrics: artifact.metrics,
              source: 'artifact',
              result: inferResultStatus(artifact.metrics),
              provenance: artifact.provenance ? {
                commitSha: artifact.provenance.commit_sha ?? null,
                branch: artifact.provenance.branch ?? null,
              } : null,
            });
          }
        } catch (err) {
          console.warn(`[sync]   Error processing ${file.name}: ${err.message}`);
        }
      }
    }

    if (projectResults.length === 0 && manifest.results) {
      console.log(`[sync]   Using ${manifest.results.length} fallback results from manifest`);
      for (const r of manifest.results) {
        projectResults.push({
          resultId: r.result_id,
          projectId: manifest.id,
          projectName: manifest.name,
          repoUrl: repo.html_url,
          title: r.title,
          summary: r.summary,
          updatedAt: r.updated_at ?? repo.pushed_at,
          metrics: r.metrics,
          source: 'manifest_fallback',
          result: inferResultStatus(r.metrics),
          provenance: null,
        });
      }
    }

    const latestResultUpdatedAt = projectResults.length > 0
      ? projectResults.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0].updatedAt
      : null;

    const normalizedProject = {
      projectId: manifest.id,
      repo: repo.full_name,
      repoUrl: repo.html_url,
      name: manifest.name,
      description: manifest.description ?? null,
      paper: {
        title: manifest.paper.title,
        year: manifest.paper.year,
        url: manifest.paper.url ?? null,
      },
      stage: manifest.stage,
      stageCode: StageCodeMap[manifest.stage] ?? `S${manifest.stage}`,
      status: manifest.status,
      backend: manifest.backend ?? null,
      effectiveUpdatedAt: manifest.updated_at ?? repo.pushed_at,
      manifestUpdatedAt: manifest.updated_at ?? null,
      repoPushedAt: repo.pushed_at,
      resultCount: projectResults.length,
      latestResultUpdatedAt,
    };

    dataset.projects.push(normalizedProject);
    dataset.results.push(...projectResults);
    console.log(`[sync]   Added project: ${manifest.name} (stage ${manifest.stage}, ${projectResults.length} results)`);
  }

  dataset.projects.sort((a, b) => b.effectiveUpdatedAt.localeCompare(a.effectiveUpdatedAt));
  dataset.results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  writeDataset(dataset);
}

function writeDataset(dataset) {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const content = `import type { AquariusDataset } from '../../lib/schemas';

export const aquariusData: AquariusDataset = ${JSON.stringify(dataset, null, 2)} as const;

export default aquariusData;
`;

  writeFileSync(OUTPUT_PATH, content, 'utf-8');
  console.log(`[sync] Wrote ${OUTPUT_PATH}`);
  console.log(`[sync] Summary: ${dataset.projects.length} projects, ${dataset.results.length} results, ${dataset.skipped.length} skipped`);
}

function writeEmptyDataset(dataset) {
  writeDataset(dataset);
  console.warn('[sync] Wrote empty dataset due to errors');
}

main().catch(err => {
  console.error('[sync] Fatal error:', err);
  process.exit(1);
});
