import { Home, Search, Calendar, MessageSquare, CreditCard, Settings, Heart, HelpCircle, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const ClientSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/client/dashboard", icon: Home, badge: null },
    { name: "Find Artists", path: "/client/find-artists", icon: Search, badge: null },
    { name: "My Bookings", path: "/client/bookings", icon: Calendar, badge: 3 },
    { name: "Messages", path: "/client/messages", icon: MessageSquare, badge: 5 },
    { name: "Payments", path: "/client/payments", icon: CreditCard, badge: null },
    { name: "Settings", path: "/client/settings", icon: Settings, badge: null },
  ];

  const secondaryItems = [
    { name: "Favorites", path: "/client/favorites", icon: Heart, badge: 12 },
    { name: "Help Center", path: "/client/help", icon: HelpCircle, badge: null },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-20"
      } bg-card border-r border-border h-screen sticky top-0 transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Logo & Toggle */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">A</span>
          </div>
          {isExpanded && (
            <div className="overflow-hidden">
              <h1 className="text-lg font-bold text-foreground whitespace-nowrap">ArtUne</h1>
              <p className="text-xs text-muted-foreground whitespace-nowrap">Client Portal</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                    active
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 rounded-lg bg-primary opacity-10 blur-xl"></div>
                  )}
                  <Icon className={`${isExpanded ? "w-5 h-5" : "w-6 h-6 mx-auto"} flex-shrink-0 relative z-10`} />
                  {isExpanded && (
                    <span className="font-medium whitespace-nowrap relative z-10">{item.name}</span>
                  )}
                  {item.badge && isExpanded && (
                    <Badge 
                      variant="secondary" 
                      className="ml-auto bg-accent text-accent-foreground text-xs px-2"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {!isExpanded && <ChevronRight className="w-4 h-4 absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </Link>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent side="right" className="flex items-center gap-2">
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 bg-accent text-accent-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-border"></div>

        {/* Secondary Items */}
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className={`${isExpanded ? "w-5 h-5" : "w-6 h-6 mx-auto"} flex-shrink-0`} />
                  {isExpanded && (
                    <span className="font-medium whitespace-nowrap">{item.name}</span>
                  )}
                  {item.badge && isExpanded && (
                    <Badge variant="secondary" className="ml-auto text-xs px-2">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent side="right">
                  {item.name}
                  {item.badge && ` (${item.badge})`}
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-4">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
              </div>
              {isExpanded && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              )}
            </div>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
        
        {isExpanded && (
          <button className="w-full mt-3 flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};
