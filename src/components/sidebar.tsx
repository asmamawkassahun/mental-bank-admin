"use client"

import type React from "react"

import { BarChart3, Bell, FileText, Heart, Home, MessageSquare, Settings, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navigationItems = [
  { icon: Home, label: "Dashboard", key: "dashboard" as const },
  { icon: Users, label: "Users", key: "users" as const },
  { icon: FileText, label: "Journals", key: "journals" as const },
  { icon: Heart, label: "Affirmations & Goals", key: "affirmations" as const },
  { icon: Bell, label: "Notifications", key: "notifications" as const },
  { icon: BarChart3, label: "Reports & Analytics", key: "reports" as const },
]

const supportItems = [
  { icon: MessageSquare, label: "Feedback & Support", key: "feedback" as const },
  { icon: Settings, label: "Settings", key: "settings" as const },
]

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: "dashboard" | "reports" | "feedback" | "settings") => void
}

export function AppSidebar({ currentPage, onPageChange }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">M</span>
          </div>
          <span className="font-semibold text-gray-900 group-data-[collapsible=icon]:hidden">Mental Bank</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MAIN</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.key === "dashboard") onPageChange("dashboard")
                      if (item.key === "reports") onPageChange("reports")
                    }}
                    isActive={
                      (item.key === "dashboard" && currentPage === "dashboard") ||
                      (item.key === "reports" && currentPage === "reports")
                    }
                    tooltip={item.label}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>SUPPORT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.key === "feedback") onPageChange("feedback")
                      if (item.key === "settings") onPageChange("settings")
                    }}
                    isActive={
                      (item.key === "feedback" && currentPage === "feedback") ||
                      (item.key === "settings" && currentPage === "settings")
                    }
                    tooltip={item.label}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/admin-user-avatar.png" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-medium text-gray-900">Admin User</div>
            <div className="text-xs text-gray-500 truncate">admin@mentalbank.com</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
export function SidebarWrapper({
  currentPage,
  onPageChange,
  children,
}: AppSidebarProps & { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar currentPage={currentPage} onPageChange={onPageChange} />
        <div className="flex-1 flex flex-col">
          {/* Sticky header */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
          </header>

          {/* Main content scrolls under header */}
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
