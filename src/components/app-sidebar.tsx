"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Landing Pages", icon: FolderOpen, href: "/dashboard/projects" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/app_icon.svg"
            alt="App icon"
            width={25}
            height={25}/>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton render={<Link href={item.href} />}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/dashboard/projects/new" />}>
                  <Plus className="size-4" />
                  <span>New Landing Page</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <DropdownMenu>
          <DropdownMenuTrigger render={<button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors" />}>
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                RV
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="font-medium">Ravex</span>
              <span className="text-xs text-muted-foreground">
                ravex@ar0.dev
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
