import { NextResponse } from "next/server"

export async function GET() {
  try {
    const adminData = {
      name: "John Smith",
      email: "admin@mentalbank.com",
      avatar: "/professional-male-avatar.png",
      role: "Administrator",
      lastLogin: new Date().toISOString(),
      permissions: ["read", "write", "admin"],
    }

    return NextResponse.json(adminData)
  } catch (error) {
    console.error("Error fetching admin profile:", error)
    return NextResponse.json({ error: "Failed to fetch admin profile" }, { status: 500 })
  }
}
