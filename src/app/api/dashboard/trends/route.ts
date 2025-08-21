import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const timeframe = searchParams.get("timeframe") || "week"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const data = {
    week: {
      chartData: [
        { period: "Mon", newUsers: 200, activeUsers: 450 },
        { period: "Tue", newUsers: 180, activeUsers: 420 },
        { period: "Wed", newUsers: 320, activeUsers: 580 },
        { period: "Thu", newUsers: 280, activeUsers: 520 },
        { period: "Fri", newUsers: 650, activeUsers: 680 },
        { period: "Sat", newUsers: 480, activeUsers: 620 },
        { period: "Sun", newUsers: 600, activeUsers: 650 },
      ],
      stats: {
        newUsers: 2354,
        activeUsers: 5126,
        activeUsersChange: 8.2,
        periodLabel: "This week",
      },
    },
    month: {
      chartData: [
        { period: "Week 1", newUsers: 1200, activeUsers: 2800 },
        { period: "Week 2", newUsers: 1450, activeUsers: 3200 },
        { period: "Week 3", newUsers: 1680, activeUsers: 3600 },
        { period: "Week 4", newUsers: 1820, activeUsers: 3900 },
      ],
      stats: {
        newUsers: 6150,
        activeUsers: 13500,
        activeUsersChange: 12.5,
        periodLabel: "This month",
      },
    },
    year: {
      chartData: [
        { period: "Jan", newUsers: 18500, activeUsers: 42000 },
        { period: "Feb", newUsers: 19200, activeUsers: 44500 },
        { period: "Mar", newUsers: 21800, activeUsers: 48200 },
        { period: "Apr", newUsers: 23400, activeUsers: 52000 },
        { period: "May", newUsers: 25600, activeUsers: 56800 },
        { period: "Jun", newUsers: 27200, activeUsers: 61200 },
        { period: "Jul", newUsers: 28900, activeUsers: 65400 },
        { period: "Aug", newUsers: 30100, activeUsers: 68900 },
        { period: "Sep", newUsers: 31800, activeUsers: 72500 },
        { period: "Oct", newUsers: 33200, activeUsers: 75800 },
        { period: "Nov", newUsers: 34600, activeUsers: 78900 },
        { period: "Dec", newUsers: 36000, activeUsers: 82000 },
      ],
      stats: {
        newUsers: 330300,
        activeUsers: 708200,
        activeUsersChange: 15.3,
        periodLabel: "This year",
      },
    },
  }

  const selectedData = data[timeframe as keyof typeof data] || data.week

  return NextResponse.json(selectedData)
}
