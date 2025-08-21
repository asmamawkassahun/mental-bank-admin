"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Download, Settings, Plus, DownloadIcon, Trash2, ChevronDown, CircleQuestionMark } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

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

interface FeedbackAnalysis {
  positive: number
  neutral: number
  negative: number
}

export function FeedbackInterface() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseArticle[]>([])
  const [userFeedbacks, setUserFeedbacks] = useState<UserFeedback[]>([])
  const [feedbackAnalysis, setFeedbackAnalysis] = useState<FeedbackAnalysis>({
    positive: 65,
    neutral: 25,
    negative: 10,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalFeedbacks, setTotalFeedbacks] = useState(124)
  const [sortBy, setSortBy] = useState("Recent")

  useEffect(() => {
    // Fetch knowledge base data
    fetch("/api/feedback/knowledge-base")
      .then((res) => res.json())
      .then((data) => setKnowledgeBase(data))
      .catch(() => {
        // Fallback data
        setKnowledgeBase([
          { id: "1", title: "How to process returns", views: 1245, lastUpdated: "2 days ago" },
          { id: "2", title: "Payment processing troubleshooting", views: 987, lastUpdated: "1 week ago" },
          { id: "3", title: "Account security best practices", views: 856, lastUpdated: "3 days ago" },
          { id: "4", title: "Shipping policy and timeframes", views: 742, lastUpdated: "5 days ago" },
        ])
      })

    // Fetch user feedbacks
    fetch("/api/feedback/user-feedback")
      .then((res) => res.json())
      .then((data) => {
        setUserFeedbacks(data.feedbacks)
        setTotalFeedbacks(data.total)
      })
      .catch(() => {
        // Fallback data
        setUserFeedbacks([
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
        ])
      })
  }, [])

  const pieData = [
    { name: "Positive", value: feedbackAnalysis.positive, color: "#10b981" },
    { name: "Neutral", value: feedbackAnalysis.neutral, color: "#6b7280" },
    { name: "Negative", value: feedbackAnalysis.negative, color: "#ef4444" },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Feedbacks</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor user mental health trends and journal ac</p>
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
        {/* Knowledge Base Section */}
        <div className="bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border-none p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Knowledge Base</h2>
              <p className="text-sm text-gray-600">Frequently accessed help articles</p>
            </div>
            <Button size="sm" className="bg-white text-black border border-gray-200 hover:bg-gray-50">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>

          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {knowledgeBase.map((article) => (
                  <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <CircleQuestionMark className="text-[#3B82F6] w-5 h-5 "/>
                        <span className="">{article.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{article.views.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600">{article.lastUpdated}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Feedback Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900">User Feedback</h2>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {totalFeedbacks} total
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Button variant="outline" size="sm">
                  {sortBy}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {userFeedbacks.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={feedback.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {feedback.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{feedback.user.name}</h4>
                          <p className="text-sm text-gray-500">Feedback #{feedback.user.feedbackId}</p>
                        </div>
                        <span className="text-sm text-gray-500">{feedback.timestamp}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{feedback.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Showing 4 of {totalFeedbacks} feedbacks</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Feedback Analysis Section */}
          <div className="bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border-none p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Feedback Analysis</h2>
                <p className="text-sm text-gray-600">Customer feedback sentiment overview</p>
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
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Positive</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{feedbackAnalysis.positive}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Neutral</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{feedbackAnalysis.neutral}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Negative</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{feedbackAnalysis.negative}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
