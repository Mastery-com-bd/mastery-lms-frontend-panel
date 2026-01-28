import { motion } from "motion/react";
import { Trophy, Target, CheckCircle, XCircle, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { QuizResult } from "@/constant/quizMockData";

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onReview: () => void;
  onClose?: () => void;
}

export function QuizResults({ result, onRestart, onReview, onClose }: QuizResultsProps) {
  const { totalQuestions, correctAnswers, incorrectAnswers, scorePercentage, passed } = result;
  const unanswered = totalQuestions - correctAnswers - incorrectAnswers;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center p-6 min-h-[500px]"
    >
      {/* Result Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className={cn(
          "w-28 h-28 rounded-full flex items-center justify-center mb-6",
          passed 
            ? "bg-emerald/20 glow-primary" 
            : "bg-amber/20"
        )}
      >
        {passed ? (
          <Trophy className="w-14 h-14 text-emerald" />
        ) : (
          <Target className="w-14 h-14 text-amber" />
        )}
      </motion.div>

      {/* Result Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold font-display mb-2"
      >
        {passed ? "Congratulations! 🎉" : "Keep Practicing! 💪"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-8 max-w-md"
      >
        {passed
          ? "You've demonstrated excellent understanding of the material."
          : "Don't give up! Review your answers and try again to improve your score."}
      </motion.p>

      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className={cn(
          "text-7xl font-bold font-display mb-2",
          passed ? "text-emerald" : "text-amber"
        )}>
          {scorePercentage}%
        </div>
        <p className="text-sm text-muted-foreground">Final Score</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-4 mb-8 w-full max-w-lg"
      >
        <Card className="bg-emerald/5 border-emerald/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-emerald" />
              <span className="text-2xl font-bold text-emerald">{correctAnswers}</span>
            </div>
            <p className="text-xs text-muted-foreground">Correct</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="text-2xl font-bold text-destructive">{incorrectAnswers}</span>
            </div>
            <p className="text-xs text-muted-foreground">Incorrect</p>
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl font-bold text-foreground">{totalQuestions}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Unanswered info */}
      {unanswered > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-sm text-muted-foreground mb-6"
        >
          {unanswered} question{unanswered > 1 ? "s" : ""} left unanswered
        </motion.p>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Button 
          variant="outline" 
          onClick={onReview} 
          className="gap-2 min-w-[140px]"
        >
          <Eye className="w-4 h-4" />
          Review Answers
        </Button>
        <Button 
          variant="default"
          onClick={onRestart} 
          className="gap-2 min-w-[140px] bg-primary hover:bg-primary/90"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </motion.div>

      {onClose && (
        <Button 
          variant="ghost" 
          onClick={onClose} 
          className="mt-4 text-muted-foreground"
        >
          Close Quiz
        </Button>
      )}
    </motion.div>
  );
}
