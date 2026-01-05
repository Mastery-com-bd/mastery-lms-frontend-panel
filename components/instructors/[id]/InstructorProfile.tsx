"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllCourses } from "@/constant/data";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Globe,
  GraduationCap,
  Mail,
  MessageSquare,
  Play,
  Share2,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorProfile = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [isLoadingInstructor, setIsLoadingInstructor] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingInstructor(false);
    }, 1000);
  }, []);

  // Mock data for additional info (would come from extended profile table)
  const instructorDetails = {
    title: "Senior Software Engineer & Educator",
    experience: "10+ years in software development",
    specializations: ["React", "TypeScript", "Node.js", "System Design"],
    achievements: [
      { title: "Top Rated Instructor", count: "4.9 rating" },
      { title: "Students Taught", count: `$999+` },
      { title: "Courses Created", count: "20+" },
    ],
    socialLinks: {
      website: "instructor.dev",
      twitter: "@instructor",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoadingInstructor) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {/* Hero Section with Profile */}
        <section className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-secondary/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 py-8 relative z-10">
            {/* Back Button */}
           
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                {/* Cover Image */}
                <div className="h-32 md:h-48 bg-linear-to-r from-primary via-primary/80 to-accent relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30" />
                </div>

                <CardContent className="relative pt-0 pb-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar */}
                    <motion.div
                      className="-mt-16 lg:-mt-20 shrink-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Avatar className="w-28 h-28 lg:w-36 lg:h-36 border-4 border-background shadow-xl">
                        <AvatarImage
                          src={
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                          }
                        />
                        <AvatarFallback className="text-3xl lg:text-4xl bg-linear-to-br from-primary to-secondary text-primary-foreground">
                          {"Monerul Islam Bishal".charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    {/* Profile Info */}
                    <div className="flex-1 mt-4 lg:mt-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                              {"Monerul Islam Bishal"}
                            </h1>
                            <Badge className="bg-primary/10 text-primary border-primary/20">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mt-1">
                            {instructorDetails.title}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span className="hidden sm:inline">Message</span>
                          </Button>
                          <Button
                            variant="gradient"
                            size="sm"
                            className="gap-2"
                          >
                            <Users className="w-4 h-4" />
                            Follow
                          </Button>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-foreground/80 mt-4 max-w-2xl">
                        Passionate educator dedicated to helping students master
                        modern technologies through practical, hands-on learning
                        experiences.
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          {"3+ years of experience"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          Member since {new Date("2025-01-01").getFullYear()}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Mail className="w-4 h-4" />
                          {"monerul.islam.bishal@gmail.com"}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Globe className="w-4 h-4" />
                          {"https://monerul-islam-bishal.vercel.app"}
                        </span>
                      </div>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {instructorDetails.specializations.map((spec) => (
                          <Badge
                            key={spec}
                            variant="secondary"
                            className="bg-secondary/50"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                {
                  label: "Total Students",
                  value: "1.2K",
                  icon: Users,
                  color: "text-primary",
                },
                {
                  label: "Courses",
                  value: "12",
                  icon: BookOpen,
                  color: "text-secondary",
                },
                {
                  label: "Average Rating",
                  value: "4.9",
                  icon: Star,
                  color: "text-yellow-500",
                },
                {
                  label: "Reviews",
                  value: "2.4K",
                  icon: MessageSquare,
                  color: "text-accent",
                },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center ${stat.color}`}
                        >
                          <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-foreground">
                            {stat.value}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="bg-card border border-border w-full md:w-auto grid grid-cols-3 md:inline-flex">
                <TabsTrigger value="courses" className="gap-2">
                  <BookOpen className="w-4 h-4 hidden sm:block" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="about" className="gap-2">
                  <Award className="w-4 h-4 hidden sm:block" />
                  About
                </TabsTrigger>
                <TabsTrigger value="reviews" className="gap-2">
                  <Star className="w-4 h-4 hidden sm:block" />
                  Reviews
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {AllCourses.slice(0, 3).map((course) => (
                    <motion.div key={course.id} variants={itemVariants}>
                      <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            width={600}
                            height={400}
                            src={
                              course.thumbnail ||
                              "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop"
                            }
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <Badge className="bg-black/50 backdrop-blur-sm">
                              Beginner
                            </Badge>
                            <Badge className="bg-primary/90">
                              ${course.price || "Free"}
                            </Badge>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                              <Play className="w-6 h-6 text-primary-foreground ml-1" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {course.category || "Development"}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Soluta corporis ratione debitis. Quam,
                            assumenda! In iure odio provident omnis rem.
                          </p>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                120
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                4.8
                              </span>
                            </div>
                            <Link href={`/course/${course.id}`}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="gap-1"
                              >
                                View
                                <TrendingUp className="w-3 h-3" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/*  <Card className="border-border/50 bg-card/50">
                    <CardContent className="py-16 text-center">
                      <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No Courses Yet
                      </h3>
                      <p className="text-muted-foreground">
                        This instructor hasn't published any courses yet.
                      </p>
                    </CardContent>
                  </Card> */}
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main About */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          About the Instructor
                        </h3>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <p className="text-foreground/80">
                            With over {instructorDetails.experience} of industry
                            experience, I specialize in teaching modern web
                            development technologies. My teaching philosophy
                            centers on practical, hands-on learning that
                            prepares students for real-world challenges.
                          </p>
                          <p className="text-foreground/80 mt-4">
                            I&apos;ve worked with companies ranging from
                            startups to Fortune 500 enterprises, and I bring
                            that experience directly into my courses. My goal is
                            to help you not just learn, but truly understand and
                            apply the concepts in your own projects and career.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          Teaching Style
                        </h3>
                        <ul className="space-y-3">
                          {[
                            "Project-based learning with real-world examples",
                            "Step-by-step explanations from basics to advanced",
                            "Regular Q&A sessions and community support",
                            "Lifetime access with regular content updates",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                              <span className="text-foreground/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Achievements
                        </h3>
                        <div className="space-y-4">
                          {instructorDetails.achievements.map(
                            (achievement, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                  <Award className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">
                                    {achievement.count}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {achievement.title}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {instructorDetails.specializations.map((spec) => (
                            <Badge
                              key={spec}
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6">
                    {/* Rating Overview */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-border/50">
                      <div className="text-center md:text-left">
                        <div className="text-5xl font-bold text-foreground">
                          4.9
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < 5
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on 2,431 reviews
                        </p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[
                          { stars: 5, percent: 85 },
                          { stars: 4, percent: 10 },
                          { stars: 3, percent: 3 },
                          { stars: 2, percent: 1 },
                          { stars: 1, percent: 1 },
                        ].map((rating) => (
                          <div
                            key={rating.stars}
                            className="flex items-center gap-3"
                          >
                            <span className="text-sm text-muted-foreground w-12">
                              {rating.stars} star
                            </span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${rating.percent}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">
                              {rating.percent}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-6">
                      {[
                        {
                          name: "Alex Johnson",
                          avatar: "AJ",
                          rating: 5,
                          date: "2 weeks ago",
                          comment:
                            "Absolutely fantastic course! The instructor explains complex concepts in a way that's easy to understand. I've learned more in this course than in months of self-study.",
                        },
                        {
                          name: "Sarah Chen",
                          avatar: "SC",
                          rating: 5,
                          date: "1 month ago",
                          comment:
                            "Great teaching style and practical examples. The projects really helped solidify my understanding. Highly recommended for anyone wanting to level up their skills.",
                        },
                        {
                          name: "Mike Williams",
                          avatar: "MW",
                          rating: 4,
                          date: "2 months ago",
                          comment:
                            "Very comprehensive content. Some sections could use more depth, but overall an excellent learning experience. The instructor is very responsive to questions.",
                        },
                      ].map((review, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-4"
                        >
                          <Avatar className="w-10 h-10 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                              <span className="font-medium text-foreground">
                                {review.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, j) => (
                                    <Star
                                      key={j}
                                      className={`w-3 h-3 ${
                                        j < review.rating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-muted"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-foreground/80 mt-2">
                              {review.comment}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center mt-8">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InstructorProfile;
