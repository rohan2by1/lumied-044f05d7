
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const { toast } = useToast();

  // Check if the user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        setUser(JSON.parse(currentUser));
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation, in a real app you would call your API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email);

      if (user && password === "password") {
        // In a real app, you would validate the password properly
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An error occurred during login. Please try again.",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // This is a mock implementation, in a real app you would call your API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: "User with this email already exists.",
        });
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        role: "student",
      };
      
      // Add user to local storage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup error",
        description: "An error occurred during signup. Please try again.",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
