import { cn } from "@/lib/utils";
import { PaymentHistoryProps } from "@/type/dashboard/settings";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  DollarSign,
  PlayCircle,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const PurchaseHistory = ({
  paymentHistory,
}: {
  paymentHistory: PaymentHistoryProps[];
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Purchase History</h2>
        <div className="space-y-4">
          {paymentHistory.length === 0 ? (
            <div className="border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                No purchase history found
              </p>
            </div>
          ) : (
            paymentHistory.map((payment) => {
              const isExpanded = expandedOrderId === payment.id;
              const formattedDate = format(
                new Date(payment.createdAt),
                "do MMMM, yyyy 'at' h:mm a",
              );
              return (
                <div key={payment.id} className="border border-border bg-white">
                  {/* Accordion Header */}
                  <div
                    onClick={() =>
                      setExpandedOrderId(isExpanded ? null : payment.id)
                    }
                    className={cn(
                      "p-6 flex items-center justify-between cursor-pointer transition-colors hover:bg-muted/5",
                      isExpanded && "border-b border-border",
                    )}
                  >
                    <div className="space-y-3">
                      <h3
                        className={cn(
                          "text-lg font-bold tracking-tight",
                          isExpanded ? "text-red-600" : "text-foreground",
                        )}
                      >
                        {formattedDate}
                      </h3>
                      <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <PlayCircle className="h-4 w-4 text-primary" />1
                          Course
                        </span>
                        <span className="flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4 text-red-600" />
                          {payment.amount} {payment.currency}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="h-4 w-4 text-green-600" />
                          {payment.paymentMethod}
                        </span>
                      </div>
                    </div>
                    <div className="h-10 w-10 border border-border flex items-center justify-center bg-muted/10">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Course List */}
                      <div className="lg:col-span-7 p-6 space-y-6 border-r border-border">
                        <div className="flex gap-4 group">
                          <div className="w-32 h-20 border border-border overflow-hidden shrink-0">
                            <Image
                              width={500}
                              height={500}
                              src={
                                payment.enrollment.course.thumbnail
                                  .trim()
                                  .replace(/^`|`$/g, "") ||
                                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
                              }
                              alt={payment.enrollment.course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                              <Star className="h-3 w-3 fill-current" />
                              4.5
                              <span className="text-muted-foreground">
                                (120 Review)
                              </span>
                            </div>
                            <h4 className="font-bold text-sm leading-snug line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
                              {payment.enrollment.course.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground font-medium">
                              Course by:{" "}
                              <span className="text-foreground">
                                {payment.enrollment.course.instructor ||
                                  "Mastery LMS"}
                              </span>
                            </p>
                          </div>
                          <div className="text-lg font-bold text-red-600">
                            {payment.amount} {payment.currency}
                          </div>
                        </div>
                      </div>

                      {/* Summary Sidebar */}
                      <div className="lg:col-span-5 p-8 bg-muted/5 flex flex-col justify-center space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold tracking-tight">
                            {formattedDate}
                          </h3>
                          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <PlayCircle className="h-3.5 w-3.5" /> 1 Course
                            </span>
                            <span className="flex items-center gap-1.5">
                              <DollarSign className="h-3.5 w-3.5" />{" "}
                              {payment.amount} {payment.currency}
                            </span>
                            <span className="flex items-center gap-1.5 text-green-600">
                              <CreditCard className="h-3.5 w-3.5" />{" "}
                              {payment.paymentMethod}
                            </span>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-border/50 grid grid-cols-3 gap-4 text-[11px] font-bold uppercase tracking-widest">
                          <div className="space-y-1">
                            <p className="text-muted-foreground opacity-60">
                              Customer
                            </p>
                            <p className="truncate">{payment.customerName}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground opacity-60">
                              Transaction
                            </p>
                            <p className="truncate">{payment.transactionId}</p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-muted-foreground opacity-60">
                              Status
                            </p>
                            <p className="text-green-600">{payment.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        {paymentHistory.length > 0 && (
          <div className="pt-8 text-center">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-60">
              Yay! You have seen all your purchase history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
