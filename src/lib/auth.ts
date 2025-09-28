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
