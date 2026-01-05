import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  className?: string;
}

export function QuizProgressBar({
  currentQuestion,
  totalQuestions,
  answeredCount,
  className,
}: QuizProgressBarProps) {
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Progress Text */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-muted-foreground">
          {answeredCount} / {totalQuestions} answered
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-muted"
        />
        {/* Animated fill indicator */}
        <div 
          className="absolute inset-0 h-3 rounded-full overflow-hidden pointer-events-none"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="h-full w-full progress-gradient opacity-20 animate-pulse" />
        </div>
      </div>

      {/* Percentage Badge */}
      <div className="flex justify-end">
        <span className={cn(
          "text-xs font-semibold px-2 py-0.5 rounded-full",
          progressPercentage === 100 
            ? "bg-emerald/20 text-emerald" 
            : "bg-primary/10 text-primary"
        )}>
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
    </div>
  );
}
