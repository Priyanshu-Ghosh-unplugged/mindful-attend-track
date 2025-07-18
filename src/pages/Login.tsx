import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login attempted with: ${formData.email}`);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Logging in with ${provider}...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-md">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins mb-4">
              Welcome <span className="bg-gradient-brass bg-clip-text text-transparent">Back</span>
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your engagement dashboard
            </p>
          </div>

          {/* Login Card */}
          <Card className="p-8 bg-gradient-card border-accent/20 shadow-elegant">
            
            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleSocialLogin('Google')}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <Github className="w-4 h-4 mr-2" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative mb-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
                or continue with email
              </span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="text-brass hover:underline"
                  onClick={() => alert('Password reset email sent!')}
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" variant="brass" className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button 
                className="text-brass hover:underline font-medium"
                onClick={() => alert('Sign up form would open here')}
              >
                Sign up
              </button>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <Card className="p-4 bg-gradient-card border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Demo Account:</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Email: demo@mindfultrack.com | Password: demo123
              </p>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-brass hover:underline">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;