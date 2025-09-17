import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  X,
  DollarSign,
  MessageCircle,
  Briefcase,
  Star,
  AlertCircle,
  Clock,
  Settings,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "message" | "payment" | "job" | "review" | "system";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
  avatar?: string;
  amount?: number;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Payment Received",
    description: "You received 125.50 π from TechCorp Inc. for React Dashboard project",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false,
    priority: "high",
    amount: 125.50,
  },
  {
    id: "2",
    type: "message",
    title: "New Message from Sarah Chen",
    description: "Great! I'll start working on the React components tomorrow.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    priority: "medium",
    actionUrl: "/messages/1",
  },
  {
    id: "3",
    type: "job",
    title: "New Job Opportunity",
    description: "Mobile App Development - $89.99 π - Deadline: Jan 20",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    priority: "medium",
    actionUrl: "/jobs/new/123",
  },
  {
    id: "4",
    type: "review",
    title: "New 5-star Review",
    description: "StartupXYZ left you a 5-star review for UI Design project",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    priority: "low",
  },
  {
    id: "5",
    type: "system",
    title: "Profile Views Increased",
    description: "Your profile was viewed 25 times this week (+15% from last week)",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    priority: "low",
  },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "high" ? "text-warning" : "text-primary";
    
    switch (type) {
      case "payment": return <DollarSign className={`h-4 w-4 ${iconClass}`} />;
      case "message": return <MessageCircle className={`h-4 w-4 ${iconClass}`} />;
      case "job": return <Briefcase className={`h-4 w-4 ${iconClass}`} />;
      case "review": return <Star className={`h-4 w-4 ${iconClass}`} />;
      case "system": return <AlertCircle className={`h-4 w-4 ${iconClass}`} />;
      default: return <Bell className={`h-4 w-4 ${iconClass}`} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      // Navigate to the action URL
      console.log("Navigate to:", notification.actionUrl);
    }
    
    setIsOpen(false);
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance every 5 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["message", "payment", "job"][Math.floor(Math.random() * 3)] as any,
          title: "New Notification",
          description: "This is a real-time notification demo",
          timestamp: new Date(),
          read: false,
          priority: "medium",
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-warning text-warning-foreground"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="w-fit">
                {unreadCount} unread
              </Badge>
            )}
          </CardHeader>
          
          <Separator />
          
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className={`rounded-full p-2 ${
                        notification.priority === "high" 
                          ? "bg-warning/20" 
                          : notification.priority === "medium"
                          ? "bg-primary/20"
                          : "bg-secondary"
                      }`}>
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${
                              !notification.read ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {format(notification.timestamp, "MMM d, HH:mm")}
                              </span>
                              {notification.amount && (
                                <Badge variant="outline" className="text-xs ml-auto">
                                  +{notification.amount} π
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;