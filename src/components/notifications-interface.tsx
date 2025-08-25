"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Plus, Copy, Trash2, Bell, ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface Notification {
  id: string
  title: string
  type: "Upgrade" | "Alert" | "Info"
  audience: string
  scheduledDate: string
  status: "Sent" | "Scheduled" | "Draft"
}

interface NotificationData {
  notifications: Notification[]
  total: number
  currentPage: number
  totalPages: number
}

export function NotificationsInterface() {
  const [data, setData] = useState<NotificationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    type: "Reminder" as "Reminder" | "Upgrade",
    scheduleDate: "",
    audience: { allUsers: true, premiumUsers: false, activeUsers: false },
  })

  useEffect(() => {
    fetchNotifications()
  }, [currentPage, searchTerm])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/notifications?page=${currentPage}&limit=6&search=${encodeURIComponent(searchTerm)}`,
      )
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Upgrade":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Alert":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "Info":
        return "bg-gray-100 text-foreground hover:bg-gray-200"
      default:
        return "bg-gray-100 text-foreground hover:bg-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Draft":
        return "bg-gray-100 text-foreground hover:bg-gray-200"
      default:
        return "bg-gray-100 text-foreground hover:bg-gray-200"
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleFormChange = (field: string, value: any) => {
    if (field.startsWith("audience.")) {
      const audienceField = field.split(".")[1]
      setNotificationForm((prev) => ({
        ...prev,
        audience: {
          ...prev.audience,
          [audienceField]: value,
        },
      }))
    } else {
      setNotificationForm((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSaveAsDraft = () => {
    console.log("[v0] Saving as draft:", notificationForm)
    setIsModalOpen(false)
    setNotificationForm({
      title: "",
      message: "",
      type: "Reminder",
      scheduleDate: "",
      audience: { allUsers: true, premiumUsers: false, activeUsers: false },
    })
  }

  const handleSendNow = () => {
    console.log("[v0] Sending now:", notificationForm)
    setIsModalOpen(false)
    setNotificationForm({
      title: "",
      message: "",
      type: "Reminder",
      scheduleDate: "",
      audience: { allUsers: true, premiumUsers: false, activeUsers: false },
    })
  }

  const handleSchedule = () => {
    console.log("[v0] Scheduling:", notificationForm)
    setIsModalOpen(false)
    setNotificationForm({
      title: "",
      message: "",
      type: "Reminder",
      scheduleDate: "",
      audience: { allUsers: true, premiumUsers: false, activeUsers: false },
    })
  }

  const safeData = data || {
    notifications: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
  }

  const isSendDisabled =
    !notificationForm.title.trim() ||
    !notificationForm.message.trim() ||
    !notificationForm.type; // you can also add !notificationForm.scheduleDate if required


  const isPaginationActive = safeData.total > 6

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold ">Notifications</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Notification
          </Button>
          <div className="relative">
            <Bell className="h-5 w-5 text-foreground/60" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-foreground/60">A</span>
          </div>
        </div>
      </div>

      {/* Notification Management Section */}
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold  mb-2">Notification Management</h2>
        <p className="text-foreground/60">Manage your notification templates and delivery settings</p>
      </div>

      {/* Notifications Table */}
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
              <p className="text-sm text-foreground/60 mt-1">Manage all your notification templates</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Notification
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div> */}

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safeData.notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                      </TableCell>
                      <TableCell className="text-foreground/100">{notification.audience}</TableCell>
                      <TableCell className="text-foreground/100">{notification.scheduledDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                Showing {Math.min((currentPage - 1) * 6 + 1, safeData.total)} to{" "}
                {Math.min(currentPage * 6, safeData.total)} of {safeData.total} notifications
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={!isPaginationActive || currentPage <= 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!isPaginationActive || currentPage >= safeData.totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Notification Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">New Notification</DialogTitle>
            <p className="text-foreground/60 text-sm">Create a notification to send to your Mental Bank users</p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Notification Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Notification Title</label>
              <Input
                placeholder="Enter notification title"
                value={notificationForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
              />
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Message Body</label>
              <Textarea
                placeholder="Type your message here..."
                rows={4}
                value={notificationForm.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 ">
              {/* Notification Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground/80">Notification Type</label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleFormChange("type", "Reminder")}
                    className={`flex flex-col items-center justify-center gap-2 p-8 border
    ${notificationForm.type === "Reminder"
                        ? "bg-[#EBF5FF] text-foreground border-[#7C9CBF] hover:bg-[#EBF5FF]"
                        : "bg-background text-foreground hover:bg-black/5"
                      }`}
                  >
                    🔔
                    <p>Reminder</p>
                  </Button>


                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleFormChange("type", "Upgrade")}
                    className={`flex flex-col items-center justify-center gap-2 p-8 border ${notificationForm.type === "Upgrade" ? "bg-[#EBF5FF] text-foreground border-[#7C9CBF] hover:bg-[#EBF5FF]" : "bg-background text-foreground"
                      }`}
                  >
                    ✨
                    <p>Upgrade</p>
                  </Button>
                </div>

              </div>

              {/* Schedule Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Schedule Time</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={notificationForm.scheduleDate}
                    onChange={(e) => handleFormChange("scheduleDate", e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                </div>
              </div>
            </div>

            {/* Audience Targeting */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">Audience Targeting</label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allUsers"
                    checked={notificationForm.audience.allUsers}
                    onCheckedChange={(checked) => handleFormChange("audience.allUsers", checked)}
                  />
                  <label htmlFor="allUsers" className="text-sm text-foreground/80">
                    All Users
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="premiumUsers"
                    checked={notificationForm.audience.premiumUsers}
                    onCheckedChange={(checked) => handleFormChange("audience.premiumUsers", checked)}
                  />
                  <label htmlFor="premiumUsers" className="text-sm text-foreground/60">
                    Premium User
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="activeUsers"
                    checked={notificationForm.audience.activeUsers}
                    onCheckedChange={(checked) => handleFormChange("audience.activeUsers", checked)}
                  />
                  <label htmlFor="activeUsers" className="text-sm text-foreground/60">
                    Active Users
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleSaveAsDraft}>
              Save as Draft
            </Button>
            <Button
              variant="outline"
              onClick={handleSendNow}
              disabled={isSendDisabled}
              className={isSendDisabled ? "bg-[#E5E7EB]  cursor-not-allowed" : ""}
            >
              Send Now
            </Button>

            <Button onClick={handleSchedule}>Schedule</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
