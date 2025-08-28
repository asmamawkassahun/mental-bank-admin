"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type BackendResponse = {
  labels: string[]
  newUsers: number[]
  activeUsers: number[]
}

type ChartDataItem = {
  period: string
  newUsers: number
  activeUsers: number
}

type Stats = {
  newUsers: number
  activeUsers: number
  activeUsersChange: number
  periodLabel: string
}

type TransformedData = {
  week: { chartData: ChartDataItem[]; stats: Stats }
  month: { chartData: ChartDataItem[]; stats: Stats }
  year: { chartData: ChartDataItem[]; stats: Stats }
}

interface ChartData {
  chartData: Array<{ period: string; newUsers: number; activeUsers: number }>
  stats: {
    newUsers: number
    activeUsers: number
    activeUsersChange: number
    periodLabel: string
  }
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL


export function UserTrendsChart() {
  // const [data, setData] = useState<ChartData | null>(null)
  const [activeTab, setActiveTab] = useState("Week")
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")

  const { data: trendData, error, isLoading } = useQuery({
    queryKey: ["userTrends", activeTab],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/admin/dashboard/trends?period=month`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    },
  })
  console.log("Query successful! Data: ", trendData)


  function transformTrendData(trendData: BackendResponse): TransformedData {
    // Helper to sum arrays
    const sum = (arr: number[]) => arr?.reduce((a, b) => a + b, 0)

    // Map each label to { period, newUsers, activeUsers }
    const chartData: ChartDataItem[] = trendData?.labels.map((label, i) => ({
      period: label, // you can convert this to day/week/month if needed
      newUsers: trendData.newUsers[i],
      activeUsers: trendData.activeUsers[i],
    }))

    // Example: take last 7 days for week, last 4 weeks for month, all for year
    const weekData = chartData?.slice(-7)
    const monthData = chartData?.slice(-28).reduce((acc, curr, idx) => {
      // Group by 7 days = week
      const weekIndex = Math.floor(idx / 7)
      if (!acc[weekIndex]) acc[weekIndex] = { period: `Week ${weekIndex + 1}`, newUsers: 0, activeUsers: 0 }
      acc[weekIndex].newUsers += curr.newUsers
      acc[weekIndex].activeUsers += curr.activeUsers
      return acc
    }, [] as ChartDataItem[])

    const yearData = chartData?.slice() // keep all

    // Compute stats
    const computeStats = (data: ChartDataItem[], label: string): Stats => {
      const newUsersTotal = sum(data?.map((d) => d.newUsers))
      const activeUsersTotal = sum(data?.map((d) => d.activeUsers))
      // Change can be computed as percentage from previous period (simplified here)
      const activeUsersChange = data?.length > 1
        ? ((data[data.length - 1].activeUsers - data[0].activeUsers) / (data[0].activeUsers || 1)) * 100
        : 0
      return { newUsers: newUsersTotal, activeUsers: activeUsersTotal, activeUsersChange, periodLabel: label }
    }

    return {
      week: { chartData: weekData, stats: computeStats(weekData, "This week") },
      month: { chartData: monthData, stats: computeStats(monthData, "This month") },
      year: { chartData: yearData, stats: computeStats(yearData, "This year") },
    }
  }


  const data = transformTrendData(trendData)
  console.log("the refined data: ", data)
  console.log("the backend response: ", trendData)



  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // fetchData(tab)
  }

  if (!data || loading) {
    return (
      <Card className="border-none shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-80 bg-gray-200 rounded"></div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  const selectedKey = (activeTab.toLowerCase() as "week" | "month" | "year")
  const selected = data[selectedKey]

  return (
    <Card className="border-none shadow-[0_1px_2px_0px_rgbaBest score
(0,0,0,0.05),0_0px_0px_0px_rgba(0,0,0,0),0_0px_0px_0px_rgba(0,0,0,0)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">New & Active User Trends</CardTitle>
          <div className="flex gap-2">
            {["Week", "Month", "Year"].map((tab) => (
              <Button
                key={tab}
                // variant={activeTab === tab ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTabChange(tab)}
                className={`hover:bg-accent text-foreground/100 ${activeTab === tab ? "bg-accent hover:none " : "bg-background"}`}
                disabled={loading}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selected.chartData}>
              <XAxis dataKey="period" axisLine={false} tickLine={false} className="text-xs text-gray-500 " padding={{ left: 20, }} />
              <YAxis axisLine={false} tickLine={false} className="text-xs text-gray-500" />
              <Line type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={2} dot={false} name="New Users" />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Active Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4">
          <div className="text-sm text-foreground/60">
            {selected.stats?.periodLabel}:{" "}
            <span className="font-medium text-foreground">{selected.stats?.newUsers?.toLocaleString()} new users</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-foreground/60">New Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-foreground/60">Active Users</span>
            </div>
            <div className="text-foreground/60">
              Active users:{" "}
              <span className="font-medium text-foreground">
                {selected.stats?.activeUsers?.toLocaleString()} ({selected.stats?.activeUsersChange}%)
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
