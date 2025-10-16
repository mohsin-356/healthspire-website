import React from 'react';
import { Navigation } from './components/navigation';
import { Router } from './components/router';
import { FloatingElements } from './components/floating-elements';
import { NavigationProvider } from './components/navigation-context';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';
import { ContentStoreProvider } from './store/content-store';
import { AuthProvider } from './auth/auth-context';

export default function App() {
  return (
    <AuthProvider>
      <ContentStoreProvider>
        <NavigationProvider>
          <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Background floating elements */}
            <FloatingElements />
            
            {/* Navigation */}
            <Navigation />
            
            {/* Main content */}
            <Router />

            {/* Chatbot floating widget */}
            <ChatbotWidget />
          </div>
        </NavigationProvider>
      </ContentStoreProvider>
    </AuthProvider>
  );
}