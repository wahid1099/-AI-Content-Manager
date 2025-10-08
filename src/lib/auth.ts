// Authentication utilities and API calls
const API_BASE_URL = "https://ai-content-manager-backend.vercel.app/api/v1";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  phone?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface AuthResponse {
  success: boolean;
  status: number;
  message: string;
  data?: {
    user?: User;
    token?: string;
    accessToken?: string;
  };
  pagination?: null;
  error?: string;
}

export interface ProfileResponse {
  success: boolean;
  status: number;
  message: string;
  data?: User;
  pagination?: null;
}

export interface GeneratePostRequest {
  prompt: string;
  platforms: string[];
  tone: string;
  hashtags: string[];
  needImage?: string;
  imageDescription?: string;
  brandVoice?: string;
  targetAudience?: string;
  scheduledDate?: string;
}

export interface GeneratedPost {
  _id: string;
  prompt: string;
  platforms: string[];
  tone: string;
  hashtags: string[];
  userId: string;
  generatedContent: {
    posts: Record<string, string>;
    hasImage: boolean;
  };
  status: string;
  imageUrl?: string;
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePostRequest {
  prompt?: string;
  platforms?: string[];
  tone?: string;
  hashtags?: string[];
  generatedContent?: {
    posts: Record<string, string>;
    hasImage: boolean;
  };
  imageUrl?: string;
  scheduledDate?: string;
}

export interface ImageUploadResponse {
  success: boolean;
  data?: {
    url: string;
    delete_url: string;
  };
  error?: string;
}

export interface GeneratePostResponse {
  success: boolean;
  status: number;
  message: string;
  data?: GeneratedPost;
  pagination?: null;
}

export interface GetPostsResponse {
  success: boolean;
  status: number;
  message: string;
  data?: GeneratedPost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Subscription Management Interfaces
export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  status: "active" | "inactive" | "cancelled" | "past_due";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  priceId: string;
  amount: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  limits: {
    postsPerMonth: number;
    aiGenerationsPerMonth: number;
    teamMembers: number;
    socialAccounts: number;
  };
  usage: {
    postsUsed: number;
    aiGenerationsUsed: number;
    teamMembersUsed: number;
    socialAccountsUsed: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  limits: {
    postsPerMonth: number;
    aiGenerationsPerMonth: number;
    teamMembers: number;
    socialAccounts: number;
  };
  popular?: boolean;
  stripePriceId: string;
}

export interface SubscriptionResponse {
  success: boolean;
  status: number;
  message: string;
  data?: Subscription;
}

export interface PlansResponse {
  success: boolean;
  status: number;
  message: string;
  data?: SubscriptionPlan[];
}

// Team Collaboration Interfaces
export interface TeamMember {
  id: string;
  userId: string;
  workspaceId: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "editor" | "viewer";
  permissions: string[];
  status: "active" | "pending" | "inactive";
  invitedBy: string;
  joinedAt?: string;
  lastActive?: string;
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  settings: {
    brandVoice?: string;
    defaultTone?: string;
    approvalRequired: boolean;
    allowedPlatforms: string[];
  };
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamResponse {
  success: boolean;
  status: number;
  message: string;
  data?: TeamMember[];
}

export interface WorkspaceResponse {
  success: boolean;
  status: number;
  message: string;
  data?: Workspace;
}

// Analytics Interfaces
export interface AnalyticsData {
  overview: {
    totalPosts: number;
    totalEngagement: number;
    totalReach: number;
    totalImpressions: number;
    engagementRate: number;
    followerGrowth: number;
  };
  platformStats: {
    platform: string;
    posts: number;
    engagement: number;
    reach: number;
    engagementRate: number;
  }[];
  timeSeriesData: {
    date: string;
    posts: number;
    engagement: number;
    reach: number;
    impressions: number;
  }[];
  topPerformingPosts: {
    id: string;
    content: string;
    platform: string;
    engagement: number;
    reach: number;
    createdAt: string;
  }[];
  audienceInsights: {
    demographics: {
      ageGroups: { range: string; percentage: number }[];
      genders: { gender: string; percentage: number }[];
      locations: { country: string; percentage: number }[];
    };
    interests: { category: string; percentage: number }[];
    activeHours: { hour: number; engagement: number }[];
  };
}

export interface AnalyticsResponse {
  success: boolean;
  status: number;
  message: string;
  data?: AnalyticsData;
}

// Template Interfaces
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  content: string;
  platforms: string[];
  tone: string;
  hashtags: string[];
  variables: string[];
  performance: {
    uses: number;
    avgEngagement: number;
    rating: number;
  };
  isPremium: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateResponse {
  success: boolean;
  status: number;
  message: string;
  data?: Template[];
}

// Connected Accounts Interfaces
export interface ConnectedAccount {
  id: string;
  userId: string;
  platform: string;
  accountId: string;
  accountName: string;
  username: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  status: "active" | "expired" | "error";
  permissions: string[];
  connectedAt: string;
  lastUsed?: string;
}

export interface ConnectedAccountsResponse {
  success: boolean;
  status: number;
  message: string;
  data?: ConnectedAccount[];
}

// Usage Analytics Interfaces
export interface UsageMetrics {
  currentPeriod: {
    postsCreated: number;
    aiGenerations: number;
    apiCalls: number;
    storageUsed: number;
  };
  limits: {
    postsPerMonth: number;
    aiGenerationsPerMonth: number;
    apiCallsPerMonth: number;
    storageLimit: number;
  };
  history: {
    date: string;
    postsCreated: number;
    aiGenerations: number;
    apiCalls: number;
  }[];
}

export interface UsageResponse {
  success: boolean;
  status: number;
  message: string;
  data?: UsageMetrics;
}

// System Health Interfaces
export interface SystemHealth {
  status: "healthy" | "degraded" | "down";
  services: {
    database: "healthy" | "degraded" | "down";
    ai: "healthy" | "degraded" | "down";
    storage: "healthy" | "degraded" | "down";
    external_apis: "healthy" | "degraded" | "down";
  };
  metrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    activeUsers: number;
  };
  lastChecked: string;
}

export interface HealthResponse {
  success: boolean;
  status: number;
  message: string;
  data?: SystemHealth;
}

// API calls
export const authAPI = {
  // Google OAuth
  async initiateGoogleLogin(): Promise<void> {
    try {
      // Redirect to Google OAuth endpoint
      window.location.href = `${API_BASE_URL}/auth/google`;
    } catch (error) {
      console.error("Google OAuth initiation error:", error);
      throw error;
    }
  },

  async handleGoogleCallback(
    code: string,
    state?: string
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google OAuth callback failed");
      }

      return data;
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      throw error;
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Token refresh failed");
      }

