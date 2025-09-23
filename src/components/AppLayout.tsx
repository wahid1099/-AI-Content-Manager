import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-mesh">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/20 bg-gradient-glass backdrop-blur-md flex items-center justify-between px-6 shadow-glass animate-slide-up">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="hover:bg-primary/10 transition-spring rounded-xl" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-pulse-glow">
                  <span className="text-primary-foreground font-bold text-lg">AI</span>
                </div>
                <h1 className="font-semibold text-xl text-slate-800 dark:text-foreground hidden sm:block">
                  AI Content Manager
                </h1>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-9 h-9 rounded-xl glass-hover interactive-subtle"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-9 h-9 rounded-xl glass-hover interactive-subtle relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
              
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-6 animate-fade-in overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}