import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answeredQuestions: Set<string>;
  questionIds: string[];
  correctAnswers?: Set<string>; // For review mode
  incorrectAnswers?: Set<string>; // For review mode
  isReviewMode?: boolean;
  onNavigate: (index: number) => void;
}

export function QuizNavigator({
  totalQuestions,
  currentIndex,
  answeredQuestions,
  questionIds,
  correctAnswers,
  incorrectAnswers,
  isReviewMode = false,
  onNavigate,
}: QuizNavigatorProps) {
  const getButtonStyles = (index: number, questionId: string) => {
    const isCurrent = index === currentIndex;
    const isAnswered = answeredQuestions.has(questionId);
    const isCorrect = correctAnswers?.has(questionId);
    const isIncorrect = incorrectAnswers?.has(questionId);

    if (isReviewMode) {
      if (isCorrect) {
        return cn(
          "bg-emerald text-emerald-foreground",
          isCurrent && "ring-2 ring-emerald ring-offset-2 ring-offset-background"
        );
      }
      if (isIncorrect) {
        return cn(
          "bg-destructive text-destructive-foreground",
          isCurrent && "ring-2 ring-destructive ring-offset-2 ring-offset-background"
        );
      }
      return cn(
        "bg-muted text-muted-foreground",
        isCurrent && "ring-2 ring-muted-foreground ring-offset-2 ring-offset-background"
      );
    }

    if (isCurrent) {
      return "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background";
    }
    if (isAnswered) {
      return "bg-primary/80 text-primary-foreground";
    }
    return " text-muted-foreground hover:bg-muted/80";
  };

  const renderIcon = (questionId: string) => {
    if (!isReviewMode) return null;
    
    if (correctAnswers?.has(questionId)) {
      return <CheckCircle className="w-3 h-3" />;
    }
    if (incorrectAnswers?.has(questionId)) {
      return <XCircle className="w-3 h-3" />;
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground">
        Question Navigator
      </h4>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionId = questionIds[index];
          return (
            <button
              key={questionId}
              onClick={() => onNavigate(index)}
              className={cn(
                "w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200",
                "flex items-center justify-center",
                getButtonStyles(index, questionId)
              )}
              aria-label={`Go to question ${index + 1}`}
            >
              {renderIcon(questionId) || index + 1}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
        {isReviewMode ? (
          <>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald" />
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-destructive" />
              <span>Incorrect</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-muted" />
              <span>Unanswered</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-primary" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded border border-border" />
              <span>Not answered</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
