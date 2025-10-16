import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Package,
  Database,
  MessageCircle,
  CheckCircle,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

// Removed Overview dashboard image references


const pricingTiers = [
  {
    key: 'starter',
    title: 'Starter',
    price: 'PKR 19k',
    note: 'One-time license fee',
    featured: false,
    items: [
      'Sales and POS',
      'Inventory and expiry alerts',
      'Basic reporting',
      'Single branch'
    ]
  },
  {
    key: 'pro',
    title: 'Professional',
    price: 'PKR 59k',
    note: 'One-time license fee',
    featured: true,
    items: [
      'Everything in Starter',
      'Advanced analytics dashboards',
      'Multi-branch support',
      'Daily email reports'
    ]
  },
  {
    key: 'enterprise',
    title: 'Enterprise',
    price: 'PKR 39k',
    note: 'Custom deployment',
    featured: false,
    items: [
      'Everything in Professional',
      'Custom modules',
      'Dedicated support',
      'Onâ€‘prem or cloud'
    ]
  }
];

 export function PharmacyPage() {
  // Feature item extracted to avoid any stray text nodes rendering in the grid
  const FeatureItem: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
    <div
      className="flex items-center justify-between rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-4 py-4 md:px-5 md:py-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="pr-3">
        <div className="text-sm md:text-base font-semibold text-gray-900">{title}</div>
        <div className="mt-1 text-xs md:text-sm text-gray-500">{desc}</div>
      </div>
      <div className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl border border-blue-200 bg-white text-blue-600">
        <Database className="w-4 h-4" />
      </div>
    </div>
  );
   // Reusable See More button with reliable hover via inline styles (works even with precompiled CSS)
  const SeeMoreBtn: React.FC<{ whiteText?: boolean; onClick?: () => void; label?: string }>
    = ({ whiteText = false, onClick, label = 'See more' }) => {
     const [hover, setHover] = React.useState(false);
     const baseClass = 'w-full mt-2 mb-3 h-12 rounded-full border-2 font-semibold text-sm md:text-base shadow-sm';
     const style: React.CSSProperties = {
       borderColor: whiteText ? 'rgba(255,255,255,0.7)' : '#2563eb',
      color: hover ? '#ffffff' : (whiteText ? '#ffffff' : '#2563eb'),
       backgroundColor: hover ? '#2563eb' : 'transparent',
       transition: 'background-color 200ms ease, color 200ms ease, box-shadow 200ms ease',
       boxShadow: hover ? '0 6px 14px rgba(37, 99, 235, 0.25)' : '0 1px 2px rgba(0,0,0,0.06)'
     };
     return (
      <button
        type="button"
        className={baseClass}
        style={style}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {label} <span className="ml-1">â€º</span>
      </button>
    );
  };
  
  // Outline CTA button for hero with guaranteed hover using inline styles
  const CtaOutlineBtn: React.FC<{ onClick?: () => void; href?: string; children: React.ReactNode }>
    = ({ onClick, href, children }) => {
      const [hover, setHover] = React.useState(false);
      const style: React.CSSProperties = {
        backgroundColor: hover ? '#2563eb' : 'transparent',
        color: hover ? '#ffffff' : '#2563eb',
        border: '2px solid #2563eb',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 200ms ease',
        boxShadow: hover ? '0 10px 20px rgba(37,99,235,0.25)' : '0 1px 2px rgba(0,0,0,0.06)'
      };
      const btn = (
        <button
          type="button"
          className="rounded-full px-6 py-3 text-sm md:text-base font-semibold"
          style={style}
          onClick={onClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {children}
        </button>
      );
      return href ? <a href={href}>{btn}</a> : btn;
    };
  
  // Core features content (two balanced columns, no character illustration)
  const coreFeatures = {
    left: [
      { title: 'Inventory Management', desc: 'Track 50K+ medicines, expiry alerts, stock value.' },
      { title: 'Prescription Management', desc: 'Digital prescriptions for customers.' },
      { title: 'POS (Point of Sale)', desc: 'Fast billing, cash/credit sales, receipts.' },
      { title: 'Tax Modules', desc: 'Auto GST/VAT reports.' },
      { title: 'Staff Attendance', desc: 'Payroll & attendance tracking.' },
      { title: 'Analytics & Reports', desc: 'View through visual charts & graphs.' },
    ],
    right: [
      { title: 'Settings', desc: 'Customize software preferences.' },
      { title: 'User Management', desc: 'Roles like Admin, cashier, Manager.' },
      { title: 'Expense Management', desc: 'Rent, utilities, inventory costs.' },
      { title: 'Audit Logs', desc: 'Track all user actions for security.' },
      { title: 'Supplier Management', desc: 'Control suppliers, purchases & companies.' },
      { title: 'Customer Management', desc: 'Manage cash & credit customers.' },
    ],
  };
  
  // Expand/collapse state and additional feature list for Basic plan card
  const [expandedBasic, setExpandedBasic] = React.useState(false);
  const starterMoreFeatures: string[] = [
    'Advanced Dashboard',
    'Point of Sale System',
    'Inventory Management',
    'Comprehensive Reports',
    'User Management',
  ];
   const createWhatsAppLink = (context: string) => {
     const message = encodeURIComponent(
       `Hello! I'm interested in the ${context} for the Pharmacy Management Software. Please share pricing and implementation details.`
     );
     return `https://wa.me/923296273720?text=${message}`;
   };
   return (
     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white pt-24">
       <div className="max-w-7xl mx-auto px-6 py-12">
         {/* Hero */}
         <motion.section
          className="relative text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-black tracking-tight text-gray-900 leading-tight"
            style={{ fontWeight: 700, fontSize: 'clamp(2.25rem, 5.2vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Smart Pharmacy <span className="text-blue-600">Management</span>
            <br />
            Software
          </h1>
          <h2 className="mt-4 text-5xl md:text-6xl font-black tracking-tight text-gray-900">All in one place</h2>

          <div className="mt-8 flex items-center justify-center gap-4">
            <CtaOutlineBtn onClick={() => window.open(createWhatsAppLink('Demo Booking'), '_blank')}>
              Book a Demo
            </CtaOutlineBtn>
            <CtaOutlineBtn href="#features">Explore Features</CtaOutlineBtn>
          </div>

          <p className="mt-2 md:mt-3 text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
            Streamline inventory, customers, analytics, and POS â€” all in one modern, secure platform.
          </p>

        </motion.section>
        
        {/* Core Features */}
        <section id="features" className="mb-16">
          <div className="text-center mb-0 pb-8 md:pb-10">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900">
              Core Features
            </h3>
            <div className="mt-6 md:mt-8 mb-8 md:mb-10 flex justify-center">
              <span className="h-1 w-24 rounded-full bg-blue-500" />
            </div>
            <p className="mt-0 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              Designed for pharmacies of all sizes, PharmaCare helps you run operations efficiently with modern tools that are secure, scalable, and easy to use.
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto mt-8 md:mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[coreFeatures.left, coreFeatures.right].map((list, idx) => (
              <div key={idx} className="space-y-3 md:space-y-4">
                {list.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: idx === 0 ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, delay: (idx === 0 ? 0.1 : 0.3) + i * 0.15, ease: 'easeOut' }}
                    className="feature-item flex items-center justify-between rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-3 py-2 md:px-3 md:py-2.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="pr-3">
                      <div className="text-sm md:text-base font-semibold text-gray-900">{item.title}</div>
                      <div className="mt-1 text-xs md:text-sm text-gray-500">{item.desc}</div>
                    </div>
                    <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-xl border border-blue-200 bg-white text-blue-600">
                      <Database className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
            </div>
          </div>
        </section>

         {/* Pricing */}
        <section id="pricing" className="mb-16">
          <div className="text-center mb-3">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900">Pricing</h3>
          </div>
          <p className="text-center text-sm text-gray-500 mb-8">Simple, transparent plans to fit your pharmacy.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => {
              const displayTitle = tier.key === 'starter' ? 'Basic Package' : tier.key === 'pro' ? 'Professional' : 'Advanced Package';
              // NOTE: We avoid Tailwind arbitrary color classes here because the project ships a precompiled CSS.
              // Use inline style for the featured gradient to ensure it renders.
              const featuredStyle: React.CSSProperties | undefined = tier.featured
                ? { background: 'linear-gradient(180deg, #0b2c6f 0%, #1e3a8a 55%, #2563eb 100%)' }
                : undefined;
              const cardClasses = tier.featured
                ? 'text-white border border-white/10 ring-1 ring-blue-400/30 shadow-[0_10px_30px_rgba(37,99,235,0.25)] overflow-hidden'
                : 'bg-gradient-to-b from-blue-100 to-blue-300 text-slate-800 border border-blue-200';
              const priceColor = tier.featured ? 'text-white' : 'text-blue-800';
              const noteColor = tier.featured ? 'text-white/90' : 'text-blue-900/60';
              const checkColor = tier.featured ? 'text-white' : 'text-blue-700';
              // See more button now uses SeeMoreBtn component for consistent hover behavior
              const getPlanBtn = tier.featured
                ? 'w-full h-11 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-semibold transition-all duration-200 hover:shadow-md'
                : 'w-full h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-200 hover:shadow-md';
              return (
                <Card key={tier.key} className={`relative rounded-3xl p-6 md:p-8 ${cardClasses}`} style={featuredStyle}>
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className={`text-lg font-bold ${tier.featured ? 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]' : 'text-blue-900'}`}>{displayTitle}</div>
                      <div className={`text-xs ${noteColor} mt-1 ${tier.featured ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]' : ''}`}>Vital tools for streamlined healthcare management</div>
                    </div>
                    <div className="mb-4">
                      <div className={`text-4xl md:text-5xl font-black ${priceColor} ${tier.featured ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]' : ''}`}>{tier.price}</div>
                      <div className={`text-xs mt-1 ${noteColor}`}>Lifetime</div>
                    </div>
                    <div className={`h-px ${tier.featured ? 'bg-white/30' : 'bg-blue-200/60'} my-3`} />
                    <ul className="space-y-3 text-sm flex-1">
                      {tier.items.map((it) => (
                        <li key={it} className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${checkColor}`} />
                          <span className={tier.featured ? 'text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]' : 'text-blue-900/90'}>{it}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.key === 'starter' && (
                      <AnimatePresence initial={false}>
                        {expandedBasic && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="mt-4 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {starterMoreFeatures.map((title) => (
                                <div
                                  key={title}
                                  className={`flex items-start gap-3 rounded-xl border ${tier.featured ? 'border-white/20 bg-white/10' : 'border-blue-200 bg-white'} p-3`}
                                >
                                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${tier.featured ? 'border-white/50 text-white' : 'border-blue-300 text-blue-600'}`}>
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  </div>
                                  <div>
                                    <div className={`text-sm font-semibold ${tier.featured ? 'text-white' : 'text-gray-900'}`}>{title}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                    <div className="mt-6">
                      <SeeMoreBtn
                        whiteText={tier.key === 'pro'}
                        onClick={tier.key === 'starter' ? () => setExpandedBasic((v) => !v) : undefined}
                        label={tier.key === 'starter' ? (expandedBasic ? 'Show less' : 'See more') : 'See more'}
                      />
                      <Button
                        className={getPlanBtn}
                        onClick={() => window.open(createWhatsAppLink(`${displayTitle} (${tier.price})`), '_blank')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Get Plan
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Value Highlights */}
        <section id="highlights" className="mt-12 md:mt-16 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl border border-blue-200/60 bg-gradient-to-r from-blue-50 to-white shadow-[0_8px_20px_rgba(37,99,235,0.08)] px-4 py-4 md:px-6 md:py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 rounded-full border border-blue-200 bg-white text-blue-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-gray-900">Quality of Products</div>
                    <div className="text-xs text-gray-500">By MindSpire</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 rounded-full border border-blue-200 bg-white text-blue-600 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-gray-900">International Support</div>
                    <div className="text-xs text-gray-500">Countries supports</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 rounded-full border border-blue-200 bg-white text-blue-600 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-gray-900">100% Satisfied</div>
                    <div className="text-xs text-gray-500">Satisfied users</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 rounded-full border border-blue-200 bg-white text-blue-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-gray-900">Time Savings</div>
                    <div className="text-xs text-gray-500">By automating system</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* Contact */}
         <section id="contact" className="mb-16">
           <div className="text-center mb-6">
             <h3 className="text-2xl md:text-3xl font-black text-gray-900">Contact Us</h3>
             <p className="text-sm text-gray-500">Weâ€™ll reach out with a personalized demo.</p>
           </div>
           <Card className="max-w-7xl mx-auto p-8 md:p-10">
             <form
               onSubmit={(e) => {
                 e.preventDefault();
                 window.open(createWhatsAppLink('Demo Request'), '_blank');
               }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl"
             >
               <div>
                 <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="mt-1 h-12 text-lg" />
               </div>
               <div>
                 <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+92 3xx xxx xxxx" required className="mt-1 h-12 text-lg" />
               </div>
               <div className="md:col-span-2">
                 <Label htmlFor="message">Message</Label>
                 <Textarea id="message" placeholder="Tell us about your requirements" className="mt-1 h-48 text-lg" rows={6} />
               </div>
               <div className="md:col-span-2">
                 <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white">
                  Request Demo on WhatsApp
                </Button>
               </div>
             </form>
           </Card>
         </section>
        <section className="mb-8">
          <Card className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Brand */}
              <div>
                <div className="text-2xl font-extrabold tracking-tight mb-3">
                  <span className="text-gray-900">Pharma</span>
                  <span className="text-blue-600">Care</span>
                </div>
                <p className="text-sm text-gray-600 max-w-xs">
                  Modern, secure, and scalable software for pharmacies of every size.
                </p>
              </div>
              {/* Quick Links */}
              <div>
                <div className="font-semibold mb-3 text-gray-900">Quick Links</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a className="hover:text-blue-700" href="#features">Features</a></li>
                  <li><a className="hover:text-blue-700" href="#pricing">Pricing</a></li>
                  <li><a className="hover:text-blue-700" href="#about">About</a></li>
                  <li><a className="hover:text-blue-700" href="#contact">Contact</a></li>
                </ul>
              </div>
              {/* Resources */}
              <div>
                <div className="font-semibold mb-3 text-gray-900">Resources</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a className="hover:text-blue-700" href="#privacy">Privacy Policy</a></li>
                  <li><a className="hover:text-blue-700" href="#terms">Terms of Service</a></li>
                  <li><a className="hover:text-blue-700" href="#support">Support</a></li>
                  <li><a className="hover:text-blue-700" href="#docs">Documentation</a></li>
                </ul>
              </div>
              {/* Contact */}
              <div>
                <div className="font-semibold mb-3 text-gray-900">Contact</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <div className="text-gray-800">Email</div>
                    <a className="text-blue-700 hover:underline" href="mailto:support@pharmacare.com">support@pharmacare.com</a>
                  </div>
                  <div>
                    <div className="text-gray-800">Phone</div>
                    <a className="text-blue-700" href="tel:+1234567890">+1 (234) 567-890</a>
                  </div>
                  <div>
                    <div className="text-gray-800">Address</div>
                    <div>123 Greenway, suite 200, Silicon Valley, CA</div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-9 h-9 rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-100">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-blue-200 my-6" />
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <div>Â© 2025 PharmaCare. All rights reserved.</div>
              <div className="flex items-center gap-4">
                <a href="#privacy" className="hover:text-blue-700">Privacy</a>
                <span className="text-blue-200">|</span>
                <a href="#terms" className="hover:text-blue-700">Terms</a>
                <span className="text-blue-200">|</span>
                <a href="#support" className="hover:text-blue-700">Support</a>
              </div>
            </div>
          </Card>
        </section>
       </div>
     </div>
   );
 }











