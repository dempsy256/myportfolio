import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogOut, Check, X, CalendarIcon, Clock, Mail, Phone, User } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Inquiry = Tables<"client_inquiries">;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  accepted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  scheduled: "bg-green-500/10 text-green-400 border-green-500/20",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>();
  const [scheduleTime, setScheduleTime] = useState("10:00");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    checkAuth();
    fetchInquiries();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) navigate("/admin/login");
  };

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("client_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load inquiries");
    } else setInquiries(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string, scheduledDate?: string) => {
    const update: any = { status };
    if (scheduledDate) update.scheduled_date = scheduledDate;

    const { error } = await supabase.from("client_inquiries").update(update).eq("id", id);
    if (error) {
      console.error("Update error:", error);
      toast.error("Failed to update");
      return;
    }
    toast.success(`Inquiry ${status}`);
    fetchInquiries();
    setSelected(null);
    setScheduleOpen(false);
  };

  const handleAccept = (inquiry: Inquiry) => {
    setSelected(inquiry);
    setScheduleOpen(true);
  };

  const handleScheduleSave = () => {
    if (!selected || !scheduleDate) return;
    const [h, m] = scheduleTime.split(":");
    const dt = new Date(scheduleDate);
    dt.setHours(parseInt(h), parseInt(m));
    updateStatus(selected.id, "scheduled", dt.toISOString());
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <h1 className="text-lg font-semibold">Lead Inbox</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pending", "accepted", "scheduled", "rejected"].map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(s)}
              className="capitalize"
            >
              {s}
              {s !== "all" && (
                <span className="ml-1.5 text-xs opacity-70">
                  {inquiries.filter((i) => i.status === s).length}
                </span>
              )}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No inquiries found</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((inquiry) => (
              <div
                key={inquiry.id}
                className="glass-card p-5 hover-lift cursor-pointer"
                onClick={() => setSelected(inquiry)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{inquiry.client_name}</h3>
                      <Badge variant="outline" className={statusColors[inquiry.status || "pending"]}>
                        {inquiry.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{inquiry.project_details}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><Mail size={12} /> {inquiry.email}</span>
                      {inquiry.phone_number && <span className="flex items-center gap-1"><Phone size={12} /> {inquiry.phone_number}</span>}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected && !scheduleOpen} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <User size={18} /> {selected.client_name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-muted-foreground" />
                  <span>{selected.email}</span>
                </div>
                {selected.phone_number && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-muted-foreground" />
                    <span>{selected.phone_number}</span>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Project Details</p>
                  <p className="text-sm leading-relaxed bg-secondary/50 rounded-lg p-3">{selected.project_details}</p>
                </div>
                {selected.scheduled_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon size={14} className="text-green-400" />
                    <span>Scheduled: {new Date(selected.scheduled_date).toLocaleString()}</span>
                  </div>
                )}
                <Badge variant="outline" className={statusColors[selected.status || "pending"]}>
                  {selected.status}
                </Badge>
              </div>
              <DialogFooter className="gap-2">
                {selected.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={() => updateStatus(selected.id, "rejected")}
                    >
                      <X size={14} /> Reject
                    </Button>
                    <Button className="gap-1" onClick={() => handleAccept(selected)}>
                      <Check size={14} /> Accept & Schedule
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleOpen} onOpenChange={() => setScheduleOpen(false)}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={scheduleDate}
              onSelect={setScheduleDate}
              className="rounded-md border border-border pointer-events-auto"
              disabled={(date) => date < new Date()}
            />
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <Input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="bg-secondary border-border/50 w-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleScheduleSave} disabled={!scheduleDate}>
              Confirm Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
