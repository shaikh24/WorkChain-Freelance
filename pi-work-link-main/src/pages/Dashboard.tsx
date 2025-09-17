
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";

const JobsPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/jobs/my`, { headers: { Authorization: `Bearer ${localStorage.getItem('token') || localStorage.getItem('authToken')}` }});
      const data = await res.json();
      setJobs(data || []);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchJobs(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    try {
      const res = await fetch(`${BASE_URL}/jobs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('token') || localStorage.getItem('authToken')}` }});
      if (res.ok) {
        setJobs(jobs.filter(j=>j._id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch(e){ alert('Network error'); }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">My Jobs</h2>
      {loading ? <p>Loading...</p> : null}
      {!loading && jobs.length===0 ? <p>No jobs posted yet. <a href="/post-job" className="text-blue-500 underline">Post one</a></p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map(job=>(
          <div key={job._id} className="p-4 border rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.description?.slice(0,120)}</p>
                <p className="text-xs mt-1">Budget: {job.budget || 'N/A'} | Status: {job.status}</p>
              </div>
              <div className="space-y-2">
                <button className="px-3 py-1 border rounded" onClick={()=>window.location.href=`/post-job?edit=${job._id}`}>Edit</button>
                <button className="px-3 py-1 border rounded" onClick={()=>handleDelete(job._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Users,
  Star,
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock user data
  const userStats = {
    totalEarnings: 2847.50,
    monthlyEarnings: 485.25,
    earningsChange: 12.5,
    activeGigs: 8,
    completedJobs: 47,
    clientRating: 4.8,
    responseTime: "2 hours",
    completionRate: 98,
  };

  const recentJobs = [
    {
      id: 1,
      title: "React Dashboard Development",
      client: "TechCorp Inc.",
      status: "In Progress",
      progress: 75,
      deadline: "2024-01-15",
      amount: 125.50,
      avatar: "",
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupXYZ",
      status: "Review",
      progress: 100,
      deadline: "2024-01-12",
      amount: 89.99,
      avatar: "",
    },
    {
      id: 3,
      title: "Content Writing Package",
      client: "BlogMaster",
      status: "Completed",
      progress: 100,
      deadline: "2024-01-10",
      amount: 45.75,
      avatar: "",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "received",
      description: "Payment for React Dashboard",
      amount: 125.50,
      date: "2024-01-12",
      status: "completed",
    },
    {
      id: 2,
      type: "withdraw",
      description: "Withdrawal to Pi Wallet",
      amount: -200.00,
      date: "2024-01-10",
      status: "completed",
    },
    {
      id: 3,
      type: "received",
      description: "Payment for UI Design",
      amount: 89.99,
      date: "2024-01-08",
      status: "completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-success";
      case "in progress": return "bg-primary";
      case "review": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <JobsPanel />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your freelance business.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {userStats.totalEarnings.toFixed(2)} π
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-success">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +{userStats.earningsChange}%
                </span>{" "}
                from last month
              </p>
            
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Gigs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.activeGigs}</div>
              <p className="text-xs text-muted-foreground">
                {userStats.completedJobs} completed jobs
              </p>
            
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.clientRating}</div>
              <p className="text-xs text-muted-foreground">
                {userStats.completionRate}% completion rate
              </p>
            
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.responseTime}</div>
              <p className="text-xs text-muted-foreground">
                Avg. first response
              </p>
            
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Activity */}
              <Card className="card-glow lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>
                    Your latest project updates and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center space-x-4 rounded-lg border p-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={job.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {job.client.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">
                            {job.title}
                          </p>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {job.client}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Due: {job.deadline}</span>
                          <span>{job.amount.toFixed(2)} π</span>
                        </div>
                        {job.status === "In Progress" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{job.progress}%</span>
                            </div>
                            <Progress value={job.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/jobs">View All Jobs</Link>
                  </Button>
                
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Manage your freelance business
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full btn-hero" asChild>
                    <Link to="/create-gig">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Create New Gig
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/messages">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Check Messages
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/wallet">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Manage Wallet
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/profile">
                      <Users className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>All Jobs</CardTitle>
                <CardDescription>
                  Manage your active and completed projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={job.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {job.client.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.client}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Due: {job.deadline}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{job.amount.toFixed(2)} π</p>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/job/${job.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Track your earnings and withdrawals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`rounded-full p-2 ${
                          transaction.type === "received" ? "bg-success/20" : "bg-warning/20"
                        }`}>
                          {transaction.type === "received" ? (
                            <ArrowDownRight className="h-4 w-4 text-success" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-warning" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.amount > 0 ? "text-success" : "text-warning"
                        }`}>
                          {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)} π
                        </p>
                        <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              
{job.attachments && job.attachments.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold">Attachments:</p>
    <ul className="list-disc list-inside">
      {job.attachments.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            📎 File {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;