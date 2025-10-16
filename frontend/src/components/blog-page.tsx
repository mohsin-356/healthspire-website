import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useContentStore } from '../store/content-store';
import { useNavigation } from './navigation-context';

export function BlogPage() {
  const { data } = useContentStore();
  const { navigate } = useNavigation();
  const posts = data.blogs || [];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-primary">Healthspire Blog</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Insights on hospital, pharmacy, and laboratory transformation — theme-friendly and easy to read.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card hover:shadow-md md:hover:shadow-lg transition-all overflow-hidden flex flex-col h-full"
              >
                {/* Accent top bar */}
                <div className="h-1 bg-primary/80" />

                <div className="px-6 py-6 md:px-7 md:py-7 flex-1 flex flex-col">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="hidden sm:block shrink-0">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border border-border bg-muted/30">
                        {post.coverImg ? (
                          <img
                            src={post.coverImg}
                            alt={post.title}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col h-full">
                      <div className="text-xs text-muted-foreground">{post.date} · {post.author}</div>
                      <h3 className="mt-2 text-xl leading-snug font-semibold group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 mb-3 md:mb-4 flex flex-wrap gap-2 min-h-[2.5rem]">
                        {post.tags.slice(0, 3).map(t => (
                          <span
                            key={t}
                            className="inline-flex items-center text-xs font-medium px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="inline-flex items-center text-xs font-medium px-4 py-1.5 rounded-full bg-muted text-muted-foreground">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 md:px-7 md:pb-7">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto rounded-lg" onClick={()=>navigate(`/blog/${post.slug}`)}>
                      Read more
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
