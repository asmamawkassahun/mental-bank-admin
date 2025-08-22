import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, body: questionBody, action, timestamp } = body

    // Here you would typically save to your database
    // For now, we'll just simulate a successful response

    console.log("New question submitted:", {
      title,
      body: questionBody,
      action,
      timestamp,
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: `Question ${action === "draft" ? "saved as draft" : action === "send" ? "sent" : "scheduled"} successfully`,
      data: {
        id: Math.random().toString(36).substr(2, 9),
        title,
        body: questionBody,
        action,
        timestamp,
      },
    })
  } catch (error) {
    console.error("Error processing question:", error)
    return NextResponse.json({ success: false, message: "Failed to process question" }, { status: 500 })
  }
}
