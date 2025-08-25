"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface ChartData {
  chartData: Array<{ period: string; newUsers: number; activeUsers: number }>
  stats: {
    newUsers: number
    activeUsers: number
    activeUsersChange: number
    periodLabel: string
  }
}

export function UserTrendsChart() {
  const [data, setData] = useState<ChartData | null>(null)
  const [activeTab, setActiveTab] = useState("Week")
  const [loading, setLoading] = useState(false)

  const fetchData = async (timeframe: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/dashboard/trends?timeframe=${timeframe.toLowerCase()}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Failed to fetch trends data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData("week")
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    fetchData(tab)
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

  return (
    <Card className="border-none shadow-none">
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
            <LineChart data={data.chartData}>
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
            {data.stats.periodLabel}:{" "}
            <span className="font-medium text-foreground">{data.stats.newUsers.toLocaleString()} new users</span>
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
                {data.stats.activeUsers.toLocaleString()} (+{data.stats.activeUsersChange}%)
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
