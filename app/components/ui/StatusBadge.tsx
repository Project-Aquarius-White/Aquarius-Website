import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StatusType = 'active' | 'completed' | 'pending' | 'blocked';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  active: "border-aquarius-cyan/20 bg-aquarius-cyan/5 text-aquarius-cyan",
  completed: "border-emerald-400/20 bg-emerald-400/5 text-emerald-400",
  pending: "border-amber-400/20 bg-amber-400/5 text-amber-400",
  blocked: "border-rose-500/20 bg-rose-500/5 text-rose-500",
};

const dotStyles: Record<StatusType, string> = {
  active: "bg-aquarius-cyan",
  completed: "bg-emerald-400",
  pending: "bg-amber-400",
  blocked: "bg-rose-500",
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider",
        statusStyles[status],
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className={cn("absolute inline-flex h-full w-full animate-pulse rounded-full opacity-75", dotStyles[status])}></span>
        <span className={cn("relative inline-flex rounded-full h-2 w-2", dotStyles[status])}></span>
      </span>
      {label}
    </span>
  );
}
