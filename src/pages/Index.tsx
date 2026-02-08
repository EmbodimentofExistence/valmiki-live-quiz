import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LogoWatermark } from "@/components/LogoWatermark";
import { HeroSection } from "@/components/HeroSection";
import { QuizInterface } from "@/components/QuizInterface";

type View = "hero" | "quiz";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("hero");

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background watermark logo */}
      <LogoWatermark />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {currentView === "hero" && (
          <HeroSection
            key="hero"
            onStartQuiz={() => setCurrentView("quiz")}
          />
        )}

        {currentView === "quiz" && (
          <QuizInterface
            key="quiz"
            onBack={() => setCurrentView("hero")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
