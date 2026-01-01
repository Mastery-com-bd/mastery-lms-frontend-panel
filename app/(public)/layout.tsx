import { Footer } from "@/components/shared/public-footer";
import { Navbar } from "@/components/shared/public-navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
