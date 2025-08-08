"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScreenerResult {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  pe: number
  rsi: number
  signal: "buy" | "sell" | "hold"
}

export function MarketScreenerModule() {
  const [results, setResults] = useState<ScreenerResult[]>([])
  const [filters, setFilters] = useState({
    minPrice: [0],
    maxPrice: [1000],
    minVolume: [0],
    maxVolume: [100000000],
    minRSI: [0],
    maxRSI: [100],
    minPE: [0],
    maxPE: [50],
    sector: "",
    marketCap: "any",
  })
  const [sortBy, setSortBy] = useState("changePercent")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Generate mock data
  useEffect(() => {
    const generateMockData = () => {
      const symbols = [
        "AAPL",
        "GOOGL",
        "MSFT",
        "TSLA",
        "AMZN",
        "NVDA",
        "META",
        "NFLX",
        "AMD",
        "INTC",
        "CRM",
        "ORCL",
        "ADBE",
        "PYPL",
        "UBER",
      ]
      const companies = [
        "Apple Inc.",
        "Alphabet Inc.",
        "Microsoft Corp.",
        "Tesla Inc.",
        "Amazon.com Inc.",
        "NVIDIA Corp.",
        "Meta Platforms",
        "Netflix Inc.",
        "Advanced Micro Devices",
        "Intel Corp.",
        "Salesforce Inc.",
        "Oracle Corp.",
        "Adobe Inc.",
        "PayPal Holdings",
        "Uber Technologies",
      ]

      const mockResults: ScreenerResult[] = symbols.map((symbol, index) => ({
        symbol,
        name: companies[index] || `${symbol} Corp.`,
        price: Math.random() * 500 + 50,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 10,
        volume: Math.floor(Math.random() * 100000000),
        marketCap: Math.floor(Math.random() * 2000000000000),
        pe: Math.random() * 40 + 5,
        rsi: Math.random() * 100,
        signal: Math.random() > 0.6 ? "buy" : Math.random() > 0.3 ? "hold" : "sell",
      }))

      setResults(mockResults)
    }

    generateMockData()
  }, [])

  // Filter and sort results
  const filteredResults = results
    .filter((result) => {
      return (
        result.price >= filters.minPrice[0] &&
        result.price <= filters.maxPrice[0] &&
        result.volume >= filters.minVolume[0] &&
        result.volume <= filters.maxVolume[0] &&
        result.rsi >= filters.minRSI[0] &&
        result.rsi <= filters.maxRSI[0] &&
        result.pe >= filters.minPE[0] &&
        result.pe <= filters.maxPE[0]
      )
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof ScreenerResult] as number
      const bValue = b[sortBy as keyof ScreenerResult] as number
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    })

  const getSignalBadge = (signal: ScreenerResult["signal"]) => {
    switch (signal) {
      case "buy":
        return <Badge className="bg-green-500 hover:bg-green-600">BUY</Badge>
      case "sell":
        return <Badge variant="destructive">SELL</Badge>
      case "hold":
        return <Badge variant="secondary">HOLD</Badge>
    }
  }

  const getSignalIcon = (signal: ScreenerResult["signal"]) => {
    switch (signal) {
      case "buy":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "sell":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "hold":
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Market Screener
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range</Label>
              <div className="space-y-2">
                <Slider
                  value={filters.minPrice}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, minPrice: value }))}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.minPrice[0]}</span>
                  <span>${filters.maxPrice[0]}</span>
                </div>
                <Slider
                  value={filters.maxPrice}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, maxPrice: value }))}
                  max={1000}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>

            {/* RSI Range */}
            <div className="space-y-3">
              <Label>RSI Range</Label>
              <div className="space-y-2">
                <Slider
                  value={filters.minRSI}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, minRSI: value }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.minRSI[0]}</span>
                  <span>{filters.maxRSI[0]}</span>
                </div>
                <Slider
                  value={filters.maxRSI}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, maxRSI: value }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* P/E Ratio */}
            <div className="space-y-3">
              <Label>P/E Ratio</Label>
              <div className="space-y-2">
                <Slider
                  value={filters.minPE}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, minPE: value }))}
                  max={50}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.minPE[0]}</span>
                  <span>{filters.maxPE[0]}</span>
                </div>
                <Slider
                  value={filters.maxPE}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, maxPE: value }))}
                  max={50}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Market Cap */}
            <div className="space-y-3">
              <Label>Market Cap</Label>
              <Select
                value={filters.marketCap}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, marketCap: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="mega">Mega Cap (&gt;$200B)</SelectItem>
                  <SelectItem value="large">Large Cap ($10B-$200B)</SelectItem>
                  <SelectItem value="mid">Mid Cap ($2B-$10B)</SelectItem>
                  <SelectItem value="small">Small Cap (&lt;$2B)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label>Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="changePercent">Change %</SelectItem>
                    <SelectItem value="volume">Volume</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="marketCap">Market Cap</SelectItem>
                    <SelectItem value="pe">P/E Ratio</SelectItem>
                    <SelectItem value="rsi">RSI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            </div>
            <Badge variant="outline">{filteredResults.length} results found</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Screening Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Market Cap</TableHead>
                  <TableHead>P/E</TableHead>
                  <TableHead>RSI</TableHead>
                  <TableHead>Signal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.slice(0, 20).map((result) => (
                  <TableRow key={result.symbol} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-semibold">{result.symbol}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-32">{result.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">${result.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-mono text-sm",
                            result.changePercent >= 0 ? "text-green-600" : "text-red-600",
                          )}
                        >
                          {result.changePercent >= 0 ? "+" : ""}
                          {result.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{(result.volume / 1000000).toFixed(1)}M</TableCell>
                    <TableCell className="font-mono text-sm">${(result.marketCap / 1000000000).toFixed(1)}B</TableCell>
                    <TableCell className="font-mono text-sm">{result.pe.toFixed(1)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{result.rsi.toFixed(0)}</span>
                        <div
                          className={cn(
                            "h-2 w-16 rounded-full",
                            result.rsi > 70 ? "bg-red-200" : result.rsi < 30 ? "bg-green-200" : "bg-gray-200",
                          )}
                        >
                          <div
                            className={cn(
                              "h-full rounded-full",
                              result.rsi > 70 ? "bg-red-500" : result.rsi < 30 ? "bg-green-500" : "bg-gray-400",
                            )}
                            style={{ width: `${result.rsi}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSignalIcon(result.signal)}
                        {getSignalBadge(result.signal)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
