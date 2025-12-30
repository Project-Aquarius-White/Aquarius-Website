"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlassPanel } from "../components/ui/GlassPanel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ExternalLink, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import type { NormalizedResult } from "../../lib/schemas";

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

interface ResultsClientProps {
  results: NormalizedResult[];
}

export default function ResultsClient({ results }: ResultsClientProps) {
  return (
    <div className="min-h-screen bg-bg-void flex flex-col">
      <Header activePage="/results" />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="VERIFICATION RESULTS" 
            subtitle="Empirical validation and benchmark comparisons"
            metric={{ label: "Experiments", value: results.length.toString().padStart(2, '0') }}
          />

          {results.length === 0 ? (
            <GlassPanel className="p-12 text-center">
              <div className="text-zinc-500 font-mono text-sm">No results available</div>
            </GlassPanel>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 text-xs uppercase tracking-widest text-zinc-500 font-mono">
                <div className="col-span-3">Project / Experiment</div>
                <div className="col-span-2">Result</div>
                <div className="col-span-2">Metric</div>
                <div className="col-span-3">Comparison</div>
                <div className="col-span-2 text-right">Date</div>
              </div>

              {results.map((item) => {
                const deltaPct = typeof item.metrics.delta_pct === 'number' ? item.metrics.delta_pct : 0;
                const deltaStr = deltaPct >= 0 ? `+${deltaPct.toFixed(1)}%` : `${deltaPct.toFixed(1)}%`;
                const metricKeys = Object.keys(item.metrics).filter(k => !['delta_pct', 'result', 'paper_perplexity'].includes(k));
                const primaryMetricKey = metricKeys[0];
                const primaryMetricValue = primaryMetricKey ? item.metrics[primaryMetricKey] : null;
                const paperMetricKey = Object.keys(item.metrics).find(k => k.startsWith('paper_'));
                const paperMetricValue = paperMetricKey ? item.metrics[paperMetricKey] : null;

                return (
                  <GlassPanel key={item.resultId} hover className="p-4 md:px-6 md:py-5 group">
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center">
                      
                      <div className="col-span-3">
                        <div className="font-bold text-white group-hover:text-aquarius-cyan transition-colors">
                          {item.projectName}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5 truncate" title={item.title}>
                          {item.resultId}
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <ResultBadge result={item.result} />
                      </div>

                      <div className="col-span-2">
                        <div className="font-mono text-sm text-zinc-200">
                          {primaryMetricKey && primaryMetricValue !== null 
                            ? `${primaryMetricKey.charAt(0).toUpperCase() + primaryMetricKey.slice(1)}: ${primaryMetricValue}`
                            : item.summary}
                        </div>
                      </div>

                      <div className="col-span-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
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
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>

                    </div>
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
