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
    ArrowRight,
    FlaskConical,
    Clock,
    Code2,
    Target
} from 'lucide-react';
import { QuestionBox } from './QuestionBox';

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
        <div className={`my-12 rounded-lg border-l-4 ${style.border} ${style.bg} p-6 sm:p-8 overflow-hidden relative group transition-all duration-300 hover:translate-x-1`}>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Icon className="w-32 h-32" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-md ${style.bg} border border-white/5`}>
                        <Icon className={`w-5 h-5 ${style.text}`} />
                    </div>
                    {title && <span className={`font-mono font-bold uppercase tracking-wider text-sm ${style.text}`}>{title}</span>}
                </div>
                <div className="text-zinc-300 text-lg leading-relaxed pl-1">
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
        <figure className="my-16 group">
            <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900/50 rounded-xl shadow-2xl">
                <div className="p-3 bg-zinc-950/50 border-b border-zinc-800 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    </div>
                    <div className="ml-2 text-xs font-mono text-zinc-600">{caption || "Figure"}</div>
                </div>
                
                <div className="p-1">
                    {src ? (
                        <img 
                            src={src} 
                            alt={alt || "Figure"} 
                            className="w-full h-auto rounded-lg border border-zinc-900/50"
                        />
                    ) : children}
                </div>
            </div>
            {caption && (
                <figcaption className="mt-4 flex items-center justify-center gap-2 text-sm font-mono text-zinc-500">
                    <span className="text-aquarius-cyan">FIG.</span>
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
        <div className="my-16 overflow-hidden border border-zinc-800 rounded-xl bg-zinc-900/20 shadow-xl">
            {caption && (
                <div className="bg-zinc-900/80 px-6 py-3 border-b border-zinc-800 flex justify-between items-center">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider font-bold">{caption}</span>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50 font-mono">
                        <tr>
                            {headers.map((header, i) => (
                                <th key={i} className="px-6 py-4 border-b border-zinc-800 font-bold tracking-wider">
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
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono font-medium tracking-tight ${styles[status]}`}>
            {status === 'pending' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
            )}
            {(status === 'pass' || status === 'fail') && (
                <div className={`w-2 h-2 rounded-sm ${status === 'pass' ? 'bg-emerald-500' : 'bg-red-500'}`} />
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
        <div className="my-16 pl-4 border-l-2 border-zinc-800 space-y-12 relative">
            {items.map((item, i) => (
                <div key={i} className="relative pl-8 group">
                    <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-zinc-600 bg-zinc-950 group-hover:border-aquarius-cyan group-hover:scale-125 transition-all duration-300" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                        <span className="font-mono text-xs font-bold text-aquarius-cyan bg-aquarius-cyan/10 px-2 py-0.5 rounded">{item.date}</span>
                        <h4 className="font-bold text-zinc-200 text-lg uppercase tracking-wide group-hover:text-aquarius-cyan transition-colors">{item.title}</h4>
                    </div>
                    {item.description && (
                        <p className="text-zinc-400 text-base leading-relaxed max-w-3xl">
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
            className="block my-12 group no-underline"
        >
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 hover:border-aquarius-cyan/50 hover:bg-zinc-900/50 hover:shadow-[0_0_30px_-10px_rgba(0,240,255,0.15)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <Github className="w-32 h-32 rotate-12 transform translate-x-8 -translate-y-8" />
                </div>

                <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg group-hover:border-aquarius-cyan/30 transition-colors">
                            <GitCommit className="w-6 h-6 text-zinc-400 group-hover:text-aquarius-cyan" />
                        </div>
                        <div>
                            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Repository</div>
                            <span className="font-mono text-xl font-bold text-zinc-200 group-hover:text-aquarius-cyan transition-colors">
                                {name}
                            </span>
                        </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-zinc-600 group-hover:text-aquarius-cyan group-hover:translate-x-2 transition-all" />
                </div>

                <p className="text-base text-zinc-400 mb-8 leading-relaxed relative z-10 max-w-2xl">
                    {description}
                </p>

                <div className="flex items-center gap-8 text-sm font-mono text-zinc-500 relative z-10">
                    {language && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                            <div className="w-2 h-2 rounded-full bg-aquarius-cyan" />
                            {language}
                        </div>
                    )}
                    {stars !== undefined && (
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-zinc-600 group-hover:text-yellow-500 transition-colors" />
                            {stars.toLocaleString()} Stars
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
}

interface CodeAnnotation {
    line: number;
    text: string;
}

interface CodeWalkthroughProps {
    code: string;
    language?: string;
    annotations?: CodeAnnotation[];
    title?: string;
}

export function CodeWalkthrough({ code, language = 'python', annotations = [], title }: CodeWalkthroughProps) {
    const lines = code.trim().split('\n');
    const annotationMap = new Map(annotations.map(a => [a.line, a.text]));

    return (
        <div className="my-12 rounded-xl border border-zinc-800 overflow-hidden bg-[#0d1117] shadow-xl">
            {title && (
                <div className="bg-zinc-900/80 px-6 py-3 border-b border-zinc-800 flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-aquarius-cyan" />
                    <span className="font-mono text-sm text-zinc-300 font-bold">{title}</span>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <tbody>
                        {lines.map((line, i) => {
                            const lineNum = i + 1;
                            const annotation = annotationMap.get(lineNum);
                            return (
                                <React.Fragment key={i}>
                                    <tr className={`${annotation ? 'bg-aquarius-cyan/5' : ''} hover:bg-white/[0.02]`}>
                                        <td className="px-4 py-1 text-right text-zinc-600 font-mono text-xs select-none w-12 border-r border-zinc-800/50">
                                            {lineNum}
                                        </td>
                                        <td className="px-6 py-1 font-mono text-zinc-300 whitespace-pre">
                                            {line || ' '}
                                        </td>
                                    </tr>
                                    {annotation && (
                                        <tr className="bg-aquarius-cyan/10 border-b border-aquarius-cyan/20">
                                            <td className="px-4 py-3 border-r border-zinc-800/50"></td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-start gap-3">
                                                    <ArrowRight className="w-4 h-4 text-aquarius-cyan mt-0.5 flex-shrink-0" />
                                                    <span className="text-aquarius-cyan text-sm font-medium leading-relaxed">{annotation}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

type ExperimentStatus = 'PASS' | 'FAIL' | 'TIMEOUT' | 'NEEDS_MORE_EPOCHS' | 'PENDING';

interface ExperimentResultProps {
    name: string;
    section?: string;
    status: ExperimentStatus;
    criterion: string;
    results?: Record<string, string | number | boolean>;
    hyperparameters?: Record<string, string | number>;
    notes?: string;
    showHyperparameters?: boolean;
    showNotes?: boolean;
}

export function ExperimentResult({ 
    name, 
    section, 
    status, 
    criterion, 
    results, 
    hyperparameters, 
    notes,
    showHyperparameters = true, 
    showNotes = true 
}: ExperimentResultProps) {
    const statusColors: Record<ExperimentStatus, string> = {
        'PASS': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        'FAIL': 'text-red-400 bg-red-500/10 border-red-500/20',
        'TIMEOUT': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        'NEEDS_MORE_EPOCHS': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        'PENDING': 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
    };
    
    const StatusIcon = status === 'PASS' ? CheckCircle2 : 
                       status === 'FAIL' ? AlertOctagon :
                       status === 'TIMEOUT' ? Clock :
                       AlertTriangle;

    return (
        <div className="my-12 rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/30 shadow-lg">
            <div className="p-6 border-b border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <FlaskConical className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-200 text-xl tracking-tight">{name}</h4>
                        {section && (
                            <span className="text-sm font-mono text-zinc-500">Section {section}</span>
                        )}
                    </div>
                </div>
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-mono font-medium ${statusColors[status]}`}>
                    <StatusIcon className="w-4 h-4" />
                    {status.replace(/_/g, ' ')}
                </span>
            </div>
            
            <div className="px-6 py-4 border-b border-zinc-800/50 bg-zinc-900/50">
                <div className="flex items-start gap-3 text-sm">
                    <Target className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                        <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-1">Paper Criterion</span>
                        <span className="text-zinc-300 font-mono text-base">{criterion}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 grid gap-8 sm:grid-cols-2">
                {results && (
                    <div className="space-y-4">
                        <h5 className="text-xs font-mono text-aquarius-cyan uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-aquarius-cyan" />
                            Measured Results
                        </h5>
                        <div className="space-y-2">
                            {Object.entries(results).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center text-sm border-b border-zinc-800/50 pb-2">
                                    <span className="text-zinc-500 font-mono">{key.replace(/_/g, ' ')}</span>
                                    <span className="text-zinc-200 font-bold font-mono">{value.toString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showHyperparameters && hyperparameters && (
                    <div className="space-y-4">
                        <h5 className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                            Hyperparameters
                        </h5>
                        <div className="space-y-2">
                            {Object.entries(hyperparameters).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center text-sm border-b border-zinc-800/50 pb-2">
                                    <span className="text-zinc-500 font-mono">{key.replace(/_/g, ' ')}</span>
                                    <span className="text-zinc-400 font-mono">{value.toString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showNotes && notes && (
                <div className="px-6 py-4 bg-zinc-950/50 border-t border-zinc-800/50 text-sm flex items-start gap-3">
                    <Info className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 italic">{notes}</span>
                </div>
            )}
        </div>
    );
}

import InteractiveDiagram from './InteractiveDiagram';

const MdxComponents = {
    Callout,
    QuestionBox,
    Figure,
    Timeline,
    RepoCard,
    CodeWalkthrough,
    ExperimentTable,
    ExperimentResult,
    ResultBadge,
    InteractiveDiagram,
    
    // Override standard elements
    h1: (props: any) => <h1 className="text-4xl font-bold mt-16 mb-8 text-white tracking-tight" {...props} />,
    h2: (props: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white tracking-tight flex items-center gap-3 before:content-[''] before:w-1.5 before:h-8 before:bg-aquarius-cyan before:rounded-sm" {...props} />,
    h3: (props: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" {...props} />,
    p: (props: any) => <p className="mb-6 leading-loose text-lg text-zinc-300" {...props} />,
    ul: (props: any) => <ul className="my-6 space-y-2 list-disc list-outside ml-6 marker:text-aquarius-cyan" {...props} />,
    ol: (props: any) => <ol className="my-6 space-y-2 list-decimal list-outside ml-6 marker:text-aquarius-cyan" {...props} />,
    li: (props: any) => <li className="pl-2" {...props} />,
    a: (props: any) => <Link className="text-aquarius-cyan hover:underline decoration-aquarius-cyan/30 underline-offset-4" {...props} />,
};

export default MdxComponents;
