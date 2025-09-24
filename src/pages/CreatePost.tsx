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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Save,
  Send,
  CalendarIcon,
  Hash,
  X,
  Image,
  Video,
  Smile,
  TrendingUp,
  Clock,
  Users,
  Eye,
  BarChart3,
  Loader2,
  RefreshCw,
  History,
  Edit,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { authAPI, GeneratePostRequest, GeneratedPost } from "@/lib/auth";
import { toast } from "sonner";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");

  const [useBrandVoice, setUseBrandVoice] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [activeTab, setActiveTab] = useState("create");

  const suggestedHashtags = [
    "#AI",
    "#ContentCreation",
    "#SocialMedia",
    "#Marketing",
    "#Productivity",
    "#Tech",
  ];
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const toneOptions = [
    "Professional",
    "Casual",
    "Friendly",
    "Formal",
    "Humorous",
    "Inspirational",
    "Educational",
    "Promotional",
  ];

  const platforms = [
    {
      id: "twitter",
      name: "Twitter",
      color: "bg-twitter",
      textColor: "text-twitter",
      limit: 280,
      icon: "🐦",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      color: "bg-linkedin",
      textColor: "text-linkedin",
      limit: 3000,
      icon: "💼",
    },
    {
      id: "instagram",
      name: "Instagram",
      color: "bg-instagram",
      textColor: "text-instagram",
      limit: 2200,
      icon: "📸",
    },
  ];

  const aiSuggestions = [
    "🚀 Discover the power of AI-driven content creation! Transform your social media strategy with intelligent automation that understands your brand voice and audience.",
    "💡 5 game-changing AI tools that will revolutionize your content workflow. From ideation to publication, these tools will save you hours every week.",
    "🎯 The future of social media is here! Learn how AI is helping creators build authentic connections while scaling their content production.",
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleHashtagToggle = (hashtag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(hashtag)
        ? prev.filter((h) => h !== hashtag)
        : [...prev, hashtag]
    );
  };

  // Load user posts on component mount
  useEffect(() => {
    loadUserPosts();
  }, []);

  const loadUserPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const response = await authAPI.getUserPosts();
      if (response.success && response.data) {
        setGeneratedPosts(response.data);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
      toast.error("Failed to load your posts");
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const generateAIContent = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for content generation");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    setIsGenerating(true);
    try {
      const postData: GeneratePostRequest = {
        prompt: prompt.trim(),
        platforms: selectedPlatforms.map((p) => {
          const platform = platforms.find((pl) => pl.id === p);
          return platform ? platform.name : p;
        }),
        tone,
        hashtags: selectedHashtags,
      };

      const response = await authAPI.generatePost(postData);

      if (response.success && response.data) {
        setContent(response.data.content);
        toast.success("Content generated successfully!");

        // Refresh the posts list
        await loadUserPosts();
      } else {
        toast.error(response.message || "Failed to generate content");
      }
    } catch (error) {
      console.error("Content generation error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate content"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const getCharacterCount = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    return platform ? content.length : 0;
  };

  const getCharacterLimit = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    return platform ? platform.limit : 0;
  };

  const getPlatformPreview = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    if (!platform || !content) return null;

    const charCount = getCharacterCount(platformId);
    const charLimit = getCharacterLimit(platformId);
    const isOverLimit = charCount > charLimit;

    return (
      <div className="glass-card p-4 animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{platform.icon}</span>
            <span className="text-sm font-medium">{platform.name}</span>
          </div>
          <Badge
            variant={isOverLimit ? "destructive" : "secondary"}
            className="text-xs"
          >
            {charCount}/{charLimit}
          </Badge>
        </div>

        <div className="bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-4">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">
                WA
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Wahid Ahmed</p>
              <p className="text-xs text-muted-foreground">@wahidahmed</p>
            </div>
          </div>

          <p
            className={`text-sm whitespace-pre-wrap ${
              isOverLimit ? "text-destructive" : ""
            }`}
          >
            {content}
          </p>

          {selectedHashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {selectedHashtags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs ${platform.textColor} hover:underline cursor-pointer`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-xs">234</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <Users className="w-4 h-4" />
                <span className="text-xs">12</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">5</span>
              </button>
            </div>
            <span className="text-xs text-muted-foreground">
              {selectedDate ? format(selectedDate, "MMM d") : "Now"}
            </span>
          </div>
        </div>

        {/* Character limit progress */}
        <div className="mt-3">
          <Progress
            value={(charCount / charLimit) * 100}
            className={`h-1 ${isOverLimit ? "[&>div]:bg-destructive" : ""}`}
          />
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">
              Create New Post
            </h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Craft engaging content with AI assistance
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="glass-hover interactive-subtle"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              className="gradient-primary interactive"
              disabled={!content || !selectedPlatforms.length}
            >
              <Send className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="animate-scale-in"
        >
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="create" className="interactive-subtle">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Post
            </TabsTrigger>
            <TabsTrigger value="history" className="interactive-subtle">
              <History className="w-4 h-4 mr-2" />
              My Posts ({generatedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-responsive">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-responsive">
              {/* Main Content Area */}
              <div className="xl:col-span-2 space-y-responsive">
                {/* AI Prompt Input */}
                <Card className="glass-card animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span>AI Content Generator</span>
                    </CardTitle>
                    <CardDescription>
                      Describe what you want to post and let AI create it for
                      you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="prompt"
                        className="text-responsive-sm font-medium"
                      >
                        Content Prompt *
                      </Label>
                      <Textarea
                        id="prompt"
                        placeholder="e.g., Write a LinkedIn post about AI productivity tools that help businesses save time..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="resize-none focus-ring text-responsive-sm"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-responsive-sm font-medium">
                        Tone
                      </Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="focus-ring">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {toneOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={generateAIContent}
                      disabled={
                        isGenerating ||
                        !prompt.trim() ||
                        selectedPlatforms.length === 0
                      }
                      className="w-full gradient-primary interactive"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating Content...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Generated Content Editor */}
                {content && (
                  <Card className="glass-card animate-scale-in">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Edit className="w-5 h-5 text-primary" />
                        <span>Generated Content</span>
                      </CardTitle>
                      <CardDescription>
                        Review and edit your AI-generated content
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="content"
                          className="text-responsive-sm font-medium"
                        >
                          Post Content
                        </Label>
                        <Textarea
                          id="content"
                          placeholder="Edit your AI-generated content..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={8}
                          className="resize-none focus-ring text-responsive-sm"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="interactive-subtle"
                            >
                              <Image className="w-4 h-4 mr-2" />
                              Media
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="interactive-subtle"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Video
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="interactive-subtle"
                            >
                              <Smile className="w-4 h-4 mr-2" />
                              Emoji
                            </Button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {content.length} characters
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Platform Selection */}
                <Card
                  className="glass-card animate-scale-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Select Platforms</span>
                    </CardTitle>
                    <CardDescription>
                      Choose where to publish your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {platforms.map((platform, index) => (
                        <button
                          key={platform.id}
                          onClick={() => handlePlatformToggle(platform.id)}
                          className={cn(
                            "p-6 rounded-xl border-2 transition-spring transform hover:scale-[1.02] animate-fade-in",
                            selectedPlatforms.includes(platform.id)
                              ? "border-primary bg-primary/10 shadow-glow"
                              : "border-border/20 hover:border-primary/50 glass-hover"
                          )}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="text-center">
                            <span className="text-2xl mb-3 block">
                              {platform.icon}
                            </span>
                            <span className="text-responsive-sm font-medium block">
                              {platform.name}
                            </span>
                            <span className="text-xs text-muted-foreground block mt-1">
                              {platform.limit} chars max
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Hashtags */}
                <Card
                  className="glass-card animate-scale-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Hash className="w-5 h-5 text-primary" />
                      <span>Trending Hashtags</span>
                    </CardTitle>
                    <CardDescription>
                      Add popular hashtags to boost visibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {suggestedHashtags.map((hashtag, index) => (
                        <button
                          key={hashtag}
                          onClick={() => handleHashtagToggle(hashtag)}
                          className={cn(
                            "inline-flex items-center space-x-2 px-4 py-2 rounded-full text-responsive-xs transition-spring transform hover:scale-[1.05] animate-fade-in",
                            selectedHashtags.includes(hashtag)
                              ? "bg-primary text-primary-foreground shadow-glow"
                              : "bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                          )}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <Hash className="w-3 h-3" />
                          <span>{hashtag.slice(1)}</span>
                          {selectedHashtags.includes(hashtag) && (
                            <X className="w-3 h-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Schedule */}
                <Card
                  className="glass-card animate-scale-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Schedule Post</span>
                    </CardTitle>
                    <CardDescription>
                      Choose when to publish your content for maximum engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-responsive-sm font-medium">
                          Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal glass-hover interactive-subtle",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? (
                                format(selectedDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                              className="p-3"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="time"
                          className="text-responsive-sm font-medium"
                        >
                          Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="focus-ring"
                        />
                      </div>
                    </div>

                    {/* Optimal timing suggestion */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          Optimal Timing
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on your audience, the best time to post is between
                        2-4 PM on weekdays
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="space-y-responsive">
                <Card className="glass-card animate-slide-left sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-primary" />
                      <span>Live Preview</span>
                    </CardTitle>
                    <CardDescription>
                      See how your post will appear on each platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedPlatforms.length === 0 || !content ? (
                      <div className="text-center py-12 animate-fade-in">
                        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Eye className="w-8 h-8 text-muted-foreground opacity-50" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          No preview available
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Select platforms and add content to see preview
                        </p>
                      </div>
                    ) : (
                      selectedPlatforms.map((platformId, index) => (
                        <div
                          key={platformId}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {getPlatformPreview(platformId)}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-responsive">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold gradient-text">
                  My Generated Posts
                </h2>
                <p className="text-muted-foreground">
                  View and manage your AI-generated content
                </p>
              </div>
              <Button
                onClick={loadUserPosts}
                disabled={isLoadingPosts}
                variant="outline"
                className="glass-hover interactive-subtle"
              >
                {isLoadingPosts ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>

            {isLoadingPosts ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading your posts...</p>
              </div>
            ) : generatedPosts.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="text-center py-16">
                  <History className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-responsive-lg font-semibold mb-2">
                    No posts yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Generate your first AI-powered post to see it here
                  </p>
                  <Button
                    onClick={() => setActiveTab("create")}
                    className="gradient-primary interactive"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Your First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-responsive">
                {generatedPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="glass-card interactive-subtle animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {post.platforms.map((platform) => (
                            <Badge
                              key={platform}
                              variant="outline"
                              className="text-xs"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {post.tone}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs text-muted-foreground">
                        {format(
                          new Date(post.createdAt),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="p-3 bg-muted/20 rounded-xl border border-border/20">
                        <p className="text-sm line-clamp-4 font-mono">
                          {post.content}
                        </p>
                      </div>

                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {post.hashtags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.hashtags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {post.imageUrl && (
                        <div className="relative">
                          <img
                            src={post.imageUrl}
                            alt={post.imageDescription || "Generated image"}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      <div className="flex items-center space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 gradient-primary interactive"
                          onClick={() => {
                            setContent(post.content);
                            setSelectedPlatforms(
                              post.platforms.map((p) => p.toLowerCase())
                            );
                            setSelectedHashtags(post.hashtags);
                            setActiveTab("create");
                            toast.success("Post loaded for editing");
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Use This Post
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CreatePost;
