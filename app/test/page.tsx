"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  // ✅ Safe load from localStorage (only in browser)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("quizData");
    if (saved) {
      try {
        setQuestions(JSON.parse(saved));
      } catch {
        console.error("Invalid quizData in localStorage");
      }
    }
  }, []);

  if (questions.length === 0)
    return <p className="text-center mt-10">No quiz loaded.</p>;

  const question = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (submitted) return;
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setShowExplanation(true);
    if (selected === question.correct_answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
      setShowExplanation(false);
    } else {
      // ✅ Save result and navigate
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "quizResult",
          JSON.stringify({
            score,
            total: questions.length,
            percent: Math.round((score / questions.length) * 100),
          })
        );
      }
      router.push("/test/result");
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelected(null);
      setSubmitted(false);
      setShowExplanation(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-2xl w-full p-8 space-y-8 rounded-2xl bg-card shadow-md border border-border">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.push("/quiz")}
          className="px-6"
        >
          ← Back to Home
        </Button>

        {/* Question Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Question {question.question_number} / {questions.length}
          </h2>
        </div>

        {/* Question Text */}
        <motion.p
          key={question.question_number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-center font-medium"
        >
          {question.question}
        </motion.p>

        {/* Options */}
        <motion.div
          key={`options-${question.question_number}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="space-y-3"
        >
          {question.options.map((opt: string) => {
            const isCorrect = opt === question.correct_answer;
            const isSelected = selected === opt;

            let style =
              "w-full justify-start text-base whitespace-normal break-words text-left h-auto min-h-[3rem] py-3 leading-snug";

            if (isSelected && !submitted) style += " ring-2 ring-primary";
            if (submitted && isSelected) {
              style += isCorrect
                ? " bg-green-600 text-white"
                : " bg-red-500 text-white";
            }
            if (submitted && isCorrect && !isSelected)
              style += " bg-green-500/60 text-white";

            return (
              <Button
                key={opt}
                variant="outline"
                className={style}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </Button>
            );
          })}
        </motion.div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              key={`explanation-${question.question_number}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`p-4 rounded-lg font-medium text-white text-center ${
                selected === question.correct_answer
                  ? "bg-green-600"
                  : "bg-red-500"
              }`}
            >
              {question.explanation}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="secondary"
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="px-6"
          >
            ← Previous
          </Button>

          {!submitted && (
            <Button
              onClick={handleSubmit}
              disabled={!selected}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Submit
            </Button>
          )}

          <Button
            onClick={nextQuestion}
            className={`px-6 ${
              currentIndex === questions.length - 1
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : ""
            }`}
            variant={
              currentIndex === questions.length - 1 ? undefined : "secondary"
            }
          >
            {currentIndex === questions.length - 1 ? "Result →" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
