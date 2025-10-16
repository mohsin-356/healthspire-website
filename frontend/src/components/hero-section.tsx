import { motion } from 'motion/react';
import { Heart, Shield, Activity } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl"
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.3)"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg"
        animate={{
          x: [0, 30, 0],
          rotateX: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.25)"
        }}
      />

      <motion.div
        className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl"
        animate={{
          y: [0, 25, 0],
          rotateZ: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 30px 60px -12px rgba(99, 102, 241, 0.3)"
        }}
      />

      {/* Main Content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-lg text-muted-foreground">Powered by MINDSPIRE</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-bold">
            HEALTHSPIRE
          </h1>
        </motion.div>
        
        <motion.p
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Comprehensive healthcare software solutions for hospitals, pharmacies, 
          and laboratories. Built by MINDSPIRE to streamline operations with secure, scalable technology.
        </motion.p>

        <motion.div
          className="flex justify-center gap-8 mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {[
            { icon: Heart, label: "Patient-Centered" },
            { icon: Shield, label: "HIPAA Compliant" },
            { icon: Activity, label: "Real-Time Monitoring" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-3 backdrop-blur-sm border border-blue-200">
                <item.icon className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>
    </div>
  );
}