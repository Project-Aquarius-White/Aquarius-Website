import { 
  validateManifest, 
  validateResultArtifact, 
  StageCodeMap,
  type AquariusManifest,
  type ResultArtifact,
  type NormalizedProject,
  type NormalizedResult,
  type AquariusDataset,
} from './schemas';

const GITHUB_API = 'https://api.github.com';
const RESULTS_DIR = '.aquarius/results';

interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  pushed_at: string;
  default_branch: string;
  topics: string[];
}

interface GitHubContentItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
}

function getHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchReposByTopic(org: string, topic: string, token?: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `${GITHUB_API}/search/repositories?q=org:${org}+topic:${topic}&per_page=${perPage}&page=${page}`;
    const response = await fetch(url, { headers: getHeaders(token) });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    repos.push(...data.items);
    
    if (data.items.length < perPage) break;
    page++;
  }

  return repos;
}

export async function fetchRawFile(owner: string, repo: string, path: string, branch: string, token?: string): Promise<string | null> {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const headers = { ...getHeaders(token), 'Accept': 'application/vnd.github.raw+json' };
  
  const response = await fetch(url, { headers });
  
  if (response.status === 404) {
    return null;
  }
  
  if (!response.ok) {
    throw new Error(`GitHub API error fetching ${path}: ${response.status}`);
  }
  
  return response.text();
}

export async function fetchDirectoryContents(owner: string, repo: string, path: string, branch: string, token?: string): Promise<GitHubContentItem[] | null> {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const response = await fetch(url, { headers: getHeaders(token) });
  
  if (response.status === 404) {
    return null;
  }
  
  if (!response.ok) {
    throw new Error(`GitHub API error listing ${path}: ${response.status}`);
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : null;
}

function inferResultStatus(metrics: Record<string, number | string | boolean>): 'pass' | 'fail' | 'partial' | 'unknown' {
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

export async function fetchAquariusData(org: string, token?: string): Promise<AquariusDataset> {
  const dataset: AquariusDataset = {
    generatedAt: new Date().toISOString(),
    org,
    projects: [],
    results: [],
    skipped: [],
  };

  const repos = await fetchReposByTopic(org, 'project-aquarius', token);

  for (const repo of repos) {
    const [owner, repoName] = repo.full_name.split('/');
    
    const manifestContent = await fetchRawFile(owner, repoName, 'aquarius.project.json', repo.default_branch, token);
    
    if (!manifestContent) {
      dataset.skipped.push({ repo: repo.full_name, reason: 'missing_manifest' });
      continue;
    }

    let manifestJson: unknown;
    try {
      manifestJson = JSON.parse(manifestContent);
    } catch {
      dataset.skipped.push({ repo: repo.full_name, reason: 'invalid_manifest', detail: 'Invalid JSON' });
      continue;
    }

    const validationResult = validateManifest(manifestJson);
    if (!validationResult.success) {
      dataset.skipped.push({ repo: repo.full_name, reason: 'invalid_manifest', detail: validationResult.error });
      continue;
    }

    const manifest = validationResult.data;
    const projectResults: NormalizedResult[] = [];

    const resultsDir = await fetchDirectoryContents(owner, repoName, RESULTS_DIR, repo.default_branch, token);
    
    if (resultsDir) {
      const jsonFiles = resultsDir.filter(f => f.type === 'file' && f.name.endsWith('.json'));
      
      for (const file of jsonFiles) {
        const content = await fetchRawFile(owner, repoName, file.path, repo.default_branch, token);
        if (!content) continue;
        
        try {
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
              metrics: artifact.metrics as Record<string, number | string | boolean>,
              source: 'artifact',
              result: inferResultStatus(artifact.metrics as Record<string, number | string | boolean>),
              provenance: artifact.provenance ? {
                commitSha: artifact.provenance.commit_sha ?? null,
                branch: artifact.provenance.branch ?? null,
              } : null,
            });
          }
        } catch {
          continue;
        }
      }
    }

    if (projectResults.length === 0 && manifest.results) {
      for (const r of manifest.results) {
        projectResults.push({
          resultId: r.result_id,
          projectId: manifest.id,
          projectName: manifest.name,
          repoUrl: repo.html_url,
          title: r.title,
          summary: r.summary,
          updatedAt: r.updated_at ?? repo.pushed_at,
          metrics: r.metrics as Record<string, number | string | boolean>,
          source: 'manifest_fallback',
          result: inferResultStatus(r.metrics as Record<string, number | string | boolean>),
          provenance: null,
        });
      }
    }

    const latestResultUpdatedAt = projectResults.length > 0
      ? projectResults.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0].updatedAt
      : null;

    const normalizedProject: NormalizedProject = {
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
  }

  dataset.projects.sort((a, b) => b.effectiveUpdatedAt.localeCompare(a.effectiveUpdatedAt));
  dataset.results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return dataset;
}
