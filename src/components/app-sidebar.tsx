import type * as React from "react";
import { BarChart3, BookOpen, Plus, Radio, FileQuestion } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import Link from "next/link";

const navigationItems = [
  {
    title: "Analytics",
    icon: BarChart3,
    url: "#",
    isActive: true,
  },
  {
    title: "Courses",
    icon: BookOpen,
    url: "/admin/courses",
  },
  {
    title: "Add Course",
    icon: Plus,
    url: "#",
  },
  {
    title: "Lives",
    icon: Radio,
    url: "#",
  },
  {
    title: "Quizzes",
    icon: FileQuestion,
    url: "#",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">X-Learn</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium"
              >
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
