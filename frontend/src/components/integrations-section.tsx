import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Database, 
  TestTube, 
  Search,
  Pill,
  Plus,
  Stethoscope,
  Activity,
  Users,
  Cloud,
  Shield,
  Video
} from 'lucide-react';

const integrations = [
  {
    name: "Epic Systems",
    description: "Seamless integration with Epic EHR",
    icon: FileText,
    category: "EHR"
  },
  {
    name: "Cerner",
    description: "Real-time data sync with Cerner",
    icon: Database,
    category: "EHR"
  },
  {
    name: "LabCorp",
    description: "Direct lab result integration",
    icon: TestTube,
    category: "Laboratory"
  },
  {
    name: "Quest Diagnostics",
    description: "Automated lab order management",
    icon: Search,
    category: "Laboratory"
  },
  {
    name: "McKesson",
    description: "Pharmacy supply chain integration",
    icon: Pill,
    category: "Pharmacy"
  },
  {
    name: "CVS Health",
    description: "Prescription management sync",
    icon: Plus,
    category: "Pharmacy"
  },
  {
    name: "Philips Healthcare",
    description: "Medical device connectivity",
    icon: Stethoscope,
    category: "Devices"
  },
  {
    name: "GE Healthcare",
    description: "Imaging and monitoring integration",
    icon: Activity,
    category: "Devices"
  },
  {
    name: "Salesforce Health Cloud",
    description: "CRM and patient engagement",
    icon: Users,
    category: "CRM"
  },
  {
    name: "Microsoft Azure",
    description: "Cloud infrastructure support",
    icon: Cloud,
    category: "Cloud"
  },
  {
    name: "AWS Health",
    description: "Secure cloud hosting",
    icon: Shield,
    category: "Cloud"
  },
  {
    name: "Zoom for Healthcare",
    description: "Telemedicine integration",
    icon: Video,
    category: "Telehealth"
  }
];

const categories = [
  { name: "EHR", color: "from-blue-500 to-blue-600" },
  { name: "Laboratory", color: "from-blue-400 to-blue-500" },
  { name: "Pharmacy", color: "from-blue-600 to-blue-700" },
  { name: "Devices", color: "from-blue-300 to-blue-400" },
  { name: "CRM", color: "from-blue-700 to-blue-800" },
  { name: "Cloud", color: "from-blue-800 to-blue-900" },
  { name: "Telehealth", color: "from-blue-400 to-blue-600" }
];

export function IntegrationsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-4 font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Seamless Integrations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with your existing healthcare ecosystem. HEALTHSPIRE integrates with over 200+ healthcare platforms and systems.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white text-sm cursor-pointer`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 400 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {integrations.map((integration, index) => {
            const categoryColor = categories.find(cat => cat.name === integration.category)?.color || "from-blue-500 to-blue-600";
            
            return (
              <motion.div
                key={integration.name}
                className="group relative"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  scale: 1.05
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative p-6 bg-card rounded-2xl border border-border shadow-lg overflow-hidden h-full text-center"
                  whileHover={{
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColor}`} />

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${categoryColor} flex items-center justify-center`}
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <integration.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Integration name */}
                  <h3 className="text-sm font-medium mb-2">{integration.name}</h3>
                  
                  {/* Description */}
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {integration.description}
                  </p>

                  {/* Category badge */}
                  <motion.div
                    className="inline-block px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                  >
                    {integration.category}
                  </motion.div>

                  {/* 3D shadow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-2xl transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}