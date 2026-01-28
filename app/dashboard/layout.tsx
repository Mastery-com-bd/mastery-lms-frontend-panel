import StudentDashboardSidebar from "@/components/dashboard/studest-dashboard-sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
      <StudentDashboardSidebar />
      <div className="mx-auto container">{children}</div>
    </div>
  );
};

export default Layout;
