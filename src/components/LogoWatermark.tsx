import { motion } from "framer-motion";
import valmikiLogo from "@/assets/valmiki-logo.png";

export function LogoWatermark() {
  return (
    <div className="watermark">
      <motion.img
        src={valmikiLogo}
        alt=""
        className="w-[60vw] max-w-[800px] select-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        aria-hidden="true"
      />
    </div>
  );
}
