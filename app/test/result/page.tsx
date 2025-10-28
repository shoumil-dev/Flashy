"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ResultPage() {
  const router = useRouter();
  const result = JSON.parse(localStorage.getItem("quizResult") || "{}") || {};
  const safeResult = {
    score: result.score ?? 0,
    total: result.total ?? 0,
    percent: result.percent ?? 0,
  };

  return (
    <div className="flex justify-center items-center w-full py-8">
      <motion.div
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
      >
        <div className="max-w-md mx-auto p-8 text-center space-y-6 rounded-2xl bg-card shadow-md">
          <h1 className="text-2xl font-semibold">Quiz Completed!</h1>
          <p className="text-lg">
            You scored{" "}
            <span className="font-bold">
              {safeResult.score} / {safeResult.total}
            </span>{" "}
            ({safeResult.percent}%)
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => router.push("/quiz")} variant="outline">
              ← Back to Home
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("quizResult");
                router.push("/test");
              }}
            >
              Retake Test
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
