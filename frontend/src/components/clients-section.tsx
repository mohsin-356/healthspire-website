import React from 'react';
import { motion } from 'motion/react';
import { useContentStore } from '../store/content-store';

export function ClientsSection() {
  const { data } = useContentStore();
  const clients = data.clients;
  const [index, setIndex] = React.useState(0);
  const VISIBLE = 4;

  React.useEffect(() => {
    if (!clients.length) return;
    const id = setInterval(() => setIndex(i => (i + VISIBLE) % clients.length), 3000);
    return () => clearInterval(id);
  }, [clients.length]);

  const nextPage = () => { if (clients.length) setIndex(i => (i + VISIBLE) % clients.length); };
  const prevPage = () => { if (clients.length) setIndex(i => (i - VISIBLE + clients.length) % clients.length); };

  const visibleIdx = clients.length
    ? Array.from({ length: Math.min(VISIBLE, clients.length) }, (_, k) => (index + k) % clients.length)
    : [];

  return (
    <section id="clients" className="py-20 px-6 bg-gradient-to-b from-background to-blue-50/20">
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-primary">Our Clients</h2>
          <p className="text-muted-foreground mt-2 mb-6">Healthcare partners trusting our solutions</p>
        </motion.div>

        <div className="relative">
          {/* Page Controls */}
          {clients.length > VISIBLE && (
            <>
              <button aria-label="Previous" onClick={prevPage} className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-sm">‹</button>
              <button aria-label="Next" onClick={nextPage} className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-sm">›</button>
            </>
          )}

          {/* Main row: exactly 4 on md+ (2 on small) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mb-6">
            {visibleIdx.map((vi) => {
              const c = clients[vi];
              return (
                <motion.div
                  key={c.name}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-primary/50 shadow-sm bg-white p-1.5 md:p-2">
                    <img src={c.img} alt={c.name} className="w-full h-full object-contain"/>
                  </div>
                  <div className="mt-2 text-sm text-foreground/80 text-center max-w-[10rem] leading-snug">{c.name}</div>
                </motion.div>
              );
            })}
          </div>

          
        </div>

      </div>
    </section>
  );
}
