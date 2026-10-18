import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import crocusAfricaImg from "@/assets/crocus-africa.png";

const projects = [
  {
    title: "VoltsEdge",
    description: "A modern energy technology platform delivering innovative solutions for power management and sustainable energy systems.",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
    color: "from-yellow-500/20 to-amber-500/10",
    link: "https://voltsedge.netlify.app/",
  },
  {
    title: "Crocus Africa",
    description: "Premium all-in-one platform for conferences, exhibitions, and networking summits across Africa with event discovery and management.",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
    color: "from-rose-500/20 to-fuchsia-500/10",
    link: "https://crocusapp.com/",
    image: crocusAfricaImg,
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="work" ref={ref} className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Projects</h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[340px] sm:w-[400px] snap-start"
            >
              <div className="glass-card hover-lift h-full flex flex-col overflow-hidden group">
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden relative`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">{"</>"}</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="w-fit gap-1 text-primary hover:text-primary/80 p-0 h-auto">
                        View Case Study <ArrowUpRight size={14} />
                      </Button>
                    </a>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-fit gap-1 text-primary hover:text-primary/80 p-0 h-auto">
                      View Case Study <ArrowUpRight size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;