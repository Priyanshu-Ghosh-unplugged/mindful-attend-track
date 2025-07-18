import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-brass rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-poppins font-semibold text-lg">
              Mindful<span className="text-brass">Track</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-brass transition-colors duration-200 font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Navigating to ${item.label} section...`);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => alert('Login: Welcome back to MindfulTrack!')}
            >
              Login
            </Button>
            <Button 
              variant="brass"
              onClick={() => window.open('#pricing', '_self')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-brass" />
            ) : (
              <Menu className="w-6 h-6 text-brass" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-muted-foreground hover:text-brass transition-colors duration-200 font-medium cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    alert(`Navigating to ${item.label} section...`);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 space-y-3 border-t border-border/50">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    alert('Login: Welcome back to MindfulTrack!');
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="brass" 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.open('#pricing', '_self');
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;