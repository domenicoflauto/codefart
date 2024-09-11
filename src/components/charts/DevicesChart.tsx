"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Monitor, Smartphone } from "lucide-react"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { ChartCard } from "@/components/ChartCard"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    icon: Smartphone,
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function DevicesChart({ chartData }: { chartData: any[] }) {
  return (
    <ChartCard
      title="Pie Chart - Bar chart with Text"
      description="January - June 2024"
    >
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}