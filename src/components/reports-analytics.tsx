"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Filter, Download, Settings, Users, UserCheck, UserPlus, Trash2 } from "lucide-react"
import { TotalUserChart } from "@/components/data-analysis/total-user-chart"
import { UserAgeDistribution } from "@/components/data-analysis/user-age-distribution"
import { AppUsageTiming } from "@/components/data-analysis/app-usage-timing"
import { MetricsCards } from "@/components/dashboard/metrics-cards"


interface ReportsData {
  metrics: {
    totalUsers: { value: number; change: number }
    activeUsers: { value: number; change: number }
    newUsers: { value: number; change: number }
    deletedAccounts: { value: number; change: number }
  }
  totalUserChart: Array<{ period: string; users: number }>
  ageDistribution: Array<{ ageGroup: string; percentage: number; color: string }>
  usageTimings: {
    morning: {
      count: number
      percentage: number
      ageBreakdown: Array<{ age: string; morning: number; evening: number }>
    }
    evening: { count: number; percentage: number }
  }
}

export function ReportsAnalytics() {
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeFrame, setTimeFrame] = useState<"week" | "month" | "year">("month")
  const [chartLoading, setChartLoading] = useState(false)

  useEffect(() => {
    fetchReportsData()
  }, [])

  useEffect(() => {
    fetchTotalUserChart()
  }, [timeFrame])

  const fetchReportsData = async () => {
    try {
      const response = await fetch("/api/reports/analytics")
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Failed to fetch reports data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTotalUserChart = async () => {
    setChartLoading(true)
    try {
      const response = await fetch(`/api/reports/total-users?timeframe=${timeFrame}`)
      const result = await response.json()
      if (data) {
        setData({ ...data, totalUserChart: result.data })
      }
    } catch (error) {
      console.error("Failed to fetch chart data:", error)
    } finally {
      setChartLoading(false)
    }
  }

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>
  }

  if (!data) {
    return <div className="flex-1 flex items-center justify-center">Failed to load data</div>
  }

  const safeData = {
    ...data,
    totalUserChart: data.totalUserChart || [],
    ageDistribution: data.ageDistribution || [],
    usageTimings: {
      morning: {
        count: data.usageTimings?.morning?.count || 0,
        percentage: data.usageTimings?.morning?.percentage || 0,
        ageBreakdown: data.usageTimings?.morning?.ageBreakdown || [],
      },
      evening: {
        count: data.usageTimings?.evening?.count || 0,
        percentage: data.usageTimings?.evening?.percentage || 0,
      },
    },
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Report & Analytics</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor user mental health trends and journal ac</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <CalendarDays className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 space-y-6">
        {/* Metrics Cards */}
         <MetricsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total User Chart */}
          <TotalUserChart data={safeData.totalUserChart} loading={chartLoading} onTimeFrameChange={setTimeFrame} />

          {/* User Age Distribution */}
          <UserAgeDistribution data={safeData.ageDistribution} />
        </div>

        {/* App Usage Timing */}
        <AppUsageTiming data={safeData.usageTimings} />
      </main>
    </div>
  )
}
