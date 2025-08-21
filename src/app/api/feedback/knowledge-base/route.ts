import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const knowledgeBase = [
    { id: "1", title: "How to process returns", views: 1245, lastUpdated: "2 days ago" },
    { id: "2", title: "Payment processing troubleshooting", views: 987, lastUpdated: "1 week ago" },
    { id: "3", title: "Account security best practices", views: 856, lastUpdated: "3 days ago" },
    { id: "4", title: "Shipping policy and timeframes", views: 742, lastUpdated: "5 days ago" },
  ]

  return NextResponse.json(knowledgeBase)
}
