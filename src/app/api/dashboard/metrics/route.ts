import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const metrics = {
    totalUsers: {
      count: 24382,
      change: 12.5,
      changeFromLastMonth: 2500,
    },
    activeUsers: {
      count: 18459,
      change: 8.7,
      changeFromLastMonth: 1480,
    },
    newUsers: {
      count: 2856,
      change: 15.3,
      changeFromLastMonth: 380,
    },
    deletedAccounts: {
      count: 246,
      change: 4.2,
      changeFromLastMonth: 10,
    },
  }

  return NextResponse.json(metrics)
}
