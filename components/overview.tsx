"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 1200,
  },
  {
    name: "Mar",
    total: 1800,
  },
  {
    name: "Apr",
    total: 1500,
  },
  {
    name: "May",
    total: 2200,
  },
  {
    name: "Jun",
    total: 1800,
  },
  {
    name: "Jul",
    total: 2400,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="dark:stroke-gray-600"
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₦${value}`}
          className="dark:stroke-gray-600"
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#9333EA"
          strokeWidth={2}
          dot={{ r: 4, fill: "#9333EA", className: "dark:fill-[#B125F9] dark:stroke-black" }}
          activeDot={{ r: 6, fill: "#9333EA", className: "dark:fill-[#B125F9] dark:stroke-black" }}
          className="chart-line"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
