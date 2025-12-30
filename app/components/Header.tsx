"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "[PROTOCOL]", href: "/docs/protocol" },
    { label: "[DIRECTORY]", href: "/directory" },
    { label: "[RESULTS]", href: "/results" },
    { label: "[MISSION STATUS]", href: "/dashboard" },
  ];

  const githubUrl = "https://github.com/Project-Aquarius-White/Aquarius-Website";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
      <Link href="/" className="text-xs font-mono tracking-[0.3em] uppercase pointer-events-auto hover:text-aquarius-cyan transition-colors z-50">
        Project Aquarius // Protocol v1.0
      </Link>

      <nav className="hidden md:flex gap-6 pointer-events-auto items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs font-mono transition-colors ${
              activePage === item.href ? "text-aquarius-cyan" : "hover:text-aquarius-cyan"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono hover:text-aquarius-cyan transition-colors"
        >
          [REPOSITORY]
        </a>
      </nav>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden pointer-events-auto text-white z-50 p-3 -mr-3"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center pointer-events-auto md:hidden">
          <nav className="flex flex-col gap-8 text-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-mono tracking-widest ${
                  activePage === item.href ? "text-aquarius-cyan" : "text-white hover:text-aquarius-cyan"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-mono tracking-widest text-white hover:text-aquarius-cyan"
            >
              [REPOSITORY]
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
