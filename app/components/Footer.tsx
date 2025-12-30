import React from "react";
import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Protocol", href: "/docs/protocol" },
    { label: "Directory", href: "/directory" },
    { label: "Results", href: "/results" },
    { label: "Governance", href: "/docs/governance" },
    { label: "GitHub", href: "https://github.com/Project-Aquarius-White/Aquarius-Website", external: true },
  ];

  return (
    <footer className="relative z-10 py-12 md:py-32 px-6 bg-black text-center border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-4 font-mono text-xs text-zinc-500 uppercase tracking-wider">
          {links.map((link) => (
            link.external ? (
              <a 
                key={link.label}
                href={link.href}
                className="hover:text-aquarius-cyan transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link 
                key={link.label}
                href={link.href}
                className="hover:text-aquarius-cyan transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
        
        <div className="text-zinc-600 font-mono text-xs md:text-xs tracking-widest">
          &copy; 2025 PROJECT AQUARIUS
        </div>
      </div>
    </footer>
  );
}
