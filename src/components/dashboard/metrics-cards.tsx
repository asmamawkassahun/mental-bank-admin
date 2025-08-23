"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, UserCheck, UserPlus, Trash2 } from "lucide-react"

interface MetricData {
  totalUsers: { count: number; change: number; changeFromLastMonth: number }
  activeUsers: { count: number; change: number; changeFromLastMonth: number }
  newUsers: { count: number; change: number; changeFromLastMonth: number }
  deletedAccounts: { count: number; change: number; changeFromLastMonth: number }
}

export function MetricsCards() {
  const [metrics, setMetrics] = useState<MetricData | null>(null)

  useEffect(() => {
    fetch("/api/dashboard/metrics")
      .then((res) => res.json())
      .then(setMetrics)
  }, [])

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

  const cards = [
    {
      title: "Total Users",
      value: metrics.totalUsers.count.toLocaleString(),
      change: metrics.totalUsers.change,
      changeText: `+${metrics.totalUsers.changeFromLastMonth} from last month`,
      icon: Users,
      positive: true,
    },
    {
      title: "Active Users",
      value: metrics.activeUsers.count.toLocaleString(),
      change: metrics.activeUsers.change,
      changeText: `+${metrics.activeUsers.changeFromLastMonth} from last month`,
      icon: UserCheck,
      positive: true,
    },
    {
      title: "New Users",
      value: metrics.newUsers.count.toLocaleString(),
      change: metrics.newUsers.change,
      changeText: `+${metrics.newUsers.changeFromLastMonth} from last month`,
      icon: UserPlus,
      positive: true,
    },
    {
      title: "Delete Account",
      value: metrics.deletedAccounts.count.toLocaleString(),
      change: metrics.deletedAccounts.change,
      changeText: `+${metrics.deletedAccounts.changeFromLastMonth} from last month`,
      icon: Trash2,
      positive: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className="bg-background">
          <CardContent className="px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[#6B77E126] rounded-lg">
                <card.icon className="w-5 h-5 text-black" />
              </div>
              <div
                className={`flex items-center gap-1 text-4 font-medium ${
                  card.positive ? "text-foreground/60" : "text-red-600"
                }`}
              >
                {card.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {card.change}%
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-4 font-medium text-foreground/60">{card.title}</p>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-4 text-foreground/60">{card.changeText}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
