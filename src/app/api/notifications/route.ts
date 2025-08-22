import { type NextRequest, NextResponse } from "next/server"

interface Notification {
  id: string
  title: string
  type: "Upgrade" | "Alert" | "Info"
  audience: string
  scheduledDate: string
  status: "Sent" | "Scheduled" | "Draft"
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "App version Upgrade",
    type: "Upgrade",
    audience: "All Users",
    scheduledDate: "2023-05-15\n08:00 AM",
    status: "Sent",
  },
  {
    id: "2",
    title: "New Meditation Session",
    type: "Alert",
    audience: "Premium Users",
    scheduledDate: "2023-05-16\n10:00 AM",
    status: "Scheduled",
  },
  {
    id: "3",
    title: "App version Upgrade",
    type: "Upgrade",
    audience: "All Users",
    scheduledDate: "2023-05-17\n09:00 AM",
    status: "Draft",
  },
  {
    id: "4",
    title: "New Meditation Session",
    type: "Alert",
    audience: "All Users",
    scheduledDate: "2023-05-18\n12:00 PM",
    status: "Scheduled",
  },
  {
    id: "5",
    title: "App version Upgrade",
    type: "Upgrade",
    audience: "Premium Users",
    scheduledDate: "2023-05-19\n08:30 AM",
    status: "Draft",
  },
  {
    id: "6",
    title: "Weekly Progress Report",
    type: "Info",
    audience: "All Users",
    scheduledDate: "2023-05-20\n07:00 AM",
    status: "Scheduled",
  },
  {
    id: "7",
    title: "Security Update",
    type: "Alert",
    audience: "All Users",
    scheduledDate: "2023-05-21\n09:30 AM",
    status: "Sent",
  },
  {
    id: "8",
    title: "Feature Announcement",
    type: "Info",
    audience: "Premium Users",
    scheduledDate: "2023-05-22\n11:00 AM",
    status: "Draft",
  },
  {
    id: "9",
    title: "Maintenance Notice",
    type: "Alert",
    audience: "All Users",
    scheduledDate: "2023-05-23\n06:00 AM",
    status: "Scheduled",
  },
  {
    id: "10",
    title: "New Content Available",
    type: "Info",
    audience: "Premium Users",
    scheduledDate: "2023-05-24\n10:30 AM",
    status: "Sent",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "6")
  const search = searchParams.get("search") || ""

  // Filter notifications based on search term
  let filteredNotifications = mockNotifications
  if (search) {
    filteredNotifications = mockNotifications.filter(
      (notification) =>
        notification.title.toLowerCase().includes(search.toLowerCase()) ||
        notification.type.toLowerCase().includes(search.toLowerCase()) ||
        notification.audience.toLowerCase().includes(search.toLowerCase()) ||
        notification.status.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Calculate pagination
  const total = filteredNotifications.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const notifications = filteredNotifications.slice(startIndex, endIndex)

  return NextResponse.json({
    notifications,
    total,
    currentPage: page,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  })
}
