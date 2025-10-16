import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Bell, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Stethoscope,
  Activity,
  Building2,
  Briefcase,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { useState } from 'react';

const appointmentTypes = [
  { name: "Consultation", color: "bg-blue-500", duration: "30min" },
  { name: "Surgery", color: "bg-indigo-500", duration: "2h" },
  { name: "Follow-up", color: "bg-cyan-500", duration: "15min" },
  { name: "Emergency", color: "bg-red-500", duration: "45min" },
  { name: "Lab Work", color: "bg-purple-500", duration: "20min" },
  { name: "Therapy", color: "bg-teal-500", duration: "1h" }
];

const mockAppointments = [
  { id: 1, time: "09:00", patient: "John Smith", type: "Consultation", doctor: "Dr. Chen", room: "Room 101", status: "confirmed" },
  { id: 2, time: "09:30", patient: "Sarah Johnson", type: "Follow-up", doctor: "Dr. Park", room: "Room 102", status: "confirmed" },
  { id: 3, time: "10:00", patient: "Mike Davis", type: "Surgery", doctor: "Dr. Watson", room: "OR 1", status: "in-progress" },
  { id: 4, time: "11:00", patient: "Emma Wilson", type: "Lab Work", doctor: "Lab Tech", room: "Lab A", status: "pending" },
  { id: 5, time: "11:30", patient: "David Brown", type: "Emergency", doctor: "Dr. Rodriguez", room: "ER", status: "urgent" },
  { id: 6, time: "14:00", patient: "Lisa Garcia", type: "Therapy", doctor: "Dr. Kim", room: "PT Room", status: "confirmed" },
];

const resources = [
  { id: 1, name: "Dr. Sarah Chen", type: "doctor", specialty: "Cardiology", availability: "Available" },
  { id: 2, name: "Dr. Emily Park", type: "doctor", specialty: "Pediatrics", availability: "Busy" },
  { id: 3, name: "Room 101", type: "room", capacity: "1 patient", availability: "Available" },
  { id: 4, name: "OR 1", type: "room", capacity: "Surgery", availability: "Occupied" },
  { id: 5, name: "MRI Scanner", type: "equipment", status: "Operational", availability: "Available" },
  { id: 6, name: "Lab Station A", type: "equipment", status: "Calibrated", availability: "Available" }
];

export function SchedulingShowcase() {
  const [currentView, setCurrentView] = useState('day');
  const [selectedDate, setSelectedDate] = useState('March 15, 2024');
  const [showForm, setShowForm] = useState(false);
  const [showDemoOptions, setShowDemoOptions] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    organization: '',
    isBusinessOwner: false,
    designation: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDemoOptions(true);
  };

  const demoOptions = [
    {
      title: "Hospital Management",
      description: "Complete hospital operations, patient management, and clinical workflows",
      icon: Building2,
      link: "/hospital",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Pharmacy Systems",
      description: "Inventory management, prescription processing, and retail operations",
      icon: Plus,
      link: "/pharmacy", 
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Laboratory Management",
      description: "Sample tracking, test management, and results processing",
      icon: Activity,
      link: "/labs",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-4 font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Intelligent Scheduling System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered scheduling that optimizes healthcare workflows, reduces wait times, and maximizes resource utilization with real-time conflict detection and automated optimization.
          </p>
        </motion.div>

        {/* Contact Form Section */}
        {!showDemoOptions && (
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">Get Started with SPIREHEALTH</h3>
                <p className="opacity-90">Tell us about your organization to receive a personalized demo</p>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="name" className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-600" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="city" className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                        City *
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Your city"
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="organization" className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                      Organization Name *
                    </Label>
                    <Input
                      id="organization"
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                      placeholder="Your healthcare organization"
                    />
                  </motion.div>

                  <motion.div 
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="businessOwner" className="flex items-center cursor-pointer">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                      Are you a business owner?
                    </Label>
                    <Switch
                      id="businessOwner"
                      checked={formData.isBusinessOwner}
                      onCheckedChange={(checked) => setFormData({...formData, isBusinessOwner: checked})}
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="designation" className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      Current Designation *
                    </Label>
                    <Input
                      id="designation"
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                      placeholder="e.g., Chief Medical Officer, IT Director, Administrator"
                    />
                  </motion.div>

                  <motion.div
                    className="pt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg"
                    >
                      Request Demo
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* Demo Options */}
        {showDemoOptions && (
          <motion.div
            className="max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4">Choose Your Demo Experience</h3>
              <p className="text-muted-foreground">
                Select the healthcare solution that best matches your organization's needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {demoOptions.map((option, index) => (
                <motion.a
                  key={option.title}
                  href={option.link}
                  className="group block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {option.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      {option.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      <span>Explore Demo</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="outline" 
                onClick={() => setShowDemoOptions(false)}
                className="border-blue-200 hover:bg-blue-50"
              >
                Back to Form
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Interactive Calendar Demo */}
        <motion.div
          className="bg-white rounded-3xl border border-blue-100 shadow-xl overflow-hidden mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Calendar Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Scheduling Dashboard</h3>
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Filter className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </motion.div>
                <span className="text-lg font-medium">{selectedDate}</span>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
              
              <div className="flex space-x-2">
                {['day', 'week', 'month'].map((view) => (
                  <motion.div key={view} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant={currentView === view ? "secondary" : "ghost"}
                      className={currentView === view ? "bg-white/30 text-white" : "text-white/80 hover:bg-white/20"}
                      onClick={() => setCurrentView(view)}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Calendar/Schedule View */}
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>Time</span>
                    <span>Appointments</span>
                  </div>
                  
                  {mockAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      className="group flex items-center space-x-4 p-4 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-all cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.01, x: 5 }}
                    >
                      <div className="text-sm font-medium text-blue-600 min-w-[60px]">
                        {appointment.time}
                      </div>
                      
                      <div className="flex-1 flex items-center space-x-3">
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${appointmentTypes.find(t => t.name === appointment.type)?.color || 'bg-gray-400'}`}
                          whileHover={{ scale: 1.2 }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{appointment.patient}</span>
                            <Badge variant="outline" className="text-xs border-blue-200">
                              {appointment.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.doctor} • {appointment.room}
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`w-2 h-2 rounded-full ${
                            appointment.status === 'confirmed' ? 'bg-green-500' :
                            appointment.status === 'in-progress' ? 'bg-blue-500' :
                            appointment.status === 'urgent' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Resource Panel */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center text-blue-700">
                    <Users className="w-4 h-4 mr-2" />
                    Resources
                  </h4>
                  <div className="space-y-3">
                    {resources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        className="flex items-center justify-between p-3 bg-blue-50/30 rounded-lg hover:bg-blue-50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            resource.type === 'doctor' ? 'bg-blue-100' :
                            resource.type === 'room' ? 'bg-green-100' :
                            'bg-purple-100'
                          }`}>
                            {resource.type === 'doctor' ? <User className="w-4 h-4 text-blue-600" /> :
                             resource.type === 'room' ? <MapPin className="w-4 h-4 text-green-600" /> :
                             <Activity className="w-4 h-4 text-purple-600" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{resource.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {resource.specialty || resource.capacity || resource.status}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={resource.availability === 'Available' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            resource.availability === 'Available' ? 'bg-green-100 text-green-700 border-green-200' :
                            resource.availability === 'Busy' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            'bg-red-100 text-red-700 border-red-200'
                          }`}
                        >
                          {resource.availability}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Appointment Types Legend */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center text-blue-700">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Appointment Types
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {appointmentTypes.map((type, index) => (
                      <motion.div
                        key={type.name}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${type.color}`}
                          whileHover={{ scale: 1.2 }}
                        />
                        <div>
                          <div className="text-xs font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.duration}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Search,
              title: "Smart Search",
              description: "Find available slots instantly with AI-powered search",
              stat: "< 3 seconds",
              color: "bg-blue-500"
            },
            {
              icon: AlertCircle,
              title: "Conflict Detection",
              description: "Automatic detection and resolution of scheduling conflicts",
              stat: "99.9% accuracy",
              color: "bg-indigo-500"
            },
            {
              icon: Clock,
              title: "Wait List Management",
              description: "Intelligent waitlist with automatic slot filling",
              stat: "40% faster",
              color: "bg-cyan-500"
            },
            {
              icon: CheckCircle,
              title: "No-Show Prediction",
              description: "AI predicts and prevents no-shows with targeted reminders",
              stat: "65% reduction",
              color: "bg-emerald-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {feature.description}
              </p>
              <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience the power of intelligent scheduling. See how MINDSPIRE's SPIREHEALTH platform can transform your appointment management and improve patient satisfaction.
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'View Dashboard' : 'Try Interactive Demo'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}