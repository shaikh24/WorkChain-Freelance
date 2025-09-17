import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Success", description: data.message || "Password updated" });
        navigate("/login");
      } else {
        toast({ title: "Error", description: data.message || "Invalid token or other error" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div>
              <Label>Reset Token</Label>
              <Input value={token} onChange={(e)=>setToken(e.target.value)} required />
            </div>
            <div>
              <Label>New Password</Label>
              <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Password"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;