"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlassPanel } from "../components/ui/GlassPanel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ExternalLink, CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronRight, Cpu } from "lucide-react";
import { clsx } from "clsx";
import type { NormalizedResult, NormalizedProject } from "../../lib/schemas";

const ResultBadge = ({ result }: { result: string }) => {
  const styles = {
    pass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    fail: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    partial: "text-amber-400 bg-amber-400/10 border-amber-400/20"
  };

  const icons = {
    pass: <CheckCircle2 size={14} />,
    fail: <XCircle size={14} />,
    partial: <AlertCircle size={14} />
  };

  const key = result.toLowerCase() as keyof typeof styles;

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wide",
      styles[key] || styles.partial
    )}>
      {icons[key]}
      {result}
    </span>
  );
};

const ExperimentStatusBadge = ({ status }: { status: string }) => {
  const lower = status.toLowerCase();
  const isPass = lower === 'pass' || lower === 'passed' || lower === 'reproduced';
  const isFail = lower === 'fail' || lower === 'failed';
  
  return (
    <span className={clsx(
      "px-2 py-0.5 rounded text-xs font-mono",
      isPass && "bg-emerald-400/10 text-emerald-400",
      isFail && "bg-rose-500/10 text-rose-500",
      !isPass && !isFail && "bg-amber-400/10 text-amber-400"
    )}>
      {status}
    </span>
  );
};

interface ResultsClientProps {
  results: NormalizedResult[];
  projects: NormalizedProject[];
}

