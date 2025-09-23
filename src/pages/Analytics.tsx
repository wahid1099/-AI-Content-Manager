import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
  MessageCircle, 
  Share, 
  Filter, 
  Lightbulb,
  Eye,
  Calendar,
  Download,
  RefreshCw,
  Target,
  Zap,
  Globe
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const engagementData = [
    { date: "Mon", engagement: 2.1, impressions: 1200, clicks: 45 },
    { date: "Tue", engagement: 3.2, impressions: 1800, clicks: 67 },
    { date: "Wed", engagement: 2.8, impressions: 1500, clicks: 52 },
    { date: "Thu", engagement: 4.1, impressions: 2200, clicks: 89 },
    { date: "Fri", engagement: 3.9, impressions: 2100, clicks: 82 },
    { date: "Sat", engagement: 2.3, impressions: 1300, clicks: 38 },
    { date: "Sun", engagement: 1.8, impressions: 1000, clicks: 28 },
  ];

  const bestTimesData = [
    { time: "6 AM", posts: 2, engagement: 1.2 },
    { time: "9 AM", posts: 8, engagement: 2.8 },
    { time: "12 PM", posts: 15, engagement: 3.5 },
    { time: "3 PM", posts: 12, engagement: 4.2 },
    { time: "6 PM", posts: 22, engagement: 5.1 },
    { time: "9 PM", posts: 18, engagement: 4.8 },
  ];

  const platformData = [
    { name: "Twitter", value: 35, color: "hsl(var(--twitter))", posts: 45, engagement: 3.2 },
    { name: "LinkedIn", value: 40, color: "hsl(var(--linkedin))", posts: 32, engagement: 4.1 },
    { name: "Instagram", value: 25, color: "hsl(var(--instagram))", posts: 28, engagement: 2.8 },
  ];

  const postsData = [
    {
      id: 1,
      content: "5 AI tools that will revolutionize your workflow",
      platform: "LinkedIn",
      impressions: "12.5K",
      likes: 234,
      comments: 45,
      shares: 23,
      engagementRate: "4.2%",
      date: "2 days ago",
      performance: "high"
    },
    {
      id: 2,
      content: "Building the future with AI-powered content creation",
      platform: "Twitter",
      impressions: "8.2K",
      likes: 156,
      comments: 28,
      shares: 41,
      engagementRate: "3.8%",
      date: "3 days ago",
      performance: "medium"
    },
    {
      id: 3,
      content: "Behind the scenes: How AI helps create better content",
      platform: "Instagram",
      impressions: "6.7K",
      likes: 189,
      comments: 34,
      shares: 12,
      engagementRate: "3.5%",
      date: "5 days ago",
      performance: "medium"
    },
  ];

  const kpiData = [
    {
      title: "Total Impressions",
      value: "127.3K",
      change: "+12.5%",
      trend: "up",
      icon: <Eye className="w-5 h-5" />,
      color: "text-primary"
    },
    {
      title: "Engagement Rate",
      value: "4.2%",
      change: "+0.8%",
      trend: "up",
      icon: <Heart className="w-5 h-5" />,
      color: "text-success"
    },
    {
      title: "Followers Growth",
      value: "+573",
      change: "+23%",
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "text-instagram"
    },
    {
      title: "Click-through Rate",
      value: "2.8%",
      change: "-0.2%",
      trend: "down",
      icon: <Target className="w-5 h-5" />,
      color: "text-warning"
    }
  ];

  const getPlatformBadge = (platform: string) => {
    const colorMap = {
      "LinkedIn": "bg-linkedin/10 text-linkedin border-linkedin/20",
      "Twitter": "bg-twitter/10 text-twitter border-twitter/20", 
      "Instagram": "bg-instagram/10 text-instagram border-instagram/20"
    };
    
    return (
      <Badge variant="outline" className={colorMap[platform as keyof typeof colorMap]}>
        {platform}
      </Badge>
    );
  };

  const getPerformanceBadge = (performance: string) => {
    const colorMap = {
      "high": "bg-success/10 text-success border-success/20",
      "medium": "bg-warning/10 text-warning border-warning/20",
      "low": "bg-destructive/10 text-destructive border-destructive/20"
    };
    
    return (
      <Badge variant="outline" className={colorMap[performance as keyof typeof colorMap]}>
        {performance}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">Analytics Dashboard</h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Track your social media performance and insights
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32 glass-hover">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-40 glass-hover">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="glass-hover interactive-subtle">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            
            <Button className="gradient-primary interactive">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-responsive-4 gap-responsive">
          {kpiData.map((kpi, index) => (
            <Card 
              key={kpi.title} 
              className="glass-card interactive-subtle animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl bg-muted/20 ${kpi.color}`}>
                    {kpi.icon}
                  </div>
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : 'secondary'}
                    className={`${kpi.trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold gradient-text">{kpi.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{kpi.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="animate-scale-in">
          <TabsList className="grid w-full grid-cols-4 glass-card">
            <TabsTrigger value="overview" className="interactive-subtle">Overview</TabsTrigger>
            <TabsTrigger value="engagement" className="interactive-subtle">Engagement</TabsTrigger>
            <TabsTrigger value="audience" className="interactive-subtle">Audience</TabsTrigger>
            <TabsTrigger value="content" className="interactive-subtle">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-responsive">
              {/* Engagement Over Time */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Engagement Trends</span>
                  </CardTitle>
                  <CardDescription>Daily engagement rate and impressions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={engagementData}>
                      <defs>
                        <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                        formatter={(value, name) => [
                          name === 'engagement' ? `${value}%` : value,
                          name === 'engagement' ? 'Engagement Rate' : 'Impressions'
                        ]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorEngagement)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Platform Distribution */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>Platform Distribution</span>
                  </CardTitle>
                  <CardDescription>Content distribution across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Distribution']}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {platformData.map((platform, index) => (
                      <div key={platform.name} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: platform.color }} />
                        <p className="text-sm font-medium">{platform.name}</p>
                        <p className="text-xs text-muted-foreground">{platform.posts} posts</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Best Posting Times */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Optimal Posting Times</span>
                </CardTitle>
                <CardDescription>Best times for maximum engagement based on your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bestTimesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                      formatter={(value, name) => [
                        `${value}${name === 'engagement' ? '%' : ''}`,
                        name === 'engagement' ? 'Avg Engagement' : 'Posts Count'
                      ]}
                    />
                    <Bar 
                      dataKey="posts" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      opacity={0.8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-responsive">
            {/* AI Insights */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  <span>AI-Powered Insights</span>
                </CardTitle>
                <CardDescription>Personalized recommendations to boost your performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 animate-fade-in">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">Performance Boost</span>
                    </div>
                    <p className="text-sm text-foreground">
                      Posts perform 32% better when published between 6-9 PM on weekdays
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-success">Content Tip</span>
                    </div>
                    <p className="text-sm text-foreground">
                      AI-generated posts with your brand voice have 18% higher engagement
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-warning" />
                      <span className="text-sm font-semibold text-warning">Hashtag Strategy</span>
                    </div>
                    <p className="text-sm text-foreground">
                      LinkedIn posts with industry hashtags reach 2.5x more professionals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-responsive">
            {/* Posts Performance Table */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Content Performance</span>
                </CardTitle>
                <CardDescription>Detailed metrics for your recent posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[300px]">Content</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead className="text-center">Impressions</TableHead>
                        <TableHead className="text-center">
                          <Heart className="w-4 h-4 mx-auto" />
                        </TableHead>
                        <TableHead className="text-center">
                          <MessageCircle className="w-4 h-4 mx-auto" />
                        </TableHead>
                        <TableHead className="text-center">
                          <Share className="w-4 h-4 mx-auto" />
                        </TableHead>
                        <TableHead className="text-center">Engagement</TableHead>
                        <TableHead className="text-center">Performance</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {postsData.map((post, index) => (
                        <TableRow 
                          key={post.id} 
                          className="hover:bg-muted/20 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <TableCell className="font-medium">
                            <p className="line-clamp-2">{post.content}</p>
                          </TableCell>
                          <TableCell>
                            {getPlatformBadge(post.platform)}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {post.impressions}
                          </TableCell>
                          <TableCell className="text-center">{post.likes}</TableCell>
                          <TableCell className="text-center">{post.comments}</TableCell>
                          <TableCell className="text-center">{post.shares}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary">{post.engagementRate}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {getPerformanceBadge(post.performance)}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {post.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Analytics;