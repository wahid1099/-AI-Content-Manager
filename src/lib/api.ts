import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Social Media OAuth APIs
export const socialAuthAPI = {
  // Get OAuth authorization URL
  getAuthUrl: async (platform: string) => {
    const response = await apiClient.get(`/social/auth/${platform}`);
    return response.data;
  },

  // Get all connected accounts
  getConnectedAccounts: async () => {
    const response = await apiClient.get('/social/accounts');
    return response.data;
  },

  // Disconnect account
  disconnectAccount: async (platform: string) => {
    const response = await apiClient.delete(`/social/accounts/${platform}`);
    return response.data;
  },

  // Check account health
  checkAccountHealth: async (platform: string) => {
    const response = await apiClient.get(`/social/accounts/${platform}/health`);
    return response.data;
  },

  // Refresh account data
  refreshAccountData: async (platform: string) => {
    const response = await apiClient.post(`/social/accounts/${platform}/refresh`);
    return response.data;
  },
};

// Insights & Analytics APIs
export const insightsAPI = {
  // Get post insights
  getPostInsights: async (postId: string, platform: string, platformPostId: string) => {
    const response = await apiClient.get(`/insights/post/${postId}`, {
      params: { platform, platformPostId },
    });
    return response.data;
  },

  // Analyze sentiment
  analyzeSentiment: async (postId: string, platform: string, platformPostId: string) => {
    const response = await apiClient.post(`/insights/sentiment/${postId}`, {
      platform,
      platformPostId,
    });
    return response.data;
  },

  // Get aggregated insights
  getAggregatedInsights: async () => {
    const response = await apiClient.get('/insights/aggregated');
    return response.data;
  },
};

// Post Publishing & Scheduling APIs
export const postAPI = {
  // Generate post (existing)
  generatePost: async (data: any) => {
    const response = await apiClient.post('/social-posts/generate', data);
    return response.data;
  },

  // Get user posts (existing)
  getUserPosts: async () => {
    const response = await apiClient.get('/social-posts/my-posts');
    return response.data;
  },

  // Get scheduled posts
  getScheduledPosts: async () => {
    const response = await apiClient.get('/social-posts/scheduled');
    return response.data;
  },

  // Update post
  updatePost: async (postId: string, data: any) => {
    const response = await apiClient.patch(`/social-posts/${postId}`, data);
    return response.data;
  },

  // Delete post
  deletePost: async (postId: string) => {
    const response = await apiClient.delete(`/social-posts/${postId}`);
    return response.data;
  },

  // Publish post
  publishPost: async (postId: string) => {
    const response = await apiClient.patch(`/social-posts/${postId}/publish`);
    return response.data;
  },

  // Get posts by platform
  getPostsByPlatform: async (platform: string) => {
    const response = await apiClient.get(`/social-posts/platform/${platform}`);
    return response.data;
  },
};

export default apiClient;
