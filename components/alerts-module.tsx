"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, Plus, Edit, Trash2, CheckCircle, AlertCircle } from "lucide-react"

interface Alert {
  id: string
  name: string
  symbol: string
  condition: string
  triggerLevel: number
  status: "active" | "triggered" | "disabled"
  lastTriggered?: Date
  notifications: {
    inApp: boolean
    webPush: boolean
    email: boolean
    webhook: string
  }
}

export function AlertsModule() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      name: "AAPL Price Alert",
      symbol: "AAPL",
      condition: "Price Above",
      triggerLevel: 180,
      status: "active",
      notifications: {
        inApp: true,
        webPush: true,
        email: false,
        webhook: "",
      },
    },
    {
      id: "2",
      name: "TSLA RSI Alert",
      symbol: "TSLA",
      condition: "RSI Above",
      triggerLevel: 70,
      status: "triggered",
      lastTriggered: new Date(Date.now() - 3600000),
      notifications: {
        inApp: true,
        webPush: false,
        email: true,
        webhook: "https://webhook.example.com",
      },
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAlert, setNewAlert] = useState({
    name: "",
    symbol: "",
    condition: "",
    triggerLevel: 0,
    notifications: {
      inApp: true,
      webPush: false,
      email: false,
      webhook: "",
    },
  })

  const conditions = [
    "Price Above",
    "Price Below",
    "RSI Above",
    "RSI Below",
    "MACD Cross Up",
    "MACD Cross Down",
    "Volume Above",
    "Volume Below",
  ]

  const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META"]

  const createAlert = () => {
    const alert: Alert = {
      id: Date.now().toString(),
      name: newAlert.name,
      symbol: newAlert.symbol,
      condition: newAlert.condition,
      triggerLevel: newAlert.triggerLevel,
      status: "active",
      notifications: newAlert.notifications,
    }

    setAlerts((prev) => [...prev, alert])
    setNewAlert({
      name: "",
      symbol: "",
      condition: "",
      triggerLevel: 0,
      notifications: {
        inApp: true,
        webPush: false,
        email: false,
        webhook: "",
      },
    })
    setIsCreateDialogOpen(false)
  }

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const toggleAlertStatus = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: alert.status === "active" ? "disabled" : "active" } : alert,
      ),
    )
  }

  const getStatusIcon = (status: Alert["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "triggered":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "disabled":
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: Alert["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "triggered":
        return <Badge variant="secondary">Triggered</Badge>
      case "disabled":
        return <Badge variant="outline">Disabled</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Price Alerts
            </CardTitle>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Alert
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Alert</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="alert-name">Alert Name</Label>
                    <Input
                      id="alert-name"
                      placeholder="Enter alert name"
                      value={newAlert.name}
                      onChange={(e) => setNewAlert((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Symbol</Label>
                      <Select
                        value={newAlert.symbol}
                        onValueChange={(value) => setNewAlert((prev) => ({ ...prev, symbol: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select symbol" />
                        </SelectTrigger>
                        <SelectContent>
                          {symbols.map((symbol) => (
                            <SelectItem key={symbol} value={symbol}>
                              {symbol}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Condition</Label>
                      <Select
                        value={newAlert.condition}
                        onValueChange={(value) => setNewAlert((prev) => ({ ...prev, condition: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trigger-level">Trigger Level</Label>
                    <Input
                      id="trigger-level"
                      type="number"
                      placeholder="Enter trigger level"
                      value={newAlert.triggerLevel || ""}
                      onChange={(e) =>
                        setNewAlert((prev) => ({ ...prev, triggerLevel: Number.parseFloat(e.target.value) || 0 }))
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Notification Options</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="in-app">In-App Push</Label>
                        <Switch
                          id="in-app"
                          checked={newAlert.notifications.inApp}
                          onCheckedChange={(checked) =>
                            setNewAlert((prev) => ({
                              ...prev,
                              notifications: { ...prev.notifications, inApp: checked },
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="web-push">Web Push</Label>
                        <Switch
                          id="web-push"
                          checked={newAlert.notifications.webPush}
                          onCheckedChange={(checked) =>
                            setNewAlert((prev) => ({
                              ...prev,
                              notifications: { ...prev.notifications, webPush: checked },
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email">Email</Label>
                        <Switch
                          id="email"
                          checked={newAlert.notifications.email}
                          onCheckedChange={(checked) =>
                            setNewAlert((prev) => ({
                              ...prev,
                              notifications: { ...prev.notifications, email: checked },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webhook">Webhook URL (Optional)</Label>
                        <Input
                          id="webhook"
                          placeholder="https://your-webhook-url.com"
                          value={newAlert.notifications.webhook}
                          onChange={(e) =>
                            setNewAlert((prev) => ({
                              ...prev,
                              notifications: { ...prev.notifications, webhook: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createAlert} disabled={!newAlert.name || !newAlert.symbol || !newAlert.condition}>
                      Create Alert
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{alert.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {alert.symbol} - {alert.condition} {alert.triggerLevel}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(alert.status)}
                        <span className="text-sm">{alert.condition}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {alert.lastTriggered ? alert.lastTriggered.toLocaleString() : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => toggleAlertStatus(alert.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteAlert(alert.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
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
