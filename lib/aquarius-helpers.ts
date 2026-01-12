import { aquariusData } from '@/app/data/aquarius.generated';
import type { NormalizedProject, NormalizedResult } from './schemas';

export function getAllProjects(): NormalizedProject[] {
  return aquariusData.projects;
}

export function getProjectById(projectId: string): NormalizedProject | null {
  return aquariusData.projects.find(p => p.projectId === projectId) ?? null;
}

export function getSimpleLSTMProject(): NormalizedProject | null {
  return getProjectById('simple-lstm');
}

export function getAllResults(): NormalizedResult[] {
  return aquariusData.results;
}

export function getResultsByProject(projectId: string): NormalizedResult[] {
  return aquariusData.results.filter(r => r.projectId === projectId);
}

export function getLatestResultByProject(projectId: string): NormalizedResult | null {
  const results = getResultsByProject(projectId);
  if (results.length === 0) return null;
  return results[0];
}

export function getSimpleLSTMResults(): NormalizedResult | null {
  return getLatestResultByProject('simple-lstm');
}

export interface ExperimentData {
  key: string;
  section: string | null;
  status: string;
  paperCriterion: string | null;
  result: Record<string, unknown> | null;
  hyperparameters: Record<string, unknown> | null;
  notes: string | null;
}

export function getExperimentsFromResult(result: NormalizedResult): ExperimentData[] {
  if (!result.experiments) return [];
  
  return Object.entries(result.experiments).map(([key, exp]) => ({
    key,
    section: exp.section ?? null,
    status: exp.status,
    paperCriterion: exp.paperCriterion ?? null,
    result: exp.result ?? null,
    hyperparameters: exp.hyperparameters ?? null,
    notes: exp.notes ?? null,
  }));
}

export function getExperimentByKey(result: NormalizedResult, experimentKey: string): ExperimentData | null {
  if (!result.experiments || !result.experiments[experimentKey]) return null;
  
  const exp = result.experiments[experimentKey];
  return {
    key: experimentKey,
    section: exp.section ?? null,
    status: exp.status,
    paperCriterion: exp.paperCriterion ?? null,
    result: exp.result ?? null,
    hyperparameters: exp.hyperparameters ?? null,
    notes: exp.notes ?? null,
  };
}

export function getSimpleLSTMExperiments(): ExperimentData[] {
  const result = getSimpleLSTMResults();
  if (!result) return [];
  return getExperimentsFromResult(result);
}

export function getSimpleLSTMExperiment(experimentKey: string): ExperimentData | null {
  const result = getSimpleLSTMResults();
  if (!result) return null;
  return getExperimentByKey(result, experimentKey);
}

export type ExperimentStatus = 'PASS' | 'FAIL' | 'TIMEOUT' | 'NEEDS_MORE_EPOCHS' | 'PENDING' | 'UNKNOWN';

export function normalizeExperimentStatus(status: string): ExperimentStatus {
  const upper = status.toUpperCase();
  if (upper === 'PASS' || upper === 'PASSED') return 'PASS';
  if (upper === 'FAIL' || upper === 'FAILED') return 'FAIL';
  if (upper === 'TIMEOUT') return 'TIMEOUT';
  if (upper === 'NEEDS_MORE_EPOCHS') return 'NEEDS_MORE_EPOCHS';
  if (upper === 'PENDING') return 'PENDING';
  return 'UNKNOWN';
}

export function isExperimentPassed(exp: ExperimentData): boolean {
  return normalizeExperimentStatus(exp.status) === 'PASS';
}

export function getStatusColor(status: ExperimentStatus): string {
  const statusColors: Record<ExperimentStatus, string> = {
    'PASS': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'FAIL': 'text-red-400 bg-red-500/10 border-red-500/20',
    'TIMEOUT': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'NEEDS_MORE_EPOCHS': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'PENDING': 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
    'UNKNOWN': 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
  };
  return statusColors[status];
}

export function getSimpleLSTMHardware(): NormalizedResult['hardware'] {
  const result = getSimpleLSTMResults();
  return result?.hardware ?? null;
}

export function getSimpleLSTMContext(): NormalizedResult['context'] {
  const result = getSimpleLSTMResults();
  return result?.context ?? null;
}

export interface ExperimentSummary {
  total: number;
  passed: number;
  failed: number;
  timeout: number;
  needsWork: number;
  passRate: number;
}

export function getExperimentSummary(result: NormalizedResult): ExperimentSummary {
  const experiments = getExperimentsFromResult(result);
  const total = experiments.length;
  let passed = 0;
  let failed = 0;
  let timeout = 0;
  let needsWork = 0;

  for (const exp of experiments) {
    const status = normalizeExperimentStatus(exp.status);
    switch (status) {
      case 'PASS': passed++; break;
      case 'FAIL': failed++; break;
      case 'TIMEOUT': timeout++; break;
      case 'NEEDS_MORE_EPOCHS': needsWork++; break;
    }
  }

  return {
    total,
    passed,
    failed,
    timeout,
    needsWork,
    passRate: total > 0 ? (passed / total) * 100 : 0,
  };
}

export function getSimpleLSTMSummary(): ExperimentSummary | null {
  const result = getSimpleLSTMResults();
  if (!result) return null;
  return getExperimentSummary(result);
}

export function formatExperimentName(key: string): string {
  const withoutNumberPrefix = key.replace(/^\d+_/, '');
  return withoutNumberPrefix
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatMetricValue(value: unknown): string {
  if (typeof value === 'number') {
    const isVerySmallDecimal = Math.abs(value) < 0.01 && value !== 0;
    if (isVerySmallDecimal) return value.toExponential(2);
    
    const isPercentageLike = value >= 0 && value <= 1;
    if (isPercentageLike) return `${(value * 100).toFixed(1)}%`;
    
    return value.toFixed(4).replace(/\.?0+$/, '');
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}
