"use client"

import { ArrowRight, Award, BookOpen, Play, Star, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { GradientText } from "../ui/GradientText";
import { Button } from "../ui/button";
import Link from "next/link";
import { StatCard } from "../ui/StatCard";
import { CourseCard } from "../courses/CourseCard";

const featuredCourses = [
  { id: "1", title: "Complete React & TypeScript Masterclass", instructor: "Sarah Chen", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop", category: "Development", duration: "42h", students: 12500, rating: 4.9, price: 89.99, isFeatured: true },
  { id: "2", title: "UI/UX Design Fundamentals", instructor: "Alex Rivera", thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop", category: "Design", duration: "28h", students: 8300, rating: 4.8, price: 69.99 },
  { id: "3", title: "Data Science with Python", instructor: "Dr. James Liu", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop", category: "Data Science", duration: "56h", students: 15200, rating: 4.9, price: 99.99 },
  { id: "4", title: "Digital Marketing Mastery", instructor: "Emma Wilson", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop", category: "Marketing", duration: "32h", students: 9800, rating: 4.7, price: 59.99 },
];

const stats = [
  { title: "Active Learners", value: "150K+", icon: Users, variant: "primary" as const, trend: { value: 23, isPositive: true } },
  { title: "Expert Courses", value: "2,500+", icon: BookOpen, variant: "accent" as const, trend: { value: 12, isPositive: true } },
  { title: "Certificates Issued", value: "89K+", icon: Award, variant: "success" as const, trend: { value: 18, isPositive: true } },
  { title: "Completion Rate", value: "94%", icon: TrendingUp, variant: "warning" as const, trend: { value: 5, isPositive: true } },
];

const teachers = [
  {
    id: "t1",
    name: "Dr. Emily Carter",
    designation: "Senior Data Scientist",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&h=600&fit=crop",
    description:
      "10+ years in AI and machine learning, former lead at TechCorp.",
  },
  {
    id: "t2",
    name: "Michael Nguyen",
    designation: "Frontend Architect",
    image:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
    description:
    "React, TypeScript, and performance specialist. Speaker at JSConf.",
  },
  {
    id: "t3",
    name: "Aisha Patel",
    designation: "Product Design Lead",
    image:
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&h=600&fit=crop",
    description:
    "Human-centered design expert with award-winning portfolios.",
  },
  {
    id: "t4",
    name: "Prof. Daniel Kim",
    designation: "Cloud & DevOps Expert",
    image:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
    description:
      "AWS, Kubernetes, and automation practitioner for large-scale systems.",
  },
];

const HomePage = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col bg-background">

        <main className="flex-1 ">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="absolute inset-0 bg-hero-pattern opacity-50" />
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

            <div className="container relative mx-auto">
              <div className="max-w-4xl mx-auto text-center space-y-8">
               

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display tracking-tight"
                >
                  Master New Skills with{" "}
                  <GradientText>Live Learning</GradientText>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                  Join 150,000+ learners. Access expert-led courses, real-time
                  analytics, and live instructor chat — all in one platform.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button variant="hero" size="xl" asChild>
                    <Link href="/auth?mode=signup">
                      Start Learning Free{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="glass" size="xl" className="gap-2">
                    <Play className="h-5 w-5" fill="currentColor" /> Watch Demo
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center justify-center gap-6 pt-8"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-background bg-linear-to-br from-primary to-accent"
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-amber">
                      <Star className="h-4 w-4" fill="currentColor" />
                      <span className="font-bold">4.9</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      from 12,000+ reviews
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 border-y border-border bg-card/50">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <StatCard {...stat} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Courses */}
          <section className="py-20">
            <div className="container space-y-12 mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold font-display">
                    Featured Courses
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Handpicked by our team for quality and impact
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/courses">
                    View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} onClick={() => {}} />
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 animated-gradient opacity-90" />
            <div className="container relative text-center space-y-8 mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold font-display text-primary-foreground">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Join thousands of learners advancing their careers with our
                expert-led courses.
              </p>
              <Button
                variant="glass"
                size="xl"
                className="text-primary-foreground border-primary-foreground/30"
                asChild
              >
                <Link href="/auth?mode=signup">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Teacher Section */}
          <section className="py-20">
            <div className="container space-y-12 mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold font-display">Our Instructors</h2>
                  <p className="text-muted-foreground mt-2">Learn from industry experts with proven experience</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/instructors">
                    View All Instructors <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teachers.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                  >
                    <div className="aspect-[4/3]">
                      <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-lg">{t.name}</h3>
                      <p className="text-sm text-muted-foreground">{t.designation}</p>
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

       
      </div>
    </div>
  );
};

export default HomePage;
