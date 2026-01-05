"use client";

import { CourseCard } from "@/components/courses/CourseCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Facebook,
  FileText,
  Globe,
  Linkedin,
  Lock,
  PlayCircle,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";

const CourseDetails = () => {
  // Mock Data
  const course = {
    title: "The Complete History 2023: From Zero To Expert!",
    subtitle:
      "Master Python by building 100 projects in 100 days. Learn Data Science, Automation, Build Websites, Games and Apps!",
    rating: 4.9,
    reviews: 2342,
    students: 12500,
    lastUpdated: "12/2025",
    language: "English",
    price: 75,
    originalPrice: 150,
    instructor: {
      name: "B.M. Rafelul Islam",
      role: "Advanced Educator",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 4.8,
      students: 88687,
      courses: 20,
      bio: "John is a brilliant educator whose life has been spent for Computer Science and love of nature.",
    },
    whatYouWillLearn: [
      "Become an advanced, confident, and modern JavaScript developer from scratch",
      "Use the Jupyter Notebook Environment",
      "Build 100 portfolio-worthy projects",
      "Professional Developer Best Practices",
    ],
    content: [
      {
        section: "Intro To Course And History",
        duration: "30 min",
        lectures: [
          { title: "Course Intro", duration: "10 min", isPreview: true },
          { title: "Watch Before Start", duration: "05 min", isPreview: true },
          {
            title: "Read Before Start",
            duration: "",
            isPreview: false,
            type: "text",
          },
        ],
      },
      {
        section: "Course Fundamentals",
        duration: "2h 45min",
        lectures: [],
      },
      {
        section: "You Can Develop Skill And Setup",
        duration: "1h 30min",
        lectures: [],
      },
      {
        section: "15 Things To Know About Education?",
        duration: "45min",
        lectures: [],
      },
      {
        section: "Course Description",
        duration: "35 min",
        lectures: [],
      },
    ],
    reviewsList: [
      {
        id: 1,
        user: "Baleees Ahmed Fathi",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        rating: 5,
        time: "At 25 Years Old, My Favorite Compliment Is Being Told That I Look Like My Mom. Seeing Myself In Her Image, Like This Daughter Up Top.",
      },
      {
        id: 2,
        user: "Rizuwan Islam",
        image:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
        rating: 5,
        time: "At 25 Years Old, My Favorite Compliment Is Being Told That I Look Like My Mom. Seeing Myself In Her Image, Like This Daughter Up Top.",
      },
      {
        id: 3,
        user: "Shamima Hamdan",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        rating: 5,
        time: "At 25 Years Old, My Favorite Compliment Is Being Told That I Look Like My Mom. Seeing Myself In Her Image, Like This Daughter Up Top.",
      },
    ],
    relatedCourses: [
      {
        id: "1",
        title: "Difficult Things About Education.",
        instructor: "Bessen Pool",
        thumbnail:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop",
        category: "Design",
        duration: "25 Hours",
        students: 15,
        rating: 5,
        price: 75,
        isFeatured: false,
      },
      {
        id: "2",
        title: "PHP Beginner Advanced",
        instructor: "Angela Yu",
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        category: "Development",
        duration: "30 Hours",
        students: 18,
        rating: 5,
        price: 75,
        isFeatured: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-emerald-500/10 dark:bg-emerald-950/20 py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Home</span>
                <span>{">"}</span>
                <span className="text-emerald-600 font-medium">
                  Course Details
                </span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold font-display leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground">{course.subtitle}</p>
              <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-sm">
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                  <span>Best Seller</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <span>{course.rating}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-muted-foreground font-normal ml-1">
                    ({course.reviews} ratings)
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {course.students.toLocaleString()} students
                </div>
                <div className="text-muted-foreground">
                  Last updated {course.lastUpdated}
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                width={800}
                height={600}
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop"
                alt="Course Preview"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 relative">
          {/* Main Content */}
          <div className="space-y-12">
            {/* What you'll learn */}
            <section className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-6">
              <h2 className="text-2xl font-bold font-display">
                What You&apos;ll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-medium"
              >
                Show More <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </section>

            {/* Course Content */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-display">
                Course Content
              </h2>
              <div className="space-y-4">
                {course.content.map((section, i) => (
                  <div
                    key={i}
                    className="border border-border rounded-xl overflow-hidden bg-card"
                  >
                    <div className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 font-medium">
                        {i === 0 ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        {section.section}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-3">
                        {section.lectures.length > 0 && (
                          <span>{section.lectures.length} Lectures</span>
                        )}
                        <span>{section.duration}</span>
                      </div>
                    </div>
                    {i === 0 && (
                      <div className="divide-y divide-border">
                        {section.lectures.map((lecture, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-between p-4 pl-11 hover:bg-muted/20"
                          >
                            <div className="flex items-center gap-3">
                              {lecture.type === "text" ? (
                                <FileText className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="text-sm text-foreground/80">
                                {lecture.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              {lecture.isPreview && (
                                <span className="text-xs text-emerald-600 font-medium">
                                  Preview
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {lecture.duration}
                              </span>
                              {!lecture.isPreview && (
                                <Lock className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-display">Instructor</h2>
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                    <AvatarImage src={course.instructor.image} />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">
                      {course.instructor.name}
                    </h3>
                    <p className="text-emerald-600 font-medium text-sm">
                      {course.instructor.role}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />{" "}
                        {course.instructor.rating} Rating
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />{" "}
                        {course.instructor.students.toLocaleString()} Students
                      </span>
                      <span className="flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" />{" "}
                        {course.instructor.courses} Courses
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                      {course.instructor.bio}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-muted/50"
                      >
                        <Facebook className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-muted/50"
                      >
                        <Twitter className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-muted/50"
                      >
                        <Linkedin className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-display">Reviews</h2>
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold font-display">
                    {Number(course.rating).toFixed(1)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-medium">Course Rating</p>
                  </div>
                  <div className="flex-1 space-y-1 pl-8 hidden sm:block">
                    {[5, 4, 3, 2, 1].map((stars, i) => (
                      <div
                        key={stars}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div className="w-16 flex justify-end">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-2 w-2 ${
                                j < stars
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <Progress
                          value={[75, 20, 20, 5, 5][i]}
                          className="h-1.5"
                        />
                        <span className="w-8 text-muted-foreground">
                          {[75, 20, 20, 5, 5][i]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-border">
                  <h3 className="font-semibold">Featured Review</h3>
                  {course.reviewsList.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-4 p-4 bg-muted/20 rounded-xl"
                    >
                      <Avatar>
                        <AvatarImage src={review.image} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-semibold text-sm">{review.user}</h4>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          &quot;{review.time}&quot;
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 gap-1 text-xs text-muted-foreground"
                          >
                            <ThumbsUp className="h-3 w-3" /> Helpful
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 gap-1 text-xs text-muted-foreground"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Show More <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden p-6 space-y-6">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">${course.price}</span>
                  <span className="text-muted-foreground line-through text-lg">
                    ${course.originalPrice}
                  </span>
                  <span className="text-emerald-600 font-medium text-sm ml-auto bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                    50% OFF
                  </span>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full text-white shadow-lg shadow-emerald-600/20"
                    size="lg"
                  >
                    Add To Cart
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Buy Now
                  </Button>
                  <div className="text-center text-xs text-muted-foreground">
                    30-Day Money-Back Guarantee
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-semibold text-sm">
                    This course includes:
                  </h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Duration
                      </span>
                      <span>45h 30m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> Enrolled
                      </span>
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4" /> Lectures
                      </span>
                      <span>124</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Award className="h-4 w-4" /> Certificate
                      </span>
                      <span>Yes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Language
                      </span>
                      <span>{course.language}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold text-sm mb-3">
                    Share this course:
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        <section className="mt-20 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-3xl font-bold font-display">
              Related Courses
            </h2>
            <Button variant="outline">View All Course</Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {course.relatedCourses.map((relatedCourse) => (
              <CourseCard href={`/courses/${relatedCourse.id}`} key={relatedCourse.id} {...relatedCourse} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetails;
