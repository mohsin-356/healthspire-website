import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/auth-context';
import {
  // Specs
  Hospital, Pill, FlaskConical, Shield as ShieldIcon, BarChart3, UserCheck,
  // Features
  Stethoscope, MessageCircle, FileText, TrendingUp, Clock, Shield, Smartphone, Database,
  // About/Values/Achievements
  Users, Globe, Award, Target, TrendingUp as TrendingUpIcon, Heart,
} from 'lucide-react';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api';

export type IconName =
  | 'Hospital' | 'Pill' | 'FlaskConical' | 'Shield' | 'BarChart3' | 'UserCheck'
  | 'Stethoscope' | 'MessageCircle' | 'FileText' | 'TrendingUp' | 'Clock' | 'Smartphone' | 'Database'
  | 'Users' | 'Globe' | 'Award' | 'Target' | 'TrendingUpIcon' | 'Heart';

export const Icons: Record<IconName, React.ComponentType<any>> = {
  // Specs
  Hospital, Pill, FlaskConical, Shield: ShieldIcon, BarChart3, UserCheck,
  // Features
  Stethoscope, MessageCircle, FileText, TrendingUp, Clock, Smartphone, Database,
  // About/Values/Achievements
  Users, Globe, Award, Target, TrendingUpIcon, Heart,
};

export function getIcon(name: IconName) {
  return Icons[name] || ShieldIcon;
}

// Types
export interface Specification { id: string; icon: IconName; title: string; description: string; stats: string; }
export interface Feature { id: string; icon: IconName; title: string; description: string; benefits: string[]; }
export interface Achievement { id: string; icon: IconName; number: string; label: string; description: string; }
export interface ValueItem { id: string; icon: IconName; title: string; description: string; }
export interface TeamMember { id: string; name: string; role: string; img: string; }
export interface Testimonial { id: string; name: string; title: string; organization: string; content: string; rating: number; avatar: string; }
export interface Client { id: string; name: string; img: string; }
export interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImg?: string;
  contentHtml: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface AboutData {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaUrl: string;
  achievements: Achievement[];
  values: ValueItem[];
}

export interface ContentState {
  specifications: Specification[];
  features: Feature[];
  about: AboutData;
  team: TeamMember[];
  testimonials: Testimonial[];
  clients: Client[];
  blogs: Blog[];
}

