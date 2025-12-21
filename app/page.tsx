import AquariusDither from "./components/AquariusDither";
import Link from "next/link";
import { ArrowRight, Github, BookOpen, Terminal, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-aquarius-cyan selection:text-black">

      {/* GLOBAL BACKGROUND TEXTURE */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay"></div>

      {/* HEADER / NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xs font-mono tracking-[0.2em]">PROJECT AQUARIUS // 2025</div>
        <a href="https://github.com/Project-Aquarius-White" className="text-xs font-mono hover:text-aquarius-cyan transition-colors">[GITHUB]</a>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6">

        {/* Main Dither Viz */}
        <div className="w-full max-w-5xl mb-12 relative grayscale hover:grayscale-0 transition-all duration-1000 ease-out">
          <AquariusDither />
        </div>

        <div className="max-w-6xl w-full text-center space-y-12">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white leading-[0.8] mix-blend-difference">
            MASTER <br /> THE STATE <br /> OF THE ART
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8">
            <div className="max-w-xs text-left text-sm text-zinc-400 font-mono leading-relaxed border-l border-zinc-800 pl-4">
              01. INTAKE<br />
              02. SIMULATE<br />
              03. BUILD<br />
              04. DEPLOY
            </div>

            <p className="max-w-xl text-lg md:text-xl text-zinc-300 font-light leading-relaxed text-left">
              Stop reading papers. Start rebuilding them. <br />
              <strong className="text-white font-medium">Project Aquarius</strong> is a protocol for transforming academic intelligence into production-grade personal IP.
            </p>
          </div>

          <div className="pt-16 flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/docs/protocol" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold tracking-wide hover:bg-aquarius-cyan transition-colors duration-300">
              <span>INITIATE PROTOCOL</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://discord.gg/projectaquarius" className="inline-flex items-center justify-center px-8 py-4 border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-colors duration-300">
              JOIN THE SQUAD
            </a>
          </div>
        </div>
      </section>

      {/* MANIFESTO SECTION - Editorial Layout */}
      <section className="relative z-10 bg-zinc-950 py-32 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="sticky top-32">
              <h2 className="text-zinc-500 font-mono text-sm tracking-widest mb-4">THE PROBLEM</h2>
              <div className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Reading is <span className="text-zinc-600 line-through">Passive</span>. <br />
                Building is <span className="text-aquarius-cyan">Active</span>.
              </div>
            </div>
          </div>
          <div className="md:col-span-8 space-y-12 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            <p>
              You read a groundbreaking paper. You understand the abstract. You nod along with the methodology. You close the PDF.
              <br /><br />
              <span className="text-white font-normal">Nothing changes.</span>
            </p>
            <p>
              The gap between "I read it" and "I can build it" is where most learning dies. We reject the illusion of comprehension that comes from passive consumption. We believe that knowledge without implementation is just trivia.
            </p>
            <div className="p-8 border border-zinc-800 bg-black">
              <h3 className="text-white font-bold mb-4 font-mono">THE STANDARD</h3>
              <p className="text-zinc-400 text-base">
                "You don't truly understand a system until you can rebuild it from scratch." <br />
                Everything else—the repos, the blog posts, the GitHub stars—is just evidence of that understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS / CYCLE - Swiss Grid Layout */}
      <section className="relative z-10 py-32 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <h2 className="text-6xl font-bold text-white tracking-tighter max-w-2xl">THE 14-DAY COMPOUND</h2>
            <p className="text-zinc-500 font-mono text-right mt-8 md:mt-0">RHYTHM &gt; PERFECTION</p>
          </div>

          <div className="grid md:grid-cols-4 border-t border-l border-zinc-800">
            {[
              { id: "01", title: "De-Noise", desc: "Filter signal from academic noise." },
              { id: "02", title: "Simulation", desc: "Translate math into whiteboard logic." },
              { id: "03", title: "Lean Build", desc: "Implement core logic. No bloat." },
              { id: "04", title: "Telemetry", desc: "Validate against real-world data." }
            ].map((item) => (
              <div key={item.id} className="border-r border-b border-zinc-800 p-8 md:p-12 hover:bg-zinc-900/50 transition-colors group h-full flex flex-col justify-between min-h-[300px]">
                <div className="font-mono text-aquarius-cyan mb-4 opacity-50 group-hover:opacity-100">{item.id}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Minimal */}
      <footer className="relative z-10 border-t border-zinc-900 py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="font-bold text-2xl text-white tracking-tighter mb-2">PROJECT AQUARIUS</div>
            <div className="text-zinc-600 text-sm">Bring the knowledge down from the tower.</div>
          </div>

          <div className="flex gap-8 font-mono text-sm">
            <Link href="/docs/protocol" className="text-zinc-400 hover:text-white transition-colors">PROTOCOL</Link>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">TWITTER</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">DISCORD</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
