import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
const healthspireLogo = new URL('../assets/570ed307bc17bb23be4b32f2a57f0495c36cccf1.png', import.meta.url).href;
import { useNavigation } from './navigation-context';

export function Navigation() {
  const { navigate } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  // Hover intent handling: keep dropdown open when moving from trigger to panel
  const closeTimer = useRef<number | null>(null);
  const openProducts = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setShowProductsDropdown(true);
  };
  const closeProductsDelayed = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setShowProductsDropdown(false), 250);
  };

  const navItems = [
    { label: "Solutions", href: "#solutions" },
    { label: "Features", href: "#features" },
    { label: "About MINDSPIRE", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  const productItems = [
    { label: "Hospital", href: "https://hospital.healthspire.org", description: "Complete hospital management system" },
    { label: "Pharmacy", href: "https://pharmacy.healthspire.org", description: "Advanced pharmacy operations platform" },
    { label: "Labs", href: "/labs", description: "Laboratory information management system" }
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => navigate('/')}
          >
            <img 
              src={healthspireLogo} 
              alt="Healthspire Logo" 
              className="h-10 w-auto"
            />
            <div>
              <span className="font-bold text-xl">HEALTHSPIRE</span>
              <div className="text-xs text-muted-foreground">by MINDSPIRE</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative">
              <motion.button
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors relative"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                onMouseEnter={openProducts}
                onMouseLeave={closeProductsDelayed}
                onFocus={openProducts}
                onBlur={closeProductsDelayed}
              >
                <span>Products</span>
                <motion.div
                  animate={{ rotate: showProductsDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 origin-left"
                  animate={{ scaleX: showProductsDropdown ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Dropdown Menu */}
              <motion.div
                className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ 
                  opacity: showProductsDropdown ? 1 : 0,
                  y: showProductsDropdown ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: showProductsDropdown ? 'auto' : 'none' }}
                onMouseEnter={openProducts}
                onMouseLeave={closeProductsDelayed}
              >
                <div className="p-2">
                  {productItems.map((product, index) => (
                    <motion.div
                      key={product.label}
                      className="flex flex-col p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: showProductsDropdown ? 1 : 0, x: showProductsDropdown ? 0 : -10 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        window.location.assign(product.href);
                      }}
                    >
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.label}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {product.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 origin-left"
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <motion.button
              className="text-muted-foreground hover:text-foreground transition-colors relative"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate('/blog')}
            >
              Blog
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 origin-left"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+92 329 6273720</span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Demo
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="py-6 space-y-4">
            {/* Mobile Products Menu */}
            <div className="space-y-2">
              <div className="text-muted-foreground font-medium">Products</div>
              {productItems.map((product) => (
                <motion.div
                  key={product.label}
                  className="block pl-4 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    window.location.assign(product.href);
                  }}
                >
                  {product.label}
                </motion.div>
              ))}
            </div>
            
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 10 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              className="block text-left text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ x: 10 }}
              onClick={() => { navigate('/blog'); setIsMenuOpen(false); }}
            >
              Blog
            </motion.button>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                <Phone className="w-4 h-4" />
                <span>+92 329 6273720</span>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Get Demo
              </Button>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}