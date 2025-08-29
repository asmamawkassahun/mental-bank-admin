"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Filter, Download, Settings, Plus, DownloadIcon, Trash2, ChevronDown, X, CircleQuestionMark } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

interface KnowledgeBaseArticle {
  id: string
  title: string
  views: number
  lastUpdated: string
}

interface UserFeedback {
  id: string
  user: {
    name: string
    avatar: string
    feedbackId: string
  }
  content: string
  timestamp: string
  sentiment?: "positive" | "neutral" | "negative"
}

export function FeedbackInterface() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseArticle[]>([])
  const [userFeedbacks, setUserFeedbacks] = useState<UserFeedback[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalFeedbacks, setTotalFeedbacks] = useState(124)
  const [timeframeFilter, setTimeframeFilter] = useState("Recent")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  })
  const [formErrors, setFormErrors] = useState<{ title?: string; body?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<KnowledgeBaseArticle | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)



  const token = localStorage.getItem("token")

  // const timeframeOptions = [
  //   { value: "Recent", label: "Recent" },
  //   { value: "This Week", label: "This Week" },
  //   { value: "This Month", label: "This Month" },
  // ]

  useEffect(() => {
    fetch("/api/feedback/knowledge-base")
      .then((res) => res.json())
      .then((data) => setKnowledgeBase(data))
      .catch(() => {
        setKnowledgeBase([
          { id: "1", title: "How to process returns", views: 1245, lastUpdated: "2 days ago" },
          { id: "2", title: "Payment processing troubleshooting", views: 987, lastUpdated: "1 week ago" },
          { id: "3", title: "Account security best practices", views: 856, lastUpdated: "3 days ago" },
          { id: "4", title: "Shipping policy and timeframes", views: 742, lastUpdated: "5 days ago" },
        ])
      })

    // fetchUserFeedbacks()
  }, [currentPage, timeframeFilter])


  //Fetching knowledge base
  const { data: Articles, error:articleError, isLoading:articleLoading } = useQuery({
    queryKey: ["Articles"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/admin/articles`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    },
  })

  console.log("response from all feedbacks: ", Articles)


  //Fetching Feedbacked
  const { data: allFeedbacks, error:feedbackError, isLoading:feedbackLoading } = useQuery({
    queryKey: ["allFeedbacks"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/admin/feedbacks?page=${currentPage}&limit=${feedbacksPerPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    },
  })

  console.log("response from all feedbacks: ", allFeedbacks)


  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframeFilter(newTimeframe)
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  // Fetch feedback analysis data
  const { data: feedbackAnalysisData, isLoading: feedbackAnalysisLoadingChart } = useQuery({
    queryKey: ["feedbackAnalysisData"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/admin/feedbacks/analysis`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    },
  })

  const colors: Record<string, string> = {
    Positive: "#22C55E",
    Neutral: "#94A3B8",
    Negative: "#EF4444",
  };

  console.log("Feedback Analysis Data: ", feedbackAnalysisData)

  const pieData = feedbackAnalysisData?.labels?.map((label: any, index: any) => ({
    name: label,
    value: feedbackAnalysisData.percents[index], // keep the % sign
    color: colors[label],
  }));
  console.log("Pie Data: ", pieData)

  const validateForm = () => {
    const errors: { title?: string; body?: string } = {}

    if (!formData.title.trim()) {
      errors.title = "Question title is required"
    } else if (formData.title.trim().length < 5) {
      errors.title = "Question title must be at least 5 characters"
    }

    if (!formData.body.trim()) {
      errors.body = "Question body is required"
    } else if (formData.body.trim().length < 10) {
      errors.body = "Question body must be at least 10 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (action: "draft" | "send" | "schedule") => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/feedback/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          action,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setFormData({ title: "", body: "" })
        setFormErrors({})
        setIsModalOpen(false)

        fetch("/api/feedback/knowledge-base")
          .then((res) => res.json())
          .then((data) => setKnowledgeBase(data))
          .catch(() => { })
      } else {
        throw new Error("Failed to submit question")
      }
    } catch (error) {
      console.error("Error submitting question:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: "title" | "body", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleDeleteClick = (article: KnowledgeBaseArticle) => {
    setArticleToDelete(article)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/feedback/knowledge-base/${articleToDelete.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setKnowledgeBase((prev) => prev.filter((article) => article.id !== articleToDelete.id))
        setIsDeleteModalOpen(false)
        setArticleToDelete(null)
      } else {
        throw new Error("Failed to delete article")
      }
    } catch (error) {
      console.error("Error deleting article:", error)
      // You could add a toast notification here for error feedback
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setArticleToDelete(null)
  }




  const feedbacksPerPage = 4
  const totalPages = Math.ceil(allFeedbacks / feedbacksPerPage)
  const startIndex = (currentPage - 1) * feedbacksPerPage + 1
  const endIndex = Math.min(currentPage * feedbacksPerPage, allFeedbacks?.total)
  console.log("total page: ", totalPages)
  console.log("feedbacks per page: ", feedbacksPerPage)
  console.log("end index: ", endIndex)
  console.log("current page: ", currentPage)

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-background border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold ">Feedbacks</h1>
            <p className="text-sm text-foreground/60 mt-1">Monitor user mental health trends and journal ac</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 space-y-6">
        <div className="bg-background rounded-lg shadow-[0px_1px_2px_0px_#0000000D] border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold ">Popular Questions</h2>
              <p className="text-sm text-foreground/60">Frequently accessed help articles</p>
            </div>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>

          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-foreground/60">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground/60">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground/60">Last Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {knowledgeBase.map((article) => (
                  <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <CircleQuestionMark className="text-[#3B82F6] w-5 h-5 " />
                        <span className="">{article.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 ">{article.views.toLocaleString()}</td>
                    <td className="py-4 px-4 ">{article.lastUpdated}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(article)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <div className="lg:col-span-2 bg-background rounded-lg border p-6 shadow-[0px_0px_0px_0px_#00000000,0px_0px_0px_0px_#00000000,0px_1px_2px_0px_#0000000D]">
            <div className="flex items-center justify-between  border-t border-x py-5 px-4 rounded-t-lg">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold ">User Feedback</h2>
                <Badge variant="secondary" className="bg-[#EEF2FF] text-[#4F46E5] py-0.5 px-2">
                  {allFeedbacks?.total || 0} total
                </Badge>
              </div>
            </div>
            <div className=" border rounded-b-lg">
              <div className="space-y-4">
                {allFeedbacks?.feedbacks?.length === 0 ? (
                  <p>No feedbacks available.</p>
                ) : (
                  allFeedbacks?.feedbacks?.map((feedback: any) => (
                    <div key={feedback.id} className="border-b border-gray-200 rounded-x-lg rounded-t-lg p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {feedback.userName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-3">
                            <div className="flex  justify-between mb-2" >
                              <h4 className="font-medium">{feedback.userName}</h4>
                            <span className="text-sm text-foreground/60">{feedback.createdAgo}</span>
                            </div>
                              <p className="text-sm text-foreground/60">Feedback #{feedback.id}</p>
                          </div>
                          <p className="text-sm leading-relaxed pb-9today">{feedback.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between pt-9 pb-7 mx-[1.375rem] ">
                <p className="text-sm text-foreground/60">
                  Showing <span className="text-foreground/100">{endIndex}</span> of{" "}
                  <span className="text-foreground/100">{allFeedbacks?.total || 0}</span> feedbacks
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || (allFeedbacks?.total || 0) <= feedbacksPerPage}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageClick(page)}
                      className={currentPage === page ? "bg-gray-100 text-foreground" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || (allFeedbacks?.total || 0) <= feedbacksPerPage}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-background rounded-lg border p-6 shadow-[0px_1px_2px_0px_#0000000D,0px_0px_0px_0px_#00000000,0px_0px_0px_0px_#00000000] max-h-122">
            <div className="flex items-center justify-between mb-6 mx-auto">
              <div>
                <h2 className="text-lg font-semibold ">Feedback Analysis</h2>
                <p className="text-sm text-foreground/60">Customer feedback sentiment overview</p>
              </div>
            </div>

            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {pieData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 max-w-80 mx-auto">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#22C55E] rounded-full"></div>
                  <span className="text-sm font-medium ">Positive</span>
                </div>
                <span className="text-sm font-semibold ">{pieData?.find(item => item.name === "Positive")?.value}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#94A3B8] rounded-full"></div>
                  <span className="text-sm font-medium ">Neutral</span>
                </div>
                <span className="text-sm font-semibold ">{pieData?.find(item => item.name === "Neutral")?.value}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
                  <span className="text-sm font-medium ">Negative</span>
                </div>
                <span className="text-sm font-semibold ">{pieData?.find(item => item.name === "Negative")?.value}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
            <DialogDescription>Create a question that could guide the user</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Question Title</Label>
              <Input
                id="title"
                placeholder="Enter question title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={formErrors.title ? "border-red-500" : ""}
              />
              {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Question Body</Label>
              <Textarea
                id="body"
                placeholder="Type your message here..."
                value={formData.body}
                onChange={(e) => handleInputChange("body", e.target.value)}
                className={`min-h-[120px] ${formErrors.body ? "border-red-500" : ""}`}
              />
              {formErrors.body && <p className="text-sm text-red-500">{formErrors.body}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button variant="outline" onClick={() => handleSubmit("send")} disabled={isSubmitting}>
              Send Now
            </Button>
            <Button
              onClick={() => handleSubmit("schedule")}
              disabled={isSubmitting}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isSubmitting ? "Submitting..." : "Schedule"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader className="relative">
            {/* <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-6 w-6 p-0"
              onClick={handleCancelDelete}
            >
              <X className="h-4 w-4" />
            </Button> */}
            <DialogTitle className="text-center text-lg font-semibold">
              Do you want to delete this question ?
            </DialogTitle>
            <DialogDescription className="text-center text-foreground/60">This action is permanent</DialogDescription>
          </DialogHeader>

          <div className="flex justify-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="px-8 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-black text-white hover:bg-gray-800 px-8"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
