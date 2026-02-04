"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Edit, Link as LinkIcon, Loader2, MapPin, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  profilePhoto: string | null;
  address: string | null;
  bio: string | null;
  role: string;
  gender: string | null;
  dateOfBirth: string | null;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
}

const ProfileHeader = () => {
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        const result = await response.json();
        if (result.success) {
          setUserInfo(result.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="pb-20 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Failed to load profile.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div>
      <Card className="bg-card border-border overflow-hidden mb-8 pt-0">
        <div className="h-32 bg-linear-to-r from-primary via-primary/80 to-accent" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarImage src={userInfo.profilePhoto || ""} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl uppercase">
                {userInfo.fullName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    {userInfo.fullName}
                  </h1>
                  <p className="text-muted-foreground">
                    {userInfo.bio || `${userInfo.role} | Lifelong Learner`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Link href="/dashboard/settings">
                    <Button variant="gradient" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {userInfo.address || "Not specified"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined{" "}
              {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 lowercase">
              <LinkIcon className="w-4 h-4" />
              {userInfo.email}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileHeader;
