"use client";

import { ProfileCourseprops, ProfileStatsProps } from "@/type/dashboard/profile";
import ProfileCourse from "./profile-course";
import ProfileHeader from "./profile-header";
import ProfileStats from "./profile-stats";



export default function Profile({ profileCourse, profileStats }: { profileCourse: ProfileCourseprops, profileStats: ProfileStatsProps }) {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Stats Grid */}
        <ProfileStats profileStats={profileStats} />

        {/* Main Content Tabs */}
        <ProfileCourse profileCourse={profileCourse} />
      </main>
    </div>
  );
}
