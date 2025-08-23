"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { Separator } from "../ui/separator"

interface DeletionRequest {
  id: string
  userName: string
  userAvatar: string
  status: string
  timestamp: string
}

export function AccountDeletionRequests() {
  const [requests, setRequests] = useState<DeletionRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch("/api/dashboard/deletion-requests")
      .then((res) => res.json())
      .then(setRequests)
  }, [])

  const filteredRequests = requests.filter((request) =>
    request.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold py-2">Account Deletion Requests</CardTitle>
        <div className="relative bg-[#F9FAFB]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 " />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <>
              <div key={request.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={request.userAvatar || "/placeholder.svg"} />
                  <AvatarFallback>EJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{request.userName}</div>
                  <div className="text-sm text-red-600">{request.status}</div>
                </div>
                <div className="text-sm text-gray-500">{request.timestamp}</div>
              </div>
              <Separator />

            </>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
