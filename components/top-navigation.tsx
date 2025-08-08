"use client"

import { Bell, Moon, Sun, User, Settings, LogOut, Building2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState, useEffect } from "react"

interface TopNavigationProps {
  theme: "light" | "dark"
  onThemeToggle: () => void
  onLogout: () => void
  sessionTimeout: string
}

export function TopNavigation({ theme, onThemeToggle, onLogout, sessionTimeout }: TopNavigationProps) {
  const [aaplPrice, setAaplPrice] = useState(195.35)
  const [aaplChange, setAaplChange] = useState(-1.21)
  const [nasdaqPrice, setNasdaqPrice] = useState(15224.11)
  const [lastSync, setLastSync] = useState(0)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAaplPrice((prev) => prev + (Math.random() - 0.5) * 2)
      setAaplChange((prev) => prev + (Math.random() - 0.5) * 0.5)
      setNasdaqPrice((prev) => prev + (Math.random() - 0.5) * 50)
      setLastSync(0)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Update last sync counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground hidden sm:inline">
            Carlsberg Group Dashboard
          </span>
        </div>

        {/* Live Market Data */}
        <div className="hidden lg:flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">CBG:</span>
            <span className="font-mono text-foreground">DKK {aaplPrice.toFixed(2)}</span>
            <span className={`font-mono ${aaplChange >= 0 ? "text-green-600" : "text-red-600"}`}>
              {aaplChange >= 0 ? "▲" : "▼"}
              {Math.abs(aaplChange).toFixed(2)}%
            </span>
          </div>
          <div className="text-muted-foreground">|</div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">OMX Copenhagen:</span>
            <span className="font-mono text-foreground">{nasdaqPrice.toLocaleString()}</span>
          </div>
          <div className="text-muted-foreground">|</div>
          <div className="text-muted-foreground">Last synced: {lastSync}s ago</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Session Timeout */}
        <Badge variant="outline" className="text-xs hidden md:flex">
          Session: {sessionTimeout}
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="h-9 w-9 hover:bg-accent hover:text-accent-foreground rounded-lg border-none shadow-none"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative hover:bg-accent hover:text-accent-foreground rounded-lg border-none shadow-none"
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive text-destructive-foreground">2</Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-accent hover:text-accent-foreground rounded-lg border-none shadow-none"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="px-3 py-2 text-sm">
              <div className="font-medium text-foreground">Lars Nielsen</div>
              <div className="text-muted-foreground">lars.nielsen@carlsberg.com</div>
              <div className="text-xs text-muted-foreground mt-1">Finance Team • Analyst</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
