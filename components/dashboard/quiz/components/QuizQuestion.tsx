import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuizOption } from "./QuizOption";
import type { QuizQuestion as QuizQuestionType } from "@/constant/quizMockData";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  selectedAnswer: string | null;
  showResult?: boolean;
  onSelectAnswer: (answerId: string) => void;
}

const optionLabels = ["A", "B", "C", "D"];

export function QuizQuestion({
  question,
  questionNumber,
  selectedAnswer,
  showResult = false,
  onSelectAnswer,
}: QuizQuestionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="border-border bg-card shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              {/* Question Number Badge */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
                <span className="text-lg font-bold">{questionNumber}</span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg md:text-xl font-semibold text-foreground leading-relaxed flex-1 pt-2">
                {question.question}
              </h3>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pt-2">
            {question.options.map((option, index) => (
              <QuizOption
                key={option.id}
                id={option.id}
                text={option.text}
                optionLabel={optionLabels[index]}
                isSelected={selectedAnswer === option.id}
                isCorrect={option.id === question.correctAnswer}
                showResult={showResult}
                disabled={showResult}
                onSelect={onSelectAnswer}
              />
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
