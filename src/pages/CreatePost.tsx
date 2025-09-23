import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  BarChart3
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [useBrandVoice, setUseBrandVoice] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const suggestedHashtags = ["#AI", "#ContentCreation", "#SocialMedia", "#Marketing", "#Productivity", "#Tech"];
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const platforms = [
    { 
      id: "twitter", 
      name: "Twitter", 
      color: "bg-twitter", 
      textColor: "text-twitter",
      limit: 280,
      icon: "🐦"
    },
    { 
      id: "linkedin", 
      name: "LinkedIn", 
      color: "bg-linkedin", 
      textColor: "text-linkedin",
      limit: 3000,
      icon: "💼"
    },
    { 
      id: "instagram", 
      name: "Instagram", 
      color: "bg-instagram", 
      textColor: "text-instagram",
      limit: 2200,
      icon: "📸"
    },
  ];

  const aiSuggestions = [
    "🚀 Discover the power of AI-driven content creation! Transform your social media strategy with intelligent automation that understands your brand voice and audience.",
    "💡 5 game-changing AI tools that will revolutionize your content workflow. From ideation to publication, these tools will save you hours every week.",
    "🎯 The future of social media is here! Learn how AI is helping creators build authentic connections while scaling their content production.",
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleHashtagToggle = (hashtag: string) => {
    setSelectedHashtags(prev => 
      prev.includes(hashtag) 
        ? prev.filter(h => h !== hashtag)
        : [...prev, hashtag]
    );
  };

  const generateAIContent = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setContent(randomSuggestion);
    setIsGenerating(false);
  };

  const getCharacterCount = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? content.length : 0;
  };

  const getCharacterLimit = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.limit : 0;
  };

  const getPlatformPreview = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
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
          <Badge variant={isOverLimit ? "destructive" : "secondary"} className="text-xs">
            {charCount}/{charLimit}
          </Badge>
        </div>
        
        <div className="bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-4">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">WA</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Wahid Ahmed</p>
              <p className="text-xs text-muted-foreground">@wahidahmed</p>
            </div>
          </div>
          
          <p className={`text-sm whitespace-pre-wrap ${isOverLimit ? 'text-destructive' : ''}`}>
            {content}
          </p>
          
          {selectedHashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {selectedHashtags.map(tag => (
                <span key={tag} className={`text-xs ${platform.textColor} hover:underline cursor-pointer`}>
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
            className={`h-1 ${isOverLimit ? '[&>div]:bg-destructive' : ''}`}
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
            <h1 className="text-responsive-3xl font-bold gradient-text">Create New Post</h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Craft engaging content with AI assistance
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="glass-hover interactive-subtle">
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-responsive">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-responsive">
            {/* Content Editor */}
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>Content Creation</span>
                </CardTitle>
                <CardDescription>Write your post or let AI help you create it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="content" className="text-responsive-sm font-medium">Post Content</Label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind? Share your thoughts with the world..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="resize-none focus-ring text-responsive-sm"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="interactive-subtle">
                        <Image className="w-4 h-4 mr-2" />
                        Media
                      </Button>
                      <Button variant="ghost" size="sm" className="interactive-subtle">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm" className="interactive-subtle">
                        <Smile className="w-4 h-4 mr-2" />
                        Emoji
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {content.length} characters
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="brand-voice"
                      checked={useBrandVoice}
                      onCheckedChange={setUseBrandVoice}
                    />
                    <div>
                      <Label htmlFor="brand-voice" className="text-responsive-sm font-medium">Use My Brand Voice</Label>
                      <p className="text-xs text-muted-foreground">AI will match your writing style</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={generateAIContent}
                    disabled={isGenerating}
                    className="gradient-primary interactive"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card className="glass-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Select Platforms</span>
                </CardTitle>
                <CardDescription>Choose where to publish your content</CardDescription>
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
                        <span className="text-2xl mb-3 block">{platform.icon}</span>
                        <span className="text-responsive-sm font-medium block">{platform.name}</span>
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
            <Card className="glass-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Hash className="w-5 h-5 text-primary" />
                  <span>Trending Hashtags</span>
                </CardTitle>
                <CardDescription>Add popular hashtags to boost visibility</CardDescription>
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
            <Card className="glass-card animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Schedule Post</span>
                </CardTitle>
                <CardDescription>Choose when to publish your content for maximum engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-responsive-sm font-medium">Date</Label>
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
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
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
                    <Label htmlFor="time" className="text-responsive-sm font-medium">Time</Label>
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
                    <span className="text-sm font-medium text-success">Optimal Timing</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on your audience, the best time to post is between 2-4 PM on weekdays
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
                <CardDescription>See how your post will appear on each platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlatforms.length === 0 || !content ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-muted-foreground opacity-50" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">No preview available</p>
                    <p className="text-xs text-muted-foreground">
                      Select platforms and add content to see preview
                    </p>
                  </div>
                ) : (
                  selectedPlatforms.map((platformId, index) => (
                    <div key={platformId} style={{ animationDelay: `${index * 0.1}s` }}>
                      {getPlatformPreview(platformId)}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreatePost;