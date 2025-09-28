import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { tokenStorage, userStorage } from "@/lib/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get("token");
        const userParam = searchParams.get("user");
        const error = searchParams.get("error");

        if (error) {
          toast.error("Authentication failed: " + error);
          navigate("/login", { replace: true });
          return;
        }

        if (!token || !userParam) {
          toast.error("Invalid authentication response");
          navigate("/login", { replace: true });
          return;
        }

        // Parse the user data from URL parameter
        const userData = JSON.parse(decodeURIComponent(userParam));

        // Transform the user data to match our User interface
        const user = {
          id: userData._id,
          name: userData.name,
          username: userData.email.split("@")[0], // Generate username from email
          email: userData.email,
          role: userData.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // Add picture if available
          ...(userData.picture && { picture: userData.picture }),
        };

        // Store the token and user data
        tokenStorage.set(token);
        userStorage.set(user);

        // Login with user data and token
        login(user, token);

        toast.success(`Welcome, ${user.name}!`);
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-pulse" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-glow" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-accent/8 rounded-full blur-3xl animate-glow" />

      <div className="relative text-center animate-fade-in">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow mx-auto mb-6 animate-bounce">
          <span className="text-primary-foreground font-bold text-2xl">AI</span>
        </div>

        <div className="flex items-center justify-center space-x-3 mb-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Completing Authentication...
          </h1>
        </div>

        <p className="text-muted-foreground">
          Please wait while we authenticate your account
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
