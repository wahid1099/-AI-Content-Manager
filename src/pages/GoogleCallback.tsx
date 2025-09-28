import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/lib/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          toast.error("Google authentication was cancelled or failed");
          navigate("/login", { replace: true });
          return;
        }

        if (!code) {
          toast.error("Invalid Google authentication response");
          navigate("/login", { replace: true });
          return;
        }

        // Handle the Google OAuth callback
        const response = await authAPI.handleGoogleCallback(
          code,
          state || undefined
        );

        if (response.success && response.data?.accessToken) {
          // Store the access token
          const accessToken = response.data.accessToken;

          // Fetch user profile using the access token
          const profileResponse = await authAPI.getProfile(accessToken);

          if (profileResponse.success && profileResponse.data) {
            // Login with user data and access token
            login(profileResponse.data, accessToken);
            toast.success(`Welcome, ${profileResponse.data.name}!`);
            navigate("/dashboard", { replace: true });
          } else {
            toast.error("Failed to fetch user profile");
            navigate("/login", { replace: true });
          }
        } else {
          toast.error(response.message || "Google authentication failed");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Google callback error:", error);
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
            Completing Google Sign In...
          </h1>
        </div>

        <p className="text-muted-foreground">
          Please wait while we authenticate your account
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
