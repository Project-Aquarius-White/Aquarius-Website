"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlassPanel } from "../components/ui/GlassPanel";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Github, Filter } from "lucide-react";

const reproductions = [
  { id: 1, project: "simple-lstm", paper: "Long Short-Term Memory (1997)", stage: 4, status: "active", backend: "pytorch", repo: "https://github.com/Project-Aquarius-White/simple-lstm" },
  { id: 2, project: "attention-is-all-you-need", paper: "Attention Is All You Need (2017)", stage: 2, status: "pending", backend: "pytorch", repo: "#" },
  { id: 3, project: "resnet", paper: "Deep Residual Learning (2015)", stage: 6, status: "completed", backend: "pytorch", repo: "#" },
  { id: 4, project: "bert", paper: "BERT: Pre-training of Deep Bidirectional Transformers (2018)", stage: 1, status: "pending", backend: "jax", repo: "#" },
  { id: 5, project: "gpt-2", paper: "Language Models are Unsupervised Multitask Learners (2019)", stage: 3, status: "active", backend: "tinygrad", repo: "#" },
  { id: 6, project: "vit", paper: "An Image is Worth 16x16 Words (2020)", stage: 5, status: "active", backend: "pytorch", repo: "#" },
];

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-bg-void flex flex-col">
      <Header activePage="/directory" />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="REPRODUCTION DIRECTORY" 
            subtitle="Browse all research reproduction projects"
            metric={{ label: "Projects", value: reproductions.length.toString().padStart(2, '0') }}
          />

          <div className="flex flex-col md:flex-row gap-4 mb-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm uppercase tracking-wider mr-4">
              <Filter size={16} /> Filters
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600 font-mono">STAGE</span>
                <select className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-zinc-300 focus:outline-none focus:border-aquarius-cyan/50 font-mono cursor-pointer hover:bg-white/10 transition-colors">
                  <option>All</option>
                  <option>S1</option>
                  <option>S2</option>
                  <option>S3</option>
                  <option>S4</option>
                  <option>S5</option>
                  <option>S6</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600 font-mono">STATUS</span>
                <select className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-zinc-300 focus:outline-none focus:border-aquarius-cyan/50 font-mono cursor-pointer hover:bg-white/10 transition-colors">
                  <option>All</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600 font-mono">BACKEND</span>
                <select className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-zinc-300 focus:outline-none focus:border-aquarius-cyan/50 font-mono cursor-pointer hover:bg-white/10 transition-colors">
                  <option>All</option>
                  <option>PyTorch</option>
                  <option>Tinygrad</option>
                  <option>JAX</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reproductions.map((repo) => (
              <GlassPanel key={repo.id} hover className="flex flex-col h-full p-6 group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-aquarius-cyan transition-colors">
                    {repo.project}
                  </h3>
                  <a 
                    href={repo.repo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors p-1"
                  >
                    <Github size={20} />
                  </a>
                </div>

                <p className="text-zinc-400 text-sm mb-6 flex-grow line-clamp-2">
                  {repo.paper}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge 
                      status={repo.status as 'active' | 'pending' | 'completed'} 
                      label={repo.status} 
                    />
                    <div className="inline-flex items-center px-2 py-1 rounded border border-white/10 bg-white/5 text-xs font-mono text-zinc-300">
                      S{repo.stage}-BENCH
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-xs uppercase tracking-widest text-zinc-600 font-mono">Backend</span>
                    <span className="text-xs font-mono text-aquarius-cyan bg-aquarius-cyan/10 px-2 py-1 rounded">
                      {repo.backend}
                    </span>
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
