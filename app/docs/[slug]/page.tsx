import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Github } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.md$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ["title", "description", "date"]);

    if (!post) return { title: "Protocol Not Found" };

    return {
        title: `${post.title} | Project Aquarius`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: ["Project Aquarius"],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const options = {
    parseFrontmatter: true,
    mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
            rehypeSlug,
            rehypeKatex,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypePrettyCode, {
                theme: 'one-dark-pro',
                keepBackground: true,
                onVisitLine(node: any) {
                    if (node.children.length === 0) {
                        node.children = [{ type: 'text', value: ' ' }];
                    }
                },
                onVisitHighlightedLine(node: any) {
                    node.properties.className.push('line--highlighted');
                },
                onVisitHighlightedWord(node: any) {
                    node.properties.className = ['word--highlighted'];
                },
            }]
        ],
    },
};

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ["title", "date", "content", "author", "github_repo"]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 font-mono">
                <h1 className="text-4xl text-red-500">404: PROTOCOL_NOT_FOUND</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-aquarius-cyan selection:text-black pb-32">

            {/* Immersive Header */}
            <div className="w-full bg-black border-b border-zinc-900 pt-32 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-aquarius-cyan mb-8 uppercase tracking-widest text-xs font-mono transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return to Base
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-sm font-mono text-zinc-500 items-center">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author || "Aquarius Agent"}
                        </div>
                        {post.github_repo && (
                            <a href={post.github_repo} target="_blank" className="flex items-center gap-2 text-aquarius-cyan hover:underline decoration-aquarius-cyan/30 underline-offset-4">
                                <Github className="w-4 h-4" />
                                View Repository
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <article className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
            prose-p:text-zinc-300 prose-p:leading-relaxed
            prose-a:text-aquarius-cyan prose-a:no-underline hover:prose-a:underline
            prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg
            prose-code:text-aquarius-cyan prose-code:bg-aquarius-cyan/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
        ">
                    <MDXRemote source={post.content} options={options} />
                </article>

                <div className="mt-24 pt-8 border-t border-zinc-900 flex justify-between items-center text-sm text-zinc-600 font-mono">
                    <div>END OF PROTOCOL</div>
                    <Link href="#" className="hover:text-aquarius-cyan flex items-center gap-2">
                        TOP <ArrowLeft className="w-3 h-3 rotate-90" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
