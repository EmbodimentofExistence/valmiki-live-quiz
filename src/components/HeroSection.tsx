import { motion } from "framer-motion";
import { LogoEmblem } from "./LogoEmblem";
import { Button } from "@/components/ui/button";
import { Sparkles, Play } from "lucide-react";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo emblem */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LogoEmblem size="lg" />
        </motion.div>

        {/* Institution name */}
        <motion.p
          className="text-primary/80 text-lg md:text-xl tracking-[0.3em] uppercase font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Valmiki Shiksha Sadan Presents
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-foreground">Valmiki</span>{" "}
          <span className="text-gold-gradient">Quiz</span>
        </motion.h1>

        <motion.h2
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Carnival
        </motion.h2>

        {/* Year badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-display text-2xl font-bold text-primary">2082</span>
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          An Interschool Academic Competition
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="carnival"
            size="xl"
            onClick={onStartQuiz}
            className="group"
          >
            <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
            Start Quiz
          </Button>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary/40 flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1.5 h-3 bg-primary/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
