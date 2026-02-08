import { motion } from "framer-motion";
import valmikiLogo from "@/assets/valmiki-logo.png";

interface LogoEmblemProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

export function LogoEmblem({ size = "md", className = "" }: LogoEmblemProps) {
  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow effect behind logo */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />
      
      {/* Logo container with border */}
      <div className="relative w-full h-full rounded-full border-2 border-primary/40 p-1 bg-card/60 backdrop-blur-sm overflow-hidden shadow-lg">
        <img
          src={valmikiLogo}
          alt="Valmiki Shiksha Sadan"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      
      {/* Subtle ring animation */}
      <motion.div
        className="absolute inset-[-4px] rounded-full border border-primary/30"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
