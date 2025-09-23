import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  Eye, 
  Copy, 
  Edit3, 
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
  Zap,
  Star,
  BookOpen,
  Image,
  Video,
  MessageSquare
} from "lucide-react";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const categories = [
    { id: "all", name: "All Templates", icon: <BookOpen className="w-4 h-4" /> },
    { id: "promotional", name: "Promotional", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "educational", name: "Educational", icon: <BookOpen className="w-4 h-4" /> },
    { id: "engagement", name: "Engagement", icon: <Users className="w-4 h-4" /> },
    { id: "announcement", name: "Announcements", icon: <Sparkles className="w-4 h-4" /> },
    { id: "seasonal", name: "Seasonal", icon: <Calendar className="w-4 h-4" /> }
  ];

  const platforms = [
    { id: "all", name: "All Platforms" },
    { id: "twitter", name: "Twitter" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "instagram", name: "Instagram" },
    { id: "facebook", name: "Facebook" }
  ];

  const templates = [
    {
      id: 1,
      title: "Product Launch Announcement",
      description: "Perfect template for announcing new products or features",
      category: "announcement",
      platform: "twitter",
      type: "text",
      likes: 245,
      uses: 1200,
      rating: 4.8,
      preview: "🚀 Exciting news! We're thrilled to announce the launch of [Product Name]! \n\n✨ Key features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nReady to transform your [industry]? Get started today! 👇\n\n#ProductLaunch #Innovation #[YourBrand]",
      tags: ["product", "launch", "announcement", "features"]
    },
    {
      id: 2,
      title: "Educational Thread Starter",
      description: "Engage your audience with valuable educational content",
      category: "educational",
      platform: "twitter",
      type: "thread",
      likes: 189,
      uses: 890,
      rating: 4.6,
      preview: "🧵 THREAD: [Number] things I wish I knew about [Topic] when I started\n\nAfter [X years] in [Industry], here are the insights that would have saved me time and mistakes:\n\n1/ [First insight with explanation]\n\n👇 Keep reading for more valuable tips",
      tags: ["education", "thread", "tips", "insights"]
    },
    {
      id: 3,
      title: "Behind the Scenes Story",
      description: "Share authentic moments and build connection with your audience",
      category: "engagement",
      platform: "instagram",
      type: "image",
      likes: 312,
      uses: 1500,
      rating: 4.9,
      preview: "Taking you behind the scenes of [Process/Event] 📸\n\nWhat you see: [End result]\nWhat you don't see: [The work behind it]\n\n• [Detail 1]\n• [Detail 2]\n• [Detail 3]\n\nThe journey is just as important as the destination ✨\n\n#BehindTheScenes #Authentic #[YourBrand]",
      tags: ["behind-the-scenes", "authentic", "story", "process"]
    },
    {
      id: 4,
      title: "Professional Achievement Post",
      description: "Celebrate milestones and achievements professionally",
      category: "promotional",
      platform: "linkedin",
      type: "text",
      likes: 156,
      uses: 670,
      rating: 4.7,
      preview: "🎉 Thrilled to share that [Achievement/Milestone]!\n\nThis journey has been [describe journey briefly]. Key learnings:\n\n→ [Learning 1]\n→ [Learning 2]\n→ [Learning 3]\n\nGrateful for the support from [mention team/community]. Here's to the next chapter!\n\n#Achievement #Growth #Professional",
      tags: ["achievement", "milestone", "professional", "growth"]
    },
    {
      id: 5,
      title: "Question & Engagement Post",
      description: "Boost engagement with thought-provoking questions",
      category: "engagement",
      platform: "linkedin",
      type: "text",
      likes: 203,
      uses: 980,
      rating: 4.5,
      preview: "💭 Quick question for my network:\n\nWhat's the one piece of advice you'd give to someone starting in [Industry/Field]?\n\nI'll start: [Your advice]\n\nDrop your thoughts in the comments 👇 Let's help each other grow!\n\n#Community #Advice #[Industry]",
      tags: ["question", "engagement", "community", "advice"]
    },
    {
      id: 6,
      title: "Holiday Greeting Template",
      description: "Seasonal greetings that connect with your audience",
      category: "seasonal",
      platform: "instagram",
      type: "image",
      likes: 278,
      uses: 1100,
      rating: 4.4,
      preview: "🎄 Wishing you and your loved ones a [Holiday] filled with joy, gratitude, and [relevant wish]!\n\nAs we reflect on this year, we're grateful for:\n• Our amazing community\n• [Achievement 1]\n• [Achievement 2]\n\nHere's to an even brighter [next year]! ✨\n\n#[Holiday] #Gratitude #Community #[YourBrand]",
      tags: ["holiday", "seasonal", "gratitude", "community"]
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesPlatform = selectedPlatform === "all" || template.platform === selectedPlatform;
    
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'thread': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-twitter/10 text-twitter border-twitter/20';
      case 'linkedin': return 'bg-linkedin/10 text-linkedin border-linkedin/20';
      case 'instagram': return 'bg-instagram/10 text-instagram border-instagram/20';
      case 'facebook': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">Content Templates</h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Ready-to-use templates to accelerate your content creation
            </p>
          </div>
          <Button className="gradient-primary interactive">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>

        {/* Filters */}
        <Card className="glass-card animate-scale-in">
          <CardContent className="p-responsive">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 focus-ring"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="interactive-subtle"
                  >
                    {category.icon}
                    <span className="ml-2 hidden sm:inline">{category.name}</span>
                  </Button>
                ))}
              </div>

              {/* Platform Filter */}
              <div className="flex flex-wrap gap-2">
                {platforms.map(platform => (
                  <Button
                    key={platform.id}
                    variant={selectedPlatform === platform.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlatform(platform.id)}
                    className="interactive-subtle"
                  >
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-responsive-3 gap-responsive">
          {filteredTemplates.map((template, index) => (
            <Card 
              key={template.id} 
              className="glass-card interactive-subtle group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getPlatformColor(template.platform)}>
                      {template.platform}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getTypeIcon(template.type)}
                      <span className="ml-1 capitalize">{template.type}</span>
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <CardTitle className="text-responsive-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {template.title}
                </CardTitle>
                <CardDescription className="text-responsive-sm line-clamp-2">
                  {template.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Preview */}
                <div className="p-4 bg-muted/20 rounded-xl border border-border/20">
                  <p className="text-sm text-muted-foreground line-clamp-4 font-mono">
                    {template.preview}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{template.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Copy className="w-3 h-3" />
                      <span>{template.uses}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      <span>{template.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2">
                  <Button size="sm" className="flex-1 gradient-primary interactive">
                    <Copy className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                  <Button variant="outline" size="sm" className="glass-hover interactive-subtle">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="glass-hover interactive-subtle">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <Card className="glass-card animate-fade-in">
            <CardContent className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-responsive-lg font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or create a new template
              </p>
              <Button className="gradient-primary interactive">
                <Plus className="w-4 h-4 mr-2" />
                Create New Template
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Popular Templates Section */}
        <Card className="glass-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Trending Templates</span>
            </CardTitle>
            <CardDescription>
              Most popular templates this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.slice(0, 4).map((template, index) => (
                <div 
                  key={template.id}
                  className="p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 hover:border-primary/20 hover:shadow-soft transition-spring cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={getPlatformColor(template.platform)}>
                      {template.platform}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      <span>{template.uses}</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2 mb-2">{template.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{template.likes}</span>
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

export default Templates;