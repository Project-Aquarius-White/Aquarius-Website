import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Github } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import MdxComponents from "@/app/components/mdx";
import Header from "@/app/components/Header";

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.(md|mdx)$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ["title", "description", "date"]);

    if (!post) return { title: "Transmission Not Found" };

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
    };
}

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
            }]
        ] as any[],
    },
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ["title", "date", "content", "author", "github_repo"]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 font-mono">
                <h1 className="text-4xl text-red-500">404: TRANSMISSION_LOST</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-aquarius-cyan selection:text-black">
            <Header activePage="/blog" />

            <div className="w-full bg-black border-b border-zinc-900 pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-end">
                    <div>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-aquarius-cyan mb-8 uppercase tracking-widest text-xs font-mono transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Index
                        </Link>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-sm font-mono text-zinc-500 items-center">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {post.author || "System"}
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:justify-self-end">
                        {post.github_repo && (
                            <a 
                                href={post.github_repo} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 hover:border-aquarius-cyan/50 transition-all duration-300"
                            >
                                <div className="p-2 bg-black rounded-md border border-zinc-800 group-hover:border-aquarius-cyan text-zinc-400 group-hover:text-aquarius-cyan transition-colors">
                                    <Github className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Source Code</div>
                                    <div className="text-zinc-200 font-bold group-hover:text-aquarius-cyan transition-colors">Access Repository</div>
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16">
                
                <main className="min-w-0">
                    <article className="prose prose-invert prose-xl max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                        prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-lg md:prose-p:text-xl
                        prose-a:text-aquarius-cyan prose-a:no-underline hover:prose-a:underline
                        prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl
                        prose-img:rounded-xl prose-img:border prose-img:border-zinc-800
                        prose-hr:border-zinc-800
                        prose-blockquote:border-l-aquarius-cyan prose-blockquote:bg-aquarius-cyan/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    ">
                        <MDXRemote source={post.content} options={options} components={MdxComponents} />
                    </article>

                    <div className="mt-24 pt-12 border-t border-zinc-900 flex justify-between items-center text-sm text-zinc-600 font-mono">
                        <div>END OF TRANSMISSION</div>
                        <Link href="/blog" className="hover:text-aquarius-cyan flex items-center gap-2">
                            ARCHIVE <ArrowLeft className="w-3 h-3 rotate-90" />
                        </Link>
                    </div>
                </main>

                <aside className="hidden lg:block">
                   <div className="sticky top-32 space-y-8">
                        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                            Protocol Status
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500 text-sm font-mono">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Active
                        </div>
                   </div>
                </aside>
            </div>
        </div>
    );
}
