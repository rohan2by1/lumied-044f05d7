
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    try {
      const userData = JSON.parse(currentUser);
      setProfile({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "student"
      });
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: "There was a problem loading your profile data."
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          const userData = JSON.parse(currentUser);
          const updatedUser = { ...userData, ...profile };
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));

          toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully."
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "There was a problem updating your profile."
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role"
                    value={profile.role}
                    disabled
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
