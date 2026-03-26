import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Code2, Database, Plug, Palette, Server } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Pixel-perfect interfaces designed for conversion and delight. From wireframes to high-fidelity prototypes.",
    stat: 95,
    statLabel: "Client Satisfaction",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web applications with React, Next.js, Node.js, and Python — built for scale.",
    stat: 50,
    statLabel: "Projects Delivered",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description: "Robust data models with PostgreSQL, MongoDB, and real-time sync using Supabase.",
    stat: 99,
    statLabel: "Uptime SLA",
  },
  {
    icon: Plug,
    title: "API Integration",
    description: "Seamless third-party integrations — payment gateways, CRMs, analytics, and custom REST/GraphQL APIs.",
    stat: 40,
    statLabel: "APIs Integrated",
  },
  {
    icon: Server,
    title: "Cloud & DevOps",
    description: "Deployments on AWS, Vercel, and Docker with CI/CD pipelines and monitoring.",
    stat: 30,
    statLabel: "Cloud Deployments",
  },
  {
    icon: Layers,
    title: "Technical Consulting",
    description: "Architecture reviews, technology selection, and roadmap planning for startups and enterprises.",
    stat: 20,
    statLabel: "Startups Advised",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" ref={ref} className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Services & Capabilities</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6 hover-lift group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{service.description}</p>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{service.statLabel}</span>
                  <span className="text-primary font-medium">{service.stat}{service.statLabel.includes("Uptime") ? "%" : "+"}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${Math.min(service.stat, 100)}%` } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;