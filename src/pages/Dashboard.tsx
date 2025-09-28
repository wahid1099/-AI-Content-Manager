import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  TrendingUp,
  Users,
  PenTool,
  BarChart3,
  Plus,
  Sparkles,
  Clock,
  Eye,
  Zap,
  Target,
  ArrowUpRight,
  Activity,
  Rocket,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Bell,
  AlertTriangle,
  TrendingDown,
  Flame,
  Award,
  Brain,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const upcomingPosts = [
    {
      id: 1,
      content: "5 AI tools that will revolutionize your workflow",
      platform: "LinkedIn",
      scheduledTime: "Today, 2:00 PM",
      status: "scheduled",
      engagement: 85,
      views: "2.4K",
    },
    {
      id: 2,
      content: "Building the future with AI-powered content creation",
      platform: "Twitter",
      scheduledTime: "Tomorrow, 9:00 AM",
      status: "scheduled",
      engagement: 92,
      views: "1.8K",
    },
    {
      id: 3,
      content: "Behind the scenes: How AI helps create better content",
      platform: "Instagram",
      scheduledTime: "Thursday, 6:00 PM",
      status: "draft",
      engagement: 78,
      views: "3.1K",
    },
  ];

  const quickStats = [
    {
      title: "Scheduled Posts",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 dark:bg-blue-950",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Engagement Rate",
      value: "4.2%",
      change: "+0.8%",
      changeType: "increase",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Followers Growth",
      value: "+573",
      change: "+12%",
      changeType: "increase",
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-500",
      lightColor: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Total Reach",
      value: "24.8K",
      change: "+5.2%",
      changeType: "increase",
      icon: <Eye className="h-6 w-6" />,
      color: "bg-orange-500",
      lightColor: "bg-orange-50 dark:bg-orange-950",
      textColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  const recentActivity = [
    {
      action: "Post published",
      platform: "LinkedIn",
      time: "2 hours ago",
      status: "success",
    },
    {
      action: "Engagement spike",
      platform: "Twitter",
      time: "4 hours ago",
      status: "info",
    },
    {
      action: "New follower milestone",
      platform: "Instagram",
      time: "6 hours ago",
      status: "success",
    },
    {
      action: "Post scheduled",
      platform: "Twitter",
      time: "8 hours ago",
      status: "pending",
    },
  ];

  // Engagement Insights Data
  const engagementInsights = [
    {
      id: 1,
      postTitle: "5 AI tools that will revolutionize your workflow",
      platform: "LinkedIn",
      timeAgo: "2 hours ago",
      reactions: { likes: 156, comments: 23, shares: 12 },
      reach: 2847,
      sentiment: {
        positive: 78,
        neutral: 18,
        negative: 4,
        overall: "positive",
      },
      trending: true,
      engagementRate: 6.8,
    },
    {
      id: 2,
      postTitle: "Building the future with AI-powered content",
      platform: "Twitter",
      timeAgo: "6 hours ago",
      reactions: { likes: 89, comments: 15, shares: 34 },
      reach: 1923,
      sentiment: {
        positive: 65,
        neutral: 25,
        negative: 10,
        overall: "positive",
      },
      trending: false,
      engagementRate: 7.2,
    },
    {
      id: 3,
      postTitle: "Behind the scenes: Content creation process",
      platform: "Instagram",
      timeAgo: "1 day ago",
      reactions: { likes: 234, comments: 45, shares: 8 },
      reach: 3456,
      sentiment: {
        positive: 82,
        neutral: 15,
        negative: 3,
        overall: "positive",
      },
      trending: false,
      engagementRate: 8.3,
    },
  ];

  // AI-Powered Notifications
  const aiNotifications = [
    {
      id: 1,
      type: "trending",
      title: "Your LinkedIn post is trending! 🔥",
      message:
        "Your AI tools post has 340% higher engagement than usual. Consider creating similar content.",
      time: "5 minutes ago",
      priority: "high",
      action: "View Analytics",
      icon: <Flame className="w-4 h-4" />,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      id: 2,
      type: "engagement",
      title: "High engagement opportunity",
      message:
        "Your Twitter post has 15 new comments. Respond now to boost engagement by 25%.",
      time: "12 minutes ago",
      priority: "medium",
      action: "Respond",
      icon: <MessageCircle className="w-4 h-4" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      id: 3,
      type: "sentiment",
      title: "Positive sentiment spike detected",
      message:
        "Your Instagram post received 95% positive reactions. Perfect time for a follow-up post.",
      time: "1 hour ago",
      priority: "medium",
      action: "Create Follow-up",
      icon: <Smile className="w-4 h-4" />,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      id: 4,
      type: "optimization",
      title: "AI Content Suggestion",
      message:
        "Based on your top-performing posts, create content about 'AI productivity tips' for maximum reach.",
      time: "2 hours ago",
      priority: "low",
      action: "Generate Content",
      icon: <Brain className="w-4 h-4" />,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
  ];

  const getPlatformIcon = (platform: string) => {
    const iconClass = "w-5 h-5";
    switch (platform.toLowerCase()) {
      case "twitter":
        return (
          <div
            className={`${iconClass} rounded bg-twitter text-white flex items-center justify-center text-xs font-bold`}
          >
            T
          </div>
        );
      case "linkedin":
        return (
          <div
            className={`${iconClass} rounded bg-linkedin text-white flex items-center justify-center text-xs font-bold`}
          >
            in
          </div>
        );
      case "instagram":
        return (
          <div
            className={`${iconClass} rounded-lg bg-instagram text-white flex items-center justify-center text-xs font-bold`}
          >
            IG
          </div>
        );
      default:
        return (
          <div
            className={`${iconClass} rounded bg-slate-400 text-white flex items-center justify-center text-xs font-bold`}
          >
            ?
          </div>
        );
    }
  };

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Modern Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                <Rocket className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-responsive-3xl font-bold text-slate-900 dark:text-white">
                  Welcome back, Wahid! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-responsive-base">
                  Ready to create amazing content today?
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              asChild
              variant="outline"
              className="glass-hover interactive-subtle"
            >
              <Link to="/analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Link>
            </Button>
            <Button
              asChild
              className="gradient-primary shadow-glow hover:shadow-large interactive"
            >
              <Link to="/create-post">
                <Sparkles className="w-5 h-5 mr-2" />
                Create Post
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-responsive-4 gap-responsive animate-scale-in">
          {quickStats.map((stat, index) => (
            <Card
              key={stat.title}
              className="card-interactive border-0 shadow-medium hover:shadow-large"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.lightColor}`}>
                    <div className={stat.textColor}>{stat.icon}</div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stat.changeType === "increase"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    <ArrowUpRight className="w-3 h-3 inline mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI-Powered Notifications */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  AI-Powered Notifications
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Smart alerts to maximize your content performance
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">
                {aiNotifications.filter((n) => n.priority === "high").length}{" "}
                High Priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-spring hover:shadow-soft animate-fade-in ${
                    notification.bgColor
                  } ${
                    notification.priority === "high"
                      ? "border-orange-200 dark:border-orange-800"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${notification.bgColor} ${notification.color}`}
                    >
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                          {notification.title}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {notification.message}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`text-xs ${notification.color} border-current hover:bg-current hover:text-white`}
                      >
                        {notification.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Insights */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Engagement Insights
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Real-time analysis with sentiment detection
                </CardDescription>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="glass-hover"
              >
                <Link to="/analytics">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Analytics
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {engagementInsights.map((insight, index) => (
                <div
                  key={insight.id}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/30 hover:shadow-soft transition-spring animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getPlatformIcon(insight.platform)}
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {insight.postTitle}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {insight.timeAgo} • {insight.reach.toLocaleString()}{" "}
                          reach
                        </p>
                      </div>
                    </div>
                    {insight.trending && (
                      <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                        <Flame className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  {/* Engagement Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="w-4 h-4 text-red-500 mr-1" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {insight.reactions.likes}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Likes
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-center mb-1">
                        <MessageCircle className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {insight.reactions.comments}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Comments
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-center mb-1">
                        <Share2 className="w-4 h-4 text-green-500 mr-1" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {insight.reactions.shares}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Shares
                      </p>
                    </div>
                  </div>

                  {/* Sentiment Analysis */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-slate-900 dark:text-white flex items-center">
                        <Brain className="w-4 h-4 mr-2 text-purple-500" />
                        Sentiment Analysis
                      </h5>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-medium ${
                            insight.sentiment.overall === "positive"
                              ? "text-green-600 dark:text-green-400"
                              : insight.sentiment.overall === "negative"
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {insight.sentiment.overall === "positive" ? (
                            <Smile className="w-4 h-4 inline mr-1" />
                          ) : insight.sentiment.overall === "negative" ? (
                            <Frown className="w-4 h-4 inline mr-1" />
                          ) : (
                            <Meh className="w-4 h-4 inline mr-1" />
                          )}
                          {insight.sentiment.overall}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {insight.engagementRate}% rate
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Positive
                        </span>
                        <span className="font-medium">
                          {insight.sentiment.positive}%
                        </span>
                      </div>
                      <Progress
                        value={insight.sentiment.positive}
                        className="h-2 bg-slate-200 dark:bg-slate-700"
                      >
                        <div className="h-full bg-green-500 rounded-full transition-all" />
                      </Progress>

                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-slate-500 dark:text-slate-400">
                          <Meh className="w-3 h-3 mr-1" />
                          Neutral
                        </span>
                        <span className="font-medium">
                          {insight.sentiment.neutral}%
                        </span>
                      </div>
                      <Progress
                        value={insight.sentiment.neutral}
                        className="h-2 bg-slate-200 dark:bg-slate-700"
                      >
                        <div className="h-full bg-slate-400 rounded-full transition-all" />
                      </Progress>

                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-red-500 dark:text-red-400">
                          <ThumbsDown className="w-3 h-3 mr-1" />
                          Negative
                        </span>
                        <span className="font-medium">
                          {insight.sentiment.negative}%
                        </span>
                      </div>
                      <Progress
                        value={insight.sentiment.negative}
                        className="h-2 bg-slate-200 dark:bg-slate-700"
                      >
                        <div className="h-full bg-red-500 rounded-full transition-all" />
                      </Progress>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-responsive">
          {/* Upcoming Posts - Enhanced */}
          <div className="xl:col-span-2">
            <Card className="card-elevated animate-slide-up">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Upcoming Posts
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Your scheduled content pipeline
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="glass-hover"
                  >
                    <Link to="/calendar">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Calendar
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/30 hover:shadow-soft transition-spring animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getPlatformIcon(post.platform)}
                      </div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                            {post.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.scheduledTime}
                            </p>
                            <Badge
                              variant={
                                post.status === "scheduled"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {post.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Engagement Preview */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <Target className="w-3 h-3 mr-1" />
                              {post.engagement}% match
                            </span>
                          </div>
                          <Progress
                            value={post.engagement}
                            className="w-20 h-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  asChild
                  variant="outline"
                  className="w-full glass-hover interactive-subtle"
                >
                  <Link to="/calendar">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule More Posts
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-responsive">
            {/* Quick Actions - Modernized */}
            <Card className="card-elevated animate-slide-left">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Jump into your workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  className="w-full justify-start h-12 gradient-primary interactive"
                >
                  <Link to="/create-post">
                    <PenTool className="w-4 h-4 mr-3" />
                    Create New Post
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start h-12 glass-hover interactive-subtle"
                >
                  <Link to="/templates">
                    <Sparkles className="w-4 h-4 mr-3" />
                    Browse Templates
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start h-12 glass-hover interactive-subtle"
                >
                  <Link to="/settings">
                    <Plus className="w-4 h-4 mr-3" />
                    Connect Account
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card
              className="card-elevated animate-slide-left"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Latest updates from your accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "info"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.platform} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Insight */}
            <Card
              className="card-elevated animate-slide-left"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  This Week's Highlight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-green-700 dark:text-green-300">
                        Best Performance
                      </span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                      Your LinkedIn post about AI tools got 340% more engagement
                      than average!
                    </p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="text-green-700 border-green-300 hover:bg-green-100 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-900"
                    >
                      <Link to="/analytics">
                        View Details
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
