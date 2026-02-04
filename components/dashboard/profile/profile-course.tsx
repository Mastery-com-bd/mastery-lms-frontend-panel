"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCourseprops } from "@/type/dashboard/profile";
import {
  Award,
  Flame,
  PlayCircle,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const enrolledCourses = [
  {
    id: 1,
    title: "Complete React Masterclass",
    instructor: "John Smith",
    progress: 75,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    lastAccessed: "2 hours ago",
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    instructor: "Sarah Wilson",
    progress: 45,
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop",
    lastAccessed: "1 day ago",
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    instructor: "Mike Chen",
    progress: 100,
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
    lastAccessed: "5 days ago",
  },
];

const achievements = [
  {
    id: 1,
    title: "Fast Learner",
    desc: "Complete 5 lessons in one day",
    icon: Zap,
    unlocked: true,
  },
  {
    id: 2,
    title: "Streak Master",
    desc: "7 day learning streak",
    icon: Flame,
    unlocked: true,
  },
  {
    id: 3,
    title: "Course Complete",
    desc: "Finish your first course",
    icon: Trophy,
    unlocked: true,
  },
  {
    id: 4,
    title: "Top Student",
    desc: "Score 100% on a quiz",
    icon: Star,
    unlocked: false,
  },
  {
    id: 5,
    title: "Dedicated",
    desc: "30 day learning streak",
    icon: Target,
    unlocked: false,
  },
];

const certificates = [
  {
    id: 1,
    title: "Node.js Backend Development",
    issueDate: "Dec 10, 2024",
    instructor: "Mike Chen",
  },
];

const ProfileCourse = ({ profileCourse }: { profileCourse: ProfileCourseprops }) => {
  return (
    <div>
      <Tabs defaultValue="courses" className="space-y-8">
        <TabsList className="max-w-150 bg-transparent  w-full justify-start h-auto p-0 gap-8 rounded-none">
          <TabsTrigger
            value="courses"
            className="data-[state=active]:bg-transparent focus:outline-none data-[state=active]:shadow-none data-[state=active]:border-t-0 data-[state=active]:border-r-0 data-[state=active]:border-l-0 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 text-lg font-bold transition-all"
          >
            My Courses
          </TabsTrigger>
          <TabsTrigger
            value="certificates"
            className="data-[state=active]:bg-transparent focus:outline-none data-[state=active]:shadow-none data-[state=active]:border-t-0 data-[state=active]:border-r-0 data-[state=active]:border-l-0 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 text-lg font-bold transition-all"
          >
            Certificates
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6 mt-6">
          {profileCourse.data.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white border border-border p-4 flex flex-col md:flex-row gap-6 rounded-none shadow-xs group relative">
                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold ${
                    course.progress === 100
                      ? "bg-green-100 text-green-700"
                      : "bg-[#EBEBFF] text-indigo-600"
                  }`}
                >
                  {course.progress === 100 ? "Completed" : "In Progress"}
                </span>

                {/* Thumbnail */}
                <div className="relative w-full md:w-64 aspect-video shrink-0 rounded-none overflow-hidden">
                  <Image
                    fill
                    src={course.course.thumbnail}
                    alt={course.course.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                      <PlayCircle className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div></div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground line-clamp-1">
                      {course.course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Course by:{" "}
                      <span className="text-foreground/80">
                        {course.course.instructor}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">
                        Progress
                      </span>
                      <span className="text-foreground font-bold">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-green-600 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground">
                        Last accessed: {course.lastAccessedAt}
                      </span>
                      <Link href={`/dashboard/my-courses/${course.course.id}`}>
                        <Button className="bg-[#CC0000] hover:bg-[#B30000] text-white rounded-none px-8 font-bold h-10">
                          {course.progress === 100 ? "Review" : "Continue"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card
                  className={`bg-card border-border ${
                    !achievement.unlocked && "opacity-50"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-linear-to-br from-primary to-accent"
                            : "bg-muted"
                        }`}
                      >
                        <achievement.icon
                          className={`w-7 h-7 ${
                            achievement.unlocked
                              ? "text-white"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.desc}
                        </p>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="mt-4 bg-success/10 text-success border-success/20">
                        Unlocked
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="bg-card border-border overflow-hidden"
                >
                  <div className="h-40 bg-linear-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center">
                    <Award className="w-16 h-16 text-primary" />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-foreground mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Issued on {cert.issueDate} • by {cert.instructor}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View
                      </Button>
                      <Button variant="gradient" size="sm" className="flex-1">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  No Certificates Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Complete courses to earn certificates
                </p>
                <Link href="/courses">
                  <Button variant="gradient">Browse Courses</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileCourse;
