import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/auth-context';
import { contentApi } from '../services/api';
import {
  // Import all types from the original content store
  ContentState,
  Specification,
  Feature,
  Achievement,
  ValueItem,
  TeamMember,
  Testimonial,
  Client,
  Blog,
  AboutData,
  defaultContent
} from './content-store';

interface ContentContextType {
  data: ContentState;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  reset: () => Promise<boolean>;
  
  // CRUD helpers per collection
  addSpecification: (item: Omit<Specification, 'id'>) => Promise<boolean>;
  updateSpecification: (id: string, patch: Partial<Specification>) => Promise<boolean>;
  deleteSpecification: (id: string) => Promise<boolean>;

  addFeature: (item: Omit<Feature, 'id'>) => Promise<boolean>;
  updateFeature: (id: string, patch: Partial<Feature>) => Promise<boolean>;
  deleteFeature: (id: string) => Promise<boolean>;

  updateAbout: (patch: Partial<AboutData>) => Promise<boolean>;
  addAchievement: (item: Omit<Achievement, 'id'>) => Promise<boolean>;
  updateAchievement: (id: string, patch: Partial<Achievement>) => Promise<boolean>;
  deleteAchievement: (id: string) => Promise<boolean>;
  addValue: (item: Omit<ValueItem, 'id'>) => Promise<boolean>;
  updateValue: (id: string, patch: Partial<ValueItem>) => Promise<boolean>;
  deleteValue: (id: string) => Promise<boolean>;

  addTeamMember: (item: Omit<TeamMember, 'id'>) => Promise<boolean>;
  updateTeamMember: (id: string, patch: Partial<TeamMember>) => Promise<boolean>;
  deleteTeamMember: (id: string) => Promise<boolean>;

  addTestimonial: (item: Omit<Testimonial, 'id'>) => Promise<boolean>;
  updateTestimonial: (id: string, patch: Partial<Testimonial>) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  
  addClient: (item: Omit<Client, 'id'>) => Promise<boolean>;
  updateClient: (id: string, patch: Partial<Client>) => Promise<boolean>;
  deleteClient: (id: string) => Promise<boolean>;
  
