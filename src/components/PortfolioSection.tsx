import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Smart Irrigation IoT Dashboard",
    description: "Real-time monitoring dashboard for smart agriculture, featuring sensor data visualization and automated irrigation controls.",
    tags: ["React", "Node.js", "MQTT", "Chart.js"],
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "Ride-Request App Interface",
    description: "A sleek ride-hailing mobile-first web app with live map tracking, fare estimation, and driver matching.",
    tags: ["Next.js", "Mapbox", "WebSocket", "Stripe"],
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Enterprise ERP System",
    description: "Full-featured enterprise resource planning system with HR, inventory, finance modules and role-based access.",
    tags: ["React", "Python", "PostgreSQL", "Docker"],
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    title: "E-Commerce Platform",
    description: "High-performance storefront with product search, cart management, payment processing, and analytics dashboard.",
    tags: ["Next.js", "Supabase", "Stripe", "Tailwind"],
    color: "from-orange-500/20 to-red-500/10",
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
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Projects that speak for themselves</h2>
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
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <span className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">{"</>"}</span>
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
                  <Button variant="ghost" size="sm" className="w-fit gap-1 text-primary hover:text-primary/80 p-0 h-auto">
                    View Case Study <ArrowUpRight size={14} />
                  </Button>
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