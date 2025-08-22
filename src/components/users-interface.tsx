"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Download, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
    id: string
    name: string
    email: string
    role: "Admin" | "Premium User" | "User"
    status: "Active" | "Inactive"
    lastActive: string
    avatar: string
}

interface UsersData {
    users: User[]
    total: number
    currentPage: number
    totalPages: number
}

export function UsersInterface() {
    const [usersData, setUsersData] = useState<UsersData | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users?page=${currentPage}&limit=8`)
                const data = await response.json()
                console.log("Fetched users:", data)
                setUsersData(data)
            } catch (error) {
                console.error("Failed to fetch users:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [currentPage])

    const handleSelectAll = (checked: boolean) => {
        if (checked && usersData) {
            setSelectedUsers(usersData.users.map((user) => user.id))
        } else {
            setSelectedUsers([])
        }
    }

    const handleSelectUser = (userId: string, checked: boolean) => {
        if (checked) {
            setSelectedUsers((prev) => [...prev, userId])
        } else {
            setSelectedUsers((prev) => prev.filter((id) => id !== userId))
        }
    }

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case "Admin":
                return "default"
            case "Premium User":
                return "secondary"
            default:
                return "outline"
        }
    }

    const getStatusColor = (status: string) => {
        return status === "Active" ? "text-green-600" : "text-gray-400"
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            setSelectedUsers([])
        }
    }

    const handleNextPage = () => {
        if (usersData && currentPage < usersData.totalPages) {
            setCurrentPage(currentPage + 1)
            setSelectedUsers([])
        }
    }

    const handlePageClick = (page: number) => {
        setCurrentPage(page)
        setSelectedUsers([])
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg">Loading users...</div>
            </div>
        )
    }

    const safeData = usersData || {
        users: [],
        total: 0,
        currentPage: 1,
        totalPages: 1,
    }
    console.log("Safe users data:", safeData)

    const startIndex = (currentPage - 1) * 8 + 1
    const endIndex = Math.min(currentPage * 8, safeData.total)
    const showPagination = safeData.total > 8

    return (
        <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-80"
                        />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Users Table */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedUsers.length === safeData.users.length && safeData.users.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="w-12">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {safeData.users.map((user) => (
                            <TableRow key={user.id} >
                                <TableCell>
                                    <Checkbox
                                        checked={selectedUsers.includes(user.id)}
                                        onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600">{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={getRoleBadgeVariant(user.role)} className={user.role === "Premium User" ? "bg-[#DBEAFE] text-[#1E40AF]" : user.role !== "Admin" ? "bg-[#F3F4F6] border-none" : ""}>{user.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}
                                        />
                                        <span className={getStatusColor(user.status)}>{user.status}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600">{user.lastActive}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Showing {startIndex} to {endIndex} of {safeData.total} users
                </div>
                {showPagination && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 bg-transparent"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>

                        {Array.from({ length: Math.min(safeData.totalPages, 3) }, (_, i) => {
                            const pageNum = i + 1
                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageClick(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            )
                        })}

                        {safeData.totalPages > 3 && <span className="text-gray-400 px-2">...</span>}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={currentPage === safeData.totalPages}
                            className="flex items-center gap-1 bg-transparent"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
