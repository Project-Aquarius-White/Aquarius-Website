"use client";

import { useState } from "react";
import ProtocolViz from "./ProtocolViz";

type ProtocolStep = "INTAKE" | "SIM" | "BUILD" | "HUNT" | "SHIP" | null;

export default function ProtocolSection() {
    const [activeStep, setActiveStep] = useState<ProtocolStep>(null);

    const steps = [
        { day: "01", id: "INTAKE", label: "DE-NOISE", text: "Isolate the core innovation from academic signaling." },
        { day: "02", id: "SIM", label: "MAP", text: "Translate mathematical notation into tensor logic." },
        { day: "04", id: "BUILD", label: "IMPLEMENT", text: "Clean-room build with rigorous component testing." },
        { day: "08", id: "HUNT", label: "VERIFY", text: "Empirical validation against paper benchmarks." },
        { day: "12", id: "SHIP", label: "DISTILL", text: "Institutionalize knowledge through technical retrospectives." },
    ];

    return (
        <section id="writeups" className="relative z-10 border-y border-zinc-900 bg-zinc-950 scroll-mt-24 overflow-hidden min-h-[400px]">

            {/* BACKGROUND VIZ */}
            <div className="absolute inset-0 z-0">
                <ProtocolViz step={activeStep} />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <div className="flex justify-between items-baseline mb-16 pointer-events-none">
                    <h2 className="text-4xl font-bold tracking-tighter mix-blend-difference">THE PROTOCOL</h2>
                    <div className="font-mono text-zinc-600 text-xs md:text-sm">CYCLE_DURATION: 336 HOURS</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-zinc-900 border border-zinc-900 bg-black/40 backdrop-blur-sm">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="p-8 group hover:bg-aquarius-cyan/10 transition-colors cursor-default relative"
                            onMouseEnter={() => setActiveStep(step.id as ProtocolStep)}
                            onMouseLeave={() => setActiveStep(null)}
                        >
                            <div className="font-mono text-xs text-zinc-600 mb-2 transition-colors group-hover:text-aquarius-cyan">T-PLUS-{step.day}</div>
                            <div className="font-bold text-xl text-white mb-2 group-hover:text-aquarius-cyan transition-colors">{step.label}</div>
                            <div className="text-zinc-500 text-sm group-hover:text-zinc-100 transition-colors">{step.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
