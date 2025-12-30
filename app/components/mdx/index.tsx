import React from 'react';
import Link from 'next/link';
import { 
    Info, 
    AlertTriangle, 
    AlertOctagon, 
    CheckCircle2, 
    Github, 
    Star, 
    GitCommit,
    ArrowRight
} from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'danger' | 'success';

interface CalloutProps {
    type?: CalloutType;
    title?: string;
    children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
    const styles = {
        info: {
            border: 'border-aquarius-cyan',
            bg: 'bg-aquarius-cyan/5',
            text: 'text-aquarius-cyan',
            icon: Info
        },
        warning: {
            border: 'border-amber-500',
            bg: 'bg-amber-500/5',
            text: 'text-amber-500',
            icon: AlertTriangle
        },
        danger: {
            border: 'border-red-500',
            bg: 'bg-red-500/5',
            text: 'text-red-500',
            icon: AlertOctagon
        },
        success: {
            border: 'border-emerald-500',
            bg: 'bg-emerald-500/5',
            text: 'text-emerald-500',
            icon: CheckCircle2
        }
    };

    const style = styles[type];
    const Icon = style.icon;

    return (
        <div className={`my-8 rounded-sm border-l-2 ${style.border} ${style.bg} p-4 sm:p-6 overflow-hidden relative group`}>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Icon className="w-24 h-24" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${style.text}`} />
                    {title && <span className={`font-mono font-bold uppercase tracking-wider text-sm ${style.text}`}>{title}</span>}
                </div>
                <div className="text-zinc-300 text-sm leading-relaxed pl-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface FigureProps {
    src?: string;
    alt?: string;
    caption?: string;
    children?: React.ReactNode;
}

export function Figure({ src, alt, caption, children }: FigureProps) {
    return (
        <figure className="my-12 group">
            <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900/50 rounded-lg">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="p-2">
                    {src ? (
                        <img 
                            src={src} 
                            alt={alt || "Figure"} 
                            className="w-full h-auto rounded-md border border-zinc-900/50"
                        />
                    ) : children}
                </div>
            </div>
            {caption && (
                <figcaption className="mt-3 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest pl-1">
                    <div className="h-[1px] w-4 bg-zinc-800" />
                    <span className="group-hover:text-zinc-400 transition-colors">{caption}</span>
                </figcaption>
            )}
        </figure>
    );
}

interface ExperimentTableProps {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
}

export function ExperimentTable({ headers, rows, caption }: ExperimentTableProps) {
    return (
        <div className="my-12 overflow-hidden border border-zinc-800 rounded-lg bg-zinc-900/20">
            {caption && (
                <div className="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800 flex justify-between items-center">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">{caption}</span>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 font-mono">
                        <tr>
                            {headers.map((header, i) => (
                                <th key={i} className="px-6 py-3 border-b border-zinc-800 font-normal tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {rows.map((row, i) => (
                            <tr key={i} className="bg-transparent hover:bg-white/[0.02] transition-colors">
                                {row.map((cell, j) => (
                                    <td key={j} className={`px-6 py-4 font-mono ${j === 0 ? 'text-zinc-300 font-bold' : 'text-zinc-400'}`}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

interface ResultBadgeProps {
    status: 'pass' | 'fail' | 'pending' | 'neutral';
    label?: string;
}

export function ResultBadge({ status, label }: ResultBadgeProps) {
    const styles = {
        pass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        fail: "bg-red-500/10 text-red-400 border-red-500/20",
        pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        neutral: "bg-zinc-800/50 text-zinc-400 border-zinc-700/50"
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-mono font-medium tracking-tight ${styles[status]}`}>
            {status === 'pending' && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
            )}
            {(status === 'pass' || status === 'fail') && (
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'pass' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            )}
            {label || status.toUpperCase()}
        </span>
    );
}

interface TimelineItem {
    date: string;
    title: string;
    description?: string;
}

interface TimelineProps {
    items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
    return (
        <div className="my-12 pl-4 border-l border-zinc-800 space-y-8 relative">
            {items.map((item, i) => (
                <div key={i} className="relative pl-6 group">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border border-zinc-600 bg-zinc-950 group-hover:border-aquarius-cyan group-hover:bg-aquarius-cyan transition-colors duration-300" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                        <span className="font-mono text-xs text-aquarius-cyan/70">{item.date}</span>
                        <h4 className="font-bold text-zinc-200 text-sm uppercase tracking-wide">{item.title}</h4>
                    </div>
                    {item.description && (
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                            {item.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

interface RepoCardProps {
    name: string;
    description: string;
    url: string;
    stars?: number;
    language?: string;
}

export function RepoCard({ name, description, url, stars, language }: RepoCardProps) {
    return (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block my-8 group no-underline"
        >
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6 hover:border-aquarius-cyan/50 hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Github className="w-20 h-20 rotate-12 transform translate-x-4 -translate-y-4" />
                </div>

                <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-md group-hover:border-aquarius-cyan/30 transition-colors">
                            <GitCommit className="w-5 h-5 text-zinc-400 group-hover:text-aquarius-cyan" />
                        </div>
                        <span className="font-mono text-sm font-bold text-zinc-200 group-hover:text-aquarius-cyan transition-colors">
                            {name}
                        </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-aquarius-cyan group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-sm text-zinc-400 mb-6 leading-relaxed relative z-10">
                    {description}
                </p>

                <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 relative z-10">
                    {language && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-aquarius-cyan" />
                            {language}
                        </div>
                    )}
                    {stars !== undefined && (
                        <div className="flex items-center gap-1.5">
                            <Star className="w-3 h-3 text-zinc-600 group-hover:text-yellow-500 transition-colors" />
                            {stars.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
}

const Components = {
    Callout,
    Figure,
    ExperimentTable,
    ResultBadge,
    Timeline,
    RepoCard
};

export default Components;
