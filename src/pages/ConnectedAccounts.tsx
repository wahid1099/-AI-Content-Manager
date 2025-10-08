import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Link2,
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Trash2,
  ExternalLink,
  Users,
  Calendar,
  BarChart3,
  Loader2,
} from "lucide-react";
import { authAPI, ConnectedAccount } from "@/lib/auth";
import { toast } from "sonner";

const ConnectedAccountsPage = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<
    ConnectedAccount[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const availablePlatforms = [
    {
      id: "twitter",
      name: "Twitter",
      description: "Connect your Twitter account to post tweets and threads",
      icon: "🐦",
      color: "bg-twitter",
      textColor: "text-twitter",
      features: [
        "Post tweets",
        "Schedule threads",
        "Auto-retweet",
        "Analytics",
      ],
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Share professional content and grow your network",
      icon: "💼",
      color: "bg-linkedin",
      textColor: "text-linkedin",
      features: [
        "Post updates",
        "Share articles",
        "Company pages",
        "Professional analytics",
      ],
    },
    {
      id: "instagram",
      name: "Instagram",
      description: "Share photos, stories, and reels with your audience",
      icon: "📸",
      color: "bg-instagram",
      textColor: "text-instagram",
      features: ["Post photos", "Stories", "Reels", "IGTV"],
    },
    {
      id: "facebook",
      name: "Facebook",
      description: "Connect with friends and share updates on Facebook",
      icon: "👥",
      color: "bg-blue-600",
      textColor: "text-blue-600",
      features: ["Post updates", "Share to pages", "Events", "Groups"],
    },
    {
      id: "youtube",
      name: "YouTube",
      description: "Upload and manage your video content",
      icon: "📺",
      color: "bg-red-600",
      textColor: "text-red-600",
      features: [
        "Upload videos",
        "Manage playlists",
        "Community posts",
        "Analytics",
      ],
    },
    {
      id: "tiktok",
      name: "TikTok",
      description: "Share short-form videos and engage with trends",
      icon: "🎵",
      color: "bg-black",
      textColor: "text-black",
      features: ["Upload videos", "Trending hashtags", "Duets", "Analytics"],
    },
  ];

  useEffect(() => {
    loadConnectedAccounts();
  }, []);

  const loadConnectedAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await authAPI.getConnectedAccounts();
      if (response.success && response.data) {
        setConnectedAccounts(response.data);
      }
    } catch (error) {
      console.error("Failed to load connected accounts:", error);
      toast.error("Failed to load connected accounts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (platformId: string) => {
    setIsConnecting(platformId);
    try {
      const response = await authAPI.connectSocialAccount(platformId);
      if (response.success && response.redirectUrl) {
        // Redirect to OAuth flow
        window.location.href = response.redirectUrl;
      } else {
        toast.error("Failed to initiate connection");
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Failed to connect account");
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      const response = await authAPI.disconnectSocialAccount(accountId);
      if (response.success) {
        toast.success("Account disconnected successfully");
        await loadConnectedAccounts();
      } else {
        toast.error("Failed to disconnect account");
      }
    } catch (error) {
      console.error("Disconnect error:", error);
      toast.error("Failed to disconnect account");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "expired":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "expired":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPlatformInfo = (platformId: string) => {
    return (
      availablePlatforms.find((p) => p.id === platformId) ||
      availablePlatforms[0]
    );
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">
              Connected Accounts
            </h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Manage your social media accounts and publishing permissions
            </p>
          </div>
          <Button
            onClick={loadConnectedAccounts}
            variant="outline"
            className="glass-hover"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Connected Accounts Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-primary/10">
                  <Link2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {connectedAccounts.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Connected Accounts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-900">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {
                      connectedAccounts.filter((acc) => acc.status === "active")
                        .length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-900">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {
                      connectedAccounts.filter((acc) => acc.status !== "active")
                        .length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Need Attention
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Accounts List */}
        {connectedAccounts.length > 0 && (
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link2 className="w-5 h-5 text-primary" />
                <span>Your Connected Accounts</span>
              </CardTitle>
              <CardDescription>
                Manage your connected social media accounts and their
                permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedAccounts.map((account, index) => {
                  const platformInfo = getPlatformInfo(account.platform);
                  return (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-12 h-12 ${platformInfo.color} rounded-full flex items-center justify-center text-white text-xl`}
                          >
                            {platformInfo.icon}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">
                                {account.accountName}
                              </h4>
                              {getStatusIcon(account.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              @{account.username} • {platformInfo.name}
                            </p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                              <span>
                                Connected:{" "}
                                {new Date(
                                  account.connectedAt
                                ).toLocaleDateString()}
                              </span>
                              {account.lastUsed && (
                                <span>
                                  Last used:{" "}
                                  {new Date(
                                    account.lastUsed
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(account.status)}>
                          {account.status}
                        </Badge>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open Platform
                            </DropdownMenuItem>
                            {account.status !== "active" && (
                              <DropdownMenuItem>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Reconnect
                              </DropdownMenuItem>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Disconnect
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Disconnect Account
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to disconnect{" "}
                                    {account.accountName}? You won't be able to
                                    post to this account until you reconnect it.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDisconnect(account.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Disconnect
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Platforms */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Connect New Account</span>
            </CardTitle>
            <CardDescription>
              Add more social media accounts to expand your reach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availablePlatforms.map((platform, index) => {
                const isConnected = connectedAccounts.some(
                  (acc) => acc.platform === platform.id
                );
                const isConnectingThis = isConnecting === platform.id;

                return (
                  <Card
                    key={platform.id}
                    className={`card-interactive relative ${
                      isConnected ? "bg-primary/5 border-primary/20" : ""
                    } animate-scale-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {isConnected && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center text-white text-xl`}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {platform.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {platform.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Features */}
                      <div>
                        <h5 className="font-medium text-sm mb-2">Features:</h5>
                        <div className="grid grid-cols-2 gap-1">
                          {platform.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center space-x-1 text-xs text-muted-foreground"
                            >
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={() => handleConnect(platform.id)}
                        disabled={isConnected || isConnectingThis}
                        className={`w-full ${
                          isConnected ? "opacity-50" : "gradient-primary"
                        }`}
                      >
                        {isConnectingThis ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : isConnected ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Connected
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Connect {platform.name}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Connection Issues?
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                  Having trouble connecting your accounts? Check our
                  troubleshooting guide.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-700 border-blue-300"
                >
                  View Guide
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Permissions
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                  Learn about what permissions we need and how we use them.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-700 border-green-300"
                >
                  Learn More
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Best Practices
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
                  Tips for managing multiple social media accounts effectively.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-purple-700 border-purple-300"
                >
                  Read Tips
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ConnectedAccountsPage;
