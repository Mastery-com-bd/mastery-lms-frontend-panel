"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LiveClassProps } from "@/type/dashboard/live-class";
import { format, isToday } from "date-fns";
import { Calendar, Clock, Users, Video } from "lucide-react";
import { motion } from "motion/react";

const LiveClass = ({ liveClasses }: { liveClasses: LiveClassProps }) => {
  const getStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now >= start && now <= end) return "Live Now";
    if (now < start) return "Upcoming";
    return "Ended";
  };

  return (
    <div className="p-6 space-y-8 min-h-screen text-foreground font-sans ">
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
        {liveClasses.data.length > 0 ? (
          liveClasses.data.map((liveClass, index) => {
            const status = getStatus(liveClass.startTime, liveClass.endTime);
            const isStartToday = isToday(new Date(liveClass.startTime));
            const canJoin =
              status === "Live Now" || (status === "Upcoming" && isStartToday);

            return (
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
                        status === "Live Now"
                          ? "bg-red-500 animate-pulse"
                          : "bg-primary/40",
                      )}
                    />

                    <div className="p-6 space-y-6">
                      {/* Topic & Status */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              status === "Live Now" ? "destructive" : "outline"
                            }
                            className="rounded-full px-3"
                          >
                            {status === "Live Now" && (
                              <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                            )}
                            {status}
                          </Badge>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            {liveClass.attendees.length} Registered
                          </div>
                        </div>
                        <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-14">
                          {liveClass.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {liveClass.course.title}
                        </p>
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            Date
                          </p>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Calendar className="h-4 w-4 text-primary" />
                            {format(
                              new Date(liveClass.startTime),
                              "MMM dd, yyyy",
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            Time
                          </p>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="h-4 w-4 text-primary" />
                            {format(new Date(liveClass.startTime), "hh:mm a")}
                          </div>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-background">
                          <AvatarImage
                            src={liveClass.instructor.profilePhoto || ""}
                            alt={liveClass.instructor.fullName}
                          />
                          <AvatarFallback>
                            {liveClass.instructor.fullName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate">
                            {liveClass.instructor.fullName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            Instructor
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-2">
                        <Button
                          className="flex-1 gap-2 shadow-lg shadow-primary/20"
                          variant={
                            status === "Live Now" ? "destructive" : "default"
                          }
                          asChild={canJoin}
                          disabled={!canJoin}
                          onClick={() => {
                            if (!canJoin && status === "Upcoming") {
                              // Handle remind me logic
                            }
                          }}
                        >
                          {canJoin ? (
                            <a
                              href={liveClass.meetingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {status === "Live Now" ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                              {status === "Live Now"
                                ? "Join Meeting"
                                : "Join Now"}
                            </a>
                          ) : (
                            <>
                              <Clock className="h-4 w-4" />
                              Join Now
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Video className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">No Live Classes Found</h3>
            <p className="text-muted-foreground">
              You don&apos;t have any upcoming live sessions at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClass;
