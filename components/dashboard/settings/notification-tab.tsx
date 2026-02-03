import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const NotificationTab = () => {
  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Manage How You Receive Notifications
        </h2>
        <div className="border border-border bg-white p-8 max-w-2xl">
          <div className="space-y-6">
            {[
              { id: "push", label: "Push notification" },
              {
                id: "email",
                label: "Email notification",
                defaultChecked: true,
              },
              { id: "updates", label: "Course updates" },
              {
                id: "promotions",
                label: "Promotions (Discounts and Special Offers)",
                defaultChecked: true,
              },
              {
                id: "reminder",
                label: "Learning reminder",
                defaultChecked: true,
              },
              {
                id: "device",
                label: "Receive notifications on your device",
              },
              {
                id: "sound",
                label: "Play sound for notifications",
                defaultChecked: true,
              },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <Checkbox
                  id={item.id}
                  className="rounded-none border-border data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 h-5 w-5"
                  defaultChecked={item.defaultChecked}
                />
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none cursor-pointer text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button className="rounded-none bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-10 h-12">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
