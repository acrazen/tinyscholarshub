// src/app/(main)/more/my-profile/page.tsx
"use client"; 

import { useState, useEffect } from 'react';
import { UserCog, Edit3, Lock, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCurrentUserProfile } from '@/lib/services/userService'; // Use service
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function MyProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await getCurrentUserProfile();
        setUser(profile);
      } catch (error) {
         console.error("Failed to fetch profile:", error);
        toast({
          title: "Error",
          description: "Could not load your profile.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  const handleSaveChanges = () => {
    // In a real app, call a service to update the profile:
    // e.g., const updatedProfile = await updateCurrentUserProfile(user);
    // For now, just simulate:
    if (!user) return;
    console.log("Saving changes (simulated):", user);
    setIsEditing(false);
    toast({
        title: "Profile Updated",
        description: "Your profile information has been saved (simulation).",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
     return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <UserCog className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Profile Not Loaded</h1>
        <p className="text-muted-foreground mb-6">We couldn't load your profile information. Please try again later.</p>
      </div>
    );
  }


  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <UserCog className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account details.
        </p>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader className="items-center text-center p-6 bg-muted/20 rounded-t-xl">
          <Avatar className="w-32 h-32 mb-4 border-4 border-background shadow-md">
            <AvatarImage src={user.profilePhotoUrl} alt={user.name} data-ai-hint="user avatar" />
            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription className="text-base">{user.role}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
            <div className="flex items-center mt-1">
              <Mail className="h-5 w-5 text-muted-foreground mr-2" />
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
             <div className="flex items-center mt-1">
              <Phone className="h-5 w-5 text-muted-foreground mr-2" />
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={user.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address" className="text-sm font-medium">Address (Optional)</Label>
             <div className="flex items-center mt-1">
              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
              <Input
                id="address"
                name="address"
                value={user.address || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your address"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 pt-4 border-t">
            {isEditing ? (
              <Button onClick={handleSaveChanges} className="w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )}
            <Button variant="outline" className="w-full sm:w-auto" disabled={isEditing}>
              <Lock className="mr-2 h-4 w-4" /> Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
