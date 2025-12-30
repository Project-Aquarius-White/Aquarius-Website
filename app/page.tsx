import AquariusDither from "./components/AquariusDither";
import ParallaxDither from "./components/ParallaxDither";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import ProtocolSection from "./components/ProtocolSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-aquarius-cyan selection:text-black bg-black text-white overflow-x-hidden">

      {/* GLOBAL LAYERS */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay"></div>
      <ParallaxDither />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase pointer-events-auto">Project Aquarius // Protocol v1.0</div>
        <nav className="flex gap-6 pointer-events-auto">
          <Link href="/docs/protocol" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[PROTOCOL]</Link>
          <Link href="/dashboard" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[MISSION STATUS]</Link>
          <Link href="#mission" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[ETHOS]</Link>
          <Link href="#writeups" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[REPRODUCTIONS]</Link>
          <a href="https://github.com/Project-Aquarius-White/Aquarius-Website" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[REPOSITORY]</a>
        </nav>
      </header>

      {/* HERO: THE CALL TO ARMS */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">

        <div className="w-full max-w-4xl mb-8 relative grayscale hover:grayscale-0 transition-all duration-700">
          <AquariusDither />
        </div>

        <div className="text-center space-y-8 max-w-5xl relative">

          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] mix-blend-difference">
            REPRODUCE <br />
            FOUNDATIONAL <br />
            RESEARCH
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            Bridge the gap between academic theory and production mastery by rebuilding seminal papers from scratch. <span className="text-white font-medium">Papers describe ideas; code proves understanding.</span>
          </p>

          <div className="pt-8 flex flex-col items-center gap-4">
            <Link href="/docs/protocol" className="group relative inline-flex items-center justify-center px-12 py-5 bg-white text-black font-bold tracking-widest text-sm uppercase hover:bg-aquarius-cyan transition-colors duration-300">
              <span>Initiate Protocol</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="text-[10px] font-mono text-zinc-600 tracking-widest">
              STATUS: SYSTEM_READY // COGNITIVE_TRANSFER_INITIALIZED
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 01: THE CONFRONTATION */}
      <section className="relative z-10 py-32 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
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
              <div className="text-aquarius-cyan animate-pulse">&gt; SUCCESS: loss convergence detected.</div>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-900 text-center text-zinc-700">
                  // SIMULATION COMPLETE
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: THE ETHOS */}
      <section id="mission" className="relative z-10 py-48 bg-black scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center space-y-12 px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            THE METHODOLOGY
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left py-12">
            <div className="space-y-4">
              <div className="w-10 h-1 bg-zinc-800"></div>
              <h3 className="font-bold text-white">First Principles</h3>
              <p className="text-zinc-500 text-sm">
                Don't just import libraries. Build architectures from the ground up to understand why they work, not just how to run them.
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



      {/* SECTION 03: THE 14-DAY CADENCE */}
      <ProtocolSection />

      {/* FOOTER */}
      <footer className="relative z-10 py-32 px-6 bg-black text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-zinc-700 uppercase tracking-widest">
            System Status: Online
          </h2>
          <div className="flex justify-center gap-8">
            <Link href="/docs/protocol" className="text-4xl md:text-6xl font-bold hover:text-aquarius-cyan transition-colors">
              REPRODUCE
            </Link>
            <a href="https://github.com/Project-Aquarius-White" className="text-4xl md:text-6xl font-bold hover:text-aquarius-cyan transition-colors">
              CONTRIBUTE
            </a>
          </div>
        </div>
        <div className="mt-32 text-zinc-800 font-mono text-xs">
          PROJECT AQUARIUS &copy; 2025 // NO RIGHTS RESERVED. COPY EVERYTHING.
        </div>
      </footer>
    </div>
  );
}
