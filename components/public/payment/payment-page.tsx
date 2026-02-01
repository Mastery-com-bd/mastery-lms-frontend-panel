"use client";

import React, { useEffect, useState, Suspense } from "react";
import { CheckCircle2, Download, ArrowRight, LayoutDashboard, BookOpen, Loader2, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaymentData {
  id: string;
  amount: number;
  currency: string;
  transactionId: string;
  invoiceNo: string;
  customerName: string;
  customerEmail: string;
  completedAt: string;
  paymentMethod: string;
  status: string;
}

const PaymentPageContent = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [data, setData] = useState<{ success: boolean; data: PaymentData } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!paymentId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/${paymentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>
        <p className="text-muted-foreground font-medium animate-pulse">
          Verifying your payment...
        </p>
      </div>
    );
  }

  if (!data || !data.success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
          <XIcon className="w-10 h-10 rotate-180" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Payment Details Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          We couldn&apos;t retrieve your payment information. If you&lsquo;ve completed the payment, please check your dashboard or contact support.
        </p>
        <Link href="/dashboard">
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-bold">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const payment = data.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center space-y-6 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your enrollment is now active.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl shadow-foreground/5">
          <div className="p-6 md:p-8 border-b border-border bg-muted/30">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Amount Paid</p>
                <p className="text-3xl font-black text-primary">
                  {payment.currency} {payment.amount.toLocaleString()}
                </p>
              </div>
              <div className="text-left md:text-right space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 uppercase">
                  {payment.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Transaction ID</p>
                  <p className="font-mono text-sm text-foreground break-all">{payment.transactionId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Invoice Number</p>
                  <p className="font-mono text-sm text-foreground">{payment.invoiceNo}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Payment Date</p>
                  <p className="text-sm text-foreground font-medium">{formatDate(payment.completedAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Payment Method</p>
                  <p className="text-sm text-foreground font-medium">{payment.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Customer</p>
                  <p className="text-sm font-bold text-foreground">{payment.customerName}</p>
                  <p className="text-xs text-muted-foreground">{payment.customerEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-full font-bold shadow-lg shadow-primary/20 gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/my-courses" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full font-bold border-border hover:bg-muted gap-2">
              <BookOpen className="w-4 h-4" />
              My Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          A copy of this receipt has been sent to your email.
        </p>
      </motion.div>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium">Loading...</p>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
};

export default PaymentPage;
