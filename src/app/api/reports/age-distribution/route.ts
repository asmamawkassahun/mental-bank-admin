import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API response with age distribution data
    const ageDistribution = [
      { ageGroup: "25-34", percentage: 35, range: "25-34 yrs",  },
      { ageGroup: "18-24", percentage: 27, range: "18-24 yrs", },
      { ageGroup: "35-44", percentage: 21, range: "35-44 yrs",  },
      { ageGroup: "45-54", percentage: 12, range: "45-54 yrs", },
      { ageGroup: "55+", percentage: 5, range: "55+ yrs",  },
    ]

    return NextResponse.json({
      ageDistribution,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching age distribution data:", error)
    return NextResponse.json({ error: "Failed to fetch age distribution data" }, { status: 500 })
  }
}
