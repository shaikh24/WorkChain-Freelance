import { walletAPI } from "@/components/wallet/WalletAPI";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Coins,
  TrendingUp,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { walletAPI, WalletData, Transaction } from "@/components/wallet/WalletAPI";

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [piNetworkBalance, setPiNetworkBalance] = useState<number | null>(null);
  const { toast } = useToast();

  // Load wallet data and transactions on component mount
  useEffect(() => {
    loadWalletData();
    loadTransactions();
  }, []);

  const loadWalletData = async () => {
    try {
      setIsLoading(true);
      const data = await walletAPI.getWalletData();
      setWalletData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadTransactions = async () => {
    try {
      const data = await walletAPI.getTransactions();
      setTransactions(data);
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to load transactions",
        variant: "destructive",
      });
    }
  };

  const refreshWallet = async () => {
    await loadWalletData();
    await loadTransactions();
    toast({
      title: "Wallet Refreshed",
      description: "Your wallet data has been updated",
    });
  };

  const connectPiWallet = async () => {
    try {
      setIsLoading(true);
      const result = await walletAPI.connectPiWallet();
      
      if (result.success) {
        toast({
          title: "Pi Wallet Connected",
          description: `Connected to wallet: ${result.address}`,
        });
        
        // Get Pi Network balance
        const balanceResult = await walletAPI.getPiNetworkBalance();
        if (balanceResult.success) {
          setPiNetworkBalance(balanceResult.balance!);
        }
      } else {
        toast({
          title: "Connection Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect Pi Wallet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await walletAPI.depositPi(parseFloat(depositAmount));
      
      if (result.success) {
        toast({
          title: "Deposit Successful",
          description: `Successfully deposited ${depositAmount} π`,
        });
        setDepositAmount("");
        await loadWalletData();
        await loadTransactions();
      } else {
        toast({
          title: "Deposit Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process deposit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid Amount", 
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    if (!withdrawAddress || withdrawAddress.length < 10) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Pi wallet address",
        variant: "destructive",
      });
      return;
    }

    if (walletData && parseFloat(withdrawAmount) > walletData.balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough π to withdraw this amount",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await walletAPI.withdrawPi(parseFloat(withdrawAmount), withdrawAddress);
      
      if (result.success) {
        toast({
          title: "Withdrawal Initiated",
          description: `Withdrawal of ${withdrawAmount} π has been initiated`,
        });
        setWithdrawAmount("");
        setWithdrawAddress("");
        await loadWalletData(); 
        await loadTransactions();
      } else {
        toast({
          title: "Withdrawal Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process withdrawal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyAddress = () => {
    if (walletData) {
      navigator.clipboard.writeText(walletData.fullAddress);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "received":
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-success" />;
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-warning" />;
      case "escrow":
        return <Shield className="h-4 w-4 text-primary" />;
      default:
        return <Coins className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success";
      case "pending": return "bg-warning";
      case "failed": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Wallet</h1>
            <p className="text-muted-foreground">
              Manage your Pi cryptocurrency balance and transactions
            </p>
          </div>
          <Button onClick={refreshWallet} variant="outline" disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              {walletData ? (
                <>
                  <div className="text-3xl font-bold text-accent">
                    {showBalance ? `${walletData.balance.toFixed(2)} π` : "•••• π"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center text-success">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +{walletData.monthlyChange}%
                    </span>{" "}
                    this month
                  </p>
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="h-8 bg-secondary rounded mb-2"></div>
                  <div className="h-4 bg-secondary rounded w-24"></div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {walletData ? (
                <>
                  <div className="text-2xl font-bold text-warning">
                    {showBalance ? `${walletData.pendingBalance.toFixed(2)} π` : "••• π"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting completion
                  </p>
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="h-6 bg-secondary rounded mb-2"></div>
                  <div className="h-3 bg-secondary rounded w-20"></div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <WalletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {walletData ? (
                <>
                  <div className="text-2xl font-bold">
                    {showBalance ? `${walletData.totalEarnings.toFixed(2)} π` : "•••• π"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All-time earnings
                  </p>
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="h-6 bg-secondary rounded mb-2"></div>
                  <div className="h-3 bg-secondary rounded w-24"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Wallet Address */}
        <Card className="card-glow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Wallet Address
            </CardTitle>
            <CardDescription>
              Your unique Pi Network wallet address for receiving payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {walletData ? (
              <div className="flex items-center space-x-2 rounded-lg bg-secondary p-3">
                <code className="flex-1 text-sm font-mono">{walletData.fullAddress}</code>
                <Button variant="ghost" size="icon" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="animate-pulse h-12 bg-secondary rounded-lg"></div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-hero h-16">
                <ArrowDownRight className="mr-2 h-5 w-5" />
                Deposit Pi
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deposit Pi Cryptocurrency</DialogTitle>
                <DialogDescription>
                  Add Pi to your WorkChain wallet from your Pi Network account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount">Amount (π)</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Pi Network Integration</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect your Pi Network wallet to transfer Pi directly to WorkChain
                  </p>
                  {piNetworkBalance !== null && (
                    <div className="mt-2 p-2 bg-primary/10 rounded">
                      <p className="text-sm">Available: {piNetworkBalance.toFixed(2)} π</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={connectPiWallet} variant="outline" className="flex-1" disabled={isLoading}>
                    <Shield className="mr-2 h-4 w-4" />
                    Connect Pi Wallet
                  </Button>
                  <Button onClick={handleDeposit} className="flex-1" disabled={isLoading || !depositAmount}>
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowDownRight className="mr-2 h-4 w-4" />
                    )}
                    Deposit
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-16">
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Withdraw Pi
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Pi Cryptocurrency</DialogTitle>
                <DialogDescription>
                  Transfer Pi from your WorkChain wallet to external wallet
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Amount (π)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Available: {walletData?.balance.toFixed(2) || "0.00"} π
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="withdraw-address">Destination Address</Label>
                  <Input
                    id="withdraw-address"
                    placeholder="Enter Pi wallet address"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                  />
                </div>
                <div className="rounded-lg bg-warning/10 border border-warning/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-warning">Security Notice</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Withdrawals are processed within 24 hours. Double-check the address before confirming.
                  </p>
                </div>
                <Button onClick={handleWithdraw} className="w-full" disabled={isLoading || !withdrawAmount || !withdrawAddress}>
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                  )}
                  Confirm Withdrawal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Transaction History */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              View all your Pi transactions and transfers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`rounded-full p-2 ${
                        transaction.type === "received" || transaction.type === "deposit" 
                          ? "bg-success/20" 
                          : transaction.type === "withdraw"
                          ? "bg-warning/20"
                          : "bg-primary/20"
                      }`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{transaction.date}</span>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {transaction.from && `From: ${transaction.from}`}
                          {transaction.to && `To: ${transaction.to}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.amount > 0 ? "text-success" : "text-warning"
                      }`}>
                        {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)} π
                      </p>
                      <Button variant="ghost" size="sm" className="mt-1">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View on Explorer
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="received">
                {transactions.filter(t => t.type === "received" || t.type === "deposit").map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                    {/* Same structure as above */}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;