"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Maximize,
  MessageSquare,
  Pause,
  Play,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock Data
const mockCourse = {
  id: "1",
  title: "The Complete History 2023: From Zero To Expert!",
  description: "Master historical analysis with 45h of content.",
  enrollment_count: 12500,
  modules: [
    {
      id: "module-1",
      title: "Intro To Course And History",
      lessons: [
        {
          id: "lesson-1",
          title: "Course Intro",
          duration: 10,
          content:
            "Welcome to the course! This lesson covers course objectives.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          id: "lesson-2",
          title: "Why History Matters",
          duration: 15,
          content: "Understanding the importance of history.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
    {
      id: "module-2",
      title: "Ancient Civilizations",
      lessons: [
        {
          id: "lesson-3",
          title: "Mesopotamia",
          duration: 20,
          content: "The cradle of civilization.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
  ],
};

export default function CourseViewer() {
  const params = useParams();
  const id = params?.id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useState<any>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCourse(mockCourse);
      if (mockCourse.modules[0]?.lessons[0]) {
        setCurrentLessonId(mockCourse.modules[0].lessons[0].id);
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  const currentLesson = course?.modules
    ?.flatMap((m: any) => m.lessons || [])
    .find((l: any) => l.id === currentLessonId);

  const allLessons =
    course?.modules?.flatMap((m: any) => m.lessons || []) || [];
  const currentIndex = allLessons.findIndex(
    (l: any) => l.id === currentLessonId
  );

  const completedLessons = completedLessonIds.length;
  const progressPercent =
    allLessons.length > 0 ? (completedLessons / allLessons.length) * 100 : 0;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    // Mark current lesson as complete
    if (currentLessonId && !completedLessonIds.includes(currentLessonId)) {
      setCompletedLessonIds([...completedLessonIds, currentLessonId]);
    }

    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessonIds.includes(lessonId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found</p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div
        className={cn("flex-1 flex flex-col", sidebarOpen ? "lg:mr-96" : "")}
      >
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-sm truncate max-w-md">
                {course.title}
              </h1>
              <p className="text-xs text-muted-foreground">
                Lesson {currentIndex + 1} of {allLessons.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 mr-4">
              <Progress value={progressPercent} className="w-32 h-2" />
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <BookOpen className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Video Player */}
        <div className="relative bg-foreground/95 aspect-video w-full overflow-hidden">
          {/* YouTube Video Embed */}
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            className={`absolute inset-0 w-full h-full ${
              isPlaying ? "" : "opacity-0"
            }`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentLesson?.title || "Course Lesson"}
          />
          {/* Video Placeholder */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              isPlaying ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <div className="text-center text-background/80">
              <div
                className="w-20 h-20 rounded-full bg-background/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm cursor-pointer hover:bg-background/30 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </div>
              <p className="font-medium">
                {currentLesson?.title || "Select a lesson"}
              </p>
              <p className="text-sm opacity-70">
                {currentLesson?.duration || 0} min
              </p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-foreground/80 to-transparent p-4">
            <div className="w-full h-1 bg-background/30 rounded-full mb-3 cursor-pointer group">
              <div className="h-full w-1/3 bg-primary rounded-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between text-background">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-background hover:bg-background/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-background hover:bg-background/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-sm">
                  0:00 / {currentLesson?.duration || 0}:00
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:bg-background/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Lesson Info & Tabs */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-display">
                {currentLesson?.title}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {currentLesson?.duration || 0}{" "}
                  min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {course.enrollment_count || 0}{" "}
                  students
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="gradient"
                size="sm"
                onClick={handleNext}
                disabled={currentIndex === allLessons.length - 1}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  {currentLesson?.content ||
                    course.description ||
                    "No description available."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="rounded-xl border border-border p-4">
                <textarea
                  placeholder="Take notes for this lesson..."
                  className="w-full h-40 bg-transparent resize-none focus:outline-none text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="discussion" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Discussion feature coming soon!</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/chat">Chat with Instructor</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sidebar - Course Content */}
      <motion.aside
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: sidebarOpen ? 0 : 100, opacity: sidebarOpen ? 1 : 0 }}
        className={cn(
          "fixed right-0 top-0 bottom-0 w-96 border-l border-border bg-card z-40",
          !sidebarOpen && "pointer-events-none"
        )}
      >
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          <h3 className="font-semibold">Course Content</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="p-4">
            <Accordion
              type="multiple"
              defaultValue={course.modules?.map((m: any) => m.id) || []}
              className="space-y-2"
            >
              {course.modules?.map((module: any) => (
                <AccordionItem
                  key={module.id}
                  value={module.id}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-secondary/50 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="text-sm font-medium">{module.title}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="border-t border-border">
                      {module.lessons?.map((lesson: any) => {
                        const isCurrent = lesson.id === currentLessonId;
                        const isCompleted = isLessonCompleted(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => setCurrentLessonId(lesson.id)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer border-b border-border last:border-0",
                              isCurrent &&
                                "bg-primary/5 border-l-2 border-l-primary"
                            )}
                          >
                            <div className="shrink-0">
                              {isCompleted ? (
                                <div className="h-6 w-6 rounded-full bg-emerald/20 flex items-center justify-center">
                                  <Check className="h-4 w-4 text-emerald" />
                                </div>
                              ) : (
                                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Play className="h-3 w-3 text-primary" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-sm truncate",
                                  isCompleted && "text-muted-foreground"
                                )}
                              >
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {lesson.duration || 0} min
                              </p>
                            </div>
                            {isCurrent && (
                              <Badge variant="secondary" className="shrink-0">
                                Current
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </motion.aside>

      {/* Mobile Sidebar Toggle */}
      {!sidebarOpen && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 z-50 lg:hidden rounded-full shadow-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <BookOpen className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
