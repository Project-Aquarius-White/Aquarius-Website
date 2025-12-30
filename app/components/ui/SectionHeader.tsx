import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Metric {
  label: string;
  value: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  metric?: Metric;
  className?: string;
}

export function SectionHeader({ title, subtitle, metric, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4 mb-8", className)}>
      <div>
        <h2 className="text-4xl font-bold tracking-tighter text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-zinc-500 text-sm mt-1 font-mono">
            {subtitle}
          </p>
        )}
      </div>
      
      {metric && (
        <div className="flex flex-col items-end">
          <span className="text-xs text-zinc-600 uppercase tracking-widest font-mono mb-1">
            {metric.label}
          </span>
          <span className="text-2xl font-mono text-aquarius-cyan tracking-tight">
            {metric.value}
          </span>
        </div>
      )}
    </div>
  );
}
