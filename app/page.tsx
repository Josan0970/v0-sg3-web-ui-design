"use client"

import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { ChartsModule } from "@/components/charts-module"
import { WatchlistModule } from "@/components/watchlist-module"
import { AlertsModule } from "@/components/alerts-module"
import { MarketScreenerModule } from "@/components/market-screener-module"
import { SocialSharingModule } from "@/components/social-sharing-module"
import { LoginPage } from "@/components/login-page"
import { DisclaimerModal } from "@/components/disclaimer-modal"

export default function CarlsbergInternalDashboard() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(900) // 15 minutes

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  // Session timeout countdown
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      setSessionTimeout((prev) => {
        if (prev <= 1) {
          setIsAuthenticated(false)
          return 900
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Show disclaimer on first login
  useEffect(() => {
    if (isAuthenticated && !localStorage.getItem("carlsberg-disclaimer-accepted")) {
      setShowDisclaimer(true)
    }
  }, [isAuthenticated])

  const handleDisclaimerAccept = () => {
    localStorage.setItem("carlsberg-disclaimer-accepted", "true")
    setShowDisclaimer(false)
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "charts":
        return <ChartsModule />
      case "watchlist":
        return <WatchlistModule />
      case "alerts":
        return <AlertsModule />
      case "screener":
        return <MarketScreenerModule />
      case "sharing":
        return <SocialSharingModule />
      default:
        return <ChartsModule />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={theme}>
      <div className="min-h-screen bg-background text-foreground flex overflow-hidden font-sf">
        <SidebarProvider defaultOpen={true}>
          <AppSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
          <div className="flex-1 flex flex-col min-w-0">
            <TopNavigation
              theme={theme}
              onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
              onLogout={() => setIsAuthenticated(false)}
              sessionTimeout={formatTime(sessionTimeout)}
            />
            <main className="flex-1 p-4 md:p-6 overflow-auto bg-background relative">
              {renderActiveModule()}

              {/* Confidential Watermark */}
              <div className="fixed bottom-4 right-4 text-xs text-muted-foreground/30 pointer-events-none">
                Confidential – Internal Use Only
              </div>
            </main>
          </div>
        </SidebarProvider>

        {/* Disclaimer Modal */}
        <DisclaimerModal
          isOpen={showDisclaimer}
          onAccept={handleDisclaimerAccept}
          onDecline={() => setIsAuthenticated(false)}
        />

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border px-4 py-2 text-xs text-muted-foreground text-center">
          © 2025 Carlsberg Group A/S | Internal Use Only | Investor Monitoring Platform
        </div>
      </div>
    </div>
  )
}
