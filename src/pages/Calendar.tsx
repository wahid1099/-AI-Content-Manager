import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Mock scheduled posts data
  const scheduledPosts = [
    {
      id: 1,
      title: "AI Revolution in Content Creation",
      platform: "LinkedIn",
      date: new Date(2024, 11, 15, 14, 0),
      status: "scheduled",
      type: "article"
    },
    {
      id: 2,
      title: "5 Tips for Better Social Media Engagement",
      platform: "Twitter",
      date: new Date(2024, 11, 15, 16, 30),
      status: "scheduled",
      type: "thread"
    },
    {
      id: 3,
      title: "Behind the Scenes: AI Content Creation",
      platform: "Instagram",
      date: new Date(2024, 11, 16, 18, 0),
      status: "draft",
      type: "reel"
    },
    {
      id: 4,
      title: "Weekly Analytics Report",
      platform: "LinkedIn",
      date: new Date(2024, 11, 18, 9, 0),
      status: "scheduled",
      type: "post"
    },
    {
      id: 5,
      title: "Product Launch Announcement",
      platform: "Twitter",
      date: new Date(2024, 11, 20, 12, 0),
      status: "scheduled",
      type: "post"
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => isSameDay(post.date, date));
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'bg-twitter text-white';
      case 'linkedin': return 'bg-linkedin text-white';
      case 'instagram': return 'bg-instagram text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-success/10 text-success border-success/20';
      case 'draft': return 'bg-warning/10 text-warning border-warning/20';
      case 'published': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">Content Calendar</h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Plan and schedule your content across all platforms
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="glass-hover interactive-subtle">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="gradient-primary interactive">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-responsive">
          {/* Calendar View */}
          <div className="xl:col-span-3">
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevMonth}
                      className="glass-hover interactive-subtle"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-responsive-xl font-bold gradient-text">
                      {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextMonth}
                      className="glass-hover interactive-subtle"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('month')}
                      className="interactive-subtle"
                    >
                      Month
                    </Button>
                    <Button
                      variant={viewMode === 'week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('week')}
                      className="interactive-subtle"
                    >
                      Week
                    </Button>
                    <Button
                      variant={viewMode === 'day' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('day')}
                      className="interactive-subtle"
                    >
                      Day
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const postsForDay = getPostsForDate(day);
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <div
                        key={day.toISOString()}
                        className={`min-h-[100px] p-2 border border-border/20 rounded-lg cursor-pointer transition-spring hover:bg-muted/20 animate-fade-in ${
                          isSelected ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                        } ${isToday ? 'bg-primary/10' : ''}`}
                        style={{ animationDelay: `${index * 0.01}s` }}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className={`text-sm font-medium mb-2 ${
                          isSameMonth(day, currentDate) ? 'text-foreground' : 'text-muted-foreground'
                        } ${isToday ? 'text-primary font-bold' : ''}`}>
                          {format(day, 'd')}
                        </div>
                        
                        <div className="space-y-1">
                          {postsForDay.slice(0, 2).map(post => (
                            <div
                              key={post.id}
                              className={`text-xs p-1 rounded text-white truncate ${getPlatformColor(post.platform)}`}
                            >
                              {format(post.date, 'HH:mm')} {post.title.slice(0, 15)}...
                            </div>
                          ))}
                          {postsForDay.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{postsForDay.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-responsive">
            {/* Selected Date Posts */}
            <Card className="glass-card animate-slide-left">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span>{format(selectedDate, 'MMM d, yyyy')}</span>
                </CardTitle>
                <CardDescription>
                  {getPostsForDate(selectedDate).length} scheduled posts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getPostsForDate(selectedDate).length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground text-sm">No posts scheduled for this date</p>
                    <Button size="sm" className="mt-4 gradient-primary interactive">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Post
                    </Button>
                  </div>
                ) : (
                  getPostsForDate(selectedDate).map((post, index) => (
                    <div 
                      key={post.id} 
                      className="p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 hover:border-primary/20 hover:shadow-soft transition-spring animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getPlatformColor(post.platform)}>
                          {post.platform}
                        </Badge>
                        <Button variant="ghost" size="icon" className="w-6 h-6">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <h4 className="font-medium text-sm mb-2 line-clamp-2">{post.title}</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{format(post.date, 'HH:mm')}</span>
                        </div>
                        <Badge variant="outline" className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-card animate-slide-left" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="text-responsive-lg">This Month</CardTitle>
                <CardDescription>Content overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Scheduled Posts</span>
                  <span className="font-semibold">{scheduledPosts.filter(p => p.status === 'scheduled').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Draft Posts</span>
                  <span className="font-semibold">{scheduledPosts.filter(p => p.status === 'draft').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Published</span>
                  <span className="font-semibold">{scheduledPosts.filter(p => p.status === 'published').length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Platform Distribution */}
            <Card className="glass-card animate-slide-left" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-responsive-lg">Platform Distribution</CardTitle>
                <CardDescription>Posts by platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Twitter', 'LinkedIn', 'Instagram'].map((platform, index) => {
                  const count = scheduledPosts.filter(p => p.platform === platform).length;
                  const percentage = (count / scheduledPosts.length) * 100;
                  
                  return (
                    <div key={platform} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{platform}</span>
                        <span className="text-sm text-muted-foreground">{count} posts</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${getPlatformColor(platform)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Calendar;