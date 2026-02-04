"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showError, showLoading, showSuccess } from "@/lib/toast";
import { createSupport } from "@/service/dashboard/support";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { EnrollmentWithCourse } from "./support";
import { useRouter } from "next/navigation";

export function CreateTicketModal({
  enrollmentsWithCourses,
  children,
  onSuccess,
}: {
  enrollmentsWithCourses: EnrollmentWithCourse[];
  children: React.ReactNode;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    enrollmentId: "",
    subject: "",
    description: "",
    priority: "MEDIUM",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.enrollmentId || !formData.subject || !formData.description) {
      showError({ message: "Please fill in all required fields" });
      return;
    }
    setLoading(true);

    showLoading("Creating support request...");
    const response = await createSupport({ payload: formData });
    if (response.success) {
      toast.dismiss();
      router.refresh();
      showSuccess({
        message: response.message || "Support request created successfully",
      });
      setOpen(false);
      setFormData({
        enrollmentId: "",
        subject: "",
        description: "",
        priority: "MEDIUM",
      });
      setLoading(false);
      onSuccess?.();
    } else {
      router.refresh();
      toast.dismiss();
      setLoading(false);
      showError({
        message: response.message || "Failed to create support request",
      });
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
              onValueChange={(value) =>
                setFormData({ ...formData, enrollmentId: value })
              }
              value={formData.enrollmentId}
            >
              <SelectTrigger className="rounded-none border-border focus:ring-primary">
                <SelectValue
                  placeholder={
                    enrollmentsWithCourses.length > 0
                      ? "Select a course"
                      : "No courses available"
                  }
                />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {enrollmentsWithCourses.map((enrollment) => (
                  <SelectItem
                    key={enrollment.id}
                    className="focus:bg-primary focus:text-primary-foreground rounded-none"
                    value={enrollment.id}
                  >
                    {enrollment.course.title}
                  </SelectItem>
                ))}
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
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="e.g. Unable to access video lessons"
              className="rounded-none border-border focus-visible:ring-primary"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority" className="text-sm font-semibold">
              Priority
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value })
              }
              value={formData.priority}
            >
              <SelectTrigger className="rounded-none border-border focus:ring-primary">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
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
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your issue in detail..."
              className="min-h-30 rounded-none border-border focus-visible:ring-primary resize-none"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              disabled={loading}
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-none border-border hover:bg-muted font-bold"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold px-8 min-w-35"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : ""}
              Submit Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
