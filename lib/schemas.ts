import { z } from 'zod';

export const PaperSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1900).max(2100),
  url: z.string().url().optional(),
  arxiv: z.string().optional(),
  authors: z.array(z.string()).optional(),
});

export const ManifestSchema = z.object({
  schema_version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Must be semver (e.g., 1.0.0)'),
  id: z.string().min(1),
  name: z.string().min(1),
  updated_at: z.string().datetime({ offset: true }).optional(),
  description: z.string().optional(),
  paper: PaperSchema,
  stage: z.number().int().min(1).max(6),
  status: z.enum(['active', 'pending', 'blocked', 'completed']),
  backend: z.string().optional(),
  license: z.string().optional(),
  tags: z.array(z.string()).optional(),
  links: z.record(z.string(), z.string().url()).optional(),
  maintainers: z.array(z.string()).optional(),
  results: z.array(z.object({
    result_id: z.string(),
    title: z.string(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    summary: z.string(),
    metrics: z.record(z.string(), z.union([z.number(), z.string(), z.boolean()])),
  })).optional(),
});

export type AquariusManifest = z.infer<typeof ManifestSchema>;
export type Paper = z.infer<typeof PaperSchema>;

export const MetricsSchema = z.record(z.string(), z.union([z.number(), z.string(), z.boolean()]));

export const ProvenanceSchema = z.object({
  source: z.enum(['github-action', 'manual', 'ci']).optional(),
  commit_sha: z.string().optional(),
  branch: z.string().optional(),
  workflow: z.string().optional(),
  run_url: z.string().url().optional(),
}).optional();

export const ContextSchema = z.object({
  task: z.string().optional(),
  dataset: z.string().optional(),
  model: z.string().optional(),
  hardware: z.string().optional(),
  software: z.string().optional(),
  seed: z.number().optional(),
}).optional();

export const ResultArtifactSchema = z.object({
  schema_version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Must be semver (e.g., 1.0.0)'),
  result_id: z.string().min(1),
  title: z.string().min(1),
  updated_at: z.string().datetime({ offset: true }),
  summary: z.string(),
  metrics: MetricsSchema,
  context: ContextSchema,
  provenance: ProvenanceSchema,
  artifacts: z.array(z.object({
    type: z.string(),
    url: z.string().url().optional(),
    path: z.string().optional(),
  })).optional(),
  comparisons: z.record(z.string(), z.object({
    baseline: z.union([z.number(), z.string()]),
    current: z.union([z.number(), z.string()]),
    delta: z.union([z.number(), z.string()]).optional(),
    delta_pct: z.number().optional(),
  })).optional(),
  notes: z.array(z.string()).optional(),
});

export type ResultArtifact = z.infer<typeof ResultArtifactSchema>;

export const StageCodeMap: Record<number, string> = {
  1: 'S1-SPEC',
  2: 'S2-PROTO',
  3: 'S3-LIB',
  4: 'S4-BENCH',
  5: 'S5-MATCH',
  6: 'S6-SHIP',
};

export interface NormalizedProject {
  projectId: string;
  repo: string;
  repoUrl: string;
  name: string;
  description: string | null;
  paper: {
    title: string;
    year: number;
    url: string | null;
  };
  stage: number;
  stageCode: string;
  status: 'active' | 'pending' | 'blocked' | 'completed';
  backend: string | null;
  effectiveUpdatedAt: string;
  manifestUpdatedAt: string | null;
  repoPushedAt: string;
  resultCount: number;
  latestResultUpdatedAt: string | null;
}

export interface NormalizedResult {
  resultId: string;
  projectId: string;
  projectName: string;
  repoUrl: string;
  title: string;
  summary: string;
  updatedAt: string;
  metrics: Record<string, number | string | boolean>;
  source: 'artifact' | 'manifest_fallback';
  result: 'pass' | 'fail' | 'partial' | 'unknown';
  provenance: {
    commitSha: string | null;
    branch: string | null;
  } | null;
}

export interface AquariusDataset {
  generatedAt: string;
  org: string;
  projects: NormalizedProject[];
  results: NormalizedResult[];
  skipped: Array<{
    repo: string;
    reason: 'missing_manifest' | 'invalid_manifest' | 'fetch_error';
    detail?: string;
  }>;
}

export function validateManifest(data: unknown): { success: true; data: AquariusManifest } | { success: false; error: string } {
  const result = ManifestSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') };
}

export function validateResultArtifact(data: unknown): { success: true; data: ResultArtifact } | { success: false; error: string } {
  const result = ResultArtifactSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') };
}
