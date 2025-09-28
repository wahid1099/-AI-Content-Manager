import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  tokenStorage,
  userStorage,
  logout as logoutUtil,
  authAPI,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    const initializeAuth = () => {
      try {
        const token = tokenStorage.get();
        const userData = userStorage.get();

        if (token && userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear potentially corrupted data
        logoutUtil();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: User, token: string) => {
    tokenStorage.set(token);
    userStorage.set(userData);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authAPI.logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback to local logout
      logoutUtil();
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
