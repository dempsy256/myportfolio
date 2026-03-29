import { motion } from "framer-motion";
import { Sparkles, Star, ArrowRight, Palette } from "lucide-react";
import { SiReact, SiNodedotjs, SiPython } from "react-icons/si";
import developerPortrait from "@/assets/developer-portrait.jpeg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[hsl(217_100%_60%/0.06)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[hsl(260_100%_65%/0.05)] rounded-full blur-[120px] pointer-events-none" />

      <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-blue text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-muted-foreground">Available for Projects</span>
            <Sparkles size={14} className="text-primary" />
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
            <span className="gradient-text">Namirembe Redemptor</span>
            Helping Entrepreneurs{" "}
            <span className="gradient-text">Dreams</span> Come To Life
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Full-stack developer crafting high-performance web applications, stunning interfaces, and scalable backend systems that drive real business growth.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#contact">
              <Button size="lg" className="glow-blue gap-2 group">
                Start Your Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#work">
              <Button size="lg" variant="outline" className="border-border/60 hover:border-primary/40 transition-colors">
                View Portfolio
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-6 pt-4"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">5-Star Ratings</span>
            </div>
            <div className="w-px h-5 bg-border" />
            <span className="text-sm text-muted-foreground">Trusted by 30+ Clients</span>
          </motion.div>
        </motion.div>

        {/* Right side - abstract visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--primary)/0.2)] to-[hsl(var(--accent)/0.2)] blur-3xl" />
            {/* Animated glow ring */}
            <motion.div
              className="absolute inset-1 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), transparent, hsl(var(--primary)))",
                opacity: 0.5,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-3 rounded-full bg-background" />
            <div className="absolute inset-4 rounded-full overflow-hidden shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <img
                src={developerPortrait}
                alt="Developer portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Orbiting icon badges */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center center" }}
            >
              {/* React - top */}
              <motion.div
                className="absolute glass-card p-3 rounded-xl"
                style={{ top: "-24px", left: "50%", transform: "translateX(-50%)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <SiReact size={28} className="text-[#61DAFB]" />
              </motion.div>
              {/* Node.js - right */}
              <motion.div
                className="absolute glass-card p-3 rounded-xl"
                style={{ top: "50%", right: "-24px", transform: "translateY(-50%)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <SiNodedotjs size={28} className="text-[#339933]" />
              </motion.div>
              {/* Python - bottom */}
              <motion.div
                className="absolute glass-card p-3 rounded-xl"
                style={{ bottom: "-24px", left: "50%", transform: "translateX(-50%)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <SiPython size={28} className="text-[#3776AB]" />
              </motion.div>
              {/* UI/UX - left */}
              <motion.div
                className="absolute glass-card p-3 rounded-xl"
                style={{ top: "50%", left: "-24px", transform: "translateY(-50%)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Palette size={28} className="text-[#FF7262]" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;