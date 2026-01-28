"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { ReferralAnalytics } from "./referral-analytics"

interface Host {
  id: string
  full_name: string
  phone: string
  whatsapp: string
  email: string
  property_name: string
  city: string
  state: string
  status: string
  created_at: string
  number_of_rooms: number
  base_price: number
  description: string
  amenities: string[]
  full_address: string
  max_guests: number
  photo_urls?: string[]
  referral_code?: string // add referral_code field
}

interface ServiceProvider {
  id: string
  full_name: string
  phone: string
  whatsapp: string
  email: string
  service_category: string
  city: string
  state: string
  status: string
  created_at: string
  experience_years: number
  rate: number
  description: string
  working_area: string
  rate_type: string
  photo_url?: string
  referral_code?: string // add referral_code field
}

export function AdminDashboard() {
  const [hosts, setHosts] = useState<Host[]>([])
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [activeTab, setActiveTab] = useState<"hosts" | "providers" | "referrals">("hosts")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState<string>("all")
  const [referralCodeFilter, setReferralCodeFilter] = useState<string>("") // add referral code filter
  const [isLoading, setIsLoading] = useState(true)
  const [referrals, setReferrals] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<Host | ServiceProvider | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Fetch once on mount. Removed polling so dashboard only refreshes
    // when the user clicks the Refresh button or after actions.
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setIsLoading(true)
      const [statsRes, referralsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/referral/stats"),
      ])

      const statsData = await statsRes.json()
      const referralsData = await referralsRes.json()

      setHosts(statsData.hosts || [])
      setProviders(statsData.providers || [])
      setReferrals(referralsData.referrals || [])
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, type: "host" | "provider", status: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, status }),
      })

      if (response.ok) {
        // Update local state for the changed item instead of refetching
        if (type === "host") {
          setHosts((prev) => prev.map((h) => (h.id === id ? { ...h, status } : h)))
        } else {
          setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
        }

        // If the detail dialog is open for this item, update it as well
        setSelectedItem((prev) => {
          if (!prev) return prev
          return (prev as any).id === id ? { ...(prev as any), status } : prev
        })
        // Refresh overall stats and referrals from serpnpmver so referral counts stay in sync
        try {
          await fetchData()
        } catch (err) {
          console.error("[v0] Error refreshing data after status update:", err)
        }
      }
    } catch (error) {
      console.error("[v0] Error updating status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const downloadExcel = (type: "hosts" | "providers") => {
    const data = type === "hosts" ? hosts : providers
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csv = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((header) => {
          const value = (row as any)[header]
          if (typeof value === "object") return `"${JSON.stringify(value)}"`
          return `"${value}"`
        }),
      ),
    ]
      .map((row) => (typeof row === "string" ? row : row.join(",")))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${type}-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const getUniqueStates = (data: any[]) => {
    return [...new Set(data.map((item) => item.state))].sort()
  }

  const filteredHosts = hosts.filter((host) => {
    if (statusFilter !== "all" && host.status !== statusFilter) return false
    if (
      searchTerm &&
      !host.property_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !host.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    if (stateFilter !== "all" && host.state !== stateFilter) return false
    if (referralCodeFilter && host.referral_code !== referralCodeFilter) return false
    return true
  })

  const filteredProviders = providers.filter((provider) => {
    if (statusFilter !== "all" && provider.status !== statusFilter) return false
    if (searchTerm && !provider.full_name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (stateFilter !== "all" && provider.state !== stateFilter) return false
    if (referralCodeFilter && provider.referral_code !== referralCodeFilter) return false
    return true
  })

  const stats = {
    totalHosts: hosts.length,
    approvedHosts: hosts.filter((h) => h.status === "approved").length,
    pendingHosts: hosts.filter((h) => h.status === "pending").length,
    rejectedHosts: hosts.filter((h) => h.status === "rejected").length,
    totalProviders: providers.length,
    approvedProviders: providers.filter((p) => p.status === "approved").length,
    pendingProviders: providers.filter((p) => p.status === "pending").length,
    rejectedProviders: providers.filter((p) => p.status === "rejected").length,
  }

  const allStates = [...new Set([...getUniqueStates(hosts), ...getUniqueStates(providers)])].sort()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Loading dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-cyan-600">Hostiggo Admin</h1>
              <p className="text-xs text-muted-foreground">Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={fetchData}>
              Refresh
            </Button>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-cyan-200">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-cyan-600">{stats.totalHosts}</div>
              <p className="text-xs text-muted-foreground mt-1">Total Hosts</p>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{stats.approvedHosts}</div>
              <p className="text-xs text-muted-foreground mt-1">Approved Hosts</p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingHosts}</div>
              <p className="text-xs text-muted-foreground mt-1">Pending Hosts</p>
            </CardContent>
          </Card>
          <Card className="border-cyan-200">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-cyan-600">{stats.totalProviders}</div>
              <p className="text-xs text-muted-foreground mt-1">Service Providers</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
              <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="hosts">
                Hosts <Badge className="ml-2">{filteredHosts.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="providers">
                Providers <Badge className="ml-2">{filteredProviders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="referrals">
                Referrals <Badge className="ml-2">{referrals.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-6 flex-wrap">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {allStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Filter by referral code..."
                value={referralCodeFilter}
                onChange={(e) => setReferralCodeFilter(e.target.value)}
                className="w-40"
              />
              <Button
                onClick={() => activeTab !== "referrals" && downloadExcel(activeTab as "hosts" | "providers")}
                variant="outline"
                disabled={activeTab === "referrals"}
              >
                Download CSV
              </Button>
            </div>

            <TabsContent value="hosts" className="space-y-4">
              {filteredHosts.length === 0 ? (
                <Card className="text-center py-12">
                  <p className="text-muted-foreground">No registrations found</p>
                </Card>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted border-b">
                      <tr>
                        <th className="p-3 text-left font-medium">Property</th>
                        <th className="p-3 text-left font-medium">Owner</th>
                        <th className="p-3 text-left font-medium">Location</th>
                        <th className="p-3 text-left font-medium">Price</th>
                        <th className="p-3 text-left font-medium">Referral Code</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHosts.map((host) => (
                        <tr key={host.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="p-3 font-medium">{host.property_name}</td>
                          <td className="p-3">{host.full_name}</td>
                          <td className="p-3 text-xs text-muted-foreground">
                            {host.city}, {host.state}
                          </td>
                          <td className="p-3">₹{host.base_price}</td>
                          <td className="p-3">
                            {host.referral_code ? (
                              <Badge variant="outline" className="font-mono text-xs">
                                {host.referral_code}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="p-3 flex items-center gap-2">
                            {getStatusIcon(host.status)}
                            <Badge
                              variant={
                                host.status === "approved"
                                  ? "default"
                                  : host.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {host.status}
                            </Badge>
                          </td>
                          <td className="p-3 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedItem(host)
                                setIsDetailOpen(true)
                              }}
                            >
                              View
                            </Button>
                            <Select
                              value={host.status}
                              disabled={isUpdating}
                              onValueChange={(status) => updateStatus(host.id, "host", status)}
                            >
                              <SelectTrigger className="h-8 w-24 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approve</SelectItem>
                                <SelectItem value="rejected">Reject</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="providers" className="space-y-4">
              {filteredProviders.length === 0 ? (
                <Card className="text-center py-12">
                  <p className="text-muted-foreground">No registrations found</p>
                </Card>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted border-b">
                      <tr>
                        <th className="p-3 text-left font-medium">Name</th>
                        <th className="p-3 text-left font-medium">Service</th>
                        <th className="p-3 text-left font-medium">Location</th>
                        <th className="p-3 text-left font-medium">Rate</th>
                        <th className="p-3 text-left font-medium">Referral Code</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProviders.map((provider) => (
                        <tr key={provider.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="p-3 font-medium">{provider.full_name}</td>
                          <td className="p-3">{provider.service_category}</td>
                          <td className="p-3 text-xs text-muted-foreground">
                            {provider.city}, {provider.state}
                          </td>
                          <td className="p-3">₹{provider.rate}</td>
                          <td className="p-3">
                            {provider.referral_code ? (
                              <Badge variant="outline" className="font-mono text-xs">
                                {provider.referral_code}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="p-3 flex items-center gap-2">
                            {getStatusIcon(provider.status)}
                            <Badge
                              variant={
                                provider.status === "approved"
                                  ? "default"
                                  : provider.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {provider.status}
                            </Badge>
                          </td>
                          <td className="p-3 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedItem(provider)
                                setIsDetailOpen(true)
                              }}
                            >
                              View
                            </Button>
                            <Select
                              value={provider.status}
                              disabled={isUpdating}
                              onValueChange={(status) => updateStatus(provider.id, "provider", status)}
                            >
                              <SelectTrigger className="h-8 w-24 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approve</SelectItem>
                                <SelectItem value="rejected">Reject</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
            <TabsContent value="referrals">
              <ReferralAnalytics initialData={referrals} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "hosts"
                ? (selectedItem as Host)?.property_name
                : (selectedItem as ServiceProvider)?.full_name}
            </DialogTitle>
          </DialogHeader>

          {activeTab === "hosts" && selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Owner Name</p>
                  <p className="font-medium">{(selectedItem as Host).full_name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="font-medium">{(selectedItem as Host).phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{(selectedItem as Host).whatsapp}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{(selectedItem as Host).email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Rooms</p>
                  <p className="font-medium">{(selectedItem as Host).number_of_rooms}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Max Guests</p>
                  <p className="font-medium">{(selectedItem as Host).max_guests}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Base Price</p>
                  <p className="font-medium">₹{(selectedItem as Host).base_price}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      (selectedItem as Host).status === "approved"
                        ? "default"
                        : (selectedItem as Host).status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {(selectedItem as Host).status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Referral Code</p>
                  <p className="font-medium">{(selectedItem as Host).referral_code || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Full Address</p>
                <p className="text-sm">{(selectedItem as Host).full_address}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Description</p>
                <p className="text-sm">{(selectedItem as Host).description}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {(selectedItem as Host).amenities?.map((amenity) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              {(selectedItem as Host).photo_urls && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Photos</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedItem as Host).photo_urls?.map((photoUrl, index) => (
                      <img
                        key={index}
                        src={photoUrl || "/placeholder.svg"}
                        alt={`Photo ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "providers" && selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="font-medium">{(selectedItem as ServiceProvider).phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{(selectedItem as ServiceProvider).whatsapp}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{(selectedItem as ServiceProvider).email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Service</p>
                  <p className="font-medium">{(selectedItem as ServiceProvider).service_category}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Experience</p>
                  <p className="font-medium">{(selectedItem as ServiceProvider).experience_years || "-"} years</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Rate</p>
                  <p className="font-medium">
                    ₹{(selectedItem as ServiceProvider).rate}/{(selectedItem as ServiceProvider).rate_type}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      (selectedItem as ServiceProvider).status === "approved"
                        ? "default"
                        : (selectedItem as ServiceProvider).status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {(selectedItem as ServiceProvider).status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Referral Code</p>
                  <p className="font-medium">{(selectedItem as ServiceProvider).referral_code || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Working Area</p>
                <p className="text-sm">{(selectedItem as ServiceProvider).working_area}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Description</p>
                <p className="text-sm">{(selectedItem as ServiceProvider).description}</p>
              </div>
              {(selectedItem as ServiceProvider).photo_url && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Photo</p>
                  <img
                    src={(selectedItem as ServiceProvider).photo_url || "/placeholder.svg"}
                    alt="Provider Photo"
                    className="w-40 h-40 object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
