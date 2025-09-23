import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Save,
  Edit3
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Wahid Ahmed",
    email: "wahid@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Digital marketing enthusiast and content creator passionate about AI-powered social media strategies.",
    website: "https://wahidahmed.com",
    joinDate: "January 2024"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false
  });

  const connectedAccounts = [
    { platform: "Twitter", username: "@wahidahmed", connected: true, followers: "12.5K" },
    { platform: "LinkedIn", username: "wahid-ahmed", connected: true, followers: "8.2K" },
    { platform: "Instagram", username: "@wahid.creates", connected: true, followers: "15.8K" },
    { platform: "Facebook", username: "Wahid Ahmed", connected: false, followers: "0" },
    { platform: "TikTok", username: "@wahidcreates", connected: false, followers: "0" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">Profile Settings</h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Manage your account settings and preferences
            </p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="interactive gradient-primary"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-responsive">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-responsive">
            {/* Basic Information */}
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                        WA
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full glass-hover"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-responsive-lg">{profileData.name}</h3>
                    <p className="text-muted-foreground text-responsive-sm">Member since {profileData.joinDate}</p>
                    <Badge variant="secondary" className="mt-2">
                      Pro Plan
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="focus-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="focus-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number</span>
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="focus-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      className="focus-ring"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    disabled={!isEditing}
                    className="focus-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                    className="focus-ring resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="glass-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about your account activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-responsive-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, emailNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-responsive-sm font-medium">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, pushNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-responsive-sm font-medium">Weekly Reports</Label>
                    <p className="text-xs text-muted-foreground">Get weekly analytics reports</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, weeklyReports: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-responsive-sm font-medium">Marketing Emails</Label>
                    <p className="text-xs text-muted-foreground">Receive product updates and tips</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, marketingEmails: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-responsive">
            {/* Connected Accounts */}
            <Card className="glass-card animate-slide-left">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>Connected Accounts</span>
                </CardTitle>
                <CardDescription>
                  Manage your social media connections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedAccounts.map((account, index) => (
                  <div 
                    key={account.platform} 
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        account.platform === 'Twitter' ? 'bg-twitter/10 text-twitter' :
                        account.platform === 'LinkedIn' ? 'bg-linkedin/10 text-linkedin' :
                        account.platform === 'Instagram' ? 'bg-instagram/10 text-instagram' :
                        'bg-muted/20 text-muted-foreground'
                      }`}>
                        <span className="text-xs font-bold">
                          {account.platform.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{account.platform}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.connected ? account.username : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={account.connected ? 'default' : 'secondary'} className="text-xs">
                        {account.connected ? 'Connected' : 'Connect'}
                      </Badge>
                      {account.connected && (
                        <p className="text-xs text-muted-foreground mt-1">{account.followers}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="glass-card animate-slide-left" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Account Security</span>
                </CardTitle>
                <CardDescription>
                  Keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start glass-hover interactive-subtle">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start glass-hover interactive-subtle">
                  <Bell className="w-4 h-4 mr-2" />
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start glass-hover interactive-subtle">
                  <Calendar className="w-4 h-4 mr-2" />
                  Login History
                </Button>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card className="glass-card animate-slide-left" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>
                  Customize your interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="glass-hover interactive-subtle">
                    Light
                  </Button>
                  <Button variant="outline" size="sm" className="glass-hover interactive-subtle">
                    Dark
                  </Button>
                </div>
                <Button variant="outline" className="w-full justify-start glass-hover interactive-subtle">
                  <Palette className="w-4 h-4 mr-2" />
                  Custom Theme
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;