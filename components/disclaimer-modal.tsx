"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Building2 } from 'lucide-react'

interface DisclaimerModalProps {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
}

export function DisclaimerModal({ isOpen, onAccept, onDecline }: DisclaimerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px] border-gray-200 dark:border-gray-800">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00321E] text-white">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl text-gray-900 dark:text-white">Carlsberg Group Dashboard</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Internal Financial Data Access Agreement
              </DialogDescription>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="border-red-200 text-red-700 dark:border-red-800 dark:text-red-400">
              <Shield className="h-3 w-3 mr-1" />
              Confidential
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-400"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Internal Use Only
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">Data Confidentiality Notice</h3>
            <p className="text-sm text-red-700 dark:text-red-400">
              This data is for internal analysis only and not intended for public dissemination. Any unauthorized
              sharing, copying, or distribution is strictly prohibited.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
              <p>
                All market data and financial information accessed through this platform is proprietary to Carlsberg Group
                and subject to confidentiality agreements.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
              <p>User activities are monitored and logged for compliance and security purposes.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
              <p>
                This system is intended for use by authorized Carlsberg employees only. Unauthorized access is prohibited
                and may result in disciplinary action.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
              <p>
                By proceeding, you acknowledge that you understand and agree to comply with Carlsberg's information security
                policies and data handling procedures.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Compliance Requirements</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              This platform is subject to NASDAQ regulations and internal compliance policies. All trading decisions must
              comply with Carlsberg's insider trading policy and blackout periods.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onDecline}
            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg shadow-none bg-transparent"
          >
            Decline & Exit
          </Button>
          <Button onClick={onAccept} className="rounded-lg shadow-none">
            I Accept & Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
