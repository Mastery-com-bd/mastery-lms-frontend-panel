"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inbox, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CreateTicketModal } from "./create-ticket-modal";

interface SupportRequest {
  id: string;
  subject: string;
  message: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
  response?: string;
  course: {
    title: string;
  };
}

const Support = () => {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const fetchSupportRequests = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/support/my-requests`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        setRequests(result.data);
        console.log("support request Data: ", result)
      }
    } catch (error) {
      console.error("Error fetching support requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    if (activeTab === "all") return requests;
    return requests.filter((req) => req.status.toLowerCase() === activeTab.toLowerCase());
  }, [requests, activeTab]);

  const groupedRequests = useMemo(() => {
    const groups: { [key: string]: SupportRequest[] } = {};
    filteredRequests.forEach((req) => {
      const date = new Date(req.createdAt);
      const monthYear = date.toLocaleString("en-US", { month: "short", year: "numeric" });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(req);
    });
    return Object.entries(groups).sort((a, b) => {
      return new Date(b[1][0].createdAt).getTime() - new Date(a[1][0].createdAt).getTime();
    });
  }, [filteredRequests]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-background">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent border-b border-border w-full sm:w-auto justify-start h-auto p-0 gap-8 rounded-none">
            {["all", "open", "closed"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-transparent focus:outline-none data-[state=active]:shadow-none data-[state=active]:border-t-0 data-[state=active]:border-r-0 data-[state=active]:border-l-0 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 text-lg font-bold transition-all capitalize"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <CreateTicketModal onSuccess={fetchSupportRequests}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold px-6 h-10 shadow-lg shadow-primary/20 w-full sm:w-auto">
            Create Ticket
          </Button>
        </CreateTicketModal>
      </div>

      {/* Ticket List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading your support history...</p>
        </div>
      ) : groupedRequests.length > 0 ? (
        <div className="space-y-10">
          {groupedRequests.map(([month, items]) => (
            <div key={month} className="space-y-4">
              <h3 className="text-muted-foreground font-semibold text-sm px-2">
                {month}
              </h3>
              <div className="space-y-4">
                {items.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium">
                          <span className="bg-muted px-2 py-0.5 rounded text-[10px]">#{ticket.id.slice(-6).toUpperCase()}</span>
                          <span className="text-foreground/80 font-bold">{ticket.course.title}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-lg md:text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                            {ticket.subject}
                          </h4>
                          <p className="text-sm md:text-base text-muted-foreground line-clamp-2 max-w-4xl">
                            {ticket.message}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            ticket.priority === 'HIGH' || ticket.priority === 'URGENT' ? 'bg-red-100 text-red-600' : 
                            ticket.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            ticket.status === 'OPEN' || ticket.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="text-xs md:text-sm text-muted-foreground font-medium">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-1">No tickets found</h3>
          <p className="text-muted-foreground max-w-xs">
            {activeTab === 'all' 
              ? "You haven't created any support tickets yet." 
              : `You don't have any ${activeTab} tickets at the moment.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Support;