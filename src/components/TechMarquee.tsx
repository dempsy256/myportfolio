import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Pen } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiSupabase,
  SiFigma,
  SiDocker,
  SiGit,
  SiCanva,
} from "react-icons/si";

const techs = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Illustrator", icon: Pen, color: "#FF9A00" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC" },
];

const TechMarquee = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="tools" ref={ref} className="py-16 border-y border-border/40 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Technologies & Tools
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex marquee">
            {[...techs, ...techs].map((tech, i) => (
              <div
                key={i}
                className="group flex-shrink-0 mx-4 p-4 glass-card text-muted-foreground transition-all duration-300 cursor-default hover:border-[var(--brand-color)]/30"
                title={tech.name}
                style={{ "--brand-color": tech.color, "--brand-glow": `${tech.color}33` } as React.CSSProperties}
              >
                <tech.icon size={24} className="transition-all duration-300 group-hover:[color:var(--brand-color)] group-hover:drop-shadow-[0_0_8px_var(--brand-glow)]" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TechMarquee;