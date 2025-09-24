import {
  Home,
  PenTool,
  BarChart3,
  Settings,
  User,
  Calendar,
  BookOpen,
  Sparkles,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Create Post", url: "/create-post", icon: PenTool },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Templates", url: "/templates", icon: BookOpen },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-border/20 bg-gradient-glass backdrop-blur-xl shadow-glass">
      <SidebarContent className="p-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-muted-foreground uppercase tracking-wider mb-3">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `group flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-spring transform hover:scale-[1.01] ${
                          isActive
                            ? "gradient-primary text-primary-foreground shadow-glow"
                            : "hover:bg-primary/10 text-slate-700 dark:text-foreground/80 hover:text-slate-900 dark:hover:text-foreground"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={`w-5 h-5 transition-spring ${
                              isActive
                                ? "text-primary-foreground"
                                : "text-slate-500 dark:text-muted-foreground group-hover:text-primary"
                            }`}
                          />
                          <span className="font-medium text-responsive-sm">
                            {item.title}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4 bg-border/30" />

        {/* Account Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-muted-foreground uppercase tracking-wider mb-3">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `group flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-spring transform hover:scale-[1.01] ${
                          isActive
                            ? "gradient-primary text-primary-foreground shadow-glow"
                            : "hover:bg-primary/10 text-slate-700 dark:text-foreground/80 hover:text-slate-900 dark:hover:text-foreground"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={`w-5 h-5 transition-spring ${
                              isActive
                                ? "text-primary-foreground"
                                : "text-slate-500 dark:text-muted-foreground group-hover:text-primary"
                            }`}
                          />
                          <span className="font-medium text-responsive-sm">
                            {item.title}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-border/20">
        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/20 mb-3">
          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
            <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate text-slate-800 dark:text-foreground">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-500 dark:text-muted-foreground truncate">
              {user?.role === "admin" ? "Admin" : "Pro Plan"}
            </p>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 mb-3">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Upgrade to Pro
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-muted-foreground mb-3">
            Unlock unlimited AI posts and advanced analytics
          </p>
          <Button
            size="sm"
            className="w-full gradient-primary interactive text-xs"
          >
            Upgrade Now
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start glass-hover interactive-subtle text-slate-700 dark:text-foreground hover:text-slate-900 dark:hover:text-foreground"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="text-responsive-sm">Sign Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
