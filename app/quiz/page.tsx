"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Moon, Sun, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { theme, setTheme } = useTheme();
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const loadingPhrases = ["Thinking...", "Creating...", "Almost there..."];
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % loadingPhrases.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        localStorage.setItem("quizData", JSON.stringify(data));
        router.push("/test");
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("Enter a topic");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count }),
      });

      const data = await res.json();
      let raw = data.text.trim();
      raw = raw.replace(/^```json\s*/i, "").replace(/```$/i, "");
      const questions = JSON.parse(raw);
      localStorage.setItem("quizData", JSON.stringify(questions));
      router.push("/test");
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full py-10 px-4 space-y-8">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-7xl font-extrabold tracking-tight text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        QuizDeck!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-center max-w-xl"
      >
        Generate, upload, and take interactive quizzes instantly — powered by
        AI.
      </motion.p>

      {/* Main Card */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="flex flex-col items-center gap-6 w-full max-w-3xl bg-card border border-border rounded-2xl p-8 shadow-sm"
      >
        {/* Top Row: Topic + Count */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-4">
          <Input
            type="text"
            placeholder="Enter topic (e.g. Programming concepts)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            min={1}
            max={20}
            placeholder="Number of questions"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-32"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading}
            variant="default"
            size="lg"
            className="px-6 font-semibold flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {loadingPhrases[phase]}
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-muted" />

        {/* Bottom Row: Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-6 w-full">
          {/* Upload */}
          <div className="flex flex-col items-center">
            <Button
              onClick={handleClick}
              variant="default"
              size="lg"
              className="px-6 font-semibold"
            >
              Upload Questions
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-muted hidden sm:block" />

          {/* Saved Quiz */}
          <Button
            variant="outline"
            onClick={() => router.push("/test")}
            className="px-6"
          >
            Go to Saved Quiz
          </Button>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-muted hidden sm:block" />

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
