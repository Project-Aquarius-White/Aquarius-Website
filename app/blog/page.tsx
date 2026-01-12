import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight, Calendar, GitCommit } from "lucide-react";
import Header from "../components/Header";

export const metadata = {
  title: "Transmissions | Project Aquarius",
  description: "Deep dive protocols, research reproductions, and engineering logs.",
};

export default function BlogIndex() {
  const posts = getAllPosts(["title", "date", "description", "slug", "author"]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-aquarius-cyan selection:text-black">
      <Header activePage="/blog" />

      <div className="pt-32 pb-16 px-6 border-b border-zinc-900 bg-black">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">
            TRANSMISSIONS
          </h1>
          <p className="text-xl text-zinc-500 font-mono max-w-2xl leading-relaxed">
            Declassified engineering logs and research reproductions from the Aquarius archive.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-12">
          {posts.map((post) => {
            if (!post) return null;
            
            return (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="relative border-t border-zinc-800 pt-12 transition-all duration-500 hover:border-aquarius-cyan/50">
                  <div className="grid md:grid-cols-[1fr_3fr] gap-8">
                    <div className="flex flex-col gap-4">
                      <div className="font-mono text-xs text-aquarius-cyan tracking-widest uppercase">
                        Protocol {post.date?.split('-')[0] || 'Unknown'}
                      </div>
                      <div className="text-zinc-500 text-sm font-mono flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="text-zinc-500 text-sm font-mono flex items-center gap-2">
                        <GitCommit className="w-4 h-4" />
                        {post.author || "System"}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight group-hover:text-aquarius-cyan transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-2 text-aquarius-cyan font-mono text-sm uppercase tracking-wider opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Init Sequence <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
