
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, BookOpen, User, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBox from "@/components/search/SearchBox";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">LearnFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent/10">
              Home
            </Link>
            <Link to="/courses" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent/10">
              Courses
            </Link>
            <Link to="/community" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent/10">
              Community
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent/10">
              Contact Us
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent/10">
              About Us
            </Link>
          </nav>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-[200px] lg:w-[300px]">
              <SearchBox />
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center rounded-md text-foreground hover:text-primary hover:bg-muted"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="p-2">
            <SearchBox placeholder="Search courses..." />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <Link
              to="/community"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
              onClick={toggleMenu}
            >
              About Us
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-4">
              <div className="ml-3">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
                      onClick={toggleMenu}
                    >
                      <LayoutDashboard className="mr-2 h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
                      onClick={toggleMenu}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent/10"
                      onClick={toggleMenu}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
