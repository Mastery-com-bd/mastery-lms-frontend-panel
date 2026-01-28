"use client"

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Award,
  Trophy,
  Star,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Edit,
  Share2,
  Flame,
  Target,
  Zap,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="bg-card border-border overflow-hidden mb-8 pt-0">
          <div className="h-32 bg-linear-to-r from-primary via-primary/80 to-accent" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">
                      John Doe
                    </h1>
                    <p className="text-muted-foreground">
                      Full Stack Developer | Lifelong Learner
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
                San Francisco, CA
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined January 2024
              </span>
              <span className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                johndoe.dev
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Courses Enrolled", value: "8", icon: BookOpen },
            { label: "Hours Learned", value: "124", icon: Clock },
            { label: "Certificates", value: "3", icon: Award },
            { label: "Current Streak", value: "12 days", icon: Flame },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            {enrolledCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-card border-border overflow-hidden py-0">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative p-4">
                        <div className="relative w-full md:w-48 h-full my-auto rounded-2xl overflow-hidden">
                          <Image
                            width={200}
                            height={130}
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                          <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              by {course.instructor}
                            </p>
                          </div>
                          {course.progress === 100 ? (
                            <Badge className="bg-success">Completed</Badge>
                          ) : (
                            <Badge variant="secondary">In Progress</Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-medium text-foreground">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-muted-foreground">
                            Last accessed: {course.lastAccessed}
                          </span>
                          <Link href={`/course/${course.id}`}>
                            <Button size="sm" variant="gradient">
                              {course.progress === 100 ? "Review" : "Continue"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
      </main>
    </div>
  );
}
