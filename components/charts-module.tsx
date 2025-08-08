"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Save, Download, Upload, Grid3X3, Maximize2, Plus, Activity, Apple, Building2 } from 'lucide-react'
import { LiveChart } from "@/components/live-chart"

export function ChartsModule() {
  const [selectedSymbol, setSelectedSymbol] = useState("CARL-A")
  const [selectedInterval, setSelectedInterval] = useState("5m")
  const [chartType, setChartType] = useState("candlestick")
  const [isAutoSave, setIsAutoSave] = useState(true)
  const [isRealTime, setIsRealTime] = useState(true)
  const [chartLayout, setChartLayout] = useState("single")
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Apple-focused symbols
  const symbols = ["CARL-A", "MSFT", "GOOGL", "AMZN", "TSMC", "^IXIC", "^GSPC"]
  const symbolNames = {
    "CARL-A": "Carlsberg Group A/S",
    MSFT: "Microsoft Corp.",
    GOOGL: "Alphabet Inc.",
    AMZN: "Amazon.com Inc.",
    TSMC: "Taiwan Semiconductor",
    "^IXIC": "NASDAQ Composite",
    "^GSPC": "S&P 500",
  }

  const intervals = ["1m", "5m", "15m", "30m", "1h", "4h", "1d"]
  const indicators = ["Volume", "RSI", "MACD", "Institutional Holdings", "Moving Average"]

  return (
    <div className="space-y-6 w-full min-w-0 pb-16">
      {/* Carlsberg KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">2024 Revenue</p>
                <p className="text-2xl font-bold text-primary">74.1B</p>
                <p className="text-xs text-muted-foreground">DKK</p>
              </div>
              <div className="flex items-center text-green-600">
                <span className="text-xs">▲ 5.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Global Beverage Volume</p>
                <p className="text-2xl font-bold text-primary">118.8M</p>
                <p className="text-xs text-muted-foreground">hl</p>
              </div>
              <div className="flex items-center text-green-600">
                <span className="text-xs">▲ 2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Operating Margin</p>
                <p className="text-2xl font-bold text-primary">17.3%</p>
                <p className="text-xs text-muted-foreground">EBITDA</p>
              </div>
              <div className="flex items-center text-red-600">
                <span className="text-xs">▼ 0.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CO₂ Emissions Reduction</p>
                <p className="text-2xl font-bold text-green-600">-28%</p>
                <p className="text-xs text-muted-foreground">vs 2015 baseline</p>
              </div>
              <div className="flex items-center text-green-600">
                <span className="text-xs">▲ Target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dividend Yield</p>
                <p className="text-2xl font-bold text-primary">2.35%</p>
                <p className="text-xs text-muted-foreground">Annual</p>
              </div>
              <div className="flex items-center text-green-600">
                <span className="text-xs">▲ 0.15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* AAPL Market Analysis - Moved to top */}
      <Card className="w-full border-border shadow-sm">
        <CardHeader className="pb-3 bg-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Building2 className="h-5 w-5" />
              CARLSBERG MARKET ANALYSIS
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Badge
                variant={isRealTime ? "default" : "secondary"}
                className="animate-pulse"
              >
                {isRealTime ? "LIVE – Internal Market Feed" : "Delayed"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Last updated: {Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 bg-card">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {/* Symbol Selector */}
            <div className="flex items-center gap-2 min-w-0">
              <Label className="text-sm whitespace-nowrap font-medium text-foreground">Symbol:</Label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="w-24 md:w-32 border-border rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {symbols.map((symbol) => (
                    <SelectItem key={symbol} value={symbol}>
                      <div className="flex flex-col">
                        <span>{symbol}</span>
                        <span className="text-xs text-muted-foreground">{symbolNames[symbol as keyof typeof symbolNames]}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Interval Selector */}
            <div className="flex items-center gap-2 min-w-0">
              <Label className="text-sm whitespace-nowrap font-medium text-foreground">Interval:</Label>
              <Select value={selectedInterval} onValueChange={setSelectedInterval}>
                <SelectTrigger className="w-16 md:w-20 border-border rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {intervals.map((interval) => (
                    <SelectItem key={interval} value={interval}>
                      {interval}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Chart Type */}
            <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
              <Label className="text-sm whitespace-nowrap font-medium text-foreground">Type:</Label>
              <Tabs value={chartType} onValueChange={setChartType} className="w-full sm:w-auto">
                <TabsList className="grid w-full grid-cols-3 sm:w-auto bg-muted">
                  <TabsTrigger
                    value="candlestick"
                    className="text-xs data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Candle
                  </TabsTrigger>
                  <TabsTrigger
                    value="ohlc"
                    className="text-xs data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    OHLC
                  </TabsTrigger>
                  <TabsTrigger
                    value="line"
                    className="text-xs data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Line
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Technical Indicators */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap border-border hover:bg-accent hover:text-accent-foreground rounded-lg shadow-none"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Indicators</span>
                  <span className="sm:hidden">+</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {indicators.map((indicator) => (
                  <DropdownMenuItem key={indicator}>{indicator}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Layout Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={chartLayout === "single" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartLayout("single")}
                className="rounded-lg shadow-none"
              >
                <Activity className="h-4 w-4" />
              </Button>
              <Button
                variant={chartLayout === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartLayout("grid")}
                className="hidden md:flex rounded-lg shadow-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-accent hover:text-accent-foreground rounded-lg shadow-none"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Layout Management */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="auto-save" checked={isAutoSave} onCheckedChange={setIsAutoSave} />
                <Label htmlFor="auto-save" className="font-medium text-foreground">
                  Auto-Save Layout
                </Label>
              </div>
              <Badge variant="outline" className="border-primary/20 text-primary">
                Internal User: Full Access
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-accent hover:text-accent-foreground rounded-lg shadow-none"
              >
                <Save className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Save Layout</span>
                <span className="sm:hidden">Save</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex border-border hover:bg-accent hover:text-accent-foreground rounded-lg shadow-none"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex border-border hover:bg-accent hover:text-accent-foreground rounded-lg shadow-none"
              >
                <Upload className="h-4 w-4 mr-2" />
                Load Layout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Display */}
      {chartLayout === "single" ? (
        <Card className="w-full border-border shadow-sm">
          <CardContent className="p-0 h-[400px] md:h-[600px] w-full">
            <LiveChart symbol={selectedSymbol} interval={selectedInterval} type={chartType} isRealTime={isRealTime} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <Card className="w-full border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-card-foreground">
                {selectedSymbol} - {selectedInterval}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[300px] md:h-[400px] w-full">
              <LiveChart symbol={selectedSymbol} interval={selectedInterval} type={chartType} isRealTime={isRealTime} />
            </CardContent>
          </Card>
          <Card className="w-full border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-card-foreground">^IXIC - {selectedInterval}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[300px] md:h-[400px] w-full">
              <LiveChart symbol="^IXIC" interval={selectedInterval} type={chartType} isRealTime={isRealTime} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Carlsberg Share Performance - Moved below AAPL section */}
      <Card className="w-full border-border shadow-sm">
        <CardHeader className="pb-4 bg-card">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold uppercase tracking-wide">CARLSBERG SHARE PERFORMANCE</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full">
            <iframe
              src="https://tools.euroland.com/sharegraph/?s=770&companycode=dk-cbg&lang=en-gb"
              className="w-full h-[500px] border border-border rounded-lg shadow-md"
              title="Carlsberg Share Performance"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground py-4 border-t border-border">
        © 2025 Carlsberg Group A/S | Internal Use Only
      </div>
    </div>
  )
}
