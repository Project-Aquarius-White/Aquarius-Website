"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlassPanel } from "../components/ui/GlassPanel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ExternalLink, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

const results = [
  { id: 1, project: "simple-lstm", experiment: "sequence-modeling-benchmark", result: "pass", metric: "Perplexity: 45.2", paperMetric: "Paper: 46.0", delta: "+1.7%", date: "2025-12-30" },
  { id: 2, project: "resnet", experiment: "imagenet-top1-accuracy", result: "pass", metric: "Top-1: 76.1%", paperMetric: "Paper: 76.0%", delta: "+0.1%", date: "2025-12-28" },
  { id: 3, project: "attention", experiment: "wmt-en-de-bleu", result: "partial", metric: "BLEU: 27.1", paperMetric: "Paper: 28.4", delta: "-4.6%", date: "2025-12-25" },
  { id: 4, project: "gpt-2", experiment: "lambada-accuracy", result: "fail", metric: "Accuracy: 51.2%", paperMetric: "Paper: 63.2%", delta: "-19.0%", date: "2025-12-20" },
];

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

export default function ResultsPage() {
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

          <div className="flex flex-col gap-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 text-xs uppercase tracking-widest text-zinc-500 font-mono">
              <div className="col-span-3">Project / Experiment</div>
              <div className="col-span-2">Result</div>
              <div className="col-span-2">Metric</div>
              <div className="col-span-3">Comparison</div>
              <div className="col-span-2 text-right">Date</div>
            </div>

            {results.map((item) => (
              <GlassPanel key={item.id} hover className="p-4 md:px-6 md:py-5 group">
                <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center">
                  
                  <div className="col-span-3">
                    <div className="font-bold text-white group-hover:text-aquarius-cyan transition-colors">
                      {item.project}
                    </div>
                    <div className="text-xs text-zinc-500 font-mono mt-0.5 truncate" title={item.experiment}>
                      {item.experiment}
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <ResultBadge result={item.result} />
                  </div>

                  <div className="col-span-2">
                    <div className="font-mono text-sm text-zinc-200">
                      {item.metric}
                    </div>
                  </div>

                  <div className="col-span-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-xs text-zinc-500 font-mono whitespace-nowrap">
                      {item.paperMetric}
                    </div>
                    <div className={clsx(
                      "text-xs font-mono font-medium",
                      item.delta.startsWith('+') ? "text-emerald-400" : "text-rose-500"
                    )}>
                      {item.delta}
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-between md:justify-end gap-4">
                    <span className="text-xs text-zinc-600 font-mono">
                      {item.date}
                    </span>
                    <button className="text-zinc-500 hover:text-white transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </div>

                </div>
              </GlassPanel>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
