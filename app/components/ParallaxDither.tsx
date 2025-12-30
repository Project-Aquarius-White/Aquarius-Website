"use client";

export default function ParallaxDither() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
             <div
                className="w-full h-full"
                style={{
                    backgroundImage: `radial-gradient(#000 1px, transparent 0)`,
                    backgroundSize: `4px 4px`
                }}
            />
        </div>
    );
}
