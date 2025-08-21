import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const feedbacks = [
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
  ]

  return NextResponse.json({ feedbacks, total: 124 })
}
