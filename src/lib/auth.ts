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
  createdAt: string;
  updatedAt: string;
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
