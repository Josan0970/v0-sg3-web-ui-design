"use client"

import { Building2, Bell, Eye, Home, Search, Share2, TrendingUp } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Watchlist",
    icon: Eye,
    id: "watchlist",
  },
  {
    title: "Price Alerts",
    icon: Bell,
    id: "alerts",
    badge: "2",
  },
  {
    title: "Market Screener",
    icon: Search,
    id: "screener",
  },
  {
    title: "Internal Reports",
    icon: Share2,
    id: "sharing",
  },
]

interface AppSidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
}

export function AppSidebar({ activeModule, onModuleChange }: AppSidebarProps) {
  return (
    <Sidebar
      className="border-r border-border h-screen flex-shrink-0 bg-background"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border p-4 bg-background">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-lg font-semibold text-foreground">Carlsberg Group</span>
            <span className="text-xs text-muted-foreground">Internal Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-muted-foreground font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onModuleChange(item.id)}
                    isActive={activeModule === item.id}
                    className="w-full justify-start hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground rounded-lg border-none shadow-none"
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="ml-auto h-5 w-5 p-0 text-xs group-data-[collapsible=icon]:hidden"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4 bg-background">
        <div className="flex items-center gap-2 text-xs text-muted-foreground group-data-[collapsible=icon]:justify-center">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
          <span className="group-data-[collapsible=icon]:hidden font-medium">LIVE – Internal Feed</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
