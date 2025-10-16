import { motion } from 'motion/react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useContentStore, getIcon } from '../store/content-store';

export function AboutMindspireSection() {
  const { data } = useContentStore();
  const about = data.about;
  const achievements = about.achievements;
  const values = about.values;
  return (
    <section id="about" className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-4 font-semibold">{about.heading}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{about.subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-border h-full">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-primary-foreground">M</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">MINDSPIRE</h3>
                  <p className="text-muted-foreground">Healthcare Technology Leaders</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded with a mission to revolutionize healthcare through technology, MINDSPIRE has been 
                at the forefront of healthcare innovation for over 15 years. Our comprehensive suite of 
                solutions serves healthcare providers worldwide, improving patient outcomes and operational efficiency.
              </p>

              <div className="space-y-4">
                {[
                  "Comprehensive Healthcare Solutions",
                  "Global Healthcare Technology Leader",
                  "Proven Track Record of Success",
                  "Continuous Innovation & Research"
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full border-primary/20 hover:bg-primary/5"
                  onClick={() => window.open(about.ctaUrl, '_blank')}
                >
                  {about.ctaText}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-6 h-full">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="bg-card rounded-2xl border border-border p-6 text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    {(() => { const Icon = getIcon(achievement.icon); return <Icon className="w-6 h-6 text-primary"/>; })()}
                  </motion.div>
                  
                  <div className="text-2xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <h4 className="font-medium mb-2">{achievement.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-12">Our Core Values</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {(() => { const Icon = getIcon(value.icon); return <Icon className="w-8 h-8 text-primary"/>; })()}
                </motion.div>
                
                <h4 className="text-lg font-medium mb-4">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Innovation Focus */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-primary to-accent rounded-3xl p-8 text-primary-foreground text-center overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-semibold mb-4">Innovation Never Stops</h3>
            <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
              At MINDSPIRE, we're constantly pushing the boundaries of what's possible in healthcare technology. 
              SPIREHEALTH represents the latest in our commitment to delivering world-class healthcare solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "R&D Investment", value: "30%" },
                { title: "Patents Filed", value: "200+" },
                { title: "Innovation Labs", value: "5" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 400 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}