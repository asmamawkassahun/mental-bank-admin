import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const timeframe = searchParams.get("timeframe") || "month"

  // Simulate API delay for smooth transitions
  await new Promise((resolve) => setTimeout(resolve, 800))

  let data

  switch (timeframe) {
    case "week":
      data = [
        { period: "Mon", users: 23800 },
        { period: "Tue", users: 23950 },
        { period: "Wed", users: 24100 },
        { period: "Thu", users: 24200 },
        { period: "Fri", users: 24300 },
        { period: "Sat", users: 24350 },
        { period: "Sun", users: 24382 },
      ]
      break
    case "year":
      data = [
        { period: "2020", users: 8500 },
        { period: "2021", users: 12200 },
        { period: "2022", users: 16800 },
        { period: "2023", users: 20500 },
        { period: "2024", users: 24382 },
      ]
      break
    default: // month
      data = [
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
      ]
  }

  return NextResponse.json({ data })
}
