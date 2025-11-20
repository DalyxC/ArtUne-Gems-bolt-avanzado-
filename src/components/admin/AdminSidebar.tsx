import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  MessageSquare,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Artists", icon: Users, path: "/admin/artists", badge: 5 },
  { title: "Clients", icon: UserCheck, path: "/admin/clients" },
  { title: "Bookings", icon: Calendar, path: "/admin/bookings" },
  { title: "Manual Requests", icon: FileText, path: "/admin/manual-requests" },
  { title: "Message Moderation", icon: Shield, path: "/admin/moderation" },
  { title: "Payments", icon: DollarSign, path: "/admin/payments" },
  { title: "Messages", icon: MessageSquare, path: "/admin/messages", badge: 12 },
  { title: "Reports", icon: FileText, path: "/admin/reports" },
  { title: "System Logs", icon: AlertCircle, path: "/admin/logs" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

export function AdminSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {isExpanded && (
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Admin</span>
          </div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-accent transition-colors ml-auto"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          const linkContent = (
            <Link
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                  : "hover:bg-accent text-foreground"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isExpanded && (
                <>
                  <span className="flex-1 font-medium">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );

          if (!isExpanded) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">
                  <div className="flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.path}>{linkContent}</div>;
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        {isExpanded ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Admin User</p>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-muted-foreground">System Active</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">v2.0.0</p>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">System Active</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </aside>
  );
}
