import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sparkles,
  Zap,
  Users,
  BarChart3,
  Calendar,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
  Globe,
  Smartphone,
  Laptop,
} from "lucide-react";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Content Creation",
      description:
        "Generate engaging posts with advanced AI that understands your brand voice and audience preferences.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Scheduling",
      description:
        "Optimize posting times across platforms with AI-driven scheduling for maximum engagement.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description:
        "Track performance with detailed insights and AI-powered recommendations for growth.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Platform Management",
      description:
        "Manage all your social accounts from one dashboard with seamless cross-platform posting.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automation Tools",
      description:
        "Automate repetitive tasks and focus on strategy with intelligent workflow automation.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Brand Safety",
      description:
        "AI-powered content moderation ensures your posts align with brand guidelines and platform policies.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content:
        "This platform transformed our social media strategy. Our engagement increased by 300% in just 2 months!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Content Creator",
      company: "Creative Studio",
      content:
        "The AI suggestions are incredibly accurate. It's like having a social media expert working 24/7.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Social Media Manager",
      company: "Fashion Brand",
      content:
        "Managing multiple accounts has never been easier. The scheduling feature is a game-changer.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      description: "Perfect for individuals and small businesses",
      features: [
        "3 Social Accounts",
        "50 AI-Generated Posts/month",
        "Basic Analytics",
        "Email Support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "Ideal for growing businesses and agencies",
      features: [
        "10 Social Accounts",
        "200 AI-Generated Posts/month",
        "Advanced Analytics",
        "Priority Support",
        "Team Collaboration",
        "Custom Templates",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations with advanced needs",
      features: [
        "Unlimited Social Accounts",
        "Unlimited AI-Generated Posts",
        "Enterprise Analytics",
        "24/7 Phone Support",
        "Advanced Team Management",
        "Custom Integrations",
        "White-label Options",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-teal-500/10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />

      {/* Modern Navigation */}
      <nav className="relative z-50 px-responsive py-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-slate-900 dark:text-white">
                AI Content Manager
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Powered by AI
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Pricing
            </a>
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 interactive"
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 interactive"
            >
              <Link to="/login">Get Started Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 shadow-lg animate-slide-down">
            <div className="px-responsive py-6 space-y-4">
              <a
                href="#features"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                Pricing
              </a>
              <div className="flex items-center justify-between py-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <div className="flex flex-col space-y-3 pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-slate-300 dark:border-slate-600"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  <Link to="/login">Get Started Free</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modern Hero Section */}
      <section className="relative z-10 px-responsive py-20 lg:py-32">
        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 animate-bounce-subtle shadow-lg shadow-blue-500/10">
            <Sparkles className="w-5 h-5 mr-2" />
            AI-Powered Social Media Management
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 animate-slide-up leading-tight">
            Transform Your
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              Social Media Game
            </span>
          </h1>

          <p
            className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Create engaging content, schedule posts, and grow your audience with
            our intelligent AI assistant.
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Join 50,000+ creators
            </span>{" "}
            who trust us with their social media success.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-16 px-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-semibold shadow-xl shadow-blue-500/25 interactive"
            >
              <Link to="/login">
                Start Free Trial
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-16 px-10 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 interactive"
            >
              <Link to="#features">
                Watch Demo
                <span className="ml-3 text-2xl">🎥</span>
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-col items-center space-y-4 mb-16 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Trusted by creators worldwide
            </p>
            <div className="flex items-center space-x-8 text-slate-400 dark:text-slate-500">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">50K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">SOC 2 Compliant</span>
              </div>
            </div>
          </div>

          {/* Modern Device Showcase */}
          <div
            className="relative max-w-6xl mx-auto animate-scale-in"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                    Mobile First
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Optimized for mobile with intuitive touch controls and
                    responsive design
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-10 rounded-3xl border-2 border-blue-200 dark:border-blue-800 shadow-2xl shadow-blue-500/20 transform scale-110 hover:scale-115 transition-all duration-500">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                    <Laptop className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4">
                    Desktop Power
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    Full-featured experience with advanced tools for power users
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/25">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                    Cross-Platform
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Seamless experience across all devices and platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section
        id="features"
        className="relative z-10 px-responsive py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              ✨ Powerful Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Succeed on Social Media
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform provides all the tools you need to create,
              schedule, and optimize your social media presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Testimonials Section */}
      <section
        id="testimonials"
        className="relative z-10 px-responsive py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
              💬 Customer Stories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Loved by
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                {" "}
                50,000+ Creators
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              See how our AI-powered platform has transformed social media
              strategies for creators and businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed italic font-medium">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {testimonial.role}
                      </p>
                      <p className="text-slate-500 dark:text-slate-500 text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Pricing Section */}
      <section
        id="pricing"
        className="relative z-10 px-responsive py-24 bg-white/50 dark:bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              💰 Simple Pricing
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Start free and scale as you grow. All plans include our core AI
              features and 24/7 support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-scale-in ${
                  plan.popular
                    ? "border-2 border-purple-300 dark:border-purple-600 shadow-purple-500/20 scale-105 lg:scale-110"
                    : "border-slate-200 dark:border-slate-700 shadow-slate-200/50 dark:shadow-slate-900/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                    🔥 Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline justify-center space-x-2 mb-4">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-lg">
                      {plan.period}
                    </span>
                  </div>
                  <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full h-14 text-lg font-semibold interactive ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25"
                        : "border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Link to="/login">
                      {plan.popular ? "Start Free Trial" : "Get Started"}
                    </Link>
                  </Button>
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    14-day free trial • No credit card required
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="relative z-10 px-responsive py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/25">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Social Media Game?
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join 50,000+ creators who are already using our AI-powered
              platform to grow their audience and engagement. Start your free
              trial today!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto h-16 px-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-semibold shadow-xl shadow-blue-500/25 interactive"
              >
                <Link to="/login">
                  Start Your Free Trial
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </Button>
              <div className="text-center sm:text-left">
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  ✅ No credit card required
                </p>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  ✅ 14-day free trial
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 px-responsive py-12 bg-slate-900 dark:bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl text-white">
                  AI Content Manager
                </h3>
                <p className="text-slate-400 text-sm">Powered by AI</p>
              </div>
            </div>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              Transform your social media presence with our AI-powered platform.
              Create, schedule, and optimize your content effortlessly.
            </p>
            <div className="flex items-center space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">50K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">SOC 2 Compliant</span>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-800 w-full">
              <p className="text-slate-500 text-sm">
                © 2024 AI Content Manager. All rights reserved. Made with ❤️ for
                creators worldwide.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
