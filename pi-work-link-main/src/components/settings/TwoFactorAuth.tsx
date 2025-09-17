import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Smartphone, 
  QrCode, 
  Key, 
  Copy, 
  Download, 
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TwoFactorAuthProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const TwoFactorAuth = ({ isEnabled, onToggle }: TwoFactorAuthProps) => {
  const [setupStep, setSetupStep] = useState<"qr" | "verify" | "backup">("qr");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const { toast } = useToast();

  // Mock QR code URL and secret
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/WorkChain%20Pi:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=WorkChain%20Pi";
  const secretKey = "JBSWY3DPEHPK3PXP";

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 8).toUpperCase());
    }
    setBackupCodes(codes);
  };

  const handleEnable2FA = () => {
    generateBackupCodes();
    setSetupStep("qr");
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      setSetupStep("backup");
      toast({
        title: "2FA Verified",
        description: "Two-factor authentication has been successfully enabled.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code from your authenticator app.",
        variant: "destructive",
      });
    }
  };

  const handleFinishSetup = () => {
    onToggle();
    setSetupStep("qr");
    setVerificationCode("");
    toast({
      title: "2FA Setup Complete",
      description: "Your account is now protected with two-factor authentication.",
    });
  };

  const handleDisable2FA = () => {
    onToggle();
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account.",
      variant: "destructive",
    });
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secretKey);
    toast({
      title: "Secret Copied",
      description: "Secret key copied to clipboard.",
    });
  };

  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Backup code copied to clipboard.",
    });
  };

  const downloadBackupCodes = () => {
    const content = `WorkChain Pi - Backup Codes\n\nGenerated: ${new Date().toLocaleDateString()}\n\n${backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\n')}\n\nKeep these codes safe! Each code can only be used once.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workchain-pi-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Backup Codes Downloaded",
      description: "Your backup codes have been saved to your downloads folder.",
    });
  };

  if (!isEnabled) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Badge variant="secondary">Disabled</Badge>
        </div>
        
        <div className="rounded-lg border border-border/50 p-4 bg-muted/30">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h4 className="font-medium">Secure Your Account</h4>
                <p className="text-sm text-muted-foreground">
                  Enable 2FA to protect your account with an additional layer of security using your smartphone
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={handleEnable2FA} className="w-full sm:w-auto">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Enable 2FA
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                      Follow these steps to enable 2FA on your account
                    </DialogDescription>
                  </DialogHeader>
                  
                  {setupStep === "qr" && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <img 
                          src={qrCodeUrl} 
                          alt="QR Code" 
                          className="mx-auto mb-4 rounded-lg border"
                        />
                        <p className="text-sm text-muted-foreground mb-4">
                          Scan this QR code with your authenticator app
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Or enter this key manually:</Label>
                        <div className="flex items-center gap-2">
                          <Input value={secretKey} readOnly className="font-mono text-sm" />
                          <Button variant="outline" size="icon" onClick={copySecret}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Alert>
                        <Smartphone className="h-4 w-4" />
                        <AlertDescription>
                          Download Google Authenticator, Authy, or any TOTP authenticator app first.
                        </AlertDescription>
                      </Alert>
                      
                      <Button 
                        onClick={() => setSetupStep("verify")} 
                        className="w-full"
                      >
                        I've Scanned the Code
                      </Button>
                    </div>
                  )}
                  
                  {setupStep === "verify" && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="rounded-lg bg-primary/10 p-3 w-fit mx-auto mb-4">
                          <Smartphone className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-medium">Enter Verification Code</h4>
                        <p className="text-sm text-muted-foreground">
                          Enter the 6-digit code from your authenticator app
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Verification Code</Label>
                        <Input
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="000000"
                          maxLength={6}
                          className="text-center text-2xl tracking-widest font-mono"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setSetupStep("qr")} className="flex-1">
                          Back
                        </Button>
                        <Button onClick={handleVerifyCode} className="flex-1" disabled={verificationCode.length !== 6}>
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {setupStep === "backup" && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="rounded-lg bg-success/10 p-3 w-fit mx-auto mb-4">
                          <CheckCircle2 className="h-8 w-8 text-success" />
                        </div>
                        <h4 className="font-medium">Save Your Backup Codes</h4>
                        <p className="text-sm text-muted-foreground">
                          Store these codes safely. You can use them to access your account if you lose your phone.
                        </p>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                          {backupCodes.map((code, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between bg-background px-2 py-1 rounded cursor-pointer hover:bg-secondary"
                              onClick={() => copyBackupCode(code)}
                            >
                              <span>{code}</span>
                              <Copy className="h-3 w-3 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Each backup code can only be used once. Store them in a secure location.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={downloadBackupCodes} className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button onClick={handleFinishSetup} className="flex-1">
                          Complete Setup
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-muted-foreground">
            Your account is protected with 2FA
          </p>
        </div>
        <Badge className="bg-success text-success-foreground">Enabled</Badge>
      </div>
      
      <div className="rounded-lg border border-success/20 bg-success/10 p-4">
        <div className="flex items-center gap-2 text-success mb-2">
          <Shield className="h-4 w-4" />
          <span className="font-medium">2FA is Active</span>
        </div>
        <p className="text-sm text-success/80">
          Your account is protected with two-factor authentication
        </p>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setShowBackupCodes(!showBackupCodes)}>
              <Key className="mr-2 h-3 w-3" />
              View Backup Codes
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Backup Codes</DialogTitle>
              <DialogDescription>
                Use these codes if you lose access to your authenticator app
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                  {backupCodes.length > 0 ? backupCodes.map((code, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between bg-background px-2 py-1 rounded cursor-pointer hover:bg-secondary"
                      onClick={() => copyBackupCode(code)}
                    >
                      <span>{code}</span>
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )) : (
                    <p className="col-span-2 text-center text-muted-foreground">No backup codes available</p>
                  )}
                </div>
              </div>
              {backupCodes.length > 0 && (
                <Button onClick={downloadBackupCodes} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Backup Codes
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" size="sm" onClick={handleDisable2FA}>
          Disable 2FA
        </Button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;