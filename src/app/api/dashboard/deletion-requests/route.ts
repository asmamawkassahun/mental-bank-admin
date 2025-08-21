import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const requests = [
    {
      id: "1",
      userName: "Emily Johnson",
      userAvatar: "/emily-johnson-avatar.png",
      status: "Account Deleted",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      userName: "Emily Johnson",
      userAvatar: "/emily-johnson-avatar.png",
      status: "Account Deleted",
      timestamp: "2 min ago",
    },
    {
      id: "3",
      userName: "Emily Johnson",
      userAvatar: "/emily-johnson-avatar.png",
      status: "Account Deleted",
      timestamp: "2 min ago",
    },
    {
      id: "4",
      userName: "Emily Johnson",
      userAvatar: "/emily-johnson-avatar.png",
      status: "Account Deleted",
      timestamp: "2 min ago",
    },
  ]

  return NextResponse.json(requests)
}
