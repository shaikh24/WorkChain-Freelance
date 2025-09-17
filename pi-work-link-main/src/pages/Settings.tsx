import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex@workchain.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer with 5+ years of experience in React, Node.js, and blockchain development.",
    languages: ["English", "Spanish"],
    timezone: "America/Los_Angeles",
  });

  const [notifications, setNotifications] = useState({
    emailMessages: true,
    emailJobOffers: true,
    emailPayments: true,
    emailMarketing: false,
    pushMessages: true,
    pushJobOffers: true,
    pushPayments: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showOnlineStatus: true,
    allowDirectMessages: true,
    showEarnings: false,
  });

  const [chatSettings, setChatSettings] = useState({
    readReceipts: true,
    typingIndicators: true,
    messageSync: true,
    autoTranslate: false,
    blockSpam: true,
  });

  const [walletSettings, setWalletSettings] = useState({
    autoWithdraw: false,
    withdrawThreshold: 100,
    enableNotifications: true,
    requireConfirmation: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Saved",
      description: "Your privacy settings have been updated.",
    });
  };

  const handleSaveChatSettings = () => {
    toast({
      title: "Chat Settings Saved",
      description: "Your chat preferences have been updated.",
    });
  };

  const handleSaveWalletSettings = () => {
    toast({
      title: "Wallet Settings Saved",
      description: "Your wallet preferences have been updated.",
    });
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled." 
        : "Two-factor authentication has been enabled for your account.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
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

          <TabsContent value="profile" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and professional details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl bg-gradient-primary text-white">
                      {userProfile.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="mb-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userProfile.location}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                  />
                </div>

                {/* Languages & Timezone */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Languages</Label>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm">Add Language</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={userProfile.timezone} onValueChange={(value) => 
                      setUserProfile(prev => ({ ...prev, timezone: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
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

          <TabsContent value="notifications" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Messages</p>
                        <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                      </div>
                      <Switch
                        checked={notifications.emailMessages}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailMessages: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Job Offers</p>
                        <p className="text-sm text-muted-foreground">Receive notifications for new job opportunities</p>
                      </div>
                      <Switch
                        checked={notifications.emailJobOffers}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailJobOffers: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified about payments and transactions</p>
                      </div>
                      <Switch
                        checked={notifications.emailPayments}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailPayments: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing & Updates</p>
                        <p className="text-sm text-muted-foreground">Receive newsletters and product updates</p>
                      </div>
                      <Switch
                        checked={notifications.emailMarketing}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailMarketing: checked }))
                        }
                      />
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
                      <Switch
                        checked={notifications.pushMessages}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushMessages: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Job Alerts</p>
                        <p className="text-sm text-muted-foreground">Instant notifications for matching jobs</p>
                      </div>
                      <Switch
                        checked={notifications.pushJobOffers}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushJobOffers: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Alerts</p>
                        <p className="text-sm text-muted-foreground">Instant payment and transaction updates</p>
                      </div>
                      <Switch
                        checked={notifications.pushPayments}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushPayments: checked }))
                        }
                      />
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

          <TabsContent value="privacy" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control your privacy and what others can see
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-muted-foreground">Make your profile visible to potential clients</p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, profileVisible: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Online Status</p>
                      <p className="text-sm text-muted-foreground">Show when you're online to other users</p>
                    </div>
                    <Switch
                      checked={privacy.showOnlineStatus}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, showOnlineStatus: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Direct Messages</p>
                      <p className="text-sm text-muted-foreground">Allow other users to send you direct messages</p>
                    </div>
                    <Switch
                      checked={privacy.allowDirectMessages}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, allowDirectMessages: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Earnings</p>
                      <p className="text-sm text-muted-foreground">Display your earnings on your public profile</p>
                    </div>
                    <Switch
                      checked={privacy.showEarnings}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, showEarnings: checked }))
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleSavePrivacy} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat Settings
                </CardTitle>
                <CardDescription>
                  Customize your messaging and chat preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Read Receipts</p>
                      <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                    </div>
                    <Switch
                      checked={chatSettings.readReceipts}
                      onCheckedChange={(checked) => 
                        setChatSettings(prev => ({ ...prev, readReceipts: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Typing Indicators</p>
                      <p className="text-sm text-muted-foreground">Show when you're typing</p>
                    </div>
                    <Switch
                      checked={chatSettings.typingIndicators}
                      onCheckedChange={(checked) => 
                        setChatSettings(prev => ({ ...prev, typingIndicators: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Sync</p>
                      <p className="text-sm text-muted-foreground">Sync messages across all devices</p>
                    </div>
                    <Switch
                      checked={chatSettings.messageSync}
                      onCheckedChange={(checked) => 
                        setChatSettings(prev => ({ ...prev, messageSync: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-translate Messages</p>
                      <p className="text-sm text-muted-foreground">Automatically translate messages to your language</p>
                    </div>
                    <Switch
                      checked={chatSettings.autoTranslate}
                      onCheckedChange={(checked) => 
                        setChatSettings(prev => ({ ...prev, autoTranslate: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Block Spam</p>
                      <p className="text-sm text-muted-foreground">Automatically filter spam messages</p>
                    </div>
                    <Switch
                      checked={chatSettings.blockSpam}
                      onCheckedChange={(checked) => 
                        setChatSettings(prev => ({ ...prev, blockSpam: checked }))
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleSaveChatSettings} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Chat Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Settings
                </CardTitle>
                <CardDescription>
                  Manage your Pi wallet and payment preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-withdraw</p>
                      <p className="text-sm text-muted-foreground">Automatically withdraw when balance reaches threshold</p>
                    </div>
                    <Switch
                      checked={walletSettings.autoWithdraw}
                      onCheckedChange={(checked) => 
                        setWalletSettings(prev => ({ ...prev, autoWithdraw: checked }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-threshold">Auto-withdraw Threshold (π)</Label>
                    <Input
                      id="withdraw-threshold"
                      type="number"
                      value={walletSettings.withdrawThreshold}
                      onChange={(e) => setWalletSettings(prev => ({ ...prev, withdrawThreshold: Number(e.target.value) }))}
                      disabled={!walletSettings.autoWithdraw}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified about all wallet transactions</p>
                    </div>
                    <Switch
                      checked={walletSettings.enableNotifications}
                      onCheckedChange={(checked) => 
                        setWalletSettings(prev => ({ ...prev, enableNotifications: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transaction Confirmation</p>
                      <p className="text-sm text-muted-foreground">Require confirmation for all transactions</p>
                    </div>
                    <Switch
                      checked={walletSettings.requireConfirmation}
                      onCheckedChange={(checked) => 
                        setWalletSettings(prev => ({ ...prev, requireConfirmation: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center"
                      onClick={() => window.open('/wallet', '_blank')}
                    >
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      View Transactions
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center"
                      onClick={() => {
                        toast({
                          title: "Pi Wallet Connection",
                          description: "Connecting to Pi Network wallet...",
                        });
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Connect Pi Wallet
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSaveWalletSettings} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Wallet Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how WorkChain Pi looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${
                        theme === "light" ? "border-primary" : "border-border"
                      }`}
                      onClick={() => setTheme("light")}
                    >
                      <div className="mb-2 h-8 w-full rounded bg-gray-100" />
                      <p className="text-sm font-medium">Light</p>
                    </div>
                    <div
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${
                        theme === "dark" ? "border-primary" : "border-border"
                      }`}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="mb-2 h-8 w-full rounded bg-gray-800" />
                      <p className="text-sm font-medium">Dark</p>
                    </div>
                    <div
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${
                        theme === "system" ? "border-primary" : "border-border"
                      }`}
                      onClick={() => setTheme("system")}
                    >
                      <div className="mb-2 h-8 w-full rounded bg-gradient-to-r from-gray-100 to-gray-800" />
                      <p className="text-sm font-medium">System</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <TwoFactorAuth 
                  isEnabled={twoFactorEnabled} 
                  onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)} 
                />

                <Separator />

                {/* Account Deletion */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all data.
                        </DialogDescription>
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
                          <Label htmlFor="confirm-delete">
                            Type "DELETE" to confirm account deletion
                          </Label>
                          <Input
                            id="confirm-delete"
                            placeholder="DELETE"
                            className="font-mono"
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1">
                            Cancel
                          </Button>
                          <Button variant="destructive" className="flex-1">
                            Delete Account Permanently
                          </Button>
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