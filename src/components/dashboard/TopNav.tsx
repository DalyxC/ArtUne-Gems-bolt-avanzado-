import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Plus } from "lucide-react";

const TopNav = () => {
  return (
    <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-6">
      {/* Left: Main Navigation Links */}
      <nav className="flex items-center gap-6">
        <Link 
          to="/artist/dashboard" 
          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          to="/artist/bookings" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Bookings
        </Link>
        <Link 
          to="/artist/profile" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Profile
        </Link>
        <Link 
          to="/artist/job-board" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Job Board
        </Link>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
            3
          </Badge>
        </Button>

        {/* New Booking Button */}
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          New Booking
        </Button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer">
          <span className="text-white font-semibold text-sm">SA</span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
