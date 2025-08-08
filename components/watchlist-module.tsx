"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Trash2, Plus, Cloud, Search, Building2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface WatchlistItem {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  changePercent: number
  volume: number
  isFavorite: boolean
}

export function WatchlistModule() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      symbol: "CARL-A",
      name: "Carlsberg Group A/S",
      sector: "Beverages",
      price: 895.50,
      change: 12.30,
      changePercent: 1.39,
      volume: 234567,
      isFavorite: true,
    },
    {
      symbol: "CARL-B",
      name: "Carlsberg Group B/S",
      sector: "Beverages",
      price: 847.20,
      change: -5.80,
      changePercent: -0.68,
      volume: 156789,
      isFavorite: true,
    },
    {
      symbol: "HEINA",
      name: "Heineken N.V.",
      sector: "Beverages",
      price: 78.45,
      change: 2.15,
      changePercent: 2.82,
      volume: 345678,
      isFavorite: false,
    },
    {
      symbol: "BUD",
      name: "Anheuser-Busch InBev",
      sector: "Beverages",
      price: 54.32,
      change: -1.23,
      changePercent: -2.21,
      volume: 567890,
      isFavorite: false,
    },
    {
      symbol: "^IXIC",
      name: "NASDAQ Composite",
      sector: "Index",
      price: 15224.11,
      change: 45.23,
      changePercent: 0.3,
      volume: 0,
      isFavorite: true,
    },
  ])

  const [newSymbol, setNewSymbol] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [selectedSector, setSelectedSector] = useState("All")

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist((prev) =>
        prev.map((item) => {
          const change = (Math.random() - 0.5) * 2
          const newPrice = item.price + change
          const newChange = item.change + change * 0.5
          const newChangePercent = (newChange / (newPrice - newChange)) * 100

          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Mock search functionality - Apple supply chain focused
  useEffect(() => {
    if (newSymbol.length > 0) {
      const mockSymbols = ["NVDA", "META", "AMZN", "NFLX", "AMD", "INTC", "CRM", "ORCL", "HON", "QCOM"]
      setSearchResults(mockSymbols.filter((symbol) => symbol.toLowerCase().includes(newSymbol.toLowerCase())))
    } else {
      setSearchResults([])
    }
  }, [newSymbol])

  const toggleFavorite = (symbol: string) => {
    setWatchlist((prev) =>
      prev.map((item) => (item.symbol === symbol ? { ...item, isFavorite: !item.isFavorite } : item)),
    )
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
  }

  const addToWatchlist = (symbol: string) => {
    const sectors = ["Beverages", "Technology", "Supply Chain", "Index"]
    const newItem: WatchlistItem = {
      symbol,
      name: `${symbol} Corp.`,
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      price: Math.random() * 500 + 50,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 100000000),
      isFavorite: false,
    }
    setWatchlist((prev) => [...prev, newItem])
    setNewSymbol("")
    setSearchResults([])
  }

  const sectors = ["All", "Beverages", "Technology", "Supply Chain", "Index"]
  const filteredWatchlist =
    selectedSector === "All" ? watchlist : watchlist.filter((item) => item.sector === selectedSector)

  const getSectorBadge = (sector: string) => {
    const colors = {
      Beverages: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Supply Chain": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Index: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    }
    return colors[sector as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }

  return (
    <div className="space-y-4 md:space-y-6 w-full min-w-0 pb-16">
      <Card className="w-full border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader className="bg-white dark:bg-gray-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Building2 className="h-5 w-5" />
              Carlsberg Watchlist
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
              >
                <Cloud className="h-3 w-3" />
                Internal Sync
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">{watchlist.length} symbols</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 bg-white dark:bg-gray-900">
          {/* Add Symbol Input */}
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search and add symbols..."
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="pl-10 border-gray-200 dark:border-gray-700 rounded-lg"
                />
              </div>
              <Button
                onClick={() => newSymbol && addToWatchlist(newSymbol.toUpperCase())}
                disabled={!newSymbol}
                className="rounded-lg shadow-none"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                {searchResults.map((symbol) => (
                  <button
                    key={symbol}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => addToWatchlist(symbol)}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sector Filter */}
          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={selectedSector === sector ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSector(sector)}
                className="rounded-lg shadow-none"
              >
                {sector}
              </Button>
            ))}
          </div>

          {/* Watchlist Table */}
          <div className="rounded-md border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="min-w-[140px] font-semibold">Symbol</TableHead>
                  <TableHead className="min-w-[100px] font-semibold">Sector</TableHead>
                  <TableHead className="min-w-[100px] font-semibold">Last Price</TableHead>
                  <TableHead className="min-w-[80px] font-semibold">Change</TableHead>
                  <TableHead className="min-w-[80px] font-semibold">Change %</TableHead>
                  <TableHead className="min-w-[100px] hidden md:table-cell font-semibold">Volume</TableHead>
                  <TableHead className="text-right min-w-[100px] font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWatchlist.map((item) => (
                  <TableRow key={item.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{item.symbol}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                          {item.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getSectorBadge(item.sector)}`}>{item.sector}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-gray-900 dark:text-white">
                      ${item.symbol.includes("^") ? item.price.toLocaleString() : item.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-mono text-sm",
                          item.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {item.change >= 0 ? "+" : ""}
                        {item.change.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.changePercent >= 0 ? "default" : "destructive"}
                        className={`font-mono text-xs ${item.changePercent >= 0 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                      >
                        {item.changePercent >= 0 ? "+" : ""}
                        {item.changePercent.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm hidden md:table-cell text-gray-600 dark:text-gray-400">
                      {item.volume > 0 ? item.volume.toLocaleString() : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(item.symbol)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              item.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
                            )}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWatchlist(item.symbol)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
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
