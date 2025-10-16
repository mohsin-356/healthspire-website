// API Configuration and Base Service
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: 'admin' | 'demo';
    lastLogin: string;
  };
}

// Token management
class TokenManager {
  private static readonly TOKEN_KEY = 'healthspire_auth_token';

  static getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch {
      return null;
    }
  }

  static setToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  }

  static removeToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  static getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Base API class with common functionality
class BaseApi {
  protected async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...TokenManager.getAuthHeaders(),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          TokenManager.removeToken();
          window.location.href = '/admin'; // Redirect to login
        }
        
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  protected async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  protected async post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Authentication API
export class AuthApi extends BaseApi {
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.post<AuthResponse>('/auth/login', { email, password });
    
    if (response.success && response.data?.token) {
      TokenManager.setToken(response.data.token);
    }
    
    return response;
  }

  async loginDemo(): Promise<ApiResponse<AuthResponse>> {
    const response = await this.post<AuthResponse>('/auth/demo');
    
    if (response.success && response.data?.token) {
      TokenManager.setToken(response.data.token);
    }
    
    return response;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.post('/auth/logout');
    TokenManager.removeToken();
    return response;
  }

  async verify(): Promise<ApiResponse<{ user: AuthResponse['user'] }>> {
    return this.get('/auth/verify');
  }

  async getProfile(): Promise<ApiResponse<{ user: AuthResponse['user'] }>> {
    return this.get('/auth/profile');
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return this.post('/auth/change-password', { currentPassword, newPassword });
  }
}

// Content API
export class ContentApi extends BaseApi {
  // Get all content
  async getContent(): Promise<ApiResponse> {
    return this.get('/content');
  }

  async getBlogs(): Promise<ApiResponse> {
    return this.get('/content/blogs');
  }

  async getBlogBySlug(slug: string): Promise<ApiResponse> {
    return this.get(`/content/blogs/${slug}`);
  }

  // Specifications
  async addSpecification(data: any): Promise<ApiResponse> {
    return this.post('/content/specifications', data);
  }

  async updateSpecification(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/specifications/${id}`, data);
  }

  async deleteSpecification(id: string): Promise<ApiResponse> {
    return this.delete(`/content/specifications/${id}`);
  }

  // Features
  async addFeature(data: any): Promise<ApiResponse> {
    return this.post('/content/features', data);
  }

  async updateFeature(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/features/${id}`, data);
  }

  async deleteFeature(id: string): Promise<ApiResponse> {
    return this.delete(`/content/features/${id}`);
  }

  // About
  async updateAbout(data: any): Promise<ApiResponse> {
    return this.put('/content/about', data);
  }

  // Achievements
  async addAchievement(data: any): Promise<ApiResponse> {
    return this.post('/content/achievements', data);
  }

  async updateAchievement(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/achievements/${id}`, data);
  }

  async deleteAchievement(id: string): Promise<ApiResponse> {
    return this.delete(`/content/achievements/${id}`);
  }

  // Values
  async addValue(data: any): Promise<ApiResponse> {
    return this.post('/content/values', data);
  }

  async updateValue(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/values/${id}`, data);
  }

  async deleteValue(id: string): Promise<ApiResponse> {
    return this.delete(`/content/values/${id}`);
  }

  // Team
  async addTeamMember(data: any): Promise<ApiResponse> {
    return this.post('/content/team', data);
  }

  async updateTeamMember(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/team/${id}`, data);
  }

  async deleteTeamMember(id: string): Promise<ApiResponse> {
    return this.delete(`/content/team/${id}`);
  }

  // Clients
  async addClient(data: any): Promise<ApiResponse> {
    return this.post('/content/clients', data);
  }

  async updateClient(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/clients/${id}`, data);
  }

  async deleteClient(id: string): Promise<ApiResponse> {
    return this.delete(`/content/clients/${id}`);
  }

  // Blogs
  async addBlog(data: any): Promise<ApiResponse> {
    return this.post('/content/blogs', data);
  }

  async updateBlog(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/blogs/${id}`, data);
  }

  async deleteBlog(id: string): Promise<ApiResponse> {
    return this.delete(`/content/blogs/${id}`);
  }

  // Testimonials
  async addTestimonial(data: any): Promise<ApiResponse> {
    return this.post('/content/testimonials', data);
  }

  async updateTestimonial(id: string, data: any): Promise<ApiResponse> {
    return this.put(`/content/testimonials/${id}`, data);
  }

  async deleteTestimonial(id: string): Promise<ApiResponse> {
    return this.delete(`/content/testimonials/${id}`);
  }

  // Reset
  async resetContent(): Promise<ApiResponse> {
    return this.post('/content/reset');
  }
}

// Dashboard API
export class DashboardApi extends BaseApi {
  async getStats(): Promise<ApiResponse> {
    return this.get('/dashboard/stats');
  }

  async getContent(): Promise<ApiResponse> {
    return this.get('/dashboard/content');
  }

  async getRecentActivity(): Promise<ApiResponse> {
    return this.get('/dashboard/recent-activity');
  }

  async getSystemInfo(): Promise<ApiResponse> {
    return this.get('/dashboard/system-info');
  }

  async createBackup(): Promise<ApiResponse> {
    return this.get('/dashboard/backup');
  }

  async restoreBackup(backup: any): Promise<ApiResponse> {
    return this.post('/dashboard/restore', { backup });
  }
}

// Export API instances
export const authApi = new AuthApi();
export const contentApi = new ContentApi();
export const dashboardApi = new DashboardApi();

// Export token manager for direct access
export { TokenManager };
