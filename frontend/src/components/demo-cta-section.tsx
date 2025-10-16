import { motion } from 'motion/react';
import { Play, Calendar, ArrowRight, Shield, Zap, Heart } from 'lucide-react';
import { Button } from './ui/button';

export function DemoCTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary to-accent text-primary-foreground overflow-hidden relative">
      {/* Background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl font-bold mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            See SPIREHEALTH in Action
          </motion.h2>
          <motion.p
            className="text-xl opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join over 500+ healthcare facilities that have transformed their operations with MINDSPIRE's SPIREHEALTH platform. 
            Schedule a personalized demo and see how our advanced healthcare technology can revolutionize your workflow.
          </motion.p>
        </motion.div>

        {/* Main CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Schedule Live Demo
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-3" />
              Watch Product Tour
            </Button>
          </motion.div>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Heart,
              title: "Patient Care First",
              description: "Designed by healthcare professionals for optimal patient outcomes"
            },
            {
              icon: Shield,
              title: "Security Guaranteed",
              description: "HIPAA compliant with military-grade encryption and access controls"
            },
            {
              icon: Zap,
              title: "Quick Implementation",
              description: "Get up and running in under 30 days with our expert support team"
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                <benefit.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="opacity-90 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo stats */}
        <motion.div
          className="text-center border-t border-white/20 pt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15min", label: "Demo Duration" },
              { number: "95%", label: "Customer Satisfaction" },
              { number: "30days", label: "Implementation Time" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 400 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-8 opacity-80 text-sm max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            Our demo showcases real healthcare scenarios with actual data workflows. 
            See exactly how MINDSPIRE's SPIREHEALTH will transform your facility's operations.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}