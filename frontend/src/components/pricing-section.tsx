import { motion } from 'motion/react';
import { Check, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';

const pricingPlans = [
  {
    name: "Clinic",
    price: 199,
    period: "month",
    description: "Perfect for small clinics and practices",
    features: [
      "Up to 10 healthcare providers",
      "Basic EMR system",
      "Appointment scheduling",
      "Patient portal",
      "Email support",
      "HIPAA compliance"
    ],
    popular: false,
    gradient: "from-muted to-muted/50"
  },
  {
    name: "Hospital",
    price: 799,
    period: "month",
    description: "Comprehensive solution for hospitals",
    features: [
      "Unlimited healthcare providers",
      "Full EMR & EHR system",
      "Pharmacy management",
      "Laboratory integration",
      "Real-time analytics",
      "24/7 priority support",
      "Custom integrations",
      "Bed management system"
    ],
    popular: true,
    gradient: "from-primary to-primary/80"
  },
  {
    name: "Healthcare Network",
    price: 1999,
    period: "month",
    description: "For large healthcare organizations",
    features: [
      "Multi-facility management",
      "Advanced analytics suite",
      "AI-powered insights",
      "Custom workflow automation",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label options",
      "Advanced reporting",
      "Regulatory compliance tools"
    ],
    popular: false,
    gradient: "from-accent to-accent/60"
  }
];

export function PricingSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-4 font-semibold">Choose Your Plan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scalable healthcare software solutions tailored to your facility's needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative group"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                rotateY: plan.popular ? 0 : 3,
                rotateX: 2,
                scale: plan.popular ? 1.02 : 1.05
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                >
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Most Popular</span>
                  </div>
                </motion.div>
              )}

              <motion.div
                className={`relative p-8 rounded-3xl border-2 overflow-hidden ${
                  plan.popular 
                    ? 'border-primary bg-card shadow-2xl' 
                    : 'border-border bg-card shadow-lg hover:shadow-xl'
                } ${plan.popular ? 'lg:scale-105' : ''}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10`}
                  transition={{ duration: 0.3 }}
                />

                {/* 3D depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-3xl transform translate-x-1 translate-y-1 -z-10" />

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-5xl">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </motion.div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                      Get Started
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating pricing elements */}
        <motion.div
          className="absolute top-20 left-20 w-24 h-24 bg-primary/10 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}