"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {  Users, UserCheck, UserPlus, Trash2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface MetricData {
  totalUsers: { count: number; change: number; changeFromLastMonth: number }
  activeUsers: { count: number; change: number; changeFromLastMonth: number }
  newUsers: { count: number; change: number; changeFromLastMonth: number }
  deletedAccounts: { count: number; change: number; changeFromLastMonth: number }
}
const baseUrl = "http://161.97.174.190:3000"


export function MetricsCards() {
  // const [metrics, setMetrics] = useState<MetricData | null>(null)

  // useEffect(() => {
  //   fetch("/api/dashboard/metrics")
  //     .then((res) => res.json())
  //     .then(setMetrics)
  // }, [])
  const token = localStorage.getItem("token")

  const { data:metrics, error, isLoading } = useQuery({
    queryKey: ["dashboardMetrics"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/admin/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    },
  })

  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // const cards = [
  //   {
  //     title: "Total Users",
  //     value: metrics.totalUsers.count.toLocaleString(),
  //     change: metrics.totalUsers.change,
  //     changeText: `+${metrics.totalUsers.changeFromLastMonth} from last month`,
  //     icon: Users,
  //     positive: true,
  //   },
  //   {
  //     title: "Active Users",
  //     value: metrics.activeUsers.count.toLocaleString(),
  //     change: metrics.activeUsers.change,
  //     changeText: `+${metrics.activeUsers.changeFromLastMonth} from last month`,
  //     icon: UserCheck,
  //     positive: true,
  //   },
  //   {
  //     title: "New Users",
  //     value: metrics.newUsers.count.toLocaleString(),
  //     change: metrics.newUsers.change,
  //     changeText: `+${metrics.newUsers.changeFromLastMonth} from last month`,
  //     icon: UserPlus,
  //     positive: true,
  //   },
  //   {
  //     title: "Delete Account",
  //     value: metrics.deletedAccounts.count.toLocaleString(),
  //     change: metrics.deletedAccounts.change,
  //     changeText: `+${metrics.deletedAccounts.changeFromLastMonth} from last month`,
  //     icon: Trash2,
  //     positive: false,
  //   },
  // ]


  const cards = metrics
  ? [
      {
        title: "Total Users",
        value: metrics.totalUsers?.toLocaleString(),
        change: metrics.totalUsersChangePercent,
        changeText: `+${metrics.totalUsersChangeCount} from last month`,
        icon: Users,
        positive: metrics.totalUsersChangePercent >= 0,
      },
      {
        title: "Active Users",
        value: metrics.activeUsers?.toLocaleString(),
        change: metrics.activeUsersChangePercent,
        changeText: `+${metrics.activeUsersChangeCount} from last month`,
        icon: UserCheck,
        positive: metrics.activeUsersChangePercent >= 0,
      },
      {
        title: "New Users",
        value: metrics.newUsers?.toLocaleString(),
        change: metrics.newUsersChangePercent,
        changeText: `+${metrics.newUsersChangeCount} from last month`,
        icon: UserPlus,
        positive: metrics.newUsersChangePercent >= 0,
      },
      {
        title: "Delete Account",
        value: metrics.deletedAccounts?.toLocaleString(),
        change: metrics.deletedAccountsChangePercent,
        changeText: `+${metrics.deletedAccountsChangeCount} from last month`,
        icon: Trash2,
        positive: false,
      },
    ]
  : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className="bg-background shadow-none">
          <CardContent className="px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[#6B77E126] rounded-lg">
                <card.icon className="w-5 h-5 text-black" />
              </div>
              <div
                className={`flex items-center gap-1 text-4 font-medium font-Geist ${card.positive ? "text-[#059669]" : "text-red-600"
                  }`}
              >
                {card.positive ? <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.95442 1.33398V10.6673M4.95442 1.33398L1.62109 4.66732M4.95442 1.33398L8.28773 4.66732" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                  : <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.48567 10.6673V1.33398M4.48567 10.6673L7.81896 7.33398M4.48567 10.6673L1.15234 7.33398" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                {card.change}%
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-4 font-medium text-foreground/60">{card.title}</p>
              <p className="text-2xl font-bold ">{card.value}</p>
              <p className="text-4 text-foreground/60">{card.changeText}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