  addBlog: (item: Omit<Blog, 'id'>) => Promise<boolean>;
  updateBlog: (id: string, patch: Partial<Blog>) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentStoreApiProvider({ children }: { children?: React.ReactNode }) {
  const [data, setData] = useState<ContentState>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { role } = useAuth();
  const canEdit = role === 'admin';

  // Load content from API on mount
  const loadContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await contentApi.getContent();
      
      if (response.success && response.data) {
        // Transform backend data to match frontend structure
        const backendData = response.data;
        const transformedData: ContentState = {
          specifications: backendData.specifications || [],
          features: backendData.features || [],
          about: backendData.about || defaultContent.about,
          team: backendData.team || [],
          testimonials: backendData.testimonials || [],
          clients: backendData.clients || [],
          blogs: backendData.blogs || []
        };
        
        setData(transformedData);
      } else {
        console.error('Failed to load content:', response.message);
        setError(response.message || 'Failed to load content');
        // Fallback to default content
        setData(defaultContent);
      }
    } catch (error) {
      console.error('Content loading error:', error);
      setError('Network error while loading content');
      // Fallback to default content
      setData(defaultContent);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Helper function to handle API operations
  const handleApiOperation = async (
    operation: () => Promise<any>,
    successMessage?: string
  ): Promise<boolean> => {
    if (!canEdit) {
      console.warn('Operation not allowed: insufficient permissions');
      return false;
    }

    try {
      const response = await operation();
      
      if (response.success) {
        // Refresh content after successful operation
        await loadContent();
        if (successMessage) {
          console.log(successMessage);
        }
        return true;
      } else {
        console.error('Operation failed:', response.message);
        setError(response.message || 'Operation failed');
        return false;
      }
    } catch (error) {
      console.error('API operation error:', error);
      setError(error instanceof Error ? error.message : 'Network error');
      return false;
    }
  };

  const api = useMemo<ContentContextType>(() => ({
    data,
    isLoading,
    error,
    refresh: loadContent,
    reset: () => handleApiOperation(
      () => contentApi.resetContent(),
      'Content reset to defaults'
    ),

    // Specifications
    addSpecification: (item) => handleApiOperation(
      () => contentApi.addSpecification(item),
      'Specification added successfully'
    ),
    updateSpecification: (id, patch) => handleApiOperation(
      () => contentApi.updateSpecification(id, patch),
      'Specification updated successfully'
    ),
    deleteSpecification: (id) => handleApiOperation(
      () => contentApi.deleteSpecification(id),
      'Specification deleted successfully'
    ),

    // Features
    addFeature: (item) => handleApiOperation(
      () => contentApi.addFeature(item),
      'Feature added successfully'
    ),
    updateFeature: (id, patch) => handleApiOperation(
      () => contentApi.updateFeature(id, patch),
      'Feature updated successfully'
    ),
    deleteFeature: (id) => handleApiOperation(
      () => contentApi.deleteFeature(id),
      'Feature deleted successfully'
    ),

    // About
    updateAbout: (patch) => handleApiOperation(
      () => contentApi.updateAbout(patch),
      'About section updated successfully'
    ),

    // Achievements
    addAchievement: (item) => handleApiOperation(
      () => contentApi.addAchievement(item),
      'Achievement added successfully'
    ),
    updateAchievement: (id, patch) => handleApiOperation(
      () => contentApi.updateAchievement(id, patch),
      'Achievement updated successfully'
    ),
    deleteAchievement: (id) => handleApiOperation(
      () => contentApi.deleteAchievement(id),
      'Achievement deleted successfully'
    ),

    // Values
    addValue: (item) => handleApiOperation(
      () => contentApi.addValue(item),
      'Value added successfully'
    ),
    updateValue: (id, patch) => handleApiOperation(
      () => contentApi.updateValue(id, patch),
      'Value updated successfully'
    ),
    deleteValue: (id) => handleApiOperation(
      () => contentApi.deleteValue(id),
      'Value deleted successfully'
    ),

    // Team
    addTeamMember: (item) => handleApiOperation(
      () => contentApi.addTeamMember(item),
      'Team member added successfully'
    ),
    updateTeamMember: (id, patch) => handleApiOperation(
      () => contentApi.updateTeamMember(id, patch),
      'Team member updated successfully'
    ),
    deleteTeamMember: (id) => handleApiOperation(
      () => contentApi.deleteTeamMember(id),
      'Team member deleted successfully'
    ),

    // Testimonials
    addTestimonial: (item) => handleApiOperation(
      () => contentApi.addTestimonial(item),
      'Testimonial added successfully'
    ),
    updateTestimonial: (id, patch) => handleApiOperation(
      () => contentApi.updateTestimonial(id, patch),
      'Testimonial updated successfully'
    ),
    deleteTestimonial: (id) => handleApiOperation(
      () => contentApi.deleteTestimonial(id),
      'Testimonial deleted successfully'
    ),

    // Clients
    addClient: (item) => handleApiOperation(
      () => contentApi.addClient(item),
      'Client added successfully'
    ),
    updateClient: (id, patch) => handleApiOperation(
      () => contentApi.updateClient(id, patch),
      'Client updated successfully'
    ),
    deleteClient: (id) => handleApiOperation(
      () => contentApi.deleteClient(id),
      'Client deleted successfully'
    ),

    // Blogs
    addBlog: (item) => handleApiOperation(
      () => contentApi.addBlog(item),
      'Blog added successfully'
    ),
    updateBlog: (id, patch) => handleApiOperation(
      () => contentApi.updateBlog(id, patch),
      'Blog updated successfully'
    ),
    deleteBlog: (id) => handleApiOperation(
      () => contentApi.deleteBlog(id),
      'Blog deleted successfully'
    ),
  }), [data, isLoading, error, canEdit]);

  return React.createElement(ContentContext.Provider, { value: api }, children);
}

export function useContentStoreApi() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentStoreApi must be used within ContentStoreApiProvider');
  return ctx;
}
