"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Course {
  course: {
    id: string;
    title: string;
  };
}

export function CreateTicketModal({ 
  children,
  onSuccess 
}: { 
  children: React.ReactNode;
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    enrollmentId: "",
    subject: "",
    description: "",
    priority: "MEDIUM",
  });

  useEffect(() => {
    if (open) {
      fetchEnrolledCourses();
    }
  }, [open]);

  const fetchEnrolledCourses = async () => {
    try {
      setIsCoursesLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollment/my-enrollments`,
        {
          credentials: "include",
        }
      );
      const { data } = await response.json();
      console.log("My enrollment from Dashboard", data)
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsCoursesLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.enrollmentId || !formData.subject || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Support request created successfully");
        setOpen(false);
        setFormData({
          enrollmentId: "",
          subject: "",
          description: "",
          priority: "MEDIUM",
        });
        onSuccess?.();
      } else {
        toast.error(result.message || "Failed to create support request");
      }
    } catch (error) {
      toast.error("An error occurred while creating the ticket");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-125 rounded-none border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Ticket
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="course" className="text-sm font-semibold">
              Select Course
            </Label>
            <Select 
              onValueChange={(value) => setFormData({ ...formData, enrollmentId: value })}
              value={formData.enrollmentId}
              disabled={isCoursesLoading}
            >
              <SelectTrigger className="rounded-none border-border focus:ring-primary">
                <SelectValue placeholder={isCoursesLoading ? "Loading courses..." : "Select a course"} />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {isCoursesLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span className="text-sm text-muted-foreground">Loading courses...</span>
                  </div>
                ) : (
                  courses.map((c) => (
                    <SelectItem key={c.course.id} className="focus:bg-primary focus:text-primary-foreground rounded-none" value={c.course.id}>
                      {c.course.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject" className="text-sm font-semibold">
              Subject
            </Label>
            <Input
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Unable to access video lessons"
              className="rounded-none border-border focus-visible:ring-primary"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority" className="text-sm font-semibold">
              Priority
            </Label>
            <Select 
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
              value={formData.priority}
            >
              <SelectTrigger className="rounded-none border-border focus:ring-primary">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-sm font-semibold">
              Description
            </Label>
            <Textarea
              id="message"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your issue in detail..."
              className="min-h-30 rounded-none border-border focus-visible:ring-primary resize-none"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-none border-border hover:bg-muted font-bold"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold px-8 min-w-35"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Ticket"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}