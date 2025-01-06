import { Award, BookOpenCheck, CircleHelp, House, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { NavLink } from "react-router-dom";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: House,
      size: 24,
      url: "/admin/dashboard",
    },
    {
      title: "Exams",
      icon: BookOpenCheck,
      size: 24,
      url: "/admin/exams",
    },
    {
      title: "Students",
      icon: Users,
      size: 24,
      url: "/admin/students",
    },
    {
      title: "Questions",
      icon: CircleHelp,
      size: 24,
      url: "/admin/questions",
    },
    {
      title: "Results",
      icon: Award,
      size: 24,
      url: "/admin/results",
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLink to="/admin/dashboard">
          <img src="/roima_logo.png" alt="Logo" className="aspect-auto" />
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
