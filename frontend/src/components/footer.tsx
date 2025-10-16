import healthspireLogo from 'figma:asset/570ed307bc17bb23be4b32f2a57f0495c36cccf1.png';

export function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={healthspireLogo} 
                alt="Healthspire Logo" 
                className="h-12 w-auto"
              />
              <div>
                <div className="font-bold text-lg">HEALTHSPIRE</div>
                <div className="text-sm text-muted-foreground">A MINDSPIRE Solution</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Advanced healthcare management systems designed to transform patient care and operational efficiency across hospitals, pharmacies, and laboratories.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Powered by</span>
              <a href="https://mindspire.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                MINDSPIRE.ORG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/hospital" className="hover:text-foreground transition-colors">Hospital Management</a></li>
              <li><a href="/pharmacy" className="hover:text-foreground transition-colors">Pharmacy Systems</a></li>
              <li><a href="/labs" className="hover:text-foreground transition-colors">Laboratory Management</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="https://mindspire.org" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><span>24/7 Support</span></li>
              <li><span>Training Resources</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 MINDSPIRE. All rights reserved. HEALTHSPIRE is a trademark of MINDSPIRE.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="https://mindspire.org/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="https://mindspire.org/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="https://mindspire.org" className="hover:text-foreground transition-colors">About MINDSPIRE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}