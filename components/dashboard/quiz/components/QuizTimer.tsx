import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuizTimerProps {
  initialSeconds: number;
  isRunning: boolean;
  onTimeUp: () => void;
  className?: string;
}

export function QuizTimer({
  initialSeconds,
  isRunning,
  onTimeUp,
  className,
}: QuizTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, onTimeUp]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const isLowTime = seconds <= 60; // Less than 1 minute
  const isCritical = seconds <= 30; // Less than 30 seconds

  return (
    <Badge
      variant={isCritical ? "destructive" : isLowTime ? "secondary" : "outline"}
      className={cn(
        "gap-2 text-sm px-4 py-2 font-mono transition-all duration-300",
        isCritical && "animate-pulse",
        className
      )}
    >
      {isCritical ? (
        <AlertTriangle className="w-4 h-4" />
      ) : (
        <Clock className="w-4 h-4" />
      )}
      <span
        className={cn("font-bold", isCritical && "text-destructive-foreground")}
      >
        {formatTime(seconds)}
      </span>
    </Badge>
  );
}
