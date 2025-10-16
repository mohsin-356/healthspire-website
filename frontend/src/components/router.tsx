import React from 'react';
import { HospitalPage } from './hospital-page';
import { PharmacyPage } from './pharmacy-page';
import { LabsPage } from './labs-page';
import { Footer } from './footer';
import { useNavigation } from './navigation-context';
import { AdminDashboard } from './admin/AdminDashboard';
import { LoginPage } from './admin/LoginPage';
import { useAuth } from '../auth/auth-context';

// Main homepage components
import { HeroSection } from './hero-section';
import { SpecificationsSection } from './specifications-section';
import { FeaturesShowcase } from './features-showcase';
import { AboutMindspireSection } from './about-mindspire-section';
import { TeamSection } from './team-section';
import { ClientsSection } from './clients-section';
import { TestimonialsSection } from './testimonials-section';
import { ContactSection } from './contact-section';
import { BlogPage } from './blog-page';
import { BlogDetailPage } from './blog-detail-page';

function HomePage() {
  return (
    <>
      <div className="relative z-10">
        <HeroSection />
        <SpecificationsSection />
        <FeaturesShowcase />
        <AboutMindspireSection />
        <TeamSection />
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}

export function Router() {
  const { currentPath } = useNavigation();
  const { role } = useAuth();

  React.useEffect(() => {
    let page = 'Home';
    switch (currentPath) {
      case '/admin':
        page = 'Admin';
        break;
      case '/blog':
        page = 'Blog';
        break;
      case '/hospital':
        page = 'Hospital';
        break;
      case '/pharmacy':
        page = 'Pharmacy';
        break;
      case '/labs':
        page = 'Labs';
        break;
      default:
        page = 'Home';
    }
    document.title = `${page} | Healthspire`;
  }, [currentPath]);

  if (currentPath.startsWith('/blog/') && currentPath !== '/blog') {
    return <BlogDetailPage />;
  }
  switch (currentPath) {
    case '/admin':
      return (role === 'admin' || role === 'demo') ? <AdminDashboard /> : <LoginPage />;
    case '/blog':
      return <BlogPage />;
    case '/hospital':
      return <HospitalPage />;
    case '/pharmacy':
      return <PharmacyPage />;
    case '/labs':
      return <LabsPage />;
    default:
      return <HomePage />;
  }
}