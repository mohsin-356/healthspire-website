import { motion } from 'motion/react';

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large floating orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-secondary/15 to-muted/15 rounded-full blur-2xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Smaller geometric shapes */}
      <motion.div
        className="absolute top-3/4 right-1/3 w-12 h-12 bg-primary/20 rounded-lg"
        animate={{
          rotate: [0, 360],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformStyle: "preserve-3d" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/6 w-8 h-8 bg-accent/30 rounded-full"
        animate={{
          x: [0, 200, 0],
          y: [0, -150, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Triangular shapes */}
      <motion.div
        className="absolute bottom-1/4 right-1/5 w-0 h-0"
        style={{
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "25px solid rgba(var(--color-primary), 0.1)"
        }}
        animate={{
          rotate: [0, 360],
          x: [0, -150, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}