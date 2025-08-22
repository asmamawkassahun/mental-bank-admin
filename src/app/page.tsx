"use client"

import { useState } from "react"
import { SidebarWrapper } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { UserTrendsChart } from "@/components/dashboard/user-trends-chart"
import { AccountDeletionRequests } from "@/components/dashboard/account-deletion-requests"
import { ReportsAnalytics } from "@/components/reports-analytics"
import { FeedbackInterface } from "@/components/feedback-interface"
import { SettingsInterface } from "@/components/settings-interface"
import { UsersInterface } from "@/components/users-interface"
import { NotificationsInterface } from "@/components/notifications-interface"

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<
    "dashboard" | "reports" | "feedback" | "settings" | "users" | "notifications"
  >("dashboard")

  return (
    <SidebarWrapper currentPage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === "dashboard" ? (
        <>
          <DashboardHeader />
          <div className="p-6 space-y-6">
            <MetricsCards />
            <UserTrendsChart />
            <AccountDeletionRequests />
          </div>
        </>
      ) : currentPage === "reports" ? (
        <ReportsAnalytics />
      ) : currentPage === "feedback" ? (
        <FeedbackInterface />
      ) : currentPage === "settings" ? (
        <SettingsInterface />
      ) : currentPage === "users" ? (
        <UsersInterface />
      ) : (
        <NotificationsInterface />
      )}
    </SidebarWrapper>
  )
}
