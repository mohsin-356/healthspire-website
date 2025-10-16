import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  TestTube, 
  FileBarChart, 
  Clock, 
  Shield, 
  Zap,
  Search,
  Users,
  Receipt,
  TrendingUp,
  Database,
  Settings,
  BarChart3,
  ClipboardList,
  MessageCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

  const labFeatures = {
    basic: {
      title: "Complete Lab Package",
      price: "PKR 49,000 (lifetime)",
      description: "Comprehensive laboratory management system with all essential features for modern labs",
      features: [
      { icon: TestTube, name: "Sample Management", description: "Complete sample lifecycle tracking from collection to disposal with barcode integration" },
      { icon: Search, name: "Advanced Sample Tracking", description: "Real-time sample location tracking with status updates and chain of custody" },
      { icon: Users, name: "Patient Record Management", description: "Comprehensive patient database with medical history and test records" },
      { icon: FileBarChart, name: "Comprehensive Reports", description: "Automated report generation with customizable templates and formats" },
      { icon: ClipboardList, name: "20+ Report Templates", description: "Pre-built professional report templates for various test types" },
      { icon: Receipt, name: "Token Generation System", description: "Digital queue management and patient appointment scheduling" },
      { icon: TrendingUp, name: "Finance Management", description: "Complete billing, invoicing, and payment tracking system" },
      { icon: BarChart3, name: "Advanced Analytics", description: "Business intelligence with performance metrics and trend analysis" },
      { icon: Database, name: "Automated Backup System", description: "Daily automated backups with cloud storage and disaster recovery" },
      { icon: Settings, name: "Advanced Settings", description: "Customizable system configuration and user preference management" }
    ]
  }
};

export function LabsPage() {
  const createWhatsAppLink = (packageName: string) => {
    const message = encodeURIComponent(
      `Hello! I'm interested in the Laboratory Management System. Could you please provide more details about pricing and implementation?`
    );
    return `https://wa.me/923296273720?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-300 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-white to-gray-100 rounded-3xl flex items-center justify-center shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Activity className="w-12 h-12 text-gray-700" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold mb-4 text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Laboratory Information Management
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-200 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Comprehensive laboratory management system designed to optimize sample tracking, 
            test processing, and results delivery for enhanced diagnostic workflows. Complete solution for modern laboratories.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              "Complete Sample Tracking",
              "20+ Report Templates", 
              "Advanced Analytics",
              "Automated Backup System"
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white font-medium text-sm">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Package Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <Card className="relative overflow-hidden bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl">
              <motion.div
                className="absolute -top-3 -right-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 }}
              >
                Complete Solution
              </motion.div>
              
              <div className="p-8">
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{labFeatures.basic.title}</h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-4">
                    {labFeatures.basic.price}
                  </p>
                  <p className="text-gray-600 text-lg">{labFeatures.basic.description}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {labFeatures.basic.features.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      className="flex items-start space-x-3 group/feature p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/feature:bg-gray-200 transition-colors">
                        <feature.icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">{feature.name}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold px-12 py-4 rounded-xl shadow-lg text-lg"
                    onClick={() => window.open(createWhatsAppLink(labFeatures.basic.title), '_blank')}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Get Complete Lab Package
                  </Button>
                </motion.div>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent pointer-events-none" />
            </Card>
          </motion.div>
        </div>

        {/* Key Features Grid */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
              Advanced Laboratory Management Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Streamline your laboratory operations with cutting-edge technology and comprehensive workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TestTube,
                title: "Sample Processing",
                description: "Complete sample lifecycle management from collection to result delivery with quality control"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Live dashboards with KPIs, turnaround times, and performance metrics"
              },
              {
                icon: Shield,
                title: "Quality Assurance", 
                description: "Built-in QC protocols with audit trails and compliance management"
              },
              {
                icon: Zap,
                title: "Instrument Integration",
                description: "Seamless connectivity with laboratory instruments and automated data capture"
              },
              {
                icon: Clock,
                title: "Turnaround Optimization",
                description: "Automated workflow optimization to minimize processing time"
              },
              {
                icon: Database,
                title: "Secure Data Storage",
                description: "HIPAA-compliant data storage with encryption and backup systems"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group p-6 rounded-xl hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
              Why Choose Our Laboratory Management System?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "90% Faster Processing",
                description: "Automated workflows reduce manual tasks and processing time"
              },
              {
                icon: Shield,
                title: "100% Compliance Ready",
                description: "Built-in compliance with laboratory standards and regulations"
              },
              {
                icon: Clock,
                title: "24/7 System Monitoring",
                description: "Continuous system monitoring with instant alerts and support"
              },
              {
                icon: Users,
                title: "300+ Labs Worldwide",
                description: "Trusted by laboratories across different specialties globally"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-white/95 backdrop-blur-sm text-gray-900 rounded-3xl p-12 shadow-2xl border border-white/50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            Transform Your Laboratory Operations
          </motion.h3>
          <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            Join hundreds of laboratories worldwide that trust HEALTHSPIRE for their operations. 
            Enhance efficiency, accuracy, and patient satisfaction with our comprehensive LIMS.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold px-8 py-4 rounded-xl shadow-lg"
                onClick={() => window.open(createWhatsAppLink('Laboratory Management System'), '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Free Consultation
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-700 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl"
                onClick={() => window.open('tel:+923296273720', '_self')}
              >
                📞 Call: +92 329 6273720
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}