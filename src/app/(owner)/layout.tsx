import MiniDrawer from "@/components/ui/sidebar/sidebar";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import React from "react";

const OwnerLayout = ({ children }: Readonly<{ children: React.ReactNode }>)=>{
  return (
    <SessionAuthProvider>
      <MiniDrawer>
        {children}
      </MiniDrawer>
    </SessionAuthProvider>
  );
};

export default OwnerLayout;
