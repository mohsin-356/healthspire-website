import React from 'react';
import { motion } from 'motion/react';
import { useContentStore } from '../store/content-store';

export function TeamSection() {
  const { data } = useContentStore();
  const team = data.team;
  return (
    <section id="team" className="py-24 px-6 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold">
            Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Meet the dedicated professionals behind our pharmacy solutions
          </p>
        </motion.div>

        {/* Grid Layout - All team members in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member, idx) => (
            <motion.article
              key={member.id}
              className="group relative overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              {/* Image area - consistent aspect ratio */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                {/* Subtle gradient for readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-transparent opacity-50" />
              </div>

              {/* Name & Role - consistent height */}
              <div className="px-3 py-3 bg-card text-center flex-1 flex flex-col justify-center">
                <div className="font-semibold tracking-tight text-foreground text-sm">
                  {member.name}
                </div>
                <div className="text-xs mt-1 uppercase tracking-wide text-muted-foreground font-medium">
                  {member.role}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
