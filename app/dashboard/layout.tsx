import StudentDashboardSidebar from "@/components/dashboard/studest-dashboard-sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <StudentDashboardSidebar />
      {children}
    </div>
  );
};

export default Layout;
