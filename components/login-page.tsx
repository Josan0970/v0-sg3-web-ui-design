"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Shield, Lock, Bell, Eye, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'

interface LoginPageProps {
  onLogin: () => void
}

interface StockData {
  symbol: string
  exchange: string
  price: number
  change: number
  changePercent: number
  currency: string
  lastUpdate: string
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [lastLogin] = useState("Dec 15, 2024 at 2:30 PM")
  const [selectedListing, setSelectedListing] = useState("CARL-A.CPH")
  const [currentStock, setCurrentStock] = useState<StockData>({
    symbol: "CARL-A.CPH",
    exchange: "Nasdaq Copenhagen",
    price: 1196.50,
    change: 12.30,
    changePercent: 1.04,
    currency: "DKK",
    lastUpdate: "2m ago"
  })

  // Mock stock data for different listings
  const stockListings: Record<string, StockData> = {
    "CARL-A.CPH": {
      symbol: "CARL-A.CPH",
      exchange: "Nasdaq Copenhagen",
      price: 1196.50,
      change: 12.30,
      changePercent: 1.04,
      currency: "DKK",
      lastUpdate: "2m ago"
    },
    "CARL-B.CPH": {
      symbol: "CARL-B.CPH",
      exchange: "Nasdaq Copenhagen",
      price: 1142.00,
      change: -8.50,
      changePercent: -0.74,
      currency: "DKK",
      lastUpdate: "2m ago"
    },
    "CABGY": {
      symbol: "CABGY",
      exchange: "OTC US",
      price: 17.82,
      change: 0.10,
      changePercent: 0.56,
      currency: "USD",
      lastUpdate: "15m ago"
    },
    "CABGF": {
      symbol: "CABGF",
      exchange: "OTC US",
      price: 17.65,
      change: -0.08,
      changePercent: -0.45,
      currency: "USD",
      lastUpdate: "15m ago"
    },
    "CARLS.L": {
      symbol: "CARLS.L",
      exchange: "London Stock Exchange",
      price: 14.23,
      change: 0.05,
      changePercent: 0.35,
      currency: "GBP",
      lastUpdate: "5m ago"
    }
  }

  // Update stock data when listing changes
  useEffect(() => {
    setCurrentStock(stockListings[selectedListing])
  }, [selectedListing])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStock(prev => {
        const change = (Math.random() - 0.5) * 2
        const newPrice = prev.price + change
        const newChange = prev.change + change * 0.3
        const newChangePercent = (newChange / (newPrice - newChange)) * 100

        return {
          ...prev,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          lastUpdate: "Just now"
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-white flex font-sf">
      {/* Left Panel - Security Features (Desktop Only) */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-center px-12 py-16 bg-gray-50 border-r border-gray-200">
        <div className="space-y-6">
          {/* Header with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Carlsberg Group</h1>
                <p className="text-gray-600">Markets Intelligence</p>
              </div>
            </div>
          </div>

          {/* Company Description Text Block */}
          <div className="mt-4">
            <div className="max-w-prose">
              <p className="text-sm text-gray-600 leading-relaxed">
                Carlsberg Group is one of the world's leading brewers, combining its legacy of brewing excellence with cutting-edge insights. This secure platform enables intelligent market analysis for Carlsberg's Finance and Investor Relations teams — offering real-time data, performance monitoring, and strategic decision-making tools.
              </p>
            </div>
          </div>

          {/* Live Share Price Ticker */}
          <div className="bg-muted rounded-md px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{currentStock.symbol}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {currentStock.currency} {currentStock.price.toFixed(2)}
                </span>
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  currentStock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {currentStock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {currentStock.change >= 0 ? '+' : ''}{currentStock.change.toFixed(2)} ({currentStock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Market Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">View Listings:</Label>
            <Select value={selectedListing} onValueChange={setSelectedListing}>
              <SelectTrigger className="w-full bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CARL-A.CPH">
                  <div className="flex flex-col">
                    <span className="font-medium">CARL-A.CPH</span>
                    <span className="text-xs text-gray-500">Nasdaq Copenhagen</span>
                  </div>
                </SelectItem>
                <SelectItem value="CARL-B.CPH">
                  <div className="flex flex-col">
                    <span className="font-medium">CARL-B.CPH</span>
                    <span className="text-xs text-gray-500">Nasdaq Copenhagen</span>
                  </div>
                </SelectItem>
                <SelectItem value="CABGY">
                  <div className="flex flex-col">
                    <span className="font-medium">CABGY</span>
                    <span className="text-xs text-gray-500">OTC US</span>
                  </div>
                </SelectItem>
                <SelectItem value="CABGF">
                  <div className="flex flex-col">
                    <span className="font-medium">CABGF</span>
                    <span className="text-xs text-gray-500">OTC US</span>
                  </div>
                </SelectItem>
                <SelectItem value="CARLS.L">
                  <div className="flex flex-col">
                    <span className="font-medium">CARLS.L</span>
                    <span className="text-xs text-gray-500">London Stock Exchange</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="text-xs text-gray-500">
              Last update: {currentStock.lastUpdate} • {currentStock.exchange}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 lg:w-3/5 flex items-center justify-center px-8 py-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header - Only visible on small screens */}
          <div className="lg:hidden text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Carlsberg Group</h1>
                <p className="text-gray-600">Markets Intelligence</p>
              </div>
            </div>
            
            {/* Company Description for Mobile */}
            <div className="mt-4">
              <div className="max-w-prose mx-auto">
                <p className="text-sm text-gray-600 leading-relaxed text-left">
                  Carlsberg Group is one of the world's leading brewers, combining its legacy of brewing excellence with cutting-edge insights. This secure platform enables intelligent market analysis for Carlsberg's Finance and Investor Relations teams — offering real-time data, performance monitoring, and strategic decision-making tools.
                </p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="border-gray-300 bg-white shadow-xl">
            <CardHeader className="space-y-4 text-center pb-6">
              <CardTitle className="text-2xl text-black font-bold">Sign in to Carlsberg Markets Intelligence</CardTitle>
              
              {/* Security Badges */}
              <div className="flex items-center justify-center gap-3">
                <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                  <Shield className="h-3 w-3 mr-1" />
                  Carlsberg SSO
                </Badge>
                <Badge variant="outline" className="border-green-600/20 text-green-700 bg-green-50">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Access
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800 font-medium">
                    Email / Carlsberg ID
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="lars.nielsen@carlsberg.com"
                    disabled={isLoading}
                    className="h-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary/20 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-800 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="h-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary/20 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Authenticating...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-medium rounded-lg border-gray-300 hover:bg-gray-50 text-gray-700"
                  disabled={isLoading}
                >
                  <Building2 className="h-5 w-5 mr-2" />
                  Sign in with Carlsberg ID
                </Button>
              </div>

              {/* Last Login Info */}
              {!isLoading && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">Last login: {lastLogin}</p>
                </div>
              )}

              {/* Legal Notice */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  This system is for authorized Carlsberg personnel only. By signing in, you acknowledge compliance with
                  Carlsberg's information security policies.
                </p>
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="text-center">
                  <div className="text-xs font-semibold text-primary">2FA Required</div>
                  <div className="text-xs text-gray-500">Multi-factor Auth</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold text-green-600">15min Timeout</div>
                  <div className="text-xs text-gray-500">Auto Session End</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading State Info */}
          {isLoading && (
            <Card className="border-primary/20 bg-primary/5 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-primary mb-3">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm font-medium">Establishing secure connection...</span>
                </div>
                <div className="space-y-1 text-xs text-primary/80">
                  <p>• Verifying Carlsberg ID credentials</p>
                  <p>• Checking role-based permissions</p>
                  <p>• Initializing secure session</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <div className="text-center space-y-2">
            <div className="text-xs text-gray-500">
              © 2025 Carlsberg Group A/S | Internal Use Only
            </div>
            <div className="text-xs text-gray-400">
              Last price update: {currentStock.lastUpdate}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
