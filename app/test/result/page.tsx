"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{
    score: number;
    total: number;
    percent: number;
  }>({
    score: 0,
    total: 0,
    percent: 0,
  });

  // ✅ Load from localStorage safely on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("quizResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResult({
          score: parsed.score ?? 0,
          total: parsed.total ?? 0,
          percent: parsed.percent ?? 0,
        });
      } catch {
        console.error("Invalid quizResult format");
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-12 px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full mx-auto p-8 text-center space-y-6 rounded-2xl bg-card shadow-lg border border-border"
      >
        <h1 className="text-3xl font-semibold">🎯 Quiz Completed!</h1>

        <p className="text-lg">
          You scored{" "}
          <span className="font-bold text-foreground">
            {result.score} / {result.total}
          </span>{" "}
          <br />
          <span
            className={`text-2xl font-bold ${
              result.percent >= 70
                ? "text-green-500"
                : result.percent >= 40
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {result.percent}%
          </span>
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/quiz")}
          >
            ← Back to Home
          </Button>

          <Button
            size="lg"
            onClick={() => {
              localStorage.removeItem("quizResult");
              router.push("/test");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Retake Test
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
