"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import AccountTab from "./account-tab";
import PurchaseHistory from "./purchase-history-tab";
import SecurityTab from "./security-tab";
import { PaymentHistoryProps, ProfileProps } from "@/type/dashboard/settings";

export default function Settings({
  profile,
  paymentHistory,
}: {
  profile: ProfileProps;
  paymentHistory: PaymentHistoryProps[];
}) {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 min-h-screen font-sans text-foreground">
      <Tabs defaultValue="account" className="w-full">
        <div className="border-b border-border mb-8">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-8">
            {["account", "purchase history", "security"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.replace(" ", "-")}
                className={cn(
                  "data-[state=active]:bg-transparent focus:outline-none data-[state=active]:shadow-none data-[state=active]:border-t-0 data-[state=active]:border-r-0 data-[state=active]:border-l-0 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 text-lg font-bold transition-all",
                )}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent
          value="account"
          className="mt-0 focus-visible:outline-none"
        >
          <AccountTab profile={profile} />
        </TabsContent>

        {/* <TabsContent
          value="notification"
          className="mt-0 focus-visible:outline-none"
        >
          <NotificationTab />
        </TabsContent> */}

        <TabsContent
          value="purchase-history"
          className="mt-0 focus-visible:outline-none"
        >
          <PurchaseHistory paymentHistory={paymentHistory} />
        </TabsContent>

        <TabsContent
          value="security"
          className="mt-0 focus-visible:outline-none"
        >
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
