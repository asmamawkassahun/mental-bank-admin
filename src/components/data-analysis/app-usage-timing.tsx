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
        <Card className="shadow-[0px_1px_3px_0px_#0000000D] ">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-semibold">App Usage Timing</CardTitle>
                    <p className="text-sm text-foreground/60">When users are most active in the app</p>
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
                    <span className="text-foreground/60">View usage data by:</span>
                    <Badge variant="outline" className="text-teal-600 border-none py-2 px-9 bg-[#E6F7F5] text-sm rounded-lg">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.73772 1.73071C5.36418 1.10425 6.12039 0.791016 7.00635 0.791016C7.8923 0.791016 8.64851 1.10425 9.27498 1.73071C9.68417 2.13991 9.95973 2.60445 10.1016 3.12435H14.0063V4.87435H10.1016C9.95973 5.39425 9.68417 5.8588 9.27498 6.26799C8.64851 6.89446 7.8923 7.20769 7.00635 7.20769C6.12039 7.20769 5.36418 6.89446 4.73772 6.26799C4.32853 5.8588 4.05297 5.39425 3.91105 4.87435H0.00634766V3.12435H3.91105C4.05297 2.60445 4.32853 2.13991 4.73772 1.73071ZM5.97515 2.96816C5.6904 3.25291 5.54802 3.59664 5.54802 3.99935C5.54802 4.40206 5.6904 4.74579 5.97515 5.03055C6.25991 5.31531 6.60364 5.45769 7.00635 5.45769C7.40906 5.45769 7.75279 5.31531 8.03755 5.03055C8.3223 4.74579 8.46468 4.40206 8.46468 3.99935C8.46468 3.59664 8.3223 3.25291 8.03755 2.96816C7.75279 2.6834 7.40906 2.54102 7.00635 2.54102C6.60364 2.54102 6.25991 2.6834 5.97515 2.96816Z" fill="#2A9D90" />
                        </svg>

                        Morning
                    </Badge>
                    <Badge variant="outline" className="text-purple-600 border-none py-2 px-9 bg-[#E6F7F5] text-sm rounded-lg">
                        <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.60393 1.73071C6.23039 1.10425 6.9866 0.791016 7.87256 0.791016C8.75851 0.791016 9.51472 1.10425 10.1412 1.73071C10.5504 2.13991 10.8259 2.60445 10.9679 3.12435H14.8726V4.87435H10.9679C10.8259 5.39425 10.5504 5.8588 10.1412 6.26799C9.51472 6.89446 8.75851 7.20769 7.87256 7.20769C6.9866 7.20769 6.23039 6.89446 5.60393 6.26799C5.19474 5.8588 4.91918 5.39425 4.77726 4.87435H0.872559V3.12435H4.77726C4.91918 2.60445 5.19474 2.13991 5.60393 1.73071ZM6.84136 2.96816C6.55661 3.25291 6.41423 3.59664 6.41423 3.99935C6.41423 4.40206 6.55661 4.74579 6.84136 5.03055C7.12612 5.31531 7.46985 5.45769 7.87256 5.45769C8.27527 5.45769 8.619 5.31531 8.90376 5.03055C9.18851 4.74579 9.33089 4.40206 9.33089 3.99935C9.33089 3.59664 9.18851 3.25291 8.90376 2.96816C8.619 2.6834 8.27527 2.54102 7.87256 2.54102C7.46985 2.54102 7.12612 2.6834 6.84136 2.96816Z" fill="#E76E50" />
                        </svg>

                        Evening
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
                            <div className="text-sm text-foreground/60 mb-6">{data.morning.percentage}% of total users</div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                                <span className="font-medium">Evening Users (5PM - 12AM)</span>
                            </div>
                            <div className="text-[1.5rem] font-bold mb-1">{data.evening.count.toLocaleString()}</div>
                            <div className="text-sm text-foreground/60">{data.evening.percentage}% of total users</div>
                        </div>
                    </div>

                    <div className="space-y-3 my-auto ">
                        {data.morning.ageBreakdown.map((item) => (
                            <div key={item.age} className="flex items-center gap-3">
                                <span className="text-sm text-foreground/60 w-12">{item.age}</span>
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
