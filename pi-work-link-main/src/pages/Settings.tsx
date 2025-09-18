// src/pages/Settings.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Upload,
  MessageCircle,
  Wallet,
  QrCode,
  Key,
  Smartphone,
  ExternalLink,
  DollarSign,
  ArrowUpDown,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { useToast } from "@/hooks/use-toast";
import TwoFactorAuth from "@/components/settings/TwoFactorAuth";

/**
 * Functional Settings page
 * - Uses VITE_API_URL env (set on Vercel/.env)
 * - Wallet endpoints used from backend (api/wallet)
 * - Other endpoints expected under /api/user/* or /api/auth/* (placeholders)
 */

const API_ROOT = import.meta.env.VITE_API_URL || "";
const USER_API = `${API_ROOT}/api/user`; // placeholder group for user settings
const AUTH_API = `${API_ROOT}/api/auth`; // auth endpoints (signup/login/forgot/reset exist)
const WALLET_API = `${API_ROOT}/api/wallet`; // your real wallet routes

const getAuthHeaders = () => {
  const t = localStorage.getItem("token") || localStorage.getItem("authToken") || "";
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  // --- states (kept same as your original)
  const [userProfile, setUserProfile] = useState<any>({
    name: "Alex Johnson",
    email: "alex@workchain.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer with 5+ years of experience in React, Node.js, and blockchain development.",
    languages: ["English", "Spanish"],
    timezone: "America/Los_Angeles",
  });

  const [notifications, setNotifications] = useState<any>({
    emailMessages: true,
    emailJobOffers: true,
    emailPayments: true,
    emailMarketing: false,
    pushMessages: true,
    pushJobOffers: true,
    pushPayments: true,
  });

  const [privacy, setPrivacy] = useState<any>({
    profileVisible: true,
    showOnlineStatus: true,
    allowDirectMessages: true,
    showEarnings: false,
  });

  const [chatSettings, setChatSettings] = useState<any>({
    readReceipts: true,
    typingIndicators: true,
    messageSync: true,
    autoTranslate: false,
    blockSpam: true,
  });

  const [walletSettings, setWalletSettings] = useState<any>({
    autoWithdraw: false,
    withdrawThreshold: 100,
    enableNotifications: true,
    requireConfirmation: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");

  // wallet info
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [transactionLoading, setTransactionLoading] = useState(false);

  // fetch initial settings/profile + wallet
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // 1) try fetch user profile from USER_API (if backend supports)
        try {
          const res = await axios.get(`${USER_API}/profile`, {
            headers: getAuthHeaders(),
          });
          if (res?.data) {
            // merge defensively
            const data = res.data;
            setUserProfile((prev:any) => ({ ...prev, ...data }));
            if (data.notifications) setNotifications(data.notifications);
            if (data.privacy) setPrivacy(data.privacy);
            if (data.chatSettings) setChatSettings(data.chatSettings);
            if (data.wallet) setWalletSettings(data.wallet);
            if (typeof data.twoFactorEnabled !== "undefined")
              setTwoFactorEnabled(Boolean(data.twoFactorEnabled));
          }
        } catch (e) {
          // ignore if not implemented on backend
          console.warn("GET /api/user/profile failed (maybe not implemented):", e);
        }

        // 2) wallet info (this endpoint exists in your backend)
        try {
          const w = await axios.get(`${WALLET_API}/`, {
            headers: getAuthHeaders(),
          });
          if (w?.data) setWalletInfo(w.data);
        } catch (ew) {
          console.warn("GET /api/wallet failed:", ew);
        }
      } catch (err) {
        console.error("fetchAll error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Handlers ----------

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // try update via /api/user/profile (recommended to add on backend)
      const res = await axios.put(`${USER_API}/profile`, userProfile, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      toast({
        title: "Profile Updated",
        description: res?.data?.message || "Your profile has been updated.",
      });
      if (res?.data) setUserProfile((prev:any) => ({ ...prev, ...res.data }));
    } catch (err:any) {
      console.error("handleSaveProfile:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${USER_API}/notifications`, notifications, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      toast({
        title: "Notification Settings Saved",
        description: res?.data?.message || "Saved.",
      });
      if (res?.data?.notifications) setNotifications(res.data.notifications);
    } catch (err:any) {
      console.error("handleSaveNotifications:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to save notifications.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${USER_API}/privacy`, privacy, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      toast({
        title: "Privacy Settings Saved",
        description: res?.data?.message || "Saved.",
      });
      if (res?.data?.privacy) setPrivacy(res.data.privacy);
    } catch (err:any) {
      console.error("handleSavePrivacy:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to save privacy.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChatSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${USER_API}/chat`, chatSettings, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      toast({
        title: "Chat Settings Saved",
        description: res?.data?.message || "Saved.",
      });
      if (res?.data?.chatSettings) setChatSettings(res.data.chatSettings);
    } catch (err:any) {
      console.error("handleSaveChatSettings:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to save chat settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWalletSettings = async () => {
    setLoading(true);
    try {
      // If you have a /api/user/wallet endpoint it will update user wallet preferences.
      // Otherwise you may store preferences locally or implement server route.
      const res = await axios.put(`${USER_API}/wallet`, walletSettings, {
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      });
      toast({
        title: "Wallet Settings Saved",
        description: res?.data?.message || "Saved.",
      });
      if (res?.data?.wallet) setWalletSettings(res.data.wallet);
    } catch (err:any) {
      console.error("handleSaveWalletSettings:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to save wallet settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Wallet quick actions: deposit / withdraw modal flow simplified
  const handleWalletDeposit = async (amount:number) => {
    setTransactionLoading(true);
    try {
      const res = await axios.post(
        `${WALLET_API}/deposit`,
        { amount },
        { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
      );
      toast({ title: "Deposit queued", description: res?.data?.message || "Deposit request sent." });
      // refresh wallet
      const w = await axios.get(`${WALLET_API}/`, { headers: getAuthHeaders() });
      if (w?.data) setWalletInfo(w.data);
    } catch (err:any) {
      console.error("deposit error:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to send deposit.",
        variant: "destructive",
      });
    } finally {
      setTransactionLoading(false);
    }
  };

  const handleWalletWithdraw = async (amount:number) => {
    setTransactionLoading(true);
    try {
      const res = await axios.post(
        `${WALLET_API}/withdraw`,
        { amount },
        { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
      );
      toast({ title: "Withdraw requested", description: res?.data?.message || "Withdraw request sent." });
      const w = await axios.get(`${WALLET_API}/`, { headers: getAuthHeaders() });
      if (w?.data) setWalletInfo(w.data);
    } catch (err:any) {
      console.error("withdraw error:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to withdraw.",
        variant: "destructive",
      });
    } finally {
      setTransactionLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    // toggle locally first for quick feedback
    const newState = !twoFactorEnabled;
    setTwoFactorEnabled(newState);

    try {
      // backend endpoint may be /api/auth/2fa or /api/user/2fa — adjust as needed
      const res = await axios.put(
        `${AUTH_API}/2fa`,
        { enabled: newState },
        { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
      );
      toast({
        title: newState ? "2FA Enabled" : "2FA Disabled",
        description: res?.data?.message || "",
      });
    } catch (err:any) {
      setTwoFactorEnabled(!newState);
      console.error("2FA error:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to toggle 2FA.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      toast({ title: "Type DELETE to confirm" });
      return;
    }
    setLoading(true);
    try {
      // try auth delete endpoint first (adjust if your backend uses /api/user/delete)
      await axios.delete(`${AUTH_API}/delete`, { headers: getAuthHeaders() });
      toast({ title: "Account deleted", description: "Redirecting..." });
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err:any) {
      console.error("delete account error:", err);
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to delete account.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI (keeps exactly your original layout and handlers wired) ----------
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* PROFILE */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and professional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userProfile.avatar || ""} />
                    <AvatarFallback className="text-xl bg-gradient-primary text-white">
                      {userProfile.name?.split(" ").map((n:string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="mb-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 5MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={userProfile.name} onChange={(e) => setUserProfile((prev:any) => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={userProfile.email} onChange={(e) => setUserProfile((prev:any) => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={userProfile.phone} onChange={(e) => setUserProfile((prev:any) => ({ ...prev, phone: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={userProfile.location} onChange={(e) => setUserProfile((prev:any) => ({ ...prev, location: e.target.value }))} />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <textarea id="bio" rows={4} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={userProfile.bio} onChange={(e) => setUserProfile((prev:any) => ({ ...prev, bio: e.target.value }))} />
                </div>

                {/* Languages & Timezone */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Languages</Label>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(userProfile.languages) && userProfile.languages.map((lang:string) => (
                        <Badge key={lang} variant="secondary">{lang}</Badge>
                      ))}
                      <Button variant="outline" size="sm">Add Language</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={userProfile.timezone} onValueChange={(value:any) => setUserProfile((prev:any) => ({ ...prev, timezone: value }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOTIFICATIONS */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2"><Mail className="h-4 w-4" />Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Messages</p>
                        <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                      </div>
                      <Switch checked={notifications.emailMessages} onCheckedChange={(checked:any) => setNotifications((prev:any) => ({ ...prev, emailMessages: checked }))} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Job Offers</p>
                        <p className="text-sm text-muted-foreground">Receive notifications for new job opportunities</p>
                      </div>
                      <Switch checked={notifications.emailJobOffers} onCheckedChange={(checked:any) => setNotifications((prev:any) => ({ ...prev, emailJobOffers: checked }))} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified about payments and transactions</p>
                      </div>
                      <Switch checked={notifications.emailPayments} onCheckedChange={(checked:any) => setNotifications((prev:any) => ({ ...prev, emailPayments: checked }))} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing & Updates</p>
                        <p className="text-sm text-muted-foreground">Receive newsletters and product updates</p>
                      </div>
                      <Switch checked={notifications.emailMarketing} onCheckedChange={(checked:any) => setNotifications((prev:any) => ({ ...prev, emailMarketing: checked }))} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Messages</p>
                        <p className="text-sm text-muted-foreground">Real-time message notifications</p>
                      </div>
                      <Switch checked={notifications.pushMessages} onCheckedChange={(checked:any) => setNotifications((prev:any) => ({ ...prev, pushMessages: checked }))} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Job Alerts</p>
                        <p className="text-sm text-muted-foreground">Instant notifications for matching jobs</p>
                      </div>
                      <Switch checked={notifications.pushJobOffers} onCheckedChange={(checked:any) => setNotifications((prev:any) => ({ ...prev, pushJobOffers: checked }))} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Alerts</p>
                        <p className="text-sm text-muted-foreground">Instant payment and transaction updates</p>
                      </div>
                      <Switch checked={notifications.pushPayments} onCheckedChange={(checked:any) => setNotifications((prev:any) => ({ ...prev, pushPayments: checked }))} />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRIVACY */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Privacy Settings</CardTitle>
                <CardDescription>Control your privacy and what others can see</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-muted-foreground">Make your profile visible to potential clients</p>
                    </div>
                    <Switch checked={privacy.profileVisible} onCheckedChange={(checked:any) => setPrivacy((prev:any) => ({ ...prev, profileVisible: checked }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Online Status</p>
                      <p className="text-sm text-muted-foreground">Show when you're online to other users</p>
                    </div>
                    <Switch checked={privacy.showOnlineStatus} onCheckedChange={(checked:any) => setPrivacy((prev:any) => ({ ...prev, showOnlineStatus: checked }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Direct Messages</p>
                      <p className="text-sm text-muted-foreground">Allow other users to send you direct messages</p>
                    </div>
                    <Switch checked={privacy.allowDirectMessages} onCheckedChange={(checked:any) => setPrivacy((prev:any) => ({ ...prev, allowDirectMessages: checked }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Earnings</p>
                      <p className="text-sm text-muted-foreground">Display your earnings on your public profile</p>
                    </div>
                    <Switch checked={privacy.showEarnings} onCheckedChange={(checked:any) => setPrivacy((prev:any) => ({ ...prev, showEarnings: checked }))} />
                  </div>
                </div>

                <Button onClick={handleSavePrivacy} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CHAT */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageCircle className="h-5 w-5" />Chat Settings</CardTitle>
                <CardDescription>Customize your messaging and chat preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Read Receipts</p>
                      <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                    </div>
                    <Switch checked={chatSettings.readReceipts} onCheckedChange={(checked:any) => setChatSettings((prev:any) => ({ ...prev, readReceipts: checked }))} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Typing Indicators</p>
                      <p className="text-sm text-muted-foreground">Show when you're typing</p>
                    </div>
                    <Switch checked={chatSettings.typingIndicators} onCheckedChange={(checked:any) => setChatSettings((prev:any) => ({ ...prev, typingIndicators: checked }))} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Sync</p>
                      <p className="text-sm text-muted-foreground">Sync messages across all devices</p>
                    </div>
                    <Switch checked={chatSettings.messageSync} onCheckedChange={(checked:any) => setChatSettings((prev:any) => ({ ...prev, messageSync: checked }))} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-translate Messages</p>
                      <p className="text-sm text-muted-foreground">Automatically translate messages to your language</p>
                    </div>
                    <Switch checked={chatSettings.autoTranslate} onCheckedChange={(checked:any) => setChatSettings((prev:any) => ({ ...prev, autoTranslate: checked }))} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Block Spam</p>
                      <p className="text-sm text-muted-foreground">Automatically filter spam messages</p>
                    </div>
                    <Switch checked={chatSettings.blockSpam} onCheckedChange={(checked:any) => setChatSettings((prev:any) => ({ ...prev, blockSpam: checked }))} />
                  </div>
                </div>

                <Button onClick={handleSaveChatSettings} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Chat Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WALLET */}
          <TabsContent value="wallet" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" />Wallet Settings</CardTitle>
                <CardDescription>Manage your Pi wallet and payment preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-withdraw</p>
                      <p className="text-sm text-muted-foreground">Automatically withdraw when balance reaches threshold</p>
                    </div>
                    <Switch checked={walletSettings.autoWithdraw} onCheckedChange={(checked:any) => setWalletSettings((prev:any) => ({ ...prev, autoWithdraw: checked }))} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="withdraw-threshold">Auto-withdraw Threshold (π)</Label>
                    <Input id="withdraw-threshold" type="number" value={walletSettings.withdrawThreshold} onChange={(e) => setWalletSettings((prev:any) => ({ ...prev, withdrawThreshold: Number(e.target.value) }))} disabled={!walletSettings.autoWithdraw} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified about all wallet transactions</p>
                    </div>
                    <Switch checked={walletSettings.enableNotifications} onCheckedChange={(checked:any) => setWalletSettings((prev:any) => ({ ...prev, enableNotifications: checked }))} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transaction Confirmation</p>
                      <p className="text-sm text-muted-foreground">Require confirmation for all transactions</p>
                    </div>
                    <Switch checked={walletSettings.requireConfirmation} onCheckedChange={(checked:any) => setWalletSettings((prev:any) => ({ ...prev, requireConfirmation: checked }))} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2"><DollarSign className="h-4 w-4" />Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center justify-center" onClick={() => window.open('/wallet', '_blank')}><ArrowUpDown className="mr-2 h-4 w-4" />View Transactions</Button>
                    <Button variant="outline" className="flex items-center justify-center" onClick={() => toast({ title: "Pi Wallet Connection", description: "Connecting to Pi Network wallet..." })}><ExternalLink className="mr-2 h-4 w-4" />Connect Pi Wallet</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button onClick={() => handleWalletDeposit(10)} disabled={transactionLoading} className="w-full">Deposit 10</Button>
                  <Button onClick={() => handleWalletWithdraw(5)} disabled={transactionLoading} className="w-full">Withdraw 5</Button>
                </div>

                <Button onClick={handleSaveWalletSettings} className="w-full md:w-auto mt-4"><Save className="mr-2 h-4 w-4" />Save Wallet Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* APPEARANCE */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5" />Appearance</CardTitle>
                <CardDescription>Customize how WorkChain Pi looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${theme === "light" ? "border-primary" : "border-border"}`} onClick={() => setTheme("light")}><div className="mb-2 h-8 w-full rounded bg-gray-100" /><p className="text-sm font-medium">Light</p></div>
                    <div className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${theme === "dark" ? "border-primary" : "border-border"}`} onClick={() => setTheme("dark")}><div className="mb-2 h-8 w-full rounded bg-gray-800" /><p className="text-sm font-medium">Dark</p></div>
                    <div className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${theme === "system" ? "border-primary" : "border-border"}`} onClick={() => setTheme("system")}><div className="mb-2 h-8 w-full rounded bg-gradient-to-r from-gray-100 to-gray-800" /><p className="text-sm font-medium">System</p></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY */}
          <TabsContent value="security" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                <TwoFactorAuth isEnabled={twoFactorEnabled} onToggle={handleEnable2FA} />

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" />Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>This action cannot be undone. This will permanently delete your account and remove all data.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Warning:</strong> Deleting your account will:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Remove all your profile information</li>
                              <li>Delete all your messages and chat history</li>
                              <li>Cancel all active projects and contracts</li>
                              <li>Forfeit any pending payments</li>
                              <li>Remove your wallet and transaction history</li>
                            </ul>
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-delete">Type "DELETE" to confirm account deletion</Label>
                          <Input id="confirm-delete" placeholder="DELETE" className="font-mono" value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} />
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1">Cancel</Button>
                          <Button variant="destructive" className="flex-1" onClick={handleDeleteAccount}>Delete Account Permanently</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
