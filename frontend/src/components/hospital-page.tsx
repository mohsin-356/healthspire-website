import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  Shield, 
  Database,
  Receipt,
  UserCheck,
  Stethoscope,
  DollarSign,
  TrendingUp,
  Network,
  Clock,
  BarChart3,
  UserCog,
  CheckCircle,
  Star,
  MessageCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const hospitalFeatures = {
  basic: {
    title: "Basic Package",
    price: "Starting from $299/month",
    description: "Essential hospital management features for small clinics and practices",
    features: [
      { icon: Users, name: "OPD Management", description: "Outpatient department operations and patient flow management" },
      { icon: Database, name: "Data Backup", description: "Automated daily backups with cloud storage integration" },
      { icon: UserCheck, name: "Receptionist Module", description: "Front desk operations and patient check-in management" },
      { icon: Receipt, name: "Token Generation", description: "Digital queue management and appointment tokens" },
      { icon: FileText, name: "Report Management", description: "Generate and manage patient reports and medical documents" },
      { icon: Stethoscope, name: "Manual Prescription", description: "Doctor prescription management and medication tracking" },
      { icon: Activity, name: "Patient Medical History", description: "Comprehensive patient records and medical history tracking" },
      { icon: DollarSign, name: "Doctor Salary Management", description: "Basic payroll processing for medical staff" }
    ]
  },
  pro: {
    title: "Pro Package",
    price: "Starting from $599/month",
    description: "Advanced features for medium to large hospitals with comprehensive management needs",
    badge: "Most Popular",
    features: [
      { icon: CheckCircle, name: "All Basic Features", description: "Complete access to all basic package functionality" },
      { icon: DollarSign, name: "Advanced Salary Management", description: "Comprehensive payroll with tax calculations and benefits" },
      { icon: TrendingUp, name: "Expenses Tracking", description: "Detailed expense management and financial reporting" },
      { icon: Building2, name: "IPD Management", description: "Inpatient department with bed management and ward operations" },
      { icon: Network, name: "Multi-location Networking", description: "Connect multiple hospital branches and facilities" },
      { icon: Clock, name: "Staff Attendance", description: "Biometric integration and automated attendance tracking" },
      { icon: UserCog, name: "Complete Staff Management", description: "HR operations, staff scheduling, and performance tracking" },
      { icon: BarChart3, name: "Doctor Performance Analytics", description: "Revenue tracking and performance insights per doctor" },
      { icon: Receipt, name: "Total Finance Management", description: "Complete financial operations and accounting integration" }
    ]
  },
  advanced: {
    title: "Advanced Package",
    price: "Starting from $999/month",
    description: "Enterprise-level solution with complete healthcare ecosystem integration",
    badge: "Enterprise",
    features: [
      { icon: CheckCircle, name: "All Pro Features", description: "Full access to professional package capabilities" },
      { icon: Users, name: "Multi-Panel System", description: "Different user roles and access panels for various departments" },
      { icon: Activity, name: "Integrated Laboratory", description: "Complete lab management with test processing and results" },
      { icon: Receipt, name: "Pharmacy Integration", description: "Full pharmacy operations with inventory and prescription management" },
      { icon: Network, name: "Advanced Networking", description: "Enterprise-grade multi-location and partner hospital connectivity" },
      { icon: TrendingUp, name: "Advanced Finance System", description: "Enterprise accounting with advanced reporting and analytics" },
      { icon: Shield, name: "Enhanced Security", description: "Advanced data protection and compliance management" },
      { icon: BarChart3, name: "Business Intelligence", description: "Advanced analytics and predictive insights dashboard" }
    ]
  }
};

export function HospitalPage() {
  const createWhatsAppLink = (packageName: string) => {
    const message = encodeURIComponent(
      `Hello! I'm interested in the ${packageName} package for Hospital Management System. Could you please provide more details about pricing and implementation?`
    );
    return `https://wa.me/923296273720?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Building2 className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Hospital Management System
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Comprehensive hospital operations platform designed to streamline patient care, 
            optimize workflows, and enhance clinical outcomes across all departments. Choose the perfect package for your hospital's needs.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              "Complete OPD/IPD Management",
              "Advanced Analytics",
              "Multi-location Support",
              "24/7 Customer Support"
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-purple-700 font-medium text-sm">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(hospitalFeatures).map(([key, pkg], packageIndex) => (
            <motion.div
              key={key}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: packageIndex * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className={`relative overflow-hidden h-full bg-white/80 backdrop-blur-sm border-2 shadow-xl ${
                key === 'pro' ? 'border-purple-400 shadow-purple-200' : 'border-purple-200'
              }`}>
                {pkg.badge && (
                  <motion.div
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: packageIndex * 0.2 + 0.5 }}
                  >
                    {pkg.badge}
                  </motion.div>
                )}
                
                <div className="p-8">
                  <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: packageIndex * 0.2 + 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">{pkg.title}</h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-3">
                      {pkg.price}
                    </p>
                    <p className="text-gray-600">{pkg.description}</p>
                  </motion.div>

                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, index) => (
                      <motion.div
                        key={feature.name}
                        className="flex items-start space-x-3 group/feature"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: packageIndex * 0.2 + 0.4 + index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/feature:bg-purple-200 transition-colors">
                          <feature.icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{feature.name}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        key === 'pro'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg'
                          : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
                      }`}
                      onClick={() => window.open(createWhatsAppLink(pkg.title), '_blank')}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get {pkg.title} Package
                    </Button>
                  </motion.div>
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Benefits Section */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
              Why Choose Our Hospital Management System?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your healthcare facility with cutting-edge technology and proven workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "98% Efficiency Increase",
                description: "Streamlined operations reduce manual tasks and improve productivity"
              },
              {
                icon: Shield,
                title: "HIPAA Compliant",
                description: "Enterprise-grade security ensuring complete patient data protection"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock technical support and system monitoring"
              },
              {
                icon: Users,
                title: "500+ Hospitals Trust Us",
                description: "Proven track record across healthcare facilities worldwide"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-purple-800 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            Ready to Transform Your Hospital?
          </motion.h3>
          <motion.p 
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Join hundreds of hospitals worldwide that trust HEALTHSPIRE for their operations. 
            Get started with a personalized consultation today.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl"
                onClick={() => window.open(createWhatsAppLink('Hospital Management System'), '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Free Consultation
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl"
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