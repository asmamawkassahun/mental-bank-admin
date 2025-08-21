"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface AgeDistributionData {
  ageGroup: string
  percentage: number
  color: string
}

interface UserAgeDistributionProps {
  data: AgeDistributionData[]
}

const COLORS = ["#6366f1", "#a855f7", "#3b82f6", "#ef4444", "#6b7280"]

export function UserAgeDistribution({ data }: UserAgeDistributionProps) {
  return (
    <Card className="border-none shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">User Age Distribution</CardTitle>
        <p className="text-sm text-gray-600">Breakdown of user age demograph</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                  {data.map((entry, index) => (
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
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={item.ageGroup} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-xs text-gray-600">{item.ageGroup}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold">35%</div>
            <div className="text-xs text-gray-500">25-34 yrs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">27%</div>
            <div className="text-xs text-gray-500">18-24 yrs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">21%</div>
            <div className="text-xs text-gray-500">35-44 yrs</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