      return data;
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  },

  async logoutUser(): Promise<{ success: boolean; message: string }> {
    try {
      const token = getAccessToken();

      if (token) {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.warn("Logout API call failed:", data.message);
          // Continue with local logout even if API call fails
        }
      }

      // Always clear local storage
      tokenStorage.remove();
      userStorage.remove();

      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout error:", error);
      // Clear local storage even if API call fails
      tokenStorage.remove();
      userStorage.remove();
      return { success: true, message: "Logged out locally" };
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          role: userData.role || "user",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async getProfile(token: string): Promise<ProfileResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data;
    } catch (error) {
      console.error("Profile fetch error:", error);
      throw error;
    }
  },

  async generatePost(
    postData: GeneratePostRequest
  ): Promise<GeneratePostResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/social-posts/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate post");
      }

      return data;
    } catch (error) {
      console.error("Post generation error:", error);
      throw error;
    }
  },

  async getUserPosts(): Promise<GetPostsResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/social-posts/my-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }

      return data;
    } catch (error) {
      console.error("Fetch posts error:", error);
      throw error;
    }
  },

  async updatePost(
    postId: string,
    updateData: UpdatePostRequest
  ): Promise<GeneratePostResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      console.log("Updating post with data:", updateData); // Debug log

      const response = await fetch(`${API_BASE_URL}/social-posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Log detailed error information
        console.error("Update post failed:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });

        // Handle validation errors specifically
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors
            .map((err: unknown) => {
              if (typeof err === "object" && err !== null && "message" in err) {
                return (err as { message: string }).message;
              }
              return String(err);
            })
            .join(", ");
          throw new Error(`Validation failed: ${errorMessages}`);
        }

        throw new Error(data.message || "Failed to update post");
      }

      return data;
    } catch (error) {
      console.error("Update post error:", error);
      throw error;
    }
  },

  async deletePost(
    postId: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/social-posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete post");
      }

      return data;
    } catch (error) {
      console.error("Delete post error:", error);
      throw error;
    }
  },

  async getScheduledPosts(): Promise<GetPostsResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/social-posts/scheduled`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch scheduled posts");
      }

      return data;
    } catch (error) {
      console.error("Fetch scheduled posts error:", error);
      throw error;
    }
  },

  async getPostsByPlatform(platform: string): Promise<GetPostsResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(
        `${API_BASE_URL}/social-posts/platform/${platform}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts by platform");
      }

      return data;
    } catch (error) {
      console.error("Fetch posts by platform error:", error);
      throw error;
    }
  },

  async publishPost(postId: string): Promise<GeneratePostResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(
        `${API_BASE_URL}/social-posts/${postId}/publish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to publish post");
      }

      return data;
    } catch (error) {
      console.error("Publish post error:", error);
      throw error;
    }
  },

  async uploadImageToImageBB(imageFile: File): Promise<ImageUploadResponse> {
    try {
      // ImageBB API key from environment variables
      const IMAGEBB_API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;

      if (!IMAGEBB_API_KEY) {
        throw new Error(
          "ImageBB API key not configured. Please add VITE_IMAGEBB_API_KEY to your .env file"
        );
      }

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("key", IMAGEBB_API_KEY);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to upload image");
      }

      return {
        success: true,
        data: {
          url: data.data.url,
          delete_url: data.data.delete_url,
        },
      };
    } catch (error) {
      console.error("Image upload error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to upload image",
      };
    }
  },

  // Subscription Management APIs
  async getSubscriptionPlans(): Promise<PlansResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/plans`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch subscription plans");
      }

      return data;
    } catch (error) {
      console.error("Fetch subscription plans error:", error);
      throw error;
    }
  },

  async getCurrentSubscription(): Promise<SubscriptionResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/subscriptions/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch subscription");
      }

      return data;
    } catch (error) {
      console.error("Fetch subscription error:", error);
      throw error;
    }
  },

  async createSubscription(planId: string): Promise<SubscriptionResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/subscriptions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create subscription");
      }

      return data;
    } catch (error) {
      console.error("Create subscription error:", error);
      throw error;
    }
  },

  async cancelSubscription(): Promise<SubscriptionResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/subscriptions/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel subscription");
      }

      return data;
    } catch (error) {
      console.error("Cancel subscription error:", error);
      throw error;
    }
  },

  // Team Collaboration APIs
  async getWorkspace(): Promise<WorkspaceResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/workspaces/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch workspace");
      }

      return data;
    } catch (error) {
      console.error("Fetch workspace error:", error);
      throw error;
    }
  },

  async inviteTeamMember(email: string, role: string): Promise<TeamResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/team/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to invite team member");
      }

      return data;
    } catch (error) {
      console.error("Invite team member error:", error);
      throw error;
    }
  },

  async getTeamMembers(): Promise<TeamResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/team/members`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch team members");
      }

      return data;
    } catch (error) {
      console.error("Fetch team members error:", error);
      throw error;
    }
  },

  async removeTeamMember(memberId: string): Promise<TeamResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/team/members/${memberId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove team member");
      }

      return data;
    } catch (error) {
      console.error("Remove team member error:", error);
      throw error;
    }
  },

  // Analytics APIs
  async getAnalytics(timeRange: string = "30d"): Promise<AnalyticsResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(
        `${API_BASE_URL}/analytics?timeRange=${timeRange}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch analytics");
      }

      return data;
    } catch (error) {
      console.error("Fetch analytics error:", error);
      throw error;
    }
  },

  // Templates APIs
  async getTemplates(
    category?: string,
    industry?: string
  ): Promise<TemplateResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      let url = `${API_BASE_URL}/templates`;
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (industry) params.append("industry", industry);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch templates");
      }

      return data;
    } catch (error) {
      console.error("Fetch templates error:", error);
      throw error;
    }
  },

  async createTemplate(
    templateData: Partial<Template>
  ): Promise<TemplateResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(templateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create template");
      }

      return data;
    } catch (error) {
      console.error("Create template error:", error);
      throw error;
    }
  },

  // Connected Accounts APIs
  async getConnectedAccounts(): Promise<ConnectedAccountsResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/connected-accounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch connected accounts");
      }

      return data;
    } catch (error) {
      console.error("Fetch connected accounts error:", error);
      throw error;
    }
  },

  async connectSocialAccount(
    platform: string
  ): Promise<{ success: boolean; redirectUrl: string }> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(
        `${API_BASE_URL}/connected-accounts/connect/${platform}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to initiate account connection"
        );
      }

      return data;
    } catch (error) {
      console.error("Connect social account error:", error);
      throw error;
    }
  },

  async disconnectSocialAccount(
    accountId: string
  ): Promise<ConnectedAccountsResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(
        `${API_BASE_URL}/connected-accounts/${accountId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to disconnect account");
      }

      return data;
    } catch (error) {
      console.error("Disconnect social account error:", error);
      throw error;
    }
  },

  // Usage Analytics APIs
  async getUsageMetrics(): Promise<UsageResponse> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${API_BASE_URL}/usage/metrics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch usage metrics");
      }

      return data;
    } catch (error) {
      console.error("Fetch usage metrics error:", error);
      throw error;
    }
  },

  // System Health APIs
  async getSystemHealth(): Promise<HealthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/system/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch system health");
      }

      return data;
    } catch (error) {
      console.error("Fetch system health error:", error);
      throw error;
    }
  },
};

// Local storage utilities
export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },

  set: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", token);
  },

  remove: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
  },
};

export const userStorage = {
  get: (): User | null => {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  },

  set: (user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user_data", JSON.stringify(user));
  },

  remove: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user_data");
  },
};

// Auth state utilities
export const isAuthenticated = (): boolean => {
  return !!tokenStorage.get();
};

export const getCurrentUser = (): User | null => {
  return userStorage.get();
};

export const logout = (): void => {
  tokenStorage.remove();
  userStorage.remove();
};

export const getAccessToken = (): string | null => {
  return tokenStorage.get();
};

// Helper function to make authenticated API calls
export const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("No access token available");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
