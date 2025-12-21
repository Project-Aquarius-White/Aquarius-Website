import GlitchText from "./components/GlitchText";
import ParallaxLogo from "./components/ParallaxLogo";
import Link from "next/link";
import { ArrowRight, Github, BookOpen, ExternalLink, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center font-mono">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-12">
        <ParallaxLogo />

        <div className="space-y-6 max-w-4xl">
          <GlitchText
            text="PROJECT AQUARIUS"
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
          />
          <p className="text-xl md:text-2xl text-aquarius-cyan opacity-90 max-w-2xl mx-auto leading-relaxed">
            Transform SOTA research papers into production-ready code. <br />
            Build <span className="text-white font-bold bg-aquarius-teal/20 px-2">mastery</span> through reproduction.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          <Link href="/docs/protocol" className="group relative px-8 py-4 bg-aquarius-cyan/10 border border-aquarius-cyan text-aquarius-cyan hover:bg-aquarius-cyan hover:text-black transition-all duration-300">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest">
              <BookOpen className="w-5 h-5" /> Start The Protocol
            </span>
            <div className="absolute inset-0 bg-aquarius-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <a href="https://github.com/Project-Aquarius-White" target="_blank" className="group px-8 py-4 border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-all duration-300">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest">
              <Github className="w-5 h-5" /> GitHub
            </span>
          </a>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="w-full max-w-5xl px-6 py-24 border-t border-zinc-900">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-500 flex items-center gap-3">
              <span className="text-sm border border-red-500 px-2 py-1 rounded-sm">01</span>
              THE PROBLEM
            </h2>
            <p className="text-lg text-zinc-300 leading-relaxed">
              You read a groundbreaking paper. You understand the abstract. You nod along with the methodology. You close the PDF.
            </p>
            <p className="text-2xl font-bold text-white">Nothing changes.</p>
            <p className="text-zinc-400">
              Reading is passive. Understanding is active. The gap between "I read it" and "I can build it" is where most learning dies.
            </p>
          </div>
          <div className="p-8 border border-zinc-800 bg-black/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
            <div className="text-red-500 font-mono text-sm mb-4">[ERROR: IMPLEMENTATION_NOT_FOUND]</div>
            <code className="text-zinc-500 block text-xs">
              &gt; importing knowledge... <br />
              &gt; parsing abstract... done <br />
              &gt; compiling understanding... <span className="text-red-500">FAILED</span> <br />
              &gt; reason: practical_experience underflow
            </code>
          </div>
        </div>
      </section>

      {/* THE PHILOSOPHY */}
      <section className="w-full max-w-5xl px-6 py-24 border-t border-zinc-900 border-l border-r border-b-0 relative">
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-aquarius-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-aquarius-cyan" />

        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-aquarius-cyan">THE PHILOSOPHY</h2>
          <p className="text-2xl md:text-3xl font-medium text-white leading-tight">
            "True understanding only emerges through reproduction."
          </p>
          <div className="text-left bg-zinc-900/50 p-6 border border-zinc-800">
            <p className="mb-4 text-zinc-300">
              We reject the illusion of comprehension that comes from reading. We believe that knowledge without implementation is just trivia.
            </p>
            <p className="text-zinc-300">
              This is not about tutorials. This is not about copying notebooks. This is about confrontation with reality: the ambiguous notation, the missing hyperparameters, the "obvious" steps that aren't obvious at all.
            </p>
          </div>
        </div>
      </section>

      {/* 14 DAY CYCLE */}
      <section className="w-full py-24 bg-zinc-900/30 backdrop-blur-sm mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">THE 14-DAY CYCLE</h2>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { day: "01", title: "Intake", desc: "Identify what matters" },
              { day: "02", title: "Simulation", desc: "Math to Logic" },
              { day: "04", title: "Build", desc: "Logic to Code" },
              { day: "08", title: "Deploy", desc: "Validate w/ Data" },
              { day: "12", title: "Evangelize", desc: "Public Broadcast" },
            ].map((step, i) => (
              <div key={i} className="border border-zinc-800 p-6 hover:border-aquarius-cyan transition-colors bg-black/40 group">
                <div className="text-4xl font-bold text-zinc-800 group-hover:text-aquarius-cyan/50 transition-colors mb-2">{step.day}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <div className="h-0.5 w-8 bg-aquarius-cyan mb-4" />
                <p className="text-sm text-zinc-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-8 text-center">
        <h2 className="text-4xl font-bold text-white">Join The Movement</h2>
        <p className="text-zinc-400 max-w-xl">
          We're building the largest open-source community dedicated to AI/ML paper reproduction.
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/Project-Aquarius-White" className="px-8 py-3 bg-white text-black font-bold hover:bg-aquarius-cyan transition-colors">
            JOIN GITHUB
          </a>
          <Link href="/docs/protocol" className="px-8 py-3 border border-zinc-700 text-white hover:border-aquarius-cyan transition-colors">
            READ PROTOCOL
          </Link>
        </div>

        <div className="mt-24 pt-12 border-t border-zinc-900 w-full max-w-4xl flex justify-between text-xs text-zinc-600 font-mono">
          <div>PROJECT AQUARIUS © 2025</div>
          <div>MIT LICENSE</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-aquarius-cyan">DISCORD</a>
            <a href="#" className="hover:text-aquarius-cyan">TWITTER</a>
          </div>
        </div>
      </section>

    </div>
  );
}
