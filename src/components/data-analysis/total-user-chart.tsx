"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface TotalUserChartProps {
    data: Array<{ period: string; users: number }>
    loading?: boolean
    onTimeFrameChange?: (timeFrame: "week" | "month" | "year") => void
}

export function TotalUserChart({ data, loading = false, onTimeFrameChange }: TotalUserChartProps) {
    const [timeFrame, setTimeFrame] = useState<"week" | "month" | "year">("month")

    const handleTimeFrameChange = (newTimeFrame: "week" | "month" | "year") => {
        setTimeFrame(newTimeFrame)
        onTimeFrameChange?.(newTimeFrame)
    }

    return (
        <Card className="lg:col-span-2 shadow-[0px_1px_3px_0px_#0000000D]">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-semibold">Total User</CardTitle>
                    <p className="text-sm text-foreground/60">User consistency over time</p>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                            {(["week", "month", "year"] as const).map((period) => (
                                <DropdownMenuItem
                                    key={period}
                                    onSelect={() => handleTimeFrameChange(period)}
                                    className={timeFrame === period ? "bg-gray-100 font-medium" : ""}
                                >
                                    {period.charAt(0).toUpperCase() + period.slice(1)}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            {/* CardContent fills the width and allows responsive height */}
            <CardContent className="w-full flex-1 min-h-[300px]">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-foreground/60">Loading...</div>
                ) : data && data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="10%" stopColor="#000000" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#000000" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip
                                formatter={(value) => [`${Number(value).toLocaleString()}`, "Users"]}
                                labelFormatter={(label) => `Period: ${label}`}
                            />
                            <Area type="monotone" dataKey="users" stroke="#000000" strokeWidth={0.5} fill="url(#colorUsers)" />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-foreground/60">No chart data available</div>
                )}
            </CardContent>
        </Card>

    )
}
