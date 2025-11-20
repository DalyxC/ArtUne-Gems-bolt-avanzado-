import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Music2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Music2 className="w-6 h-6 text-primary" />
          <span>ArtUne</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/artists" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Artists
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/auth/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/auth/role">
            <Button size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
