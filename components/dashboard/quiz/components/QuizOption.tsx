import { motion } from "motion/react";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  id: string;
  text: string;
  optionLabel: string; // A, B, C, D
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  disabled?: boolean;
  onSelect: (id: string) => void;
}

export function QuizOption({
  id,
  text,
  optionLabel,
  isSelected,
  isCorrect,
  showResult = false,
  disabled = false,
  onSelect,
}: QuizOptionProps) {
  const getOptionStyles = () => {
    if (showResult && isCorrect) {
      return "border-emerald bg-emerald/10 text-foreground";
    }
    if (showResult && isSelected && !isCorrect) {
      return "border-destructive bg-destructive/10 text-foreground";
    }
    if (isSelected && !showResult) {
      return "border-primary bg-primary/5 text-foreground ring-2 ring-primary/20";
    }
    return "border-border hover:border-primary/50 hover:bg-muted/50 text-foreground";
  };

  const getLabelStyles = () => {
    if (showResult && isCorrect) {
      return "bg-emerald text-emerald-foreground border-emerald";
    }
    if (showResult && isSelected && !isCorrect) {
      return "bg-destructive text-destructive-foreground border-destructive";
    }
    if (isSelected && !showResult) {
      return "bg-primary text-primary-foreground border-primary";
    }
    return "bg-muted text-muted-foreground border-muted-foreground/30";
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.99 } : {}}
      onClick={() => !disabled && onSelect(id)}
      disabled={disabled}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
        "flex items-center gap-4 group",
        getOptionStyles(),
        disabled && "cursor-not-allowed opacity-80"
      )}
    >
      {/* Option Label (A, B, C, D) */}
      <span
        className={cn(
          "w-10 h-10 rounded-lg border-2 flex items-center justify-center",
          "text-sm font-bold shrink-0 transition-all duration-200",
          getLabelStyles()
        )}
      >
        {showResult ? (
          isCorrect ? (
            <CheckCircle className="w-5 h-5" />
          ) : isSelected ? (
            <XCircle className="w-5 h-5" />
          ) : (
            optionLabel
          )
        ) : isSelected ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          optionLabel
        )}
      </span>

      {/* Option Text */}
      <span className="flex-1 text-base leading-relaxed">{text}</span>

      {/* Correct indicator for review mode */}
      {showResult && isCorrect && (
        <span className="text-xs font-medium text-emerald px-2 py-1 rounded-full bg-emerald/10">
          Correct
        </span>
      )}
    </motion.button>
  );
}
