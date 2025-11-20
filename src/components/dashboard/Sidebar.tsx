import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  MessageSquare, 
  Briefcase, 
  BarChart3, 
  Star, 
  CreditCard, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      path: "/artist/dashboard" 
    },
    { 
      label: "Bookings", 
      icon: Calendar, 
      path: "/artist/bookings",
      badge: 2 
    },
    { 
      label: "Profile", 
      icon: User, 
      path: "/artist/profile" 
    },
    { 
      label: "Messages", 
      icon: MessageSquare, 
      path: "/artist/messages",
      badge: 2 
    },
    { 
      label: "Job Board", 
      icon: Briefcase, 
      path: "/artist/job-board" 
    },
    { 
      label: "Analytics", 
      icon: BarChart3, 
      path: "/artist/analytics" 
    },
    { 
      label: "Reviews", 
      icon: Star, 
      path: "/artist/reviews" 
    },
    { 
      label: "Payments", 
      icon: CreditCard, 
      path: "/artist/payments" 
    },
    { 
      label: "Settings", 
      icon: Settings, 
      path: "/artist/settings" 
    }
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <aside 
        className={cn(
          "min-h-screen bg-[#0A0A0F] border-r border-border/50 flex flex-col transition-all duration-300",
          isExpanded ? "w-64" : "w-20"
        )}
      >
        {/* Logo & Toggle */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          {isExpanded ? (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">ArtUne</span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center justify-center w-full">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn("h-8 w-8 text-muted-foreground hover:text-foreground", !isExpanded && "ml-0")}
          >
            {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              const navItem = (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    !isExpanded && "justify-center"
                  )}
                >
                  <div className={cn("flex items-center gap-3", !isExpanded && "gap-0")}>
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {isExpanded && <span>{item.label}</span>}
                  </div>
                  {isExpanded && item.badge && (
                    <Badge className="bg-primary text-primary-foreground text-xs px-2">
                      {item.badge}
                    </Badge>
                  )}
                  {!isExpanded && item.badge && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                  )}
                </Link>
              );

              return (
                <li key={item.path} className="relative">
                  {!isExpanded ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {navItem}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-2">
                            {item.badge}
                          </Badge>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    navItem
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 space-y-3">
          {isExpanded ? (
            <>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SA</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0A0A0F] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Sarah Anderson</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Artist Dashboard v1.0.0
              </p>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer">
                      <span className="text-white font-semibold text-sm">SA</span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0A0A0F] rounded-full" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="text-sm">
                  <p className="font-medium">Sarah Anderson</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
