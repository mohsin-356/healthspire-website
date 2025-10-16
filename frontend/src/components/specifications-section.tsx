import { motion } from 'motion/react';
import { useContentStore, getIcon } from '../store/content-store';

export function SpecificationsSection() {
  const { data } = useContentStore();
  const specifications = data.specifications;
  return (
    <section id="solutions" className="py-24 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-4 font-semibold">Healthcare Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive software suite designed specifically for modern healthcare facilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="relative p-8 bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    {(() => { const Icon = getIcon(spec.icon); return <Icon className="w-7 h-7 text-primary"/>; })()}
                  </motion.div>

                  <h3 className="text-xl mb-3">{spec.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {spec.description}
                  </p>
                  
                  <motion.div
                    className="inline-block px-3 py-1 bg-primary/10 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm text-primary">{spec.stats}</span>
                  </motion.div>
                </div>

                {/* 3D shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-2xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}