import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface QuizTimerProps {
  duration: number; // in seconds
  isRunning: boolean;
  onTimeUp?: () => void;
  onTick?: (remaining: number) => void;
}

export function QuizTimer({ duration, isRunning, onTimeUp, onTick }: QuizTimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const [key, setKey] = useState(0);

  const reset = useCallback(() => {
    setRemaining(duration);
    setKey(prev => prev + 1);
  }, [duration]);

  useEffect(() => {
    reset();
  }, [duration, reset]);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          onTimeUp?.();
          clearInterval(interval);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remaining, onTimeUp, onTick]);

  const progress = (remaining / duration) * 100;
  const isLow = remaining <= 10;
  const isCritical = remaining <= 5;

  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      {/* Timer circle */}
      <motion.div
        key={key}
        className="relative w-32 h-32"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={isCritical ? "hsl(var(--quiz-incorrect))" : isLow ? "hsl(var(--accent))" : "hsl(var(--primary))"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={remaining}
              className={`font-display text-4xl font-bold ${
                isCritical ? "text-quiz-incorrect" : isLow ? "text-accent" : "text-primary"
              }`}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {remaining}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Pulse effect when low */}
        {isLow && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Label */}
      <p className="text-center mt-2 text-sm text-muted-foreground uppercase tracking-wider">
        Seconds
      </p>
    </div>
  );
}
