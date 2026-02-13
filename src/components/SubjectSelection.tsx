import { motion } from "framer-motion";
import { LogoEmblem } from "./LogoEmblem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Globe, Newspaper, Trophy, Brain, Atom, Church, Palette, Check } from "lucide-react";

const subjects = [
  { id: "history", name: "History", icon: BookOpen },
  { id: "geography", name: "Geography", icon: Globe },
  { id: "current-affairs", name: "Current Affairs", icon: Newspaper },
  { id: "games-sports", name: "Games & Sports", icon: Trophy },
  { id: "maths-iq", name: "Maths & IQ", icon: Brain },
  { id: "science-tech", name: "Science & Technology", icon: Atom },
  { id: "religion-culture", name: "Religion & Culture", icon: Church },
  { id: "art-literature", name: "Art & Literature", icon: Palette },
];

interface SubjectSelectionProps {
  onSelectSubject: (subjectId: string, subjectName: string) => void;
  onBack: () => void;
  completedSubjects: Set<string>;
}

export function SubjectSelection({ onSelectSubject, onBack, completedSubjects }: SubjectSelectionProps) {
  return (
    <motion.div
      className="min-h-screen p-4 md:p-6 lg:p-8 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-4">
          <LogoEmblem size="sm" />
          <div className="text-right hidden sm:block">
            <h1 className="font-display text-xl font-bold">Valmiki Quiz Carnival</h1>
            <p className="text-sm text-muted-foreground">2082</p>
          </div>
        </div>
      </header>

      {/* Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          Choose a <span className="text-gold-gradient">Subject</span>
        </h2>
        <p className="text-muted-foreground text-lg">Select a category to begin the round</p>
      </motion.div>

      {/* Subject grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl w-full">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            const isCompleted = completedSubjects.has(subject.id);
            return (
              <motion.button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id, subject.name)}
                className={`group relative glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center gap-4 cursor-pointer border-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 ${
                  isCompleted 
                    ? "border-quiz-correct/50 opacity-80" 
                    : "border-border hover:border-primary"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.06 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-destructive/90 flex items-center justify-center shadow-lg">
                      <Check className="w-10 h-10 md:w-12 md:h-12 text-destructive-foreground stroke-[3]" />
                    </div>
                  </motion.div>
                )}
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${isCompleted ? "opacity-40" : ""}`}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <span className={`font-display text-base md:text-lg font-bold text-foreground text-center leading-tight ${isCompleted ? "opacity-40" : ""}`}>
                  {subject.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
