import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  CreditCard, 
  Shield, 
  Link as LinkIcon, 
  Check, 
  X, 
  Camera,
  Crown,
  Users,
  Bell,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Plus,
  Trash2,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor
} from "lucide-react";

const Settings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [theme, setTheme] = useState("light");
  
  const connectedAccounts = [
    {
      platform: "LinkedIn",
      connected: true,
      username: "@wahid.pro",
      color: "bg-linkedin",
      textColor: "text-linkedin",
      followers: "2.5K",
      icon: "💼"
    },
    {
      platform: "Twitter",
      connected: true,
      username: "@wahid_dev",
      color: "bg-twitter",
      textColor: "text-twitter",
      followers: "1.2K",
      icon: "🐦"
    },
    {
      platform: "Instagram",
      connected: false,
      username: "",
      color: "bg-instagram",
      textColor: "text-instagram",
      followers: "",
      icon: "📸"
    },
    {
      platform: "Facebook",
      connected: false,
      username: "",
      color: "bg-blue-600",
      textColor: "text-blue-600",
      followers: "",
      icon: "📘"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      features: ["3 connected accounts", "50 AI posts/month", "Basic analytics", "Email support"],
      current: false,
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      features: ["10 connected accounts", "200 AI posts/month", "Advanced analytics", "Priority support", "Team collaboration"],
      current: true,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      features: ["Unlimited accounts", "Unlimited AI posts", "Enterprise analytics", "24/7 support", "White-label", "Custom integrations"],
      current: false,
      popular: false
    }
  ];

  const teamMembers = [
    { name: "Sarah Johnson", email: "sarah@company.com", role: "Editor", avatar: "SJ" },
    { name: "Mike Chen", email: "mike@company.com", role: "Viewer", avatar: "MC" }
  ];

  return (
    <AppLayout>
      <div className="space-y-responsive animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-responsive-3xl font-bold gradient-text">Settings</h1>
            <p className="text-muted-foreground text-responsive-base mt-2">
              Manage your account preferences and configurations
            </p>
          </div>
          <Button className="gradient-primary interactive">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="animate-scale-in">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6 glass-card">
            <TabsTrigger value="profile" className="interactive-subtle">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="interactive-subtle">
              <LinkIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="interactive-subtle">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="interactive-subtle">
              <Bell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="interactive-subtle">
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="interactive-subtle">
              <SettingsIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-responsive">
              {/* Profile Information */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-primary" />
                      <span>Profile Information</span>
                    </CardTitle>
                    <CardDescription>Update your personal information and profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="relative group">
                        <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                            WA
                          </AvatarFallback>
                        </Avatar>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full glass-hover opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-responsive-lg">Wahid Ahmed</h3>
                        <p className="text-muted-foreground text-responsive-sm">Content Creator & AI Enthusiast</p>
                        <Badge variant="secondary" className="mt-2">Pro Plan</Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>First Name</span>
                        </Label>
                        <Input id="firstName" defaultValue="Wahid" className="focus-ring" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Last Name</span>
                        </Label>
                        <Input id="lastName" defaultValue="Ahmed" className="focus-ring" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address</span>
                        </Label>
                        <Input id="email" type="email" defaultValue="wahid@example.com" className="focus-ring" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone Number</span>
                        </Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" className="focus-ring" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Location</span>
                        </Label>
                        <Input id="location" defaultValue="San Francisco, CA" className="focus-ring" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website" className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>Website</span>
                        </Label>
                        <Input id="website" defaultValue="https://wahidahmed.com" className="focus-ring" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue="Digital marketing enthusiast and content creator passionate about AI-powered social media strategies."
                        rows={4}
                        className="focus-ring resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Stats */}
              <div className="space-y-responsive">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-responsive-lg">Profile Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Posts Created</span>
                      <span className="font-semibold">127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Engagement</span>
                      <span className="font-semibold">12.5K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Followers Growth</span>
                      <span className="font-semibold text-success">+23%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="font-semibold">Jan 2024</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-responsive-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start glass-hover interactive-subtle">
                      <Calendar className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start glass-hover interactive-subtle">
                      <Users className="w-4 h-4 mr-2" />
                      Invite Team
                    </Button>
                    <Button variant="outline" className="w-full justify-start glass-hover interactive-subtle text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-responsive">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LinkIcon className="w-5 h-5 text-primary" />
                  <span>Connected Social Accounts</span>
                </CardTitle>
                <CardDescription>
                  Manage your connected social media platforms for content publishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedAccounts.map((account, index) => (
                  <div 
                    key={account.platform} 
                    className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 hover:border-primary/20 hover:shadow-soft transition-spring animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl ${account.color} flex items-center justify-center text-white shadow-glow`}>
                        <span className="text-xl">{account.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-responsive-sm">{account.platform}</h4>
                        {account.connected ? (
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">{account.username}</p>
                            <p className="text-xs text-muted-foreground">{account.followers} followers</p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {account.connected ? (
                        <>
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            <Check className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm" className="glass-hover interactive-subtle">
                            Manage
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive interactive-subtle">
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button className="gradient-primary interactive">
                          <Plus className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-responsive">
              {/* Subscription Plans */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span>Subscription Plans</span>
                    </CardTitle>
                    <CardDescription>Choose the plan that best fits your needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {plans.map((plan, index) => (
                        <div
                          key={plan.name}
                          className={`relative p-6 rounded-xl border-2 transition-spring transform hover:scale-[1.01] animate-fade-in ${
                            plan.current 
                              ? 'border-primary bg-primary/5 shadow-glow' 
                              : 'border-border/20 hover:border-primary/50 glass-hover'
                          }`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {plan.popular && (
                            <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
                              Most Popular
                            </Badge>
                          )}
                          {plan.current && (
                            <Badge className="absolute -top-3 right-6 bg-success text-success-foreground">
                              Current Plan
                            </Badge>
                          )}
                          
                          <div className="flex items-start justify-between">
                            <div className="space-y-4 flex-1">
                              <div className="flex items-center space-x-3">
                                {plan.name === 'Enterprise' && <Crown className="w-5 h-5 text-warning" />}
                                {plan.name === 'Professional' && <Users className="w-5 h-5 text-primary" />}
                                {plan.name === 'Starter' && <User className="w-5 h-5 text-muted-foreground" />}
                                <h3 className="font-bold text-responsive-lg">{plan.name}</h3>
                              </div>
                              
                              <div className="flex items-baseline space-x-2">
                                <span className="text-responsive-2xl font-bold gradient-text">{plan.price}</span>
                                <span className="text-muted-foreground">{plan.period}</span>
                              </div>
                              
                              <ul className="space-y-2">
                                {plan.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-center space-x-3">
                                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                                    <span className="text-responsive-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="ml-6">
                              {plan.current ? (
                                <Button variant="outline" disabled className="interactive-subtle">
                                  Current Plan
                                </Button>
                              ) : (
                                <Button 
                                  className={plan.popular ? "gradient-primary interactive" : "variant-outline glass-hover interactive-subtle"}
                                >
                                  {plan.name === 'Enterprise' ? 'Upgrade' : 'Change Plan'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Billing Information */}
              <div className="space-y-responsive">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-responsive-lg">Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Payment Method</Label>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                          <span className="text-sm font-medium">•••• 4242</span>
                        </div>
                        <Button variant="ghost" size="sm" className="interactive-subtle">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Next Billing Date</Label>
                      <p className="text-sm text-muted-foreground">December 15, 2024</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Billing Address</Label>
                      <p className="text-sm text-muted-foreground">
                        123 Main St<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>

                    <Button variant="outline" className="w-full glass-hover interactive-subtle">
                      Update Billing Info
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-responsive-lg">Usage This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">AI Posts Generated</span>
                        <span className="font-semibold">47 / 200</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '23.5%' }} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Connected Accounts</span>
                        <span className="font-semibold">2 / 10</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '20%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-responsive">
            <Card className="glass-card">
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
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                    <div className="space-y-1">
                      <Label className="text-responsive-sm font-medium">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                    <div className="space-y-1">
                      <Label className="text-responsive-sm font-medium">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                    <div className="space-y-1">
                      <Label className="text-responsive-sm font-medium">Marketing Emails</Label>
                      <p className="text-xs text-muted-foreground">Receive product updates and tips</p>
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Email Frequency</h4>
                  <Select defaultValue="daily">
                    <SelectTrigger className="glass-hover">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly summary</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-responsive">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>Manage your account security and privacy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Change Password</Label>
                      <div className="space-y-3">
                        <Input type="password" placeholder="Current password" className="focus-ring" />
                        <Input type="password" placeholder="New password" className="focus-ring" />
                        <Input type="password" placeholder="Confirm new password" className="focus-ring" />
                      </div>
                      <Button variant="outline" className="glass-hover interactive-subtle">
                        Update Password
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                      <div className="space-y-1">
                        <Label className="text-responsive-sm font-medium">Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-responsive-lg">Login Activity</CardTitle>
                  <CardDescription>Recent login sessions and devices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">iPhone 15 Pro</p>
                          <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Current
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">MacBook Pro</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full glass-hover interactive-subtle">
                    View All Sessions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-responsive">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-primary" />
                    <span>Appearance</span>
                  </CardTitle>
                  <CardDescription>Customize your interface appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Theme Preference</Label>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Appearance Mode</p>
                        <p className="text-xs text-muted-foreground">
                          Use the theme toggle in the header to switch between light, dark, and system modes
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="w-4 h-4 text-warning" />
                        <Moon className="w-4 h-4 text-primary" />
                        <Monitor className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="glass-hover">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger className="glass-hover">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time</SelectItem>
                        <SelectItem value="est">Eastern Standard Time</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="cet">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Team Management</span>
                  </CardTitle>
                  <CardDescription>Manage team members and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div 
                        key={member.email}
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs font-semibold">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {member.role}
                          </Badge>
                          <Button variant="ghost" size="sm" className="interactive-subtle">
                            <SettingsIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full gradient-primary interactive">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Team Member
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;