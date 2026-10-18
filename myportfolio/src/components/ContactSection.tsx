import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "256759027391";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", details: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.details) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("client_inquiries").insert({
        client_name: form.name.trim(),
        phone_number: form.phone.trim(),
        email: form.email.trim(),
        project_details: form.details.trim(),
        status: "pending",
      });
      if (error) throw error;
      toast.success("Inquiry sent! I'll get back to you soon.");
      setForm({ name: "", phone: "", email: "", details: "" });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again or reach out on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Let's build something great</h2>
          <p className="text-muted-foreground">Have a project in mind? Fill out the form or reach out directly.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-secondary border-border/50 focus:border-primary/50"
              maxLength={100}
            />
            <Input
              placeholder="Phone (+256...)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-secondary border-border/50 focus:border-primary/50"
              maxLength={20}
            />
          </div>
          <Input
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-secondary border-border/50 focus:border-primary/50"
            maxLength={255}
          />
          <Textarea
            placeholder="Project Details, Issues, or Concerns *"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            className="bg-secondary border-border/50 focus:border-primary/50 min-h-[140px]"
            maxLength={2000}
          />
          <Button type="submit" size="lg" className="w-full glow-blue gap-2" disabled={loading}>
            {loading ? "Sending..." : "Send Inquiry"}
            <Send size={16} />
          </Button>
        </motion.form>

        {/* Direct contact buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-4 mt-8 justify-center"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
              <MessageCircle size={18} />
              Chat on WhatsApp
            </Button>
          </a>
          <a href={`tel:+${WHATSAPP_NUMBER}`}>
            <Button variant="outline" className="gap-2 border-border/60 hover:border-primary/40">
              <Phone size={18} />
              Call Direct
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;