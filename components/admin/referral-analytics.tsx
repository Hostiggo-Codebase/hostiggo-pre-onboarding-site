"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface ReferralStat {
  id: string
  referral_code: string
  referrer_name: string
  referrer_phone: string
  referrer_email: string
  total_approvals: number
  reward_eligible: boolean
  created_at: string
}

export function ReferralAnalytics({ initialData }: { initialData?: ReferralStat[] }) {
  const [referrals, setReferrals] = useState<ReferralStat[]>(initialData || [])
  const [isLoading, setIsLoading] = useState<boolean>(!initialData)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    // If initialData is provided, we skip fetching/polling to avoid remount reloads
    if (initialData) return

    let mounted = true
    const fetchReferrals = async () => {
      try {
        const response = await fetch("/api/referral/stats")
        const data = await response.json()
        if (!mounted) return
        setReferrals(data.referrals || [])
      } catch (error) {
        console.error("[v0] Error fetching referral stats:", error)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    fetchReferrals()
    const interval = setInterval(fetchReferrals, 10000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [initialData])

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading referral data...</p>
      </div>
    )
  }

  if (referrals.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-muted-foreground">No referral codes generated yet</p>
      </Card>
    )
  }

  const totalReferrers = referrals.length
  const totalPropertiesReferred = referrals.reduce((sum, ref) => sum + ref.total_approvals, 0)
  const rewardEligibleCount = referrals.filter((ref) => ref.reward_eligible).length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">{totalReferrers}</div>
            <p className="text-sm text-muted-foreground mt-1">Active Referrers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-accent">{totalPropertiesReferred}</div>
            <p className="text-sm text-muted-foreground mt-1">Properties Referred (Approved)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{rewardEligibleCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Reward Eligible (10+)</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Performance</CardTitle>
          <CardDescription>Track all active referral codes and their performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium">Referrer Name</th>
                  <th className="text-left py-3 px-2 font-medium">Referral Code</th>
                  <th className="text-left py-3 px-2 font-medium">Phone</th>
                  <th className="text-center py-3 px-2 font-medium">Properties Referred</th>
                  <th className="text-center py-3 px-2 font-medium">Reward Status</th>
                  <th className="text-center py-3 px-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((ref) => (
                  <tr key={ref.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-2">{ref.referrer_name}</td>
                    <td className="py-3 px-2 font-mono text-primary font-semibold">{ref.referral_code}</td>
                    <td className="py-3 px-2">{ref.referrer_phone}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant={ref.total_approvals >= 5 ? "default" : "secondary"}>{ref.total_approvals}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {ref.reward_eligible ? (
                        <Badge className="bg-green-600 hover:bg-green-700">Eligible (10+ properties)</Badge>
                      ) : (
                        <Badge variant="outline">{10 - ref.total_approvals} more needed</Badge>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button size="sm" variant="ghost" onClick={() => copyCode(ref.referral_code)}>
                        {copiedCode === ref.referral_code ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reward Eligible Details */}
      {rewardEligibleCount > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Reward Eligible Referrers</CardTitle>
            <CardDescription className="text-green-800">
              These referrers have reached the 10-property milestone and qualify for 0% commission on first 10 bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {referrals
                .filter((ref) => ref.reward_eligible)
                .map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">{ref.referrer_name}</p>
                      <p className="text-sm text-green-700">{ref.total_approvals} properties referred</p>
                    </div>
                    <Badge className="bg-green-600">Commission: 0%</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
