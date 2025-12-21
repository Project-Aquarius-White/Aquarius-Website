import AquariusDither from "./components/AquariusDither";
import ParallaxDither from "./components/ParallaxDither";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

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
          <Link href="#mission" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[MISSION]</Link>
          <Link href="#writeups" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[WRITEUPS]</Link>
          <a href="https://github.com/Project-Aquarius-White/Aquarius-Website" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[SOURCE_DETECTED]</a>
        </nav>
      </header>

      {/* HERO: THE CALL TO ARMS */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">

        <div className="w-full max-w-4xl mb-8 relative grayscale hover:grayscale-0 transition-all duration-700">
          <AquariusDither />
        </div>

        <div className="text-center space-y-8 max-w-5xl relative">

          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] mix-blend-difference">
            WEAPONIZE <br />
            YOUR <br />
            INTELLECT
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            The Ivory Tower is crumbling. <br />
            We are the salvage crew. We take State-of-the-Art research,
            rip it from the PDF, and <span className="text-white font-medium">rebuild it from scratch.</span>
          </p>

          <div className="pt-8 flex flex-col items-center gap-4">
            <Link href="/docs/protocol" className="group relative inline-flex items-center justify-center px-12 py-5 bg-white text-black font-bold tracking-widest text-sm uppercase hover:bg-aquarius-cyan transition-colors duration-300">
              <span>Initiate Protocol</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="text-[10px] font-mono text-zinc-600 tracking-widest">
              WARNING: IRREVERSIBLE COGNITIVE UPGRADE
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 01: THE CONFRONTATION */}
      <section className="relative z-10 py-32 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 border border-red-900 text-red-500 font-mono text-xs tracking-widest">
              ERROR: COMPREHENSION_NOT_FOUND
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              You didn't learn it. <br />
              <span className="text-zinc-600">You just read it.</span>
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Reading papers feels like learning. It's a dopamine hit. A false flag.
              True understanding is a <span className="text-white">violent act of creation</span>.
              It requires confronting the messy reality of missing hyperparameters, ambiguous math, and broken dependencies.
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
            "CREDENTIALS ARE FIAT.<br />
            <span className="text-aquarius-cyan">CODE IS GOLD.</span>"
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left py-12">
            <div className="space-y-4">
              <div className="w-10 h-1 bg-zinc-800"></div>
              <h3 className="font-bold text-white">Sovereignty</h3>
              <p className="text-zinc-500 text-sm">
                Don't wait for a lab to hire you. Build the lab yourself. Your GitHub is your territory.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-1 bg-zinc-800"></div>
              <h3 className="font-bold text-white">Proof of Work</h3>
              <p className="text-zinc-500 text-sm">
                A degree says you promised to study. A reproduction proves you delivered.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-1 bg-zinc-800"></div>
              <h3 className="font-bold text-white">Access</h3>
              <p className="text-zinc-500 text-sm">
                We bring high knowledge down from the tower. We distribute wisdom to the worthy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: THE 14-DAY CADENCE */}
      <section id="writeups" className="relative z-10 border-y border-zinc-900 bg-zinc-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex justify-between items-baseline mb-16">
            <h2 className="text-4xl font-bold tracking-tighter">THE PROTOCOL</h2>
            <div className="font-mono text-zinc-600 text-xs md:text-sm">CYCLE_DURATION: 336 HOURS</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-zinc-900 border border-zinc-900 bg-black">
            {[
              { day: "01", label: "INTAKE", text: "Signal extraction." },
              { day: "02", label: "SIM", text: "Math -> Logic." },
              { day: "04", label: "BUILD", text: "Logic -> Code." },
              { day: "08", label: "HUNT", text: "Validate on data." },
              { day: "12", label: "SHIP", text: "Broadcast results." },
            ].map((step, i) => (
              <div key={i} className="p-8 group hover:bg-aquarius-cyan/5 transition-colors cursor-default">
                <div className="font-mono text-xs text-zinc-600 mb-2">T-PLUS-{step.day}</div>
                <div className="font-bold text-xl text-white mb-2 group-hover:text-aquarius-cyan transition-colors">{step.label}</div>
                <div className="text-zinc-500 text-sm">{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-32 px-6 bg-black text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-zinc-700 uppercase tracking-widest">
            End of Transmission
          </h2>
          <div className="flex justify-center gap-8">
            <Link href="/docs/protocol" className="text-4xl md:text-6xl font-bold hover:text-aquarius-cyan transition-colors">
              START
            </Link>
            <a href="https://github.com/Project-Aquarius-White" className="text-4xl md:text-6xl font-bold hover:text-aquarius-cyan transition-colors">
              FORK
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
