import { DevicesChart } from "@/components/charts/DevicesChart"
import { BrowsersChart } from "@/components/charts/BrowsersChart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]


const pieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

export default function Page() {
  return (
    <main className="flex flex-col md:flex-row items-center md:items-start justify-center h-full w-full gap-4">
      <DevicesChart chartData={chartData} />
      <BrowsersChart chartData={pieData} />
    </main>
  )
}