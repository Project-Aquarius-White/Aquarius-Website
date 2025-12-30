import AquariusDither from "./components/AquariusDither";
import ParallaxDither from "./components/ParallaxDither";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProtocolSection from "./components/ProtocolSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LiveOpsPreview from "./components/LiveOpsPreview";
import { GlassPanel } from "./components/ui/GlassPanel";
import { StatusBadge } from "./components/ui/StatusBadge";
import { aquariusData } from './data/aquarius.generated';

export default function Home() {
  const featuredReproductions = aquariusData.projects.slice(0, 3).map((project) => ({
    project: project.name,
    paper: `${project.paper.title} (${project.paper.year})`,
    stage: project.stage,
    status: project.status,
  }));

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-aquarius-cyan selection:text-black bg-black text-white overflow-x-hidden">


      <ParallaxDither />

      <Header />

      <section className="relative z-10 min-h-screen flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center justify-center px-4 pt-24 lg:pt-0 max-w-[1400px] mx-auto">

        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-8 relative z-20">

          <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.85]">
            REPRODUCE <br />
            FOUNDATIONAL <br />
            RESEARCH
          </h1>

          <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Bridge the gap between academic theory and production mastery by rebuilding seminal papers from scratch. <span className="text-white font-medium">Papers describe ideas; code proves understanding.</span>
          </p>

          <div className="pt-4 flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <Link href="/get-started" className="group relative inline-flex items-center justify-center px-12 py-5 bg-white text-black font-bold tracking-widest text-sm uppercase hover:bg-aquarius-cyan transition-colors duration-300 min-h-[44px]">
              <span>Get Started</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-mono pt-3">
              <span>or explore active operations</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="text-xs font-mono text-zinc-600 tracking-widest pt-4">
            STATUS: SYSTEM_READY // COGNITIVE_TRANSFER_INITIALIZED
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex flex-col gap-12 relative z-10 mt-8 lg:mt-0">
          <LiveOpsPreview operations={aquariusData.projects.slice(0, 2)} />
          
          <div className="w-full max-w-sm mx-auto relative grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100">
            <AquariusDither />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 border border-aquarius-cyan text-aquarius-cyan font-mono text-xs tracking-widest">
              DIAGNOSTIC: KNOWLEDGE_GAP_DETECTED
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Reading offers knowledge. <br />
              <span className="text-zinc-600">Implementation builds intuition.</span>
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Tutorials skip the hard parts. Aquarius focuses on them. Confront the missing hyperparameters, ambiguous math, and <span className="text-white">hidden implementation details</span> that separate a reader from an engineer.
            </p>
          </div>
          <div className="relative aspect-square border border-zinc-900 bg-black p-8 font-mono text-xs md:text-sm text-zinc-500 flex flex-col">
            <div className="flex-1 space-y-2 overflow-hidden opacity-50">
              <div>&gt; git clone https://arxiv.org/abs/2301.1234</div>
              <div>&gt; pip install torch</div>
              <div className="text-red-500">&gt; ERROR: tensor dimension mismatch expected [B, 128] got [B, 64]</div>
              <div>&gt; consulting whitepaper...</div>
              <div>&gt; reconstructing attention_head.py...</div>
              <div className="text-aquarius-cyan">&gt; SUCCESS: loss convergence detected.</div>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-900 text-center text-zinc-700">
                  SIMULATION COMPLETE
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="relative z-10 py-48 bg-black scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center space-y-12 px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            THE METHODOLOGY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left py-12">
            <div className="space-y-4">
              <div className="w-10 h-1 bg-zinc-800"></div>
              <h3 className="font-bold text-white">First Principles</h3>
              <p className="text-zinc-500 text-sm">
                Do not just import libraries. Build architectures from the ground up to understand why they work, not just how to run them.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-1 bg-zinc-800"></div>
              <h3 className="font-bold text-white">Production Standards</h3>
              <p className="text-zinc-500 text-sm">
                Follow a rigorous 14-day pipeline. Move from raw PDF to verified, production-ready codebase with test coverage and benchmarks.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-1 bg-zinc-800"></div>
              <h3 className="font-bold text-white">Deep Mastery</h3>
              <p className="text-zinc-500 text-sm">
                A portfolio of verified reproductions signals competence better than any credential. Prove you can execute complex systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Featured Reproductions</h2>
            <Link href="/directory" className="text-sm font-mono text-zinc-500 hover:text-aquarius-cyan transition-colors">
              VIEW_ALL_OPERATIONS -&gt;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReproductions.map((item, i) => (
              <GlassPanel key={i} hover className="p-6 h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                      Op_{i + 1}
                    </div>
                    <StatusBadge status={item.status} label={item.status} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-aquarius-cyan transition-colors">
                      {item.project}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                      {item.paper}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">STAGE {item.stage}/6</span>
                  <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-aquarius-cyan group-hover:translate-x-1 transition-all" />
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <ProtocolSection />

      <Footer />
    </div>
  );
}
