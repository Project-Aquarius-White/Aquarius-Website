import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.md$/, ''),
    }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ["title", "date", "content"]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl font-mono text-red-500">404: PROTOCOL_NOT_FOUND</h1>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-24 font-mono">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-aquarius-cyan mb-8 uppercase tracking-widest text-sm transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Base
            </Link>

            <article className="prose prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-aquarius-cyan prose-img:rounded-sm max-w-none">
                <h1 className="text-5xl mb-4 text-white uppercase">{post.title}</h1>
                <div className="h-0.5 w-24 bg-aquarius-cyan mb-12" />
                <MDXRemote source={post.content} />
            </article>
        </div>
    );
}
