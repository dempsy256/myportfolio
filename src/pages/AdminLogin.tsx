import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            toast.error(error.message);
        } else {
            navigate("/admin");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Lock size={20} className="text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Login</h1>
                    <p className="text-sm text-muted-foreground">Sign in to manage inquiries</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary border-border/50"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-secondary border-border/50"
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;