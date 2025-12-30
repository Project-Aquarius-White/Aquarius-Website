import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DataTableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-zinc-800 bg-black/40", className)}>
      <table className="w-full text-left font-mono text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/50">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-aquarius-cyan/80"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="group transition-colors hover:bg-zinc-900/50"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-zinc-300 group-hover:text-white transition-colors"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="p-8 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
          No Data Available
        </div>
      )}
    </div>
  );
}
