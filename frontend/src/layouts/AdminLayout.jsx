import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AdminSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAdminId } from "@/services/jwt";
import axiosInstance from "@/services/axiosInstance";
import useAuth from "@/hooks/useAuth";

const fetchAdminData = async () => {
  const adminId = getAdminId();

  // Fetch data from the API
  const response = await axiosInstance.get(`/admins/${adminId}`);
  return response.data;
};

import { useState, useEffect } from "react";

const AdminLayout = () => {
  const [adminData, setAdminData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAdminData();
      setAdminData(data);
    };

    fetchData();
  }, []);

  const { isAuthenticated } = useAuth();

  const location = useLocation();

  const pageTitle = useMemo(() => {
    const path = location.pathname.replace("/admin/", "");

    if (path === "dashboard") return "Dashboard";

    if (path.includes("results/")) return "Result Details";

    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [location.pathname]);

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar adminData={adminData} />
      <SidebarInset className="flex flex-col h-screen overflow-y-auto">
        <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800 fixed top-0 left-15 w-full z-50 bg-gray-900">
          <div className="flex items-center gap-2 px-2">
            <SidebarTrigger className="font-extrabold text-2xl text-gray-50" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <NavLink to="/admin/dashboard" className="text-gray-50">
                    Dashboard
                  </NavLink>
                </BreadcrumbItem>
                {pageTitle !== "Dashboard" &&
                !pageTitle.includes("Edit") &&
                !pageTitle.includes("Add") &&
                !pageTitle.includes("Create") &&
                !pageTitle.includes("Details") ? (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>{pageTitle}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                ) : null}
                {pageTitle.includes("Edit") ||
                pageTitle.includes("Add") ||
                pageTitle.includes("Create") ||
                pageTitle.includes("Details") ? (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {location.pathname.includes("question") ? (
                        <NavLink to="/admin/questions" className="text-gray-50">
                          Questions
                        </NavLink>
                      ) : location.pathname.includes("student") ? (
                        <NavLink to="/admin/students" className="text-gray-50">
                          Students
                        </NavLink>
                      ) : location.pathname.includes("exam") ? (
                        <NavLink to="/admin/exams" className="text-gray-50">
                          Exams
                        </NavLink>
                      ) : location.pathname.includes("results") ? (
                        <NavLink to="/admin/results" className="text-gray-50">
                          Results
                        </NavLink>
                      ) : null}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>{pageTitle}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                ) : null}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
