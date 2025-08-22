"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useState, useEffect } from "react"

interface AgeDistributionData {
  ageGroup: string
  percentage: number
  color: string
  range: string // Added range property for age ranges
}

const COLORS = ["#6366f1", "#a855f7", "#3b82f6", "#ef4444", "#6b7280"]

export function UserAgeDistribution() {
  const [ageData, setAgeData] = useState<AgeDistributionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgeDistribution = async () => {
      try {
        const response = await fetch("/api/reports/age-distribution")
        console.log("API response status:", response.status)
        const data = await response.json()
        setAgeData(data.ageDistribution || [])
      } catch (error) {
        console.error("Failed to fetch age distribution data:", error)
        setAgeData([])
      } finally {
        setLoading(false)
      }
    }

    fetchAgeDistribution()
  }, [])

  const getAgeColor = (ageGroup: string) => {
    switch (ageGroup) {
      case "18-24":
        return "#a855f7" // purple
      case "25-34":
        return "#6366f1" // indigo
      case "35-44":
        return "#3b82f6" // blue
      case "45-54":
        return "#ef4444" // red
      case "55+":
        return "#6b7280" // gray
      default:
        return "#d1d5db" // fallback (gray-300)
    }
  }



  return (
    <Card className="border-none shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">User Age Distribution</CardTitle>
        <p className="text-sm text-gray-600">Breakdown of user age demograph</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-500">Loading age distribution...</div>
          ) : ageData && ageData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="percentage"
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No age distribution data available
            </div>
          )}
        </div>
        <div className="w-full flex justify-center mt-4">
  <div className="flex flex-row flex-wrap gap-4">
    {ageData.map((item) => (
      <div key={item.ageGroup} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getAgeColor(item.ageGroup) }}
        />
        <span className="text-xs text-gray-600">{item.range}</span>
      </div>
    ))}
  </div>
</div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 ">
          {ageData.slice(0, 3).map((ageGroup) => (
            <div key={ageGroup.ageGroup} className="text-center">
              <div className="text-lg font-semibold">{ageGroup.percentage}%</div>
              <div className="text-xs text-gray-500">{ageGroup.range}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
