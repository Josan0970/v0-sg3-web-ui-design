"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface LiveChartProps {
  symbol: string
  interval: string
  type: string
  isRealTime: boolean
}

interface DataPoint {
  time: string
  price: number
  volume: number
  high: number
  low: number
  open: number
  close: number
}

export function LiveChart({ symbol, interval, type, isRealTime }: LiveChartProps) {
  const [data, setData] = useState<DataPoint[]>([])
  const [crosshair, setCrosshair] = useState<{ x: number; y: number } | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  // Generate initial data
  useEffect(() => {
    const generateInitialData = () => {
      const points: DataPoint[] = []
      let basePrice = Math.random() * 100 + 850 // Carlsberg price range

      for (let i = 0; i < 50; i++) {
        const time = new Date(Date.now() - (50 - i) * 5000).toLocaleTimeString()
        const change = (Math.random() - 0.5) * 4
        basePrice += change

        points.push({
          time,
          price: basePrice,
          volume: Math.random() * 1000000,
          high: basePrice + Math.random() * 2,
          low: basePrice - Math.random() * 2,
          open: basePrice - change,
          close: basePrice,
        })
      }

      setData(points)
    }

    generateInitialData()
  }, [symbol])

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTime) return

    const interval_ms = Number.parseInt(interval.replace(/[^0-9]/g, "")) * (interval.includes("s") ? 1000 : 60000)

    const updateInterval = setInterval(
      () => {
        setData((prevData) => {
          const newData = [...prevData]
          const lastPoint = newData[newData.length - 1]
          const change = (Math.random() - 0.5) * 3
          const newPrice = lastPoint.price + change

          const newPoint: DataPoint = {
            time: new Date().toLocaleTimeString(),
            price: newPrice,
            volume: Math.random() * 1000000,
            high: newPrice + Math.random() * 1.5,
            low: newPrice - Math.random() * 1.5,
            open: lastPoint.price,
            close: newPrice,
          }

          newData.push(newPoint)
          return newData.slice(-50) // Keep last 50 points
        })
      },
      Math.min(interval_ms, 2000),
    ) // Update at least every 2 seconds for demo

    return () => clearInterval(updateInterval)
  }, [interval, isRealTime])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect()
      setCrosshair({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{symbol === "CARL-A" ? "Carlsberg Group" : symbol}</p>
          <p className="text-sm text-muted-foreground">Time: {label}</p>
          <p className="text-sm">Price: {symbol === "CARL-A" ? "DKK" : "$"}{data.price.toFixed(2)}</p>
          <p className="text-sm">Volume: {data.volume.toLocaleString()}</p>
          {type === "candlestick" && (
            <>
              <p className="text-sm">Open: {symbol === "CARL-A" ? "DKK" : "$"}{data.open.toFixed(2)}</p>
              <p className="text-sm">High: {symbol === "CARL-A" ? "DKK" : "$"}{data.high.toFixed(2)}</p>
              <p className="text-sm">Low: {symbol === "CARL-A" ? "DKK" : "$"}{data.low.toFixed(2)}</p>
              <p className="text-sm">Close: {symbol === "CARL-A" ? "DKK" : "$"}{data.close.toFixed(2)}</p>
            </>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div
      ref={chartRef}
      className="relative h-full w-full min-h-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setCrosshair(null)
      }}
    >
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            domain={["dataMin - 2", "dataMax + 2"]}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />

          {type === "line" && (
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          )}

          {type === "candlestick" && (
            <>
              <Line type="monotone" dataKey="high" stroke="hsl(var(--chart-1))" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="low" stroke="hsl(var(--chart-2))" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="close" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </>
          )}

          {/* Crosshair lines */}
          {isHovering && crosshair && (
            <>
              <ReferenceLine x={crosshair.x} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
              <ReferenceLine y={crosshair.y} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* Real-time indicator */}
      {isRealTime && (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-muted-foreground">LIVE</span>
        </div>
      )}
    </div>
  )
}
