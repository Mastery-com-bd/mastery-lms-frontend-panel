"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showError, showSuccess } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { markLessonAsCompleted } from "@/service/dashboard/my-class";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  Loader2,
  MessageSquare,
  Play,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  type?: "multiple_choice" | "multiple_selection";
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  type: string;
  passingScore: number;
  questions?: QuizQuestion[];
}
interface WatchedLesson {
  firstWatchedAt: string;
  id: string;
  isCompleted: boolean;
  lastPosition: number | null;
  lastWatchedAt: string;
  totalDuration: number;
  userId: string;
  watchedDuration: number;
}

interface Lesson {
  id: string;
  title: string;
  duration: number | null;
  isPreview: boolean;
  content?: string;
  videoUrl?: string;
  quiz?: Quiz | null;
  watchedLessons: WatchedLesson[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  enrollment_count?: number;
  sections: Section[];
}

export default function CourseViewer({ course }: { course: Course }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLessonId = searchParams.get("lessonId");

  const [currentLessonData, setCurrentLessonData] = useState<Lesson | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Fetch Course Details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        // Auto-select first lesson if none selected
        if (!currentLessonId && course?.sections?.[0]?.lessons?.[0]) {
          const firstLessonId = course.sections[0].lessons[0].id;
          router.replace(`?lessonId=${firstLessonId}`);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [course.sections, currentLessonId, router]);

  // Fetch Lesson Details
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLessonLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lesson/${currentLessonId}`,
        );
        const { data } = await res.json();
        setCurrentLessonData(data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setLessonLoading(false);
      }
    };

    if (currentLessonId) {
      fetchLesson();
      setQuizAnswers({}); // Reset quiz on lesson change
      setQuizResult(null); // Reset results on lesson change
    }
  }, [currentLessonId]);

  // Handle Lesson
  const allLessons = course?.sections?.flatMap((s) => s.lessons) || [];
  const currentLesson =
    currentLessonData || allLessons.find((l) => l.id === currentLessonId);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  // Update Completed Lessons
  const handleLessonComplete = (lessonId: string, isPreview: boolean) => {
    console.log(lessonId, isPreview);
  };

  // Quiz Submission Handler
  const handleQuizSubmit = async (quizId: string) => {
    try {
      setIsSubmittingQuiz(true);
      const payload = {
        answers: Object.entries(quizAnswers).map(
          ([questionId, selectedAnswer]) => ({
            questionId,
            selectedAnswer,
          }),
        ),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/quiz/${quizId}/attempt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (result.success) {
        setQuizResult(result.data);
      } else {
        showError({ message: result.message || "Error submitting quiz" });
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  const handleSelectAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  // Render Video Player
  const renderVideoPlayer = () => {
    if (!currentLesson?.videoUrl) return null;

    const isYouTube =
      currentLesson.videoUrl.includes("youtube.com") ||
      currentLesson.videoUrl.includes("youtu.be");

    if (isYouTube) {
      const videoId =
        currentLesson.videoUrl.split("v=")[1] ||
        currentLesson.videoUrl.split("/").pop();
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={currentLesson.videoUrl}
        className="absolute inset-0 w-full h-full object-contain"
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    );
  };

  const handleLessonSelect = (lessonId: string) => {
    router.push(`?lessonId=${lessonId}`);
  };

  const handleNext = async () => {
    if (!currentLessonData?.id) return;
    handleLessonComplete(currentLessonData?.id, true);
    if (currentLessonId && !completedLessonIds.includes(currentLessonId)) {
      setCompletedLessonIds([...completedLessonIds, currentLessonId]);
    }

    if (
      currentLessonId &&
      currentLessonData &&
      !currentLessonData.watchedLessons?.[0]?.isCompleted
    ) {
      markLessonAsCompleted({ lessonId: currentLessonId });
    }

    if (currentIndex < allLessons.length - 1) {
      handleLessonSelect(allLessons[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleLessonSelect(allLessons[currentIndex - 1].id);
    }
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
          {lessonLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-sm">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {renderVideoPlayer()}
              {/* Video Placeholder (only if no videoUrl) */}
              {!currentLesson?.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-background/80">
                    <div
                      className="w-20 h-20 rounded-full bg-background/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm cursor-pointer hover:bg-background/30 transition-colors"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                    <p className="font-medium">
                      No video available for this lesson
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
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
                onClick={() => handleNext()}
                disabled={currentIndex === allLessons.length - 1}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          <Tabs
            value={searchParams.get("tab") || "overview"}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("tab", value);
              router.push(`?${params.toString()}`);
            }}
            className="w-full"
          >
            <TabsList className="w-full justify-start border-b border-border h-auto p-0 bg-transparent rounded-none gap-8">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-bold transition-all"
              >
                Overview
              </TabsTrigger>
              {currentLesson?.quiz && (
                <TabsTrigger
                  value="quiz"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-bold transition-all"
                >
                  Lesson Quiz
                </TabsTrigger>
              )}
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-bold transition-all"
              >
                Notes
              </TabsTrigger>
              <TabsTrigger
                value="discussion"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-bold transition-all"
              >
                Discussion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  {currentLesson?.content ||
                    course.description ||
                    "No description available for this lesson."}
                </p>
              </div>
            </TabsContent>

            {currentLesson?.quiz && (
              <TabsContent value="quiz" className="mt-6">
                {quizResult ? (
                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
                    {/* Quiz Result Header */}
                    <div className="text-center space-y-4 border-b border-border pb-8">
                      <div
                        className={cn(
                          "w-20 h-20 rounded-full mx-auto flex items-center justify-center",
                          quizResult.passed
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-600",
                        )}
                      >
                        {quizResult.passed ? (
                          <Check className="w-10 h-10" />
                        ) : (
                          <XCircle className="w-10 h-10" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-3xl font-black">
                          {quizResult.passed ? "Passed!" : "Keep Trying!"}
                        </h3>
                        <p className="text-muted-foreground">
                          You scored {quizResult.score} out of{" "}
                          {quizResult.totalScore}
                        </p>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full px-6 py-2 text-lg font-bold",
                            quizResult.passed
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-rose-200 bg-rose-50 text-rose-700",
                          )}
                        >
                          {Math.round(quizResult.percentage)}%
                        </Badge>
                      </div>
                    </div>

                    {/* Detailed Report */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-bold">Review Your Answers</h4>
                      {quizResult.answers.map((answer: any, idx: number) => (
                        <div
                          key={answer.id}
                          className={cn(
                            "p-6 rounded-2xl border space-y-4",
                            answer.isCorrect
                              ? "bg-emerald-50/30 border-emerald-100"
                              : "bg-rose-50/30 border-rose-100",
                          )}
                        >
                          <div className="flex justify-between gap-4">
                            <div className="flex gap-3">
                              <span
                                className={cn(
                                  "shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                  answer.isCorrect
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-rose-100 text-rose-600",
                                )}
                              >
                                {idx + 1}
                              </span>
                              <h5 className="font-semibold pt-0.5">
                                {answer.question.question}
                              </h5>
                            </div>
                            {answer.isCorrect ? (
                              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            )}
                          </div>

                          <div className="grid gap-2 ml-11">
                            {answer.question.options.map(
                              (option: string, oIdx: number) => {
                                const isSelected =
                                  answer.selectedAnswer === oIdx;
                                const isCorrect =
                                  answer.question.correctAnswer === oIdx;
                                return (
                                  <div
                                    key={oIdx}
                                    className={cn(
                                      "p-3 rounded-xl border text-sm flex justify-between items-center",
                                      isCorrect
                                        ? "bg-emerald-100 border-emerald-200 text-emerald-800 font-medium"
                                        : isSelected
                                          ? "bg-rose-100 border-rose-200 text-rose-800 font-medium"
                                          : "bg-white/50 border-border text-muted-foreground",
                                    )}
                                  >
                                    <span>{option}</span>
                                    {isCorrect && (
                                      <span className="text-[10px] uppercase font-bold bg-emerald-200 px-2 py-0.5 rounded">
                                        Correct
                                      </span>
                                    )}
                                    {!isCorrect && isSelected && (
                                      <span className="text-[10px] uppercase font-bold bg-rose-200 px-2 py-0.5 rounded">
                                        Your Answer
                                      </span>
                                    )}
                                  </div>
                                );
                              },
                            )}
                          </div>

                          {answer.question.explanation && (
                            <div className="ml-11 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-sm text-blue-800 italic">
                              <strong>Explanation:</strong>{" "}
                              {answer.question.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-full font-bold"
                      onClick={() => {
                        setQuizResult(null);
                        setQuizAnswers({});
                      }}
                    >
                      Try Quiz Again
                    </Button>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
                    <div className="space-y-2 border-b border-border pb-6">
                      <h3 className="text-2xl font-black text-foreground">
                        {currentLesson.quiz.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {currentLesson.quiz.description}
                      </p>
                      <div className="flex items-center gap-4 pt-2">
                        <Badge
                          variant="outline"
                          className="rounded-full px-4 py-1 border-primary/20 text-primary bg-primary/5"
                        >
                          Passing Score: {currentLesson.quiz.passingScore}%
                        </Badge>
                        <Badge
                          variant="outline"
                          className="rounded-full px-4 py-1 border-border bg-muted/50"
                        >
                          Type: {currentLesson.quiz.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {currentLesson.quiz.questions?.map((q, idx) => (
                        <div key={q.id} className="space-y-4">
                          <div className="flex gap-3">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                              {idx + 1}
                            </span>
                            <h4 className="text-lg font-semibold pt-0.5">
                              {q.question}
                            </h4>
                          </div>
                          <div className="grid gap-3 ml-11">
                            {q.options.map((option, oIdx) => {
                              const isSelected = quizAnswers[q.id] === oIdx;
                              return (
                                <button
                                  key={oIdx}
                                  disabled={isSubmittingQuiz}
                                  onClick={() => handleSelectAnswer(q.id, oIdx)}
                                  className={cn(
                                    "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
                                    !isSelected
                                      ? "bg-primary/5 shadow-sm shadow-primary/10"
                                      : "bg-muted/30 border-primary hover:border-primary/50 hover:bg-muted/50",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "font-medium transition-colors",
                                      isSelected
                                        ? "text-primary"
                                        : "text-muted-foreground group-hover:text-foreground",
                                    )}
                                  >
                                    {option}
                                  </span>
                                  <div
                                    className={cn(
                                      "w-5 h-5 rounded-full border flex items-center justify-center transition-colors ml-auto",
                                      isSelected
                                        ? "bg-primary border-primary"
                                        : "border-muted-foreground/30",
                                    )}
                                  >
                                    {isSelected && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {(!currentLesson.quiz.questions ||
                        currentLesson.quiz.questions.length === 0) && (
                        <p className="text-center py-10 text-muted-foreground italic bg-muted/20 rounded-xl border border-dashed border-border">
                          No questions available for this quiz.
                        </p>
                      )}

                      <Button
                        className="w-full h-12 bg-primary hover:bg-primary/90 rounded-full font-bold shadow-lg shadow-primary/20 mt-8"
                        onClick={() => handleQuizSubmit(currentLesson.quiz!.id)}
                        disabled={
                          isSubmittingQuiz ||
                          !currentLesson.quiz.questions ||
                          currentLesson.quiz.questions.length === 0
                        }
                      >
                        {isSubmittingQuiz ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting Attempt...
                          </>
                        ) : (
                          "Submit Quiz Attempt"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            )}

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
          !sidebarOpen && "pointer-events-none",
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
              defaultValue={course.sections?.map((s) => s.id)}
              className="space-y-2"
            >
              {course.sections?.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-secondary/50 hover:no-underline">
                    <div className="flex flex-col items-start gap-1 text-left">
                      <div className="text-sm font-bold">{section.title}</div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {section.lessons.length} Lessons
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="border-t border-border">
                      {section.lessons?.map((lesson) => {
                        const isCurrent = lesson.id === currentLessonId;
                        const isCompleted = completedLessonIds.includes(
                          lesson.id,
                        );
                        return (
                          <div
                            key={lesson.id}
                            className="border-b border-border last:border-0"
                          >
                            <div
                              onClick={() => handleLessonSelect(lesson.id)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer",
                                isCurrent &&
                                  "bg-primary/5 border-l-2 border-l-primary",
                              )}
                            >
                              <div className="shrink-0">
                                {isCompleted ||
                                lesson.watchedLessons[0]?.isCompleted ? (
                                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-emerald-600" />
                                  </div>
                                ) : (
                                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Play className="h-3 w-3 text-primary" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={cn(
                                    "text-sm font-medium truncate",
                                    isCurrent
                                      ? "text-primary"
                                      : "text-foreground",
                                  )}
                                >
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {lesson.duration
                                    ? `${lesson.duration} min`
                                    : "No duration"}
                                </p>
                              </div>
                              {isCurrent && (
                                <Badge
                                  variant="secondary"
                                  className="shrink-0 text-[10px] h-5 bg-primary/10 text-primary border-none"
                                >
                                  Playing
                                </Badge>
                              )}
                            </div>

                            {/* Quiz Indicator in Sidebar */}
                            {lesson.quiz && (
                              <div
                                className={cn(
                                  "flex items-center gap-3 pl-12 pr-4 py-2 hover:bg-secondary/50 transition-colors cursor-pointer group",
                                  isCurrent &&
                                    searchParams.get("tab") === "quiz" &&
                                    "bg-primary/5",
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLessonSelect(lesson.id);
                                  const url = new URL(window.location.href);
                                  url.searchParams.set("lessonId", lesson.id);
                                  url.searchParams.set("tab", "quiz");
                                  router.push(url.search);
                                }}
                              >
                                <HelpCircle
                                  className={cn(
                                    "h-4 w-4",
                                    isCurrent &&
                                      searchParams.get("tab") === "quiz"
                                      ? "text-primary"
                                      : "text-muted-foreground",
                                  )}
                                />
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    isCurrent &&
                                      searchParams.get("tab") === "quiz"
                                      ? "text-primary"
                                      : "text-muted-foreground group-hover:text-foreground",
                                  )}
                                >
                                  Lesson Quiz
                                </span>
                              </div>
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
