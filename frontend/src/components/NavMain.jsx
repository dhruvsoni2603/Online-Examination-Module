/* eslint-disable react/prop-types */
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu className="flex flex-col group-data-[collapsible=icon]:gap-4 group-data-[collapsible=icon]:my-2">
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className="flex justify-center items-center"
          >
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip={item.title}
              className="cursor-pointer mr-1"
            >
              <NavLink
                to={item.url}
                className={
                  location.pathname === item.url
                    ? "bg-sidebar-accent flex items-center"
                    : "flex items-center"
                }
              >
                <item.icon
                  size={item.size}
                  className="mx-2"
                  style={{ width: item.size, height: item.size }}
                />
                <span className="truncate text-lg font-semibold">
                  {item.title}
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
