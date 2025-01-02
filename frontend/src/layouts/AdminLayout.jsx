import { Outlet, useLocation } from "react-router-dom";

import { AppSidebar } from "@/components/AdminSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-y-auto">
        <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800 fixed top-0 left-15 w-full z-50 bg-gray-900">
          <div className="flex items-center gap-2 px-2">
            <SidebarTrigger className="font-extrabold text-2xl text-gray-50" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-bold text-gray-50">
              {location.pathname
                .replace("/admin/", "")
                .charAt(0)
                .toUpperCase() +
                location.pathname.replace("/admin/", "").slice(1)}
            </h1>
          </div>
        </header>
        <Outlet />
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
