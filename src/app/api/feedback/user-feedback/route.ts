import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "4")
  const timeframe = searchParams.get("timeframe") || "Recent"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const recentFeedbacks = [
    {
      id: "1",
      user: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1234" },
      content:
        "I've been trying to process a payment for my order #45677 for the last 30 minutes but keep getting an error message. This is very frustrating as I need these items urgently. Your payment system seems to be having issues today.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      user: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1233" },
      content:
        "I followed the password reset instructions but still can't access my account. I've tried multiple browsers and devices but nothing works. I need to place an order today and this is preventing me from doing so. Can someone please help me regain access?",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      user: { name: "James Peterson", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1232" },
      content:
        "I received my order #45672 today but one item is missing. I paid for 3 items but only received 2. This isn't the first time this has happened with my orders. Please resolve this issue as soon as possible.",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      user: { name: "Sarah Miller", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1231" },
      content:
        "The new app update is fantastic! The interface is much cleaner and easier to navigate. I especially love the new meditation tracking feature. Keep up the great work!",
      timestamp: "2 days ago",
    },
    {
      id: "5",
      user: { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1230" },
      content:
        "I'm having trouble syncing my data across devices. My progress on mobile doesn't show up on desktop and vice versa. This is quite inconvenient as I use both regularly.",
      timestamp: "3 days ago",
    },
  ]

  const weeklyFeedbacks = [
    {
      id: "6",
      user: { name: "Lisa Wang", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1229" },
      content:
        "The meditation sessions have been really helpful for my anxiety. I've been using the app for a week now and I can already feel the difference. Thank you for creating such a wonderful tool.",
      timestamp: "4 days ago",
    },
    {
      id: "7",
      user: { name: "David Brown", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1228" },
      content:
        "I'm experiencing some issues with the journal feature. Sometimes my entries don't save properly and I lose my progress. This is quite frustrating as I write lengthy reflections.",
      timestamp: "6 days ago",
    },
    {
      id: "8",
      user: { name: "Maria Garcia", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1227" },
      content:
        "Love the new mood tracking feature! It's helping me identify patterns in my mental health. The insights provided are very valuable and actionable.",
      timestamp: "1 week ago",
    },
  ]

  const monthlyFeedbacks = [
    {
      id: "9",
      user: { name: "Robert Taylor", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1226" },
      content:
        "I've been using Mental Bank for a month now and it's been transformative. The combination of meditation, journaling, and mood tracking has really improved my mental wellbeing.",
      timestamp: "2 weeks ago",
    },
    {
      id: "10",
      user: { name: "Jennifer Lee", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1225" },
      content:
        "The premium features are worth every penny. The personalized meditation recommendations and advanced analytics have taken my mental health journey to the next level.",
      timestamp: "3 weeks ago",
    },
    {
      id: "11",
      user: { name: "Thomas Wilson", avatar: "/placeholder.svg?height=40&width=40", feedbackId: "F-1224" },
      content:
        "I wish there were more guided meditation options for specific situations like work stress or relationship issues. The current library is good but could be expanded.",
      timestamp: "1 month ago",
    },
  ]

  let allFeedbacks = []
  let totalCount = 0

  switch (timeframe) {
    case "Recent":
      allFeedbacks = recentFeedbacks
      totalCount = 5
      break
    case "This Week":
      allFeedbacks = [...recentFeedbacks, ...weeklyFeedbacks]
      totalCount = 8
      break
    case "This Month":
      allFeedbacks = [...recentFeedbacks, ...weeklyFeedbacks, ...monthlyFeedbacks]
      totalCount = 11
      break
    default:
      allFeedbacks = recentFeedbacks
      totalCount = 5
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedFeedbacks = allFeedbacks.slice(startIndex, endIndex)

  return NextResponse.json({
    feedbacks: paginatedFeedbacks,
    total: totalCount,
    page,
    limit,
    timeframe,
  })
}