// API helpers
async function apiFetch<T>(path: string, opts: RequestInit = {}, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    ...(opts.headers as any),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store', ...opts, headers });
  if (res.status === 304) {
    // Avoid throwing on 304; return an empty compatible value
    // Caller typically expects array or object; we try JSON but if empty, fallback
    try { return (await res.json()) as T; } catch { return ([] as unknown) as T; }
  }
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} failed (${res.status})`);
  return res.json();
}

interface ContentContextType {
  data: ContentState;
  setData: React.Dispatch<React.SetStateAction<ContentState>>;
  reset: () => void;
  uploadImage: (file: File) => Promise<string>;
  // CRUD helpers per collection
  addSpecification: (item: Omit<Specification, 'id'>) => void;
  updateSpecification: (id: string, patch: Partial<Specification>) => void;
  deleteSpecification: (id: string) => void;

  addFeature: (item: Omit<Feature, 'id'>) => void;
  updateFeature: (id: string, patch: Partial<Feature>) => void;
  deleteFeature: (id: string) => void;

  updateAbout: (patch: Partial<AboutData>) => void;
  addAchievement: (item: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, patch: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  addValue: (item: Omit<ValueItem, 'id'>) => void;
  updateValue: (id: string, patch: Partial<ValueItem>) => void;
  deleteValue: (id: string) => void;

  addTeamMember: (item: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, patch: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  addTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, patch: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  // Clients
  addClient: (item: Omit<Client, 'id'>) => void;
  updateClient: (id: string, patch: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  // Blogs
  addBlog: (item: Omit<Blog, 'id'>) => void;
  updateBlog: (id: string, patch: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentStoreProvider({ children }: { children?: React.ReactNode }) {
  const [data, setData] = useState<ContentState>({
    specifications: [],
    features: [],
    about: { heading: '', subheading: '', ctaText: '', ctaUrl: '', achievements: [], values: [] },
    team: [],
    testimonials: [],
    clients: [],
    blogs: [],
  });
  const { role, token } = useAuth();
  const canEdit = role === 'admin';

  // Map Mongo docs (_id) to UI shape (id)
  const mapId = <T extends { _id?: string }>(doc: T): any => ({ id: (doc as any)._id, ...doc, _id: undefined });

  // Initial load
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [specs, feats, aboutDoc, achs, vals, team, tests, clients, blogs] = await Promise.all([
          apiFetch<any[]>('/specifications'),
          apiFetch<any[]>('/features'),
          apiFetch<any>('/about'),
          apiFetch<any[]>('/achievements'),
          apiFetch<any[]>('/values'),
          apiFetch<any[]>('/team'),
          apiFetch<any[]>('/testimonials'),
          apiFetch<any[]>('/clients'),
          apiFetch<any[]>('/blogs'),
        ]);
        if (!alive) return;
        setData({
          specifications: specs.map(mapId),
          features: feats.map(mapId),
          about: {
            heading: aboutDoc.heading || '',
            subheading: aboutDoc.subheading || '',
            ctaText: aboutDoc.ctaText || '',
            ctaUrl: aboutDoc.ctaUrl || '',
            achievements: achs.map(mapId),
            values: vals.map(mapId),
          },
          team: team.map(mapId),
          testimonials: tests.map(mapId),
          clients: clients.map(mapId),
          blogs: (blogs || []).map(mapId),
        });
      } catch (e) {
        console.error('Content load failed', e);
      }
    })();
    return () => { alive = false; };
  }, []);

  const api = useMemo<ContentContextType>(() => ({
    data,
    setData,
    reset: () => {
      if (!canEdit) return;
      apiFetch('/settings/reset', { method: 'POST' }, token).then(() => {
        // re-load
        (async () => {
          const [specs, feats, aboutDoc, achs, vals, team, tests, clients, blogs] = await Promise.all([
            apiFetch<any[]>('/specifications'),
            apiFetch<any[]>('/features'),
            apiFetch<any>('/about'),
            apiFetch<any[]>('/achievements'),
            apiFetch<any[]>('/values'),
            apiFetch<any[]>('/team'),
            apiFetch<any[]>('/testimonials'),
            apiFetch<any[]>('/clients'),
            apiFetch<any[]>('/blogs'),
          ]);
          setData({
            specifications: specs.map(mapId),
            features: feats.map(mapId),
            about: { heading: aboutDoc.heading || '', subheading: aboutDoc.subheading || '', ctaText: aboutDoc.ctaText || '', ctaUrl: aboutDoc.ctaUrl || '', achievements: achs.map(mapId), values: vals.map(mapId) },
            team: team.map(mapId),
            testimonials: tests.map(mapId),
            clients: clients.map(mapId),
            blogs: (blogs || []).map(mapId),
          });
        })().catch(console.error);
      }).catch(console.error);
    },
    uploadImage: async (file: File) => {
      const fd = new FormData();
      fd.append('file', file);
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(`${API_BASE}/uploads`, { method: 'POST', headers, body: fd, cache: 'no-store' });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url as string;
    },

    addSpecification: (item) => { if (!canEdit) return; apiFetch<any>('/specifications', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, specifications: [...s.specifications, mapId(doc)] }))).catch(console.error); },
    updateSpecification: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/specifications/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, specifications: s.specifications.map(x => x.id === id ? mapId(doc) : x) }))).catch(console.error); },
    deleteSpecification: (id) => { if (!canEdit) return; apiFetch(`/specifications/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, specifications: s.specifications.filter(x => x.id !== id) }))).catch(console.error); },

    addFeature: (item) => { if (!canEdit) return; apiFetch<any>('/features', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, features: [...s.features, mapId(doc)] }))).catch(console.error); },
    updateFeature: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/features/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, features: s.features.map(x => x.id === id ? mapId(doc) : x) }))).catch(console.error); },
    deleteFeature: (id) => { if (!canEdit) return; apiFetch(`/features/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, features: s.features.filter(x => x.id !== id) }))).catch(console.error); },

    updateAbout: (patch) => { if (!canEdit) return; apiFetch<any>('/about', { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, about: { ...s.about, heading: doc.heading || '', subheading: doc.subheading || '', ctaText: doc.ctaText || '', ctaUrl: doc.ctaUrl || '' } }))).catch(console.error); },
    addAchievement: (item) => { if (!canEdit) return; apiFetch<any>('/achievements', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, about: { ...s.about, achievements: [...s.about.achievements, mapId(doc)] } }))).catch(console.error); },
    updateAchievement: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/achievements/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, about: { ...s.about, achievements: s.about.achievements.map(x => x.id === id ? mapId(doc) : x) } }))).catch(console.error); },
    deleteAchievement: (id) => { if (!canEdit) return; apiFetch(`/achievements/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, about: { ...s.about, achievements: s.about.achievements.filter(x => x.id !== id) } }))).catch(console.error); },
    addValue: (item) => { if (!canEdit) return; apiFetch<any>('/values', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, about: { ...s.about, values: [...s.about.values, mapId(doc)] } }))).catch(console.error); },
    updateValue: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/values/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, about: { ...s.about, values: s.about.values.map(x => x.id === id ? mapId(doc) : x) } }))).catch(console.error); },
    deleteValue: (id) => { if (!canEdit) return; apiFetch(`/values/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, about: { ...s.about, values: s.about.values.filter(x => x.id !== id) } }))).catch(console.error); },

    addTeamMember: (item) => { if (!canEdit) return; apiFetch<any>('/team', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, team: [...s.team, mapId(doc)] }))).catch(console.error); },
    updateTeamMember: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/team/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, team: s.team.map(x => x.id === id ? mapId(doc) : x) }))).catch(console.error); },
    deleteTeamMember: (id) => { if (!canEdit) return; apiFetch(`/team/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, team: s.team.filter(x => x.id !== id) }))).catch(console.error); },

    addTestimonial: (item) => { if (!canEdit) return; apiFetch<any>('/testimonials', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, testimonials: [...s.testimonials, mapId(doc)] }))).catch(console.error); },
    updateTestimonial: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/testimonials/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, testimonials: s.testimonials.map(x => x.id === id ? mapId(doc) : x) }))).catch(console.error); },
    deleteTestimonial: (id) => { if (!canEdit) return; apiFetch(`/testimonials/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, testimonials: s.testimonials.filter(x => x.id !== id) }))).catch(console.error); },
    addClient: (item) => { if (!canEdit) return; apiFetch<any>('/clients', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, clients: [...s.clients, mapId(doc)] }))).catch(console.error); },
    updateClient: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/clients/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, clients: s.clients.map(x => x.id === id ? mapId(doc) : x) }))).catch(console.error); },
    deleteClient: (id) => { if (!canEdit) return; apiFetch(`/clients/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, clients: s.clients.filter(x => x.id !== id) }))).catch(console.error); },
    addBlog: (item) => { if (!canEdit) return; apiFetch<any>('/blogs', { method: 'POST', body: JSON.stringify(item) }, token).then(doc => setData(s => ({ ...s, blogs: [...(s.blogs||[]), mapId(doc)] }))).catch(console.error); },
    updateBlog: (id, patch) => { if (!canEdit) return; apiFetch<any>(`/blogs/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }, token).then(doc => setData(s => ({ ...s, blogs: (s.blogs||[]).map(x => x.id === id ? mapId(doc) : x) }))).catch(console.error); },
    deleteBlog: (id) => { if (!canEdit) return; apiFetch(`/blogs/${id}`, { method: 'DELETE' }, token).then(() => setData(s => ({ ...s, blogs: (s.blogs||[]).filter(x => x.id !== id) }))).catch(console.error); },
  }), [data, canEdit, token]);

  return React.createElement(ContentContext.Provider, { value: api }, children);
}

export function useContentStore() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentStore must be used within ContentStoreProvider');
  return ctx;
}
