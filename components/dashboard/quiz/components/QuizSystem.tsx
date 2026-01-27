"use client"

import { useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Send, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { QuizNavigator } from "./QuizNavigator";
import { QuizTimer } from "./QuizTimer";
import { mockQuiz, evaluateQuiz, type QuizResult, type QuizData } from "@/constant/quizMockData";
import { cn } from "@/lib/utils";

interface QuizSystemProps {
  quiz?: QuizData;
  onComplete?: (result: QuizResult) => void;
  onClose?: () => void;
}

export function QuizSystem({ 
  quiz = mockQuiz, 
  onComplete, 
  onClose 
}: QuizSystemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

  // Compute answered questions set
  const answeredQuestions = useMemo(() => 
    new Set(Object.keys(answers)), 
    [answers]
  );

  // Compute correct/incorrect sets for review mode
  const { correctAnswers, incorrectAnswers } = useMemo(() => {
    if (!quizResult) return { correctAnswers: new Set<string>(), incorrectAnswers: new Set<string>() };
    
    const correct = new Set<string>();
    const incorrect = new Set<string>();
    
    quizResult.answerLogs.forEach((log) => {
      if (log.isCorrect) {
        correct.add(log.questionId);
      } else if (log.selectedAnswer) {
        incorrect.add(log.questionId);
      }
    });
    
    return { correctAnswers: correct, incorrectAnswers: incorrect };
  }, [quizResult]);

  // Handle answer selection
  const handleSelectAnswer = useCallback((answerId: string) => {
    if (showResults && !isReviewMode) return;
    if (isReviewMode) return; // Can't change answers in review mode
    
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  }, [currentQuestion.id, showResults, isReviewMode]);

  // Navigate to next question
  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalQuestions]);

  // Navigate to previous question
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Navigate to specific question
  const handleNavigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Submit quiz
  const handleSubmit = useCallback(() => {
    setIsTimerRunning(false);
    const result = evaluateQuiz(quiz.questions, answers, quiz.passingScore);
    setQuizResult(result);
    setShowResults(true);
    
    // Log all answers for debugging/analytics
    console.log("Quiz Answers Log:", result.answerLogs);
    console.log("Quiz Result:", {
      score: result.scorePercentage,
      passed: result.passed,
      correct: result.correctAnswers,
      incorrect: result.incorrectAnswers,
    });
    
    onComplete?.(result);
  }, [quiz.questions, quiz.passingScore, answers, onComplete]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  // Restart quiz
  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setIsReviewMode(false);
    setQuizResult(null);
    setIsTimerRunning(true);
  }, []);

  // Enter review mode
  const handleReview = useCallback(() => {
    setIsReviewMode(true);
    setCurrentIndex(0);
  }, []);

  // Get question IDs for navigator
  const questionIds = useMemo(() => 
    quiz.questions.map((q) => q.id), 
    [quiz.questions]
  );

  // Show results screen
  if (showResults && !isReviewMode && quizResult) {
    return (
      <QuizResults
        result={quizResult}
        onRestart={handleRestart}
        onReview={handleReview}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with Progress and Timer */}
      <Card className="p-4 bg-card border-border sticky top-0 z-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Quiz Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{quiz.title}</h2>
              <p className="text-xs text-muted-foreground">
                {isReviewMode ? "Review Mode" : `${quiz.totalQuestions} Questions`}
              </p>
            </div>
          </div>

          {/* Timer (only in quiz mode) */}
          {!isReviewMode && quiz.timeLimit && (
            <QuizTimer
              initialSeconds={quiz.timeLimit * 60}
              isRunning={isTimerRunning && !showResults}
              onTimeUp={handleTimeUp}
            />
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <QuizProgressBar
            currentQuestion={currentIndex + 1}
            totalQuestions={totalQuestions}
            answeredCount={answeredQuestions.size}
          />
        </div>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Area */}
        <div className="lg:col-span-3 space-y-6">
          <QuizQuestion
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            selectedAnswer={answers[currentQuestion.id] || null}
            showResult={isReviewMode}
            onSelectAnswer={handleSelectAnswer}
          />

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="gap-2 hover:bg-primary"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentIndex === totalQuestions - 1 ? (
              isReviewMode ? (
                <Button 
                  variant="default" 
                  onClick={onClose || handleRestart}
                  className="gap-2"
                >
                  {onClose ? "Close Quiz" : "Try Again"}
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  className={cn(
                    "gap-2",
                    answeredQuestions.size === totalQuestions 
                      ? "" 
                      : ""
                  )}
                >
                  <Send className="w-4 h-4" />
                  Submit Quiz
                </Button>
              )
            ) : (
              <Button
                variant="default"
                onClick={handleNext}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar Navigator */}
        <div className="lg:col-span-1">
          <Card className="p-4 bg-card border-border sticky top-32">
            <QuizNavigator
              totalQuestions={totalQuestions}
              currentIndex={currentIndex}
              answeredQuestions={answeredQuestions}
              questionIds={questionIds}
              correctAnswers={isReviewMode ? correctAnswers : undefined}
              incorrectAnswers={isReviewMode ? incorrectAnswers : undefined}
              isReviewMode={isReviewMode}
              onNavigate={handleNavigate}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
