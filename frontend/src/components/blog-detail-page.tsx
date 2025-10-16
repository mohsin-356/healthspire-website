import React from 'react';
import { motion } from 'motion/react';
import { useContentStore } from '../store/content-store';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigation } from './navigation-context';

function useSlug() {
  const [slug, setSlug] = React.useState<string>(() => {
    const path = window.location.pathname;
    return path.startsWith('/blog/') ? decodeURIComponent(path.slice('/blog/'.length)) : '';
  });
  React.useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      setSlug(path.startsWith('/blog/') ? decodeURIComponent(path.slice('/blog/'.length)) : '');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return slug;
}

function setMeta(name: string, content?: string) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function BlogDetailPage() {
  const { data } = useContentStore();
  const { navigate } = useNavigation();
  const slug = useSlug();
  const post = (data.blogs || []).find(b => b.slug === slug);

  React.useEffect(() => {
    if (!post) return;
    document.title = `${post.seoTitle || post.title} | Healthspire`;
    setMeta('description', post.seoDescription || post.excerpt);
    setMeta('keywords', post.seoKeywords);
  }, [post]);

  if (!post) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-semibold">Post not found</h1>
          <p className="text-muted-foreground mt-2">We couldn’t find the blog you’re looking for.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="relative">
      <section className="pt-20 md:pt-24 pb-6 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-xs md:text-sm text-muted-foreground">Home · Blog · {post.title}</div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="px-6 md:px-8 lg:px-12 py-6">
              {post.coverImg && (
                <div className="mb-4 md:mb-6 rounded-xl overflow-hidden border border-border bg-muted/20 shadow-sm">
                  <img src={post.coverImg} alt={post.title} className="w-full h-full object-cover object-center" loading="lazy" decoding="async"/>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3 text-[12px] md:text-xs text-muted-foreground mb-3">
                <span>By {post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
                {post.tags.length>0 && <><span>·</span><span>{post.tags.length} tags</span></>}
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-snug">{post.title}</h1>
              <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-primary">
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              </article>

              {post.tags.length>0 && (
                <div className="mt-8 p-4 rounded-xl border border-border bg-card shadow-sm">
                  <div className="text-sm font-medium mb-3">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(t => (
                      <span key={t} className="inline-flex items-center text-xs font-medium px-4 py-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <aside className="px-6 md:px-8 lg:px-12 py-6 bg-muted/20 border-l border-border space-y-6 overflow-y-auto max-h-screen">
              <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                <div className="text-sm font-medium mb-3">Search</div>
                <div className="flex gap-2">
                  <Input placeholder="Search posts" className="flex-1"/>
                  <Button variant="outline">Search</Button>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                <div className="text-sm font-medium mb-3">Recent Posts</div>
                <div className="space-y-3">
                  {(data.blogs||[]).slice(0,5).map(p => (
                    <button key={p.id} className="block text-left w-full" onClick={()=>navigate(`/blog/${p.slug}`)}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden border border-border bg-muted/30">
                          {p.coverImg ? <img src={p.coverImg} alt={p.title} className="w-full h-full object-cover object-center" loading="lazy" decoding="async"/> : <div className="w-full h-full bg-primary/10"/>}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-muted-foreground">{p.date}</div>
                          <div className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">{p.title}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                <div className="text-sm font-medium mb-3">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set((data.blogs||[]).flatMap(b=>b.tags))).map(t => (
                    <button key={t} className="inline-flex items-center text-xs font-medium px-4 py-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" onClick={()=>navigate('/blog')}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
