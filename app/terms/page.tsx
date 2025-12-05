import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export const metadata = {
  title: "Terms & Conditions - Hostiggo",
  description: "Read Hostiggo's Terms & Conditions for hosts and service providers.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image src="/hostiggo-logo.png" alt="Hostiggo Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-primary">Hostiggo</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Back Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last Updated: December 1, 2025</p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
              <p className="text-foreground leading-relaxed">
                By using Hostiggo, all users agree to these terms and conditions. Hostiggo is a technology platform that
                facilitates connections between property owners (hosts), service providers, and travelers. Hostiggo does
                not own, manage, or operate any properties or services listed on the platform.
              </p>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Eligibility & Registration</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold">Age Requirement:</span> Only individuals who are 18 years or older
                  with valid government-issued identification can register or use services on Hostiggo.
                </p>
                <p>
                  <span className="font-semibold">Account Authenticity:</span> Users must provide accurate, complete,
                  and truthful information during registration. Any false or misleading information may result in
                  account suspension or permanent ban.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hosts Responsibilities */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Hosts' Responsibilities</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold text-secondary">Accurate Information:</span> Hosts must provide
                  accurate property details, including correct pricing, amenities, number of rooms, and guest capacity.
                </p>
                <p>
                  <span className="font-semibold text-secondary">Safety & Hygiene:</span> Properties must maintain high
                  standards of cleanliness, safety, and hygiene. Hosts are responsible for ensuring their properties
                  comply with local building codes and safety regulations.
                </p>
                <p>
                  <span className="font-semibold text-secondary">Legal Compliance:</span> Hosts must follow all state
                  tourism regulations, local government requirements, and police verification rules. Hosts are solely
                  responsible for obtaining necessary licenses, permits, and approvals.
                </p>
                <p>
                  <span className="font-semibold text-secondary">Booking Fulfillment:</span> Hosts must honor all
                  confirmed bookings unless a cancellation is made according to the platform's cancellation policy.
                </p>
                <p>
                  <span className="font-semibold text-secondary">Photography & Content:</span> All photos and content
                  uploaded must be original, accurate representations of the property. Hosts grant Hostiggo permission
                  to use these images for promotional purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Providers Responsibilities */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Service Providers' Responsibilities</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold text-secondary">Accurate Credentials:</span> Service providers must
                  accurately represent their experience, qualifications, and service offerings.
                </p>
                <p>
                  <span className="font-semibold text-secondary">Quality Service:</span> Service providers must deliver
                  services of high quality and in a professional manner. They are responsible for their own work
                  standards and customer satisfaction.
                </p>
                <p>
                  <span className="font-semibold text-secondary">Legal Compliance:</span> Service providers must comply
                  with all applicable laws, regulations, and licensing requirements in their respective regions.
                </p>
                <p>
                  <span className="font-semibold text-secondary">Portfolio Authenticity:</span> All portfolio items,
                  photos, and testimonials must be genuine and accurately represent the provider's work.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Guests Requirements */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Guest Requirements</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold text-accent">Identity Verification:</span> Guests must provide correct
                  identity details during booking.
                </p>
                <p>
                  <span className="font-semibold text-accent">Property Rules:</span> Guests must follow all property
                  rules set by hosts and comply with local laws and regulations.
                </p>
                <p>
                  <span className="font-semibold text-accent">Conduct:</span> Guests must not engage in any illegal
                  activities, harassment, abuse, or behavior that violates the rights of hosts or other guests.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payments & Refunds */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Payments & Refunds</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold">Payment Gateway:</span> All payments must be processed through
                  Hostiggo's approved payment gateway. Direct payments outside the platform are not permitted.
                </p>
                <p>
                  <span className="font-semibold">Service Fees:</span> Hostiggo charges hosts a commission/service fee
                  on each confirmed booking. This fee is non-refundable.
                </p>
                <p>
                  <span className="font-semibold">Refund Policy:</span> Refunds depend on the host's cancellation policy
                  and platform cancellation guidelines. Hostiggo is not responsible for resolving payment disputes
                  between hosts and guests.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liability & Disclaimers */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Hostiggo's Liability & Disclaimers</h2>
              <p className="text-foreground leading-relaxed mb-4">Hostiggo is not liable for:</p>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside">
                <li>Personal injury, theft, loss, or damage occurring at any property</li>
                <li>Disputes between hosts and guests</li>
                <li>Service provider performance or quality of services</li>
                <li>Natural disasters, emergencies, or force majeure events</li>
                <li>Direct, indirect, or consequential damages arising from use of the platform</li>
                <li>Third-party actions or website interruptions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Prohibited Activities</h2>
              <p className="text-foreground leading-relaxed mb-4">Users are strictly prohibited from:</p>
              <ul className="space-y-2 text-foreground leading-relaxed list-disc list-inside">
                <li>Creating fake accounts or using false information</li>
                <li>Engaging in fraudulent transactions or payment manipulation</li>
                <li>Posting false or misleading property/service information</li>
                <li>Harassment, abuse, or discrimination against other users</li>
                <li>Engaging in illegal activities</li>
                <li>Attempting to bypass or manipulate platform systems</li>
                <li>Copying, scraping, or misusing platform content</li>
                <li>Violating intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Enforcement & Penalties */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Enforcement & Penalties</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>Violation of these terms may result in:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Account suspension</li>
                  <li>Permanent account ban</li>
                  <li>Forfeiture of funds</li>
                  <li>Legal action and civil/criminal proceedings</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Data Protection & Privacy</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>Hostiggo protects all personal data in compliance with:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Data Protection and Privacy Act (DPDP Act) 2023</li>
                  <li>Information Technology Act (IT Act) 2000</li>
                  <li>All applicable Indian privacy and data protection laws</li>
                </ul>
                <p className="mt-4">
                  Users' personal information will not be shared with third parties without consent, except as required
                  by law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Intellectual Property Rights</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold">Hostiggo Brand:</span> All Hostiggo branding, logos, names,
                  trademarks, and proprietary content are intellectual property and cannot be copied, misused, or
                  reproduced without written permission.
                </p>
                <p>
                  <span className="font-semibold">User Content:</span> By uploading content (photos, descriptions,
                  reviews), users grant Hostiggo a license to use, distribute, and display this content for platform
                  operations and marketing purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Dispute Resolution & Jurisdiction</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold">Governing Law:</span> These terms and conditions are governed by and
                  construed in accordance with the laws of the Republic of India.
                </p>
                <p>
                  <span className="font-semibold">Jurisdiction:</span> All disputes arising from these terms or use of
                  Hostiggo shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
                </p>
                <p>
                  <span className="font-semibold">Grievance Resolution:</span> Users must first contact support at{" "}
                  <span className="font-semibold">support@hostiggo.com</span> to resolve any issues or disputes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Amendments */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Amendments & Changes</h2>
              <p className="text-foreground leading-relaxed">
                Hostiggo reserves the right to modify these terms and conditions at any time. Changes will be effective
                immediately upon posting. Continued use of the platform constitutes acceptance of the updated terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Support & Contact</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>For questions, support, or grievances, please contact:</p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold text-primary">Hostiggo Support</p>
                  <p>
                    Email: <span className="font-semibold">support@hostiggo.com</span>
                  </p>
                  <p className="text-sm mt-2 text-muted-foreground">
                    We are available 24/7 to assist with your inquiries and concerns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acceptance */}
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/30">
          <h3 className="text-xl font-bold text-primary mb-2">Do You Accept These Terms?</h3>
          <p className="text-foreground mb-4">
            By registering on Hostiggo, you acknowledge that you have read, understood, and agree to all terms and
            conditions listed above.
          </p>
          <div className="flex gap-4">
            <Link href="/register/host">
              <Button className="bg-primary hover:bg-primary/90">Register as Host</Button>
            </Link>
            <Link href="/register/service-provider">
              <Button className="bg-secondary hover:bg-secondary/90">Register as Service Provider</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>Hostiggo - Connecting Hosts & Service Providers with Travelers</p>
          <p className="mt-2">© 2025 Hostiggo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
