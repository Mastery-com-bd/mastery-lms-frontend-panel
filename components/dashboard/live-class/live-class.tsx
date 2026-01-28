"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Users, Video } from "lucide-react";
import { motion } from "motion/react";

const mockLiveClasses = [
  {
    id: "1",
    topic: "Advanced React Patterns & Performance Optimization",
    instructor: {
      name: "Dr. Sarah Mitchell",
      designation: "Senior Software Architect",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    date: "Oct 24, 2023",
    time: "10:00 AM - 12:00 PM",
    status: "Upcoming",
    platform: "Zoom",
    attendees: 128,
  },
  {
    id: "2",
    topic: "Modern Backend Architecture with Node.js",
    instructor: {
      name: "John Smith",
      designation: "Backend Lead @ TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    date: "Oct 25, 2023",
    time: "02:00 PM - 04:00 PM",
    status: "Live Now",
    platform: "Google Meet",
    attendees: 256,
  },
  {
    id: "3",
    topic: "UI/UX Design Systems for Scale",
    instructor: {
      name: "Emily Chen",
      designation: "Product Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    date: "Oct 26, 2023",
    time: "11:00 AM - 01:00 PM",
    status: "Upcoming",
    platform: "Zoom",
    attendees: 85,
  },
  {
    id: "4",
    topic: "Introduction to Machine Learning with Python",
    instructor: {
      name: "Michael Ross",
      designation: "Data Scientist",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    date: "Oct 27, 2023",
    time: "09:00 AM - 11:00 AM",
    status: "Upcoming",
    platform: "Microsoft Teams",
    attendees: 150,
  },
];

const LiveClass = () => {
  return (
    <div className="p-6 space-y-8 min-h-screen bg-background text-foreground font-sans ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Live Classes</h1>
          <p className="text-muted-foreground mt-1">
            Join interactive live sessions with industry experts.
          </p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          View Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLiveClasses.map((liveClass, index) => (
          <motion.div
            key={liveClass.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden pt-0">
              <CardContent className="p-0">
                {/* Status Bar */}
                <div
                  className={cn(
                    "h-1.5 w-full",
                    liveClass.status === "Live Now"
                      ? "bg-red-500 animate-pulse"
                      : "bg-primary/40"
                  )}
                />

                <div className="p-6 space-y-6">
                  {/* Topic & Status */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          liveClass.status === "Live Now"
                            ? "destructive"
                            : "secondary"
                        }
                        className="rounded-full px-3"
                      >
                        {liveClass.status === "Live Now" && (
                          <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                        )}
                        {liveClass.status}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        {liveClass.attendees} Registered
                      </div>
                    </div>
                    <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-14">
                      {liveClass.topic}
                    </h3>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Date
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4 text-primary" />
                        {liveClass.date}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Time
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="h-4 w-4 text-primary" />
                        {liveClass.time}
                      </div>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarImage
                        src={liveClass.instructor.avatar}
                        alt={liveClass.instructor.name}
                      />
                      <AvatarFallback>
                        {liveClass.instructor.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">
                        {liveClass.instructor.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {liveClass.instructor.designation}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      className="flex-1 gap-2 shadow-lg shadow-primary/20"
                      variant={
                        liveClass.status === "Live Now"
                          ? "destructive"
                          : "default"
                      }
                    >
                      <Video className="h-4 w-4" />
                      {liveClass.status === "Live Now"
                        ? "Join Meeting"
                        : "Remind Me"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveClass;
