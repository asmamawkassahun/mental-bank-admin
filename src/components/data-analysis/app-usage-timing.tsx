"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

interface UsageTimingData {
    morning: {
        count: number
        percentage: number
        ageBreakdown: Array<{ age: string; morning: number; evening: number }>
    }
    evening: {
        count: number
        percentage: number
    }
}

interface AppUsageTimingProps {
    data: UsageTimingData
}

export function AppUsageTiming({ data }: AppUsageTimingProps) {
    return (
        <Card className="border-none shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-semibold">App Usage Timing</CardTitle>
                    <p className="text-sm text-gray-600">When users are most active in the app</p>
                </div>
                <div className="flex items-center gap-4">

                    <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>
            </CardHeader>
            <div className=" ml-6">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">View usage data by:</span>
                    <Badge variant="outline" className="text-teal-600 border-teal-200">
                        ↗ Morning
                    </Badge>
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                        ↙ Evening
                    </Badge>
                </div>
            </div>
            <CardContent className="pt-5">
                <div className="grid grid-row-1 lg:grid-cols-2 gap-8">
                        <div className=" ml-16 my-4">
                            <div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                                <span className="font-medium text-4">Morning Users (5AM - 12PM)</span>
                            </div>
                            <div className="text-[1.5rem] font-bold mb-1">{data.morning.count.toLocaleString()}</div>
                            <div className="text-sm text-gray-600 mb-6">{data.morning.percentage}% of total users</div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                                    <span className="font-medium">Evening Users (5PM - 12AM)</span>
                                </div>
                                <div className="text-[1.5rem] font-bold mb-1">{data.evening.count.toLocaleString()}</div>
                                <div className="text-sm text-gray-600">{data.evening.percentage}% of total users</div>
                            </div>
                        </div>

                        <div className="space-y-3 my-auto ">
                            {data.morning.ageBreakdown.map((item) => (
                                <div key={item.age} className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600 w-12">{item.age}</span>
                                    <div className="flex-1 flex">
                                        <div
                                            className="h-6 bg-teal-500 rounded-l-xl "
                                            style={{ width: `${(item.morning / (item.morning + item.evening)) * 100}%` }}
                                        ></div>
                                        <div
                                            className="h-6 bg-purple-400 rounded-r-xl"
                                            style={{ width: `${(item.evening / (item.morning + item.evening)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    


                </div>
            </CardContent>
        </Card>
    )
}
