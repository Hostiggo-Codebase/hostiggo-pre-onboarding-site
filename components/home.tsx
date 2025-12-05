"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ReferralGenerator } from "./referral-generator"

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <Image src="/hostiggo-logo.jpeg" alt="Hostiggo Logo" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Hostiggo
            </h1>
          </Link>
          <div className="text-sm text-muted-foreground">Supply Partner Platform</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Hostiggo
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Join a thriving community of property owners and service providers. Register your homestay, villa, guest
            house, or services and reach travelers looking for authentic experiences.
          </p>
        </div>

        <div className="mt-12 bg-card border border-border rounded-lg p-8 max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">About Hostiggo</h3>
          <p className="text-muted-foreground leading-relaxed">
            Hostiggo is a digital platform that connects travellers with verified homestays and service providers across
            India. We enable guests to discover affordable, safe, and local stay experiences, while helping hosts earn
            more by listing their properties online. Through our trusted ecosystem, Hostiggo supports both travellers
            and rural communities by promoting tourism, providing quality services, and creating livelihood
            opportunities.
          </p>
        </div>

        <div className="mt-12 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Earn While You Refer</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your referral link and get 0% Hostiggo commission on the first 10 bookings of each referred properties and services
              once you bring 10 properties on board!
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ReferralGenerator />
          </div>
        </div>

        {/* Registration Options */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
          {/* Hosts Card */}
          <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <CardTitle className="text-2xl">Register Your Property</CardTitle>
              <CardDescription>List your homestay, villa, or guest house</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Reach verified travelers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Showcase your property
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Set your own prices
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Easy onboarding
                </li>
              </ul>
              <Link href="/register/host" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90">Register Property</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Service Providers Card */}
          <Card className="border-2 hover:border-secondary/50 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <CardTitle className="text-2xl">Register Your Services</CardTitle>
              <CardDescription>Offer your expertise - taxi, chef, cleaning, events & more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Build your client base
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Showcase your portfolio
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Set your rates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Get more bookings
                </li>
              </ul>
              <Link href="/register/service-provider" className="block">
                <Button className="w-full bg-secondary hover:bg-secondary/90">Register Services</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Trust Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">Free Registration</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-muted-foreground">Support Available</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">Verified</div>
            <p className="text-sm text-muted-foreground">Quality Assurance</p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <Link href="/terms" className="text-sm text-primary hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>Hostiggo - Connecting Hosts & Service Providers with Travelers</p>
          <p className="mt-2">© 2025 Hostiggo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
