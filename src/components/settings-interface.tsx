"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Laptop, Smartphone, Monitor } from "lucide-react"
import { Separator } from "./ui/separator"

interface LoginActivity {
  device: string
  location: string
  icon: "laptop" | "smartphone" | "monitor"
}

export function SettingsInterface() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [searchQuery, setSearchQuery] = useState("")

  const loginActivity: LoginActivity[] = [
    { device: "MacBook Pro", location: "San Francisco, CA", icon: "laptop" },
    { device: "iPhone 13", location: "San Francisco, CA", icon: "smartphone" },
    { device: "Windows PC", location: "New York, NY", icon: "monitor" },
  ]

  const getDeviceIcon = (iconType: "laptop" | "smartphone" | "monitor") => {
    switch (iconType) {
      case "laptop":
        return <Laptop className="h-4 w-4" />
      case "smartphone":
        return <Smartphone className="h-4 w-4" />
      case "monitor":
        return <Monitor className="h-4 w-4" />
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Saving changes:", formData)
  }

  const handleCancel = () => {
    // Reset form or navigate away
    setFormData({
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and profile picture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/professional-male-avatar.png" alt="John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium">John Smith</h3>
                <p className="text-sm text-foreground/60">john.smith@example.com</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <Button variant="default" size="sm">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="max-w-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="space-y-6">
          {/* Security Settings */}
          <div className="p-0 border-0 shadow-none">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and account security preferences</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••••"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••••"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="max-w-md"
                  />
                </div>
              </div>
            </CardContent>
          </div>
          <Separator className="m-none" />

          {/* Two-Factor Authentication */}
          <div className="p-0 border-0 shadow-none">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Enable Two-Factor Authentication</Button>
            </CardContent>
          </div>

          <Separator />
          {/* Recent Login Activity */}
          <div className="p-0 border-0 shadow-none">
            <CardHeader>
              <CardTitle>Recent Login Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loginActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="p-2 bg-gray-100 rounded-lg">{getDeviceIcon(activity.icon)}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.device}</p>
                      <p className="text-xs text-foreground/60">{activity.location}</p>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="p-0 h-auto text-sm">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>


        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
