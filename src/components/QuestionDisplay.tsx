import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface QuestionDisplayProps {
  question: string;
  options?: string[];
  answer?: string;
  showAnswer: boolean;
  selectedOption?: number | null;
  onSelectOption?: (index: number) => void;
  correctOptionIndex?: number;
  category?: string;
  points?: number;
}

export function QuestionDisplay({
  question,
  options = [],
  answer,
  showAnswer,
  selectedOption,
  onSelectOption,
  correctOptionIndex,
  category,
  points,
}: QuestionDisplayProps) {
  return (
    <motion.div
      className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header with category and points */}
      {(category || points) && (
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {category && (
            <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium">
              {category}
            </span>
          )}
          {points && (
            <span className="px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold">
              Q{points}
            </span>
          )}
        </motion.div>
      )}

      {/* Question text */}
      <motion.h2
        className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {question}
      </motion.h2>

      {/* Options (if multiple choice) */}
      {options.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = correctOptionIndex === index;
            const showResult = showAnswer;

            let variant: "quiz" | "quizActive" | "quizCorrect" | "quizIncorrect" = "quiz";
            if (showResult && isCorrect) variant = "quizCorrect";
            else if (showResult && isSelected && !isCorrect) variant = "quizIncorrect";
            else if (isSelected) variant = "quizActive";

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Button
                  variant={variant}
                  size="lg"
                  className="w-full justify-start text-left h-auto py-5 px-6 text-lg"
                  onClick={() => !showAnswer && onSelectOption?.(index)}
                  disabled={showAnswer}
                >
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && (
                    <Check className="w-6 h-6 text-quiz-correct ml-2" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X className="w-6 h-6 text-quiz-incorrect ml-2" />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Answer reveal (for non-MCQ) */}
      <AnimatePresence>
        {showAnswer && answer && options.length === 0 && (
          <motion.div
            className="mt-10 p-6 rounded-2xl bg-primary/10 border border-primary/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm uppercase tracking-wider text-primary/80 mb-2">
              Answer
            </p>
            <p className="font-display text-2xl md:text-3xl font-bold text-primary">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
