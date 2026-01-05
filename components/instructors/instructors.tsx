"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Users, Star } from "lucide-react";
import { AllInstractors } from "@/constant/data";
import Link from "next/link";

const Instructors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredInstructors = AllInstractors?.filter(
    (instructor) =>
      instructor.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-secondary/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge
                variant="outline"
                className="mb-4 px-4 py-1 border-primary/50"
              >
                <Users className="w-4 h-4 mr-2" />
                Expert Instructors
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Learn from{" "}
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Industry Experts
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Our instructors are passionate professionals who bring
                real-world experience to every lesson. Discover the perfect
                mentor for your learning journey.
              </p>

              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                <Input
                  placeholder="Search instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-card/50 backdrop-blur-sm border-border/50"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Instructors Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-muted mb-4" />
                        <div className="h-6 w-32 bg-muted rounded mb-2" />
                        <div className="h-4 w-48 bg-muted rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredInstructors && filteredInstructors.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredInstructors.map((instructor) => (
                  <motion.div key={instructor.id} variants={itemVariants}>
                    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Avatar className="w-24 h-24 border-4 border-primary/20 group-hover:border-primary/50 transition-colors">
                              <AvatarImage
                                src={instructor.profileImage || ""}
                              />
                              <AvatarFallback className="text-2xl bg-linear-to-br from-primary to-secondary text-primary-foreground">
                                {instructor.full_name?.charAt(0) || "I"}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>

                          <h3 className="mt-4 text-xl font-semibold">
                            {instructor.full_name || "Anonymous Instructor"}
                          </h3>

                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {instructor.bio ||
                              "Passionate educator sharing knowledge and experience."}
                          </p>

                          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{instructor.courseCount} courses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>4.8</span>
                            </div>
                          </div>

                          <Button
                            asChild
                            variant="outline"
                            className="mt-4 w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            <Link
                              href={`/instructors/${instructor.id}`}
                              className="w-full block"
                            >
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No instructors found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Instructors will appear here once they join the platform"}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Instructors;
