import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const data = {
    metrics: {
      totalUsers: { value: 24382, change: 12.5 },
      activeUsers: { value: 18459, change: 8.7 },
      newUsers: { value: 2856, change: 15.3 },
      deletedAccounts: { value: 246, change: 4.2 },
    },
    totalUserChart: [
      { period: "Jan", users: 12000 },
      { period: "Feb", users: 13500 },
      { period: "Mar", users: 14200 },
      { period: "Apr", users: 15800 },
      { period: "May", users: 16500 },
      { period: "Jun", users: 17200 },
      { period: "Jul", users: 18900 },
      { period: "Aug", users: 19800 },
      { period: "Sep", users: 21200 },
      { period: "Oct", users: 22100 },
      { period: "Nov", users: 23400 },
      { period: "Dec", users: 24382 },
    ],
    ageDistribution: [
      { ageGroup: "18-24", percentage: 27, color: "#6366f1" },
      { ageGroup: "25-34", percentage: 35, color: "#a855f7" },
      { ageGroup: "35-44", percentage: 21, color: "#3b82f6" },
      { ageGroup: "45-54", percentage: 12, color: "#ef4444" },
      { ageGroup: "55+", percentage: 5, color: "#6b7280" },
    ],
    usageTimings: {
      morning: {
        count: 14629,
        percentage: 60,
        ageBreakdown: [
          { age: "18-24", morning: 85, evening: 15 },
          { age: "25-34", morning: 75, evening: 25 },
          { age: "35-44", morning: 70, evening: 30 },
          { age: "45-54", morning: 65, evening: 35 },
          { age: "55+", morning: 60, evening: 40 },
        ],
      },
      evening: {
        count: 9753,
        percentage: 40,
      },
    },
  }

  return NextResponse.json(data)
}