export default function ResultsClient({ results, projects }: ResultsClientProps) {
  const searchParams = useSearchParams();
  const projectFilter = searchParams.get("project");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const filteredResults = useMemo(() => {
    if (!projectFilter) return results;
    return results.filter(r => r.projectId === projectFilter);
  }, [results, projectFilter]);

  const projectName = useMemo(() => {
    if (!projectFilter) return null;
    const project = projects.find(p => p.projectId === projectFilter);
    return project?.name ?? projectFilter;
  }, [projectFilter, projects]);

  const toggleRow = (resultId: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(resultId)) {
        next.delete(resultId);
      } else {
        next.add(resultId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-bg-void flex flex-col">
      <Header activePage="/results" />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title={projectFilter ? `RESULTS: ${projectName}` : "VERIFICATION RESULTS"} 
            subtitle={projectFilter ? "Filtered by project" : "Empirical validation and benchmark comparisons"}
            metric={{ label: "Experiments", value: filteredResults.length.toString().padStart(2, '0') }}
          />

          {filteredResults.length === 0 ? (
            <GlassPanel className="p-12 text-center">
              <div className="text-zinc-500 font-mono text-sm">No results available</div>
            </GlassPanel>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 text-xs uppercase tracking-widest text-zinc-500 font-mono">
                <div className="col-span-3">Project / Experiment</div>
                <div className="col-span-1">Result</div>
                <div className="col-span-2">Hardware</div>
                <div className="col-span-2">Metric</div>
                <div className="col-span-2">Comparison</div>
                <div className="col-span-2 text-right">Date</div>
              </div>

              {filteredResults.map((item) => {
                const deltaPct = typeof item.metrics.delta_pct === 'number' ? item.metrics.delta_pct : 0;
                const deltaStr = deltaPct >= 0 ? `+${deltaPct.toFixed(1)}%` : `${deltaPct.toFixed(1)}%`;
                const metricKeys = Object.keys(item.metrics).filter(k => !['delta_pct', 'result', 'paper_perplexity'].includes(k));
                const primaryMetricKey = metricKeys[0];
                const primaryMetricValue = primaryMetricKey ? item.metrics[primaryMetricKey] : null;
                const paperMetricKey = Object.keys(item.metrics).find(k => k.startsWith('paper_'));
                const paperMetricValue = paperMetricKey ? item.metrics[paperMetricKey] : null;
                const hasExperiments = item.experiments && Object.keys(item.experiments).length > 0;
                const isExpanded = expandedRows.has(item.resultId);
                const hardwareStr = item.hardware?.chip || item.hardware?.model || item.hardware?.gpu || '—';

                return (
                  <GlassPanel key={item.resultId} hover className="group">
                    <div 
                      className={clsx(
                        "p-4 md:px-6 md:py-5",
                        hasExperiments && "cursor-pointer"
                      )}
                      onClick={() => hasExperiments && toggleRow(item.resultId)}
                    >
                      <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center">
                        
                        <div className="col-span-3 flex items-center gap-2">
                          {hasExperiments && (
                            <span className="text-zinc-500">
                              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </span>
                          )}
                          <div>
                            <div className="font-bold text-white group-hover:text-aquarius-cyan transition-colors">
                              {item.projectName}
                            </div>
                            <div className="text-xs text-zinc-500 font-mono mt-0.5 truncate" title={item.title}>
                              {item.resultId}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1 flex items-center">
                          <ResultBadge result={item.result} />
                        </div>

                        <div className="col-span-2 flex items-center gap-2">
                          <Cpu size={14} className="text-zinc-600" />
                          <span className="text-xs text-zinc-400 font-mono truncate" title={hardwareStr}>
                            {hardwareStr}
                          </span>
                        </div>

                        <div className="col-span-2">
                          <div className="font-mono text-sm text-zinc-200">
                            {primaryMetricKey && primaryMetricValue !== null 
                              ? `${primaryMetricKey.charAt(0).toUpperCase() + primaryMetricKey.slice(1)}: ${primaryMetricValue}`
                              : item.summary}
                          </div>
                        </div>

                        <div className="col-span-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="text-xs text-zinc-500 font-mono whitespace-nowrap">
                            {paperMetricKey && paperMetricValue !== null
                              ? `Paper: ${paperMetricValue}`
                              : '—'}
                          </div>
                          <div className={clsx(
                            "text-xs font-mono font-medium",
                            deltaPct >= 0 ? "text-emerald-400" : "text-rose-500"
                          )}>
                            {deltaStr}
                          </div>
                        </div>

                        <div className="col-span-2 flex items-center justify-between md:justify-end gap-4">
                          <span className="text-xs text-zinc-600 font-mono">
                            {item.updatedAt.split('T')[0]}
                          </span>
                          <a 
                            href={item.repoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>

                      </div>
                    </div>

                    {hasExperiments && isExpanded && (
                      <div className="border-t border-zinc-800/50 bg-zinc-900/30 px-6 py-4">
                        <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-3">
                          Experiments ({Object.keys(item.experiments!).length})
                        </div>
                        <div className="space-y-3">
                          {Object.entries(item.experiments!).map(([expKey, exp]) => (
                            <div key={expKey} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-sm text-white">{expKey}</span>
                                <ExperimentStatusBadge status={exp.status} />
                              </div>
                              {exp.section && (
                                <div className="text-xs text-zinc-500 mb-1">
                                  Section: <span className="text-zinc-400">{exp.section}</span>
                                </div>
                              )}
                              {exp.paperCriterion && (
                                <div className="text-xs text-zinc-500 mb-1">
                                  Criterion: <span className="text-zinc-400">{exp.paperCriterion}</span>
                                </div>
                              )}
                              {exp.result && Object.keys(exp.result).length > 0 && (
                                <div className="mt-2 pt-2 border-t border-zinc-800/50">
                                  <div className="text-xs text-zinc-600 mb-1">Results:</div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(exp.result).map(([k, v]) => (
                                      <div key={k} className="text-xs font-mono">
                                        <span className="text-zinc-500">{k}:</span>{' '}
                                        <span className="text-zinc-300">{String(v)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {exp.notes && (
                                <div className="mt-2 text-xs text-zinc-500 italic">
                                  {exp.notes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </GlassPanel>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
