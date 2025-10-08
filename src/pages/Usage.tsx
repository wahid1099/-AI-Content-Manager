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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Zap,
  Database,
  Calendar,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Crown,
} from "lucide-react";
import { authAPI, UsageMetrics } from "@/lib/auth";
import { toast } from "sonner";

const UsagePage = () => {
  const [usageData, setUsageData] = useState<UsageMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("current");

  useEffect(() => {
    loadUsageData();
  }, [timeRange]);

  const loadUsageData = async () => {
    setIsLoading(true);
    try {
      const response = await authAPI.getUsageMetrics();
      if (response.success && response.data) {
        setUsageData(response.data);
      } else {
        // Fallback to mock data
        setUsageData({
          currentPeriod: {
            postsCreated: 45,
            aiGenerations: 123,
            apiCalls: 1567,
            storageUsed: 2.3,
          },
          limits: {
            postsPerMonth: 100,
            aiGenerationsPerMonth: 500,
            apiCallsPerMonth: 5000,
            storageLimit: 10,
          },
          history: [
            {
              date: "2024-01-01",
              postsCreated: 12,
              aiGenerations: 34,
              apiCalls: 456,
            },
            {
              date: "2024-01-02",
              postsCreated: 15,
              aiGenerations: 42,
              apiCalls: 523,
            },
            {
              date: "2024-01-03",
              postsCreated: 8,
              aiGenerations: 28,
              apiCalls: 387,
            },
            {
              date: "2024-01-04",
              postsCreated: 10,
              aiGenerations: 19,
              apiCalls: 201,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Failed to load usage data:", error);
      toast.error("Failed to load usage data");
    } finally {
      setIsLoading(false);
    }
  };
  const getUsagePercentage = (used: number, limit: number) => {
    return limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  };

  const getUsageStatus = (percentage: number) => {
    if (percentage >= 90)
      return {
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-900",
        icon: AlertTriangle,
      };
    if (percentage >= 75)
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-100 dark:bg-yellow-900",
        icon: AlertTriangle,
      };
    return {
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900",
      icon: CheckCircle,
    };
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

  if (!usageData) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Usage Data</h3>
          <p className="text-muted-foreground">
            Usage data will appear here once you start using the platform
          </p>
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
              Usage Analytics
            </h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Monitor your platform usage and subscription limits
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Period</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={loadUsageData}
              variant="outline"
              className="glass-hover"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button className="gradient-primary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Usage Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Posts Created */}
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getUsagePercentage(
                    usageData.currentPeriod.postsCreated,
                    usageData.limits.postsPerMonth
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Posts Created
                  </span>
                  <span className="text-sm font-medium">
                    {usageData.currentPeriod.postsCreated} /{" "}
                    {usageData.limits.postsPerMonth}
                  </span>
                </div>
                <Progress
                  value={getUsagePercentage(
                    usageData.currentPeriod.postsCreated,
                    usageData.limits.postsPerMonth
                  )}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Generations */}
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getUsagePercentage(
                    usageData.currentPeriod.aiGenerations,
                    usageData.limits.aiGenerationsPerMonth
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    AI Generations
                  </span>
                  <span className="text-sm font-medium">
                    {usageData.currentPeriod.aiGenerations} /{" "}
                    {usageData.limits.aiGenerationsPerMonth}
                  </span>
                </div>
                <Progress
                  value={getUsagePercentage(
                    usageData.currentPeriod.aiGenerations,
                    usageData.limits.aiGenerationsPerMonth
                  )}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* API Calls */}
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-950">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getUsagePercentage(
                    usageData.currentPeriod.apiCalls,
                    usageData.limits.apiCallsPerMonth
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    API Calls
                  </span>
                  <span className="text-sm font-medium">
                    {usageData.currentPeriod.apiCalls.toLocaleString()} /{" "}
                    {usageData.limits.apiCallsPerMonth.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={getUsagePercentage(
                    usageData.currentPeriod.apiCalls,
                    usageData.limits.apiCallsPerMonth
                  )}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Storage Used */}
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950">
                  <Database className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getUsagePercentage(
                    usageData.currentPeriod.storageUsed,
                    usageData.limits.storageLimit
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Storage Used
                  </span>
                  <span className="text-sm font-medium">
                    {usageData.currentPeriod.storageUsed.toFixed(1)} GB /{" "}
                    {usageData.limits.storageLimit} GB
                  </span>
                </div>
                <Progress
                  value={getUsagePercentage(
                    usageData.currentPeriod.storageUsed,
                    usageData.limits.storageLimit
                  )}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Current Usage Status */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <span>Usage Alerts</span>
              </CardTitle>
              <CardDescription>
                Monitor your usage to avoid hitting limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Posts Created",
                    used: usageData.currentPeriod.postsCreated,
                    limit: usageData.limits.postsPerMonth,
                  },
                  {
                    name: "AI Generations",
                    used: usageData.currentPeriod.aiGenerations,
                    limit: usageData.limits.aiGenerationsPerMonth,
                  },
                  {
                    name: "API Calls",
                    used: usageData.currentPeriod.apiCalls,
                    limit: usageData.limits.apiCallsPerMonth,
                  },
                  {
                    name: "Storage",
                    used: usageData.currentPeriod.storageUsed,
                    limit: usageData.limits.storageLimit,
                  },
                ].map((item) => {
                  const percentage = getUsagePercentage(item.used, item.limit);
                  const status = getUsageStatus(percentage);
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${status.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${status.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {percentage >= 90
                              ? "Critical"
                              : percentage >= 75
                              ? "Warning"
                              : "Good"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">
                          {percentage.toFixed(0)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.name === "Storage"
                            ? `${item.used.toFixed(1)}/${item.limit} GB`
                            : `${item.used}/${item.limit}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Suggestion */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-primary" />
                <span>Upgrade Recommendation</span>
              </CardTitle>
              <CardDescription>
                Get more resources with a higher plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">
                      Pro Plan Benefits
                    </span>
                  </div>
                  <ul className="text-sm space-y-1 mb-4">
                    <li>• 500 posts per month (5x more)</li>
                    <li>• 2,000 AI generations (4x more)</li>
                    <li>• 20,000 API calls (4x more)</li>
                    <li>• 50 GB storage (5x more)</li>
                  </ul>
                  <Button className="w-full gradient-primary">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold mb-2">Usage Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use templates to reduce AI generations</li>
                    <li>• Schedule posts in batches</li>
                    <li>• Optimize images to save storage</li>
                    <li>• Monitor usage regularly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage History */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Usage History</span>
            </CardTitle>
            <CardDescription>
              Track your usage patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageData.history.slice(-7).map((day, index) => (
                <div
                  key={day.date}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {new Date(day.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold">{day.postsCreated}</p>
                      <p className="text-xs text-muted-foreground">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{day.aiGenerations}</p>
                      <p className="text-xs text-muted-foreground">AI Gen</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{day.apiCalls}</p>
                      <p className="text-xs text-muted-foreground">API</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UsagePage;
