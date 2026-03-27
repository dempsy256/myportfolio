import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="py-24">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Building digital products that <span className="gradient-text">matter</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a full-stack developer with a passion for turning complex problems into elegant, user-centric solutions. With experience spanning frontend frameworks, backend architectures, and cloud infrastructure, I bring ideas from concept to deployment.
            </p>
            <p>
              Whether it's a startup MVP, an enterprise dashboard, or an IoT platform, I approach every project with the same rigor — clean code, scalable architecture, and relentless attention to the user experience.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            {[
              { num: "2+", label: "Years Experience" },
              { num: "3+", label: "Projects Shipped" },
              { num: "2+", label: "Happy Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl font-bold gradient-text">{stat.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;