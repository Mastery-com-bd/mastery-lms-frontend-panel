"use client";

import { QuizResult } from "@/constant/quizMockData";
import { redirect } from "next/navigation";
import { QuizSystem } from "./components/QuizSystem";

export default function Quiz() {
  const handleComplete = (result: QuizResult) => {
    console.log("Quiz completed:", result);
    // Here you could save the result to database, show notifications, etc.
  };

  const handleClose = () => {
    redirect("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <QuizSystem onComplete={handleComplete} onClose={handleClose} />
      </main>
    </div>
  );
}
