"use client"

import type React from "react"
import { useEffect, useState } from "react"

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

interface AdminData {
  name: string
  email: string
  avatar?: string
}

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: "dashboard" | "reports" | "feedback" | "settings" | "users" | "notifications") => void
}

const navigationItems = [
  { icon: Home, label: "Dashboard", key: "dashboard" as const },
  { icon: Users, label: "Users", key: "users" as const },
  { icon: Bell, label: "Notifications", key: "notifications" as const },
  { icon: BarChart3, label: "Reports & Analytics", key: "reports" as const },
]

const supportItems = [
  { icon: MessageSquare, label: "Feedback & Support", key: "feedback" as const },
  { icon: Settings, label: "Settings", key: "settings" as const },
]

export function AppSidebar({ currentPage, onPageChange }: AppSidebarProps) {
  const [adminData, setAdminData] = useState<AdminData>({ name: "", email: "", avatar: "" })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("/api/admin/profile")
        if (response.ok) {
          const data = await response.json()
          setAdminData(data)
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()

    const interval = setInterval(fetchAdminData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-1 ">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
            <svg width="48" height="41" viewBox="0 0 48 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30.39 5.46209C22.272 3.41115 14.7865 3.63904 7.26744 6.67323C12.3653 1.11968 27.2819 0.592176 34.2815 4.33956C32.1619 6.71544 29.9921 8.96049 27.4033 10.7667C26.6745 11.2773 25.9247 11.3026 25.0283 11.0832C22.1798 10.3869 19.2727 9.92266 16.3363 10.1168C12.78 10.3489 9.23621 10.7709 6.24117 13.0244C4.71642 14.1722 3.37179 15.4509 2.80629 17.4005C1.96852 20.2997 3.12884 22.3633 6.03172 23.1271C8.67071 23.8192 11.1673 23.1102 13.601 22.3084C19.8508 20.2491 25.2796 16.6705 30.323 12.518C33.0122 10.3025 35.4753 7.81264 38.2232 5.27641C37.398 4.79954 36.8409 4.4746 36.0576 4.01884C36.6649 3.59262 37.1592 3.16217 37.7205 2.86677C39.2662 2.05653 40.8329 1.28848 42.4037 0.533096C43.2121 0.144854 43.6939 0.452916 43.5221 1.30114C43.0781 3.47867 42.5545 5.63511 42.0686 7.762C41.6958 7.73668 41.5282 7.77466 41.4486 7.70714C40.1291 6.61837 40.104 6.58883 39.0317 7.74512C34.1809 12.9611 28.6977 17.3583 22.5484 20.9369C19.0842 22.9541 15.4609 24.5788 11.561 25.4524C9.74725 25.8575 7.86226 26.0221 5.97727 25.714C1.3737 24.9671 -1.60878 20.4812 0.92968 15.299C2.4293 12.231 4.96775 10.3067 8.08427 9.18837C11.7872 7.85906 15.5865 7.09524 19.5618 7.79154C21.5431 8.1418 23.5454 8.39079 25.5477 8.62289C25.9917 8.67353 26.5572 8.58491 26.9049 8.3317C27.9688 7.55522 28.949 6.66479 30.3942 5.46209H30.39Z"
                fill="#0F0D15"
              />
              <path
                d="M42.7768 13.0868C39.1115 16.8215 35.2159 20.2988 30.9809 23.371C27.345 26.0085 23.5708 28.3802 19.1851 29.5533C16.9859 30.1399 14.77 30.2328 12.6127 29.4141C11.8713 29.1313 11.2178 28.6081 10.6523 27.8358C11.0084 27.8653 11.377 27.8569 11.7247 27.9286C14.2757 28.4646 16.7304 27.9708 19.1097 27.1226C23.6253 25.5148 27.5712 22.8941 31.3705 20.0034C35.1153 17.1549 38.4078 13.8295 41.6416 10.4324C42.6511 9.37318 42.7349 9.36474 43.8114 10.3564C45.3781 11.7955 46.6138 13.416 47.083 15.6062C47.6736 18.3661 47.0327 20.7419 45.3152 22.873C44.0628 24.4302 42.5045 25.6118 40.6321 26.3039C39.4089 26.7555 38.8225 27.532 38.4706 28.8359C37.3983 32.7943 35.5259 36.4025 33.1256 39.7194C32.9706 39.9346 32.7277 40.0865 32.3381 40.4326C32.1412 39.6772 31.9653 39.099 31.8438 38.5082C31.559 37.1367 31.3412 35.7568 31.027 34.3937C30.6626 32.8196 30.6291 32.8323 29.1336 33.0939C26.4402 33.5624 23.8682 33.0982 21.3926 32.0052C21.1538 31.8997 20.9695 31.6802 20.7559 31.5114C20.8816 31.3511 20.9737 31.1696 21.024 31.1823C24.1992 31.8912 27.2361 31.1654 30.2646 30.3045C32.38 29.7053 32.3884 29.7306 32.9832 31.79C33.1759 32.4525 33.3518 33.1235 33.599 34.0224C35.1195 31.7731 35.6557 29.3972 36.3846 27.1057C36.5102 26.7048 36.6233 26.2997 36.7029 25.8861C36.8328 25.1814 37.2391 24.8944 37.9261 24.6708C39.9912 23.9956 41.9558 23.0967 43.4051 21.3538C45.5037 18.8303 45.2608 15.2475 42.7852 13.0741L42.7768 13.0868Z"
                fill="#0F0D15"
              />
            </svg>

            {/* <span className="text-white font-semibold text-sm">M</span> */}
          </div>
          <div className="leading-tight">
            <h1 className="font-extrabold text-[1.25rem]  group-data-[collapsible=icon]:hidden">
              Mental Bank
            </h1>
            <p className=" font-medium text-[0.625rem] group-data-[collapsible=icon]:hidden ">Prosperous you! </p>
          </div>
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
                      if (item.key === "users") onPageChange("users")
                      if (item.key === "notifications") onPageChange("notifications")
                    }}
                    isActive={
                      (item.key === "dashboard" && currentPage === "dashboard") ||
                      (item.key === "reports" && currentPage === "reports") ||
                      (item.key === "users" && currentPage === "users") ||
                      (item.key === "notifications" && currentPage === "notifications")
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
        <div className="flex items-center gap-3 px-2 pb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={adminData.avatar || "/admin-user-avatar.png"} />
            <AvatarFallback>
              {isLoading
                ? "..."
                : adminData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-medium ">{isLoading ? "Loading..." : adminData.name}</div>
            <div className="text-xs text-gray-500 truncate">{isLoading ? "Loading..." : adminData.email}</div>
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
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="b  ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export { AppSidebar as Sidebar }
