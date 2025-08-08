"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Share2, Download, Facebook, Twitter, Linkedin, Link, ImageIcon, Code } from "lucide-react"
import { toast } from "sonner"

export function SocialSharingModule() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareType, setShareType] = useState<"image" | "live">("image")
  const [shareText, setShareText] = useState("Check out this amazing chart analysis on SG3!")
  const [includeWatermark, setIncludeWatermark] = useState(true)

  const handleCopyLink = () => {
    const link = "https://sg3.trading/chart/AAPL/5m/analysis"
    navigator.clipboard.writeText(link)
    toast.success("Link copied to clipboard!")
  }

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="https://sg3.trading/embed/chart/AAPL" width="800" height="600" frameborder="0"></iframe>`
    navigator.clipboard.writeText(embedCode)
    toast.success("Embed code copied to clipboard!")
  }

  const handleSocialShare = (platform: string) => {
    const url = "https://sg3.trading/chart/AAPL/5m/analysis"
    const text = encodeURIComponent(shareText)

    let shareUrl = ""
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
      toast.success(`Shared to ${platform}!`)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Social Sharing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Current Chart Preview */}
            <div className="border rounded-lg p-4 bg-muted/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Current Chart: AAPL</h3>
                  <p className="text-sm text-muted-foreground">5-minute candlestick with RSI indicator</p>
                </div>
                <Badge variant="outline">Live Chart</Badge>
              </div>

              {/* Mock chart preview */}
              <div className="h-48 bg-background border rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Chart Preview</p>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Share</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleCopyLink}>
                    <Link className="h-4 w-4 mr-2" />
                    Copy Chart Link
                  </Button>

                  <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleCopyEmbed}>
                    <Code className="h-4 w-4 mr-2" />
                    Copy Embed Code
                  </Button>

                  <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Advanced Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Share Chart</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label>Share Type</Label>
                          <div className="flex gap-2">
                            <Button
                              variant={shareType === "image" ? "default" : "outline"}
                              size="sm"
                              onClick={() => setShareType("image")}
                            >
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Image Snapshot
                            </Button>
                            <Button
                              variant={shareType === "live" ? "default" : "outline"}
                              size="sm"
                              onClick={() => setShareType("live")}
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Live Chart
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="share-text">Share Message</Label>
                          <Textarea
                            id="share-text"
                            placeholder="Add your message..."
                            value={shareText}
                            onChange={(e) => setShareText(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="watermark">Include SG3 Watermark</Label>
                          <Switch id="watermark" checked={includeWatermark} onCheckedChange={setIncludeWatermark} />
                        </div>

                        <div className="space-y-3">
                          <Label>Share to Platform</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <Button
                              variant="outline"
                              className="flex flex-col gap-2 h-16 bg-transparent"
                              onClick={() => handleSocialShare("twitter")}
                            >
                              <Twitter className="h-5 w-5" />
                              <span className="text-xs">Twitter</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex flex-col gap-2 h-16 bg-transparent"
                              onClick={() => handleSocialShare("linkedin")}
                            >
                              <Linkedin className="h-5 w-5" />
                              <span className="text-xs">LinkedIn</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex flex-col gap-2 h-16 bg-transparent"
                              onClick={() => handleSocialShare("facebook")}
                            >
                              <Facebook className="h-5 w-5" />
                              <span className="text-xs">Facebook</span>
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              toast.success("Chart shared successfully!")
                              setIsShareDialogOpen(false)
                            }}
                          >
                            Share Now
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download as PNG
                  </Button>

                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download as PDF
                  </Button>

                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data (CSV)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Shares */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Shares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">AAPL Analysis</p>
                        <p className="text-sm text-muted-foreground">Shared to Twitter • 2 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="outline">12 views</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                        <Share2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">TSLA Live Chart</p>
                        <p className="text-sm text-muted-foreground">Shared to LinkedIn • 1 day ago</p>
                      </div>
                    </div>
                    <Badge variant="outline">45 views</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                        <Code className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Market Screener Results</p>
                        <p className="text-sm text-muted-foreground">Embedded on blog • 3 days ago</p>
                      </div>
                    </div>
                    <Badge variant="outline">128 views</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
