import { motion } from "framer-motion";
import { Lock, Check, Sparkles } from "lucide-react";

interface QuizCategory {
  id: string;
  name: string;
  questions: {
    id: string;
    number: number;
    answered: boolean;
  }[];
}

interface QuizBoardProps {
  categories: QuizCategory[];
  onSelectQuestion: (categoryId: string, questionId: string) => void;
  activeQuestionId?: string;
}

export function QuizBoard({ categories, onSelectQuestion, activeQuestionId }: QuizBoardProps) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center">
          Quiz Board
        </h2>
        <Sparkles className="w-6 h-6 text-primary" />
      </div>

      {/* Board grid */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              {categories.map((category, index) => (
                <motion.th
                  key={category.id}
                  className="px-3 py-4 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-primary/20 rounded-xl py-3 px-4">
                    <span className="font-display text-lg font-bold text-primary">
                      {category.name}
                    </span>
                  </div>
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Assuming all categories have same number of questions */}
            {categories[0]?.questions.map((_, qIndex) => (
              <tr key={qIndex}>
                {categories.map((category, cIndex) => {
                  const question = category.questions[qIndex];
                  if (!question) return <td key={cIndex} />;

                  const isActive = activeQuestionId === question.id;
                  const isAnswered = question.answered;

                  return (
                    <td key={question.id} className="p-2">
                      <motion.button
                        onClick={() => !isAnswered && onSelectQuestion(category.id, question.id)}
                        className={`
                          w-full aspect-square max-w-[100px] mx-auto rounded-2xl
                          flex items-center justify-center
                          font-display text-2xl md:text-3xl font-bold
                          transition-all duration-300
                          ${isAnswered 
                            ? "bg-muted/50 text-muted-foreground cursor-default" 
                            : isActive
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                              : "bg-card hover:bg-card-elevated hover:scale-105 hover:shadow-lg text-foreground cursor-pointer border-2 border-border hover:border-primary"
                          }
                        `}
                        whileHover={!isAnswered ? { scale: 1.05 } : {}}
                        whileTap={!isAnswered ? { scale: 0.95 } : {}}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: isActive ? 1.05 : 1 }}
                        transition={{ delay: (cIndex + qIndex * categories.length) * 0.03 }}
                        disabled={isAnswered}
                      >
                        {isAnswered ? (
                          <Check className="w-8 h-8 text-muted-foreground" />
                        ) : (
                          question.number
                        )}
                      </motion.button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
