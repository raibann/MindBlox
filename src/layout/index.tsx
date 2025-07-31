// import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarProvider,
  SidebarInset,
  SIDEBAR_COOKIE_NAME,
} from "@/components/ui/sidebar";
import { useCookie } from "@/hooks/use-cookie";
import { useMemo } from "react";
import { Outlet } from "react-router";

const AppLayout = () => {
  const { value: sidebarState } = useCookie(SIDEBAR_COOKIE_NAME);

  const isOpen = useMemo(() => {
    return sidebarState?.includes("true");
  }, [sidebarState]);

  return (
    <SidebarProvider
      defaultOpen={isOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="p-4 flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
