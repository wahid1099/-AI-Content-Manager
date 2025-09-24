import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-pulse" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-glow" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-accent/8 rounded-full blur-3xl animate-glow" />

      <div className="relative w-full max-w-md animate-scale-in">
        <Card className="shadow-glass backdrop-blur-xl bg-gradient-glass border border-white/20">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-glow mx-auto mb-4">
              <Search className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">
              404
            </CardTitle>
            <CardDescription className="text-lg">
              Page Not Found
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="outline"
                className="flex-1 glass-hover interactive-subtle"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Link>
              </Button>

              <Button asChild className="flex-1 gradient-primary interactive">
                <Link to="/dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
