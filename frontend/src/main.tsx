import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//n8n webhook production url : https://salbutamol.app.n8n.cloud/webhook/chat-webhook

// Resolve favicon URL via Vite's URL handling to avoid TS image module typing issues
const faviconUrl = new URL('./assets/570ed307bc17bb23be4b32f2a57f0495c36cccf1.png', import.meta.url).href;

// Ensure favicon is set dynamically (works in dev and build)
const ensureFavicon = () => {
  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/png';
  link.href = faviconUrl;
};

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);