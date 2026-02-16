import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import CopyrightBar from "@/components/ui/Copyrightbar";

export const metadata = {
  title: "Terms & Policies - Hostiggo",
  description:
    "Read Hostiggo's Terms & Conditions, Cancellation & Refund Policy, and Privacy Policy.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <Header />

        <section className="pt-[140px] pb-20 px-6 lg:px-20 font-poppins">
          <div className="max-w-[1200px] mx-auto">
            <div className="space-y-3">
              <h1 className="text-[44px] sm:text-[56px] font-semibold text-[#004772]">
                Terms & Policies
              </h1>
              <p className="text-[#494949] text-[18px]"></p>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-[18px] font-semibold">
              <Link
                href="#terms"
                className="text-[#004772] hover:opacity-70 transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                href="#cancellation-policy"
                className="text-[#004772] hover:opacity-70 transition-all"
              >
                Cancellation & Refund Policy
              </Link>
              <Link
                href="#host-protection-policy"
                className="text-[#004772] hover:opacity-70 transition-all"
              >
                Host Protection & Damage Insurance Policy
              </Link>
              <Link
                href="#privacy-policy"
                className="text-[#004772] hover:opacity-70 transition-all"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="mt-12 space-y-16 text-[#1E1E1E]">
              <section id="terms" className="scroll-mt-[140px] space-y-6">
                <h2 className="text-[32px] font-semibold text-[#004772]">
                  Terms & Conditions
                </h2>
                <div className="space-y-6 text-[18px] leading-[1.9] text-[#3A3A3A]">
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      1. Introduction
                    </h3>
                    <p>
                      By accessing or using the Hostiggo platform, users
                      acknowledge that they have read, understood, and agreed to
                      be bound by these Terms and Conditions. Hostiggo operates
                      solely as a technology-enabled marketplace that
                      facilitates connections between property owners (“Hosts”),
                      service providers, and travelers (“Guests”). Hostiggo does
                      not own, lease, manage, control, or operate any property
                      or service listed on the platform, nor does it act as a
                      real estate broker, travel agent, or service provider.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      2. Eligibility & Registration
                    </h3>
                    <p>
                      Only individuals who are eighteen (18) years of age or
                      older and possess valid government-issued identification
                      are permitted to register and use Hostiggo. Users agree to
                      provide accurate, complete, and truthful information
                      during registration and throughout their use of the
                      platform. Hostiggo reserves the right to suspend or
                      permanently terminate accounts that contain false,
                      misleading, or incomplete information, without prior
                      notice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      3. Hosts’ Responsibilities
                    </h3>
                    <p>
                      Hosts are solely responsible for ensuring that all
                      property listings are accurate, complete, and up to date,
                      including pricing, amenities, number of rooms, guest
                      capacity, availability, and location details. Hosts are
                      responsible for maintaining appropriate standards of
                      cleanliness, hygiene, and safety, and for ensuring that
                      their properties comply with all applicable local laws,
                      building regulations, fire safety standards, and health
                      requirements. Hosts must obtain and maintain all necessary
                      licenses, permits, registrations, and approvals required
                      under state tourism laws, municipal regulations, and
                      police verification rules. Hosts agree to honor all
                      confirmed bookings unless canceled in accordance with the
                      applicable cancellation policy selected on the platform.
                      Any photographs, videos, or descriptive content uploaded
                      by hosts must accurately represent the property, and by
                      uploading such content, hosts grant Hostiggo the right to
                      use it for platform operations, marketing, and promotional
                      purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      4. Guest Requirements
                    </h3>
                    <p>
                      Guests are required to provide accurate identity and
                      contact information during booking and verification
                      processes. Guests must comply with all house rules
                      established by hosts, as well as all applicable local,
                      state, and national laws. Guests must not engage in
                      illegal activities, cause property damage, harass or abuse
                      hosts, service providers, or other guests, or engage in
                      conduct that violates the rights or safety of others.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      5. Payments & Refunds
                    </h3>
                    <p>
                      All payments for bookings and services must be processed
                      exclusively through Hostiggo’s authorized payment gateway.
                      Direct or offline payments outside the platform are
                      strictly prohibited. Hostiggo charges a service or
                      commission fee on confirmed bookings, which is
                      non-refundable. Refunds, where applicable, are governed by
                      the host’s selected cancellation policy and Hostiggo’s
                      platform guidelines. Hostiggo does not mediate or assume
                      responsibility for payment disputes between hosts and
                      guests.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      6. Liability & Disclaimers
                    </h3>
                    <p>
                      Hostiggo shall not be liable for any personal injury,
                      theft, loss, damage, or harm occurring at any listed
                      property or during the provision of services. Hostiggo
                      disclaims all liability arising from disputes between
                      users, service quality issues, third-party actions,
                      platform interruptions, or force majeure events, including
                      natural disasters and emergencies. To the fullest extent
                      permitted by law, Hostiggo shall not be responsible for
                      any direct, indirect, incidental, or consequential damages
                      arising from the use of the platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      7. Prohibited Activities
                    </h3>
                    <p>
                      Users agree not to create fake accounts, misrepresent
                      identity, engage in fraudulent transactions, manipulate
                      payments, post false or misleading listings, harass or
                      discriminate against other users, participate in illegal
                      activities, bypass platform safeguards, scrape or copy
                      platform content, or violate any intellectual property
                      rights. Any such actions may result in immediate
                      enforcement measures.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      8. Enforcement & Penalties
                    </h3>
                    <p>
                      Hostiggo reserves the right, at its sole discretion, to
                      investigate violations of these Terms and to take
                      appropriate enforcement action, including account
                      suspension, permanent termination, forfeiture of funds,
                      and initiation of civil or criminal legal proceedings
                      where applicable.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      9. Data Protection & Privacy
                    </h3>
                    <p>
                      Hostiggo collects, processes, and protects personal data
                      in accordance with the Digital Personal Data Protection
                      Act, 2023, the Information Technology Act, 2000, and all
                      other applicable Indian data protection laws. User data
                      will not be shared with third parties without consent,
                      except where disclosure is required by law or regulatory
                      authorities.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      10. Intellectual Property Rights
                    </h3>
                    <p>
                      All trademarks, logos, brand names, software, platform
                      design, and proprietary content associated with Hostiggo
                      are the exclusive intellectual property of Hostiggo and
                      may not be copied, reproduced, modified, distributed, or
                      used without prior written permission. By submitting any
                      content to the platform, users grant Hostiggo a
                      non-exclusive, worldwide, royalty-free license to use,
                      display, distribute, modify, and reproduce such content
                      for operational, promotional, and marketing purposes, and
                      confirm that they have the legal rights to grant such
                      license.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      11. Dispute Resolution & Jurisdiction
                    </h3>
                    <p>
                      These Terms and Conditions shall be governed by and
                      construed in accordance with the laws of the Republic of
                      India. All disputes arising from or relating to the use of
                      Hostiggo shall be subject to the exclusive jurisdiction of
                      the courts located in New Delhi, India. Users agree to
                      first attempt resolution by contacting Hostiggo support
                      before pursuing legal remedies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      12. Amendments
                    </h3>
                    <p>
                      Hostiggo reserves the right to modify or update these
                      Terms and Conditions at any time. Any changes shall become
                      effective immediately upon publication on the platform.
                      Continued use of Hostiggo following such updates
                      constitutes acceptance of the revised terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      13. Support & Contact
                    </h3>
                    <p>
                      For questions, support, or grievances related to the
                      platform or these Terms and Conditions, users may contact
                      Hostiggo at support@hostiggo.com. The support team is
                      available twenty-four (24) hours a day to assist with
                      inquiries and concerns.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="cancellation-policy"
                className="scroll-mt-[140px] space-y-6"
              >
                <h2 className="text-[32px] font-semibold text-[#004772]">
                  Cancellation & Refund Policy – Hostiggo
                </h2>
                <div className="space-y-6 text-[18px] leading-[1.9] text-[#3A3A3A]">
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      1. Policy Structure & Control
                    </h3>
                    <p>
                      Hostiggo determines the types of cancellation policies
                      available on the platform, including refund timelines,
                      percentages, and applicable conditions. Hosts are required
                      to select one of the predefined cancellation policies
                      during property onboarding. Once selected, the policy
                      applies uniformly to all bookings for that listing unless
                      updated by the host in accordance with platform rules.
                      Hostiggo reserves the right to modify, restrict, or
                      override cancellation policies where required by law,
                      consumer protection guidelines, or exceptional
                      circumstances.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      2. Available Cancellation Policies
                    </h3>
                    <p>
                      <span className="font-semibold">
                        2.1 Flexible Cancellation Policy:
                      </span>{" "}
                      Guests are eligible for a full refund if the booking is
                      canceled at least forty-eight (48) hours before the
                      scheduled check-in date. Cancellations made within
                      forty-eight (48) hours of check-in are non-refundable.
                      This policy is designed for hosts who prefer higher
                      booking flexibility and guest confidence.
                    </p>
                    <p>
                      <span className="font-semibold">
                        2.2 Moderate Cancellation Policy:
                      </span>{" "}
                      Guests are eligible for a full refund if the booking is
                      canceled at least five (5) days prior to the scheduled
                      check-in date. Cancellations made within five (5) days of
                      check-in are eligible for a partial refund, excluding
                      Hostiggo’s service fees, as determined by the platform’s
                      refund calculation system.
                    </p>
                    <p>
                      <span className="font-semibold">
                        2.3 Strict Cancellation Policy:
                      </span>{" "}
                      Guests may receive a partial refund if the booking is
                      canceled at least seven (7) days prior to the scheduled
                      check-in date. Cancellations made within seven (7) days of
                      check-in are non-refundable. This policy is intended for
                      high-demand properties or peak-season bookings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      3. Platform-Managed Refund Calculation
                    </h3>
                    <p>
                      All refunds are calculated automatically by Hostiggo’s
                      system based on the selected cancellation policy, booking
                      date, and cancellation timestamp. Hosts and guests do not
                      engage in manual refund negotiations. Hostiggo’s service
                      or commission fees are non-refundable under all
                      cancellation policies unless otherwise required by law.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      4. Exceptional Circumstances (Force Majeure)
                    </h3>
                    <p>
                      Notwithstanding the selected cancellation policy, Hostiggo
                      may allow full or partial refunds in exceptional
                      circumstances, including but not limited to government
                      travel bans, natural disasters, public health emergencies,
                      legal restrictions, fraud, or safety risks. Such
                      determinations are made solely at Hostiggo’s discretion to
                      ensure user safety and regulatory compliance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      5. Host Obligations
                    </h3>
                    <p>
                      Hosts agree to honor all bookings and applicable refunds
                      strictly in accordance with the selected cancellation
                      policy and Hostiggo’s automated refund decisions. Failure
                      to comply may result in penalties, including account
                      suspension, listing removal, or financial adjustments.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      6. Guest Acknowledgement
                    </h3>
                    <p>
                      By confirming a booking, guests acknowledge that they have
                      reviewed and accepted the applicable cancellation policy
                      displayed at the time of booking. Refund eligibility is
                      determined exclusively by the policy selected by the host
                      and enforced by Hostiggo’s system.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      7. Policy Updates
                    </h3>
                    <p>
                      Hostiggo reserves the right to revise or update
                      cancellation policies at any time. Any changes will apply
                      prospectively and will be clearly communicated on the
                      platform. Continued use of the platform constitutes
                      acceptance of the updated policies.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="host-protection-policy"
                className="scroll-mt-[140px] space-y-6"
              >
                <h2 className="text-[32px] font-semibold text-[#004772]">
                  Hostiggo Host Protection & Damage Insurance Policy
                </h2>
                <div className="space-y-6 text-[18px] leading-[1.9] text-[#3A3A3A]">
                  <p>
                    This policy is designed to protect Hosts listing their
                    properties on Hostiggo against damages caused by Guests
                    during their stay. Hostiggo is committed to ensuring that
                    Hosts receive timely compensation while maintaining a fair,
                    transparent, and structured dispute resolution process for
                    all parties involved.
                  </p>
                  <p>
                    This insurance policy applies when a listed property suffers
                    physical damage caused by a confirmed Guest booking, and the
                    damage occurs during the official booking period. To qualify
                    for coverage, the Host must provide proper evidence such as
                    clear photos, videos, invoices, or inspection reports.
                    Covered damages may include furniture damage, appliance
                    damage, structural damage (including walls, doors, and
                    windows), as well as theft or intentional destruction.
                    However, normal wear and tear resulting from regular use of
                    the property is not covered under this policy.
                  </p>
                  <p>
                    In the event of damage, the Host must report the issue
                    within twenty-four (24) hours of guest checkout. The Host is
                    required to upload clear visual evidence along with an
                    estimated repair invoice or cost breakdown. Once submitted,
                    Hostiggo will review the claim within one (1) to three (3)
                    working hours to assess the validity and determine the
                    appropriate action.
                  </p>
                  <p>
                    Upon approval of a damage claim, Hostiggo will immediately
                    contact the Guest and charge the verified damage amount.
                    The amount may be deducted from the Guest’s security
                    deposit, if applicable, or from the payment method on file.
                    If the Guest accepts liability, the funds will be
                    transferred to the Host within one (1) to five (5) working
                    hours following confirmation.
                  </p>
                  <p>
                    If the Guest disputes the claim, Hostiggo will initiate an
                    internal investigation. Evidence submitted by both the Host
                    and the Guest will be carefully reviewed, and a final
                    decision will be issued within twenty-four (24) to
                    forty-eight (48) hours. If the dispute is resolved in favor
                    of the Host, Hostiggo Insurance will immediately compensate
                    the Host. In such cases, the Guest’s account may be
                    permanently blocked, removed from the platform, and
                    restricted from making future bookings.
                  </p>
                  <p>
                    Hostiggo provides an insurance guarantee to ensure Host
                    protection. If a Guest refuses payment, if the Guest’s
                    payment method fails, or if a dispute remains unresolved but
                    the evidence supports the Host’s claim, Hostiggo Insurance
                    guarantees payment of the verified damage amount. The
                    approved compensation will be transferred to the Host within
                    one (1) to five (5) working hours after final approval.
                  </p>
                  <p>
                    The standard payment timeline includes a claim review period
                    of one (1) to three (3) working hours, immediate guest
                    contact upon approval, and Host payment within one (1) to
                    five (5) working hours after claim approval. Coverage is
                    limited strictly to verified and documented damages.
                    Fraudulent or misleading claims may result in suspension of
                    the Host’s account. Additionally, maximum coverage per
                    booking may be subject to Hostiggo’s insurance cap as
                    defined in the platform’s terms.
                  </p>
                  <p>
                    Guests found responsible for property damage may face
                    permanent account suspension, legal recovery action where
                    applicable, and reporting to relevant authorities in cases
                    involving serious misconduct or intentional harm.
                  </p>
                </div>
              </section>

              <section
                id="privacy-policy"
                className="scroll-mt-[140px] space-y-6"
              >
                <h2 className="text-[32px] font-semibold text-[#004772]">
                  Privacy Policy
                </h2>
                <p className="text-[#494949] text-[18px]">
                  Last Updated: December 1, 2025
                </p>
                <div className="space-y-6 text-[18px] leading-[1.9] text-[#3A3A3A]">
                  <p>
                    Hostiggo (“we”, “our”, or “us”) is committed to protecting
                    the privacy and personal data of all users (“you”, “user”,
                    “host”, “guest”, or “service provider”) who access or use
                    the Hostiggo platform. This Privacy Policy explains how we
                    collect, use, store, process, and protect your personal data
                    in accordance with applicable Indian laws. By accessing or
                    using Hostiggo, you consent to the collection and use of
                    your information as described in this Privacy Policy.
                  </p>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      1. Scope of This Policy
                    </h3>
                    <p>
                      This Privacy Policy applies to all users of the Hostiggo
                      platform, including hosts, guests, service providers, and
                      visitors, and covers data collected through the Hostiggo
                      website, mobile applications, customer support channels,
                      and related services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      2. Information We Collect
                    </h3>
                    <p>
                      Hostiggo may collect personal data including, but not
                      limited to, your name, phone number, email address,
                      government-issued identification details, profile
                      information, property or service listing details, booking
                      information, payment-related details, communication
                      records, and usage data such as IP address, device
                      information, and platform interaction logs. We only
                      collect information that is necessary to provide, operate,
                      improve, secure, and comply with legal obligations related
                      to the platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      3. Purpose of Data Collection
                    </h3>
                    <p>
                      The personal data collected by Hostiggo is used to
                      facilitate bookings, verify identities, enable payments
                      and refunds, provide customer support, communicate
                      platform updates, prevent fraud, ensure platform safety,
                      comply with legal and regulatory requirements, improve
                      user experience, and support marketing and promotional
                      activities where consent is provided or permitted by law.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      4. Identity Verification & Compliance
                    </h3>
                    <p>
                      To ensure platform safety and regulatory compliance,
                      Hostiggo may require identity verification of hosts,
                      guests, and service providers. This may include
                      government-issued identification and other verification
                      documents. Such information is collected solely for
                      verification, fraud prevention, and legal compliance
                      purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      5. Payments & Financial Information
                    </h3>
                    <p>
                      All payments on Hostiggo are processed through authorized
                      third-party payment gateways. Hostiggo does not store full
                      card or sensitive banking information. Payment- related
                      data is processed securely in compliance with applicable
                      financial and data protection regulations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      6. Data Sharing & Disclosure
                    </h3>
                    <p>
                      Hostiggo does not sell or rent personal data to third
                      parties. Personal information may be shared only with
                      trusted third-party service providers such as payment
                      processors, verification services, technology partners, or
                      legal authorities, strictly for purposes necessary to
                      operate the platform or comply with legal obligations.
                      Information may also be disclosed where required by law,
                      court order, government authority, or to protect the
                      rights, safety, and security of Hostiggo, its users, or
                      the public.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      7. Data Storage & Security
                    </h3>
                    <p>
                      Hostiggo implements reasonable administrative, technical,
                      and organizational security measures to protect personal
                      data against unauthorized access, loss, misuse,
                      alteration, or disclosure. Data is stored securely and
                      retained only for as long as necessary to fulfill the
                      purposes outlined in this policy or as required by
                      applicable law.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      8. User Rights
                    </h3>
                    <p>
                      Users have the right to access, correct, update, or
                      request deletion of their personal data, subject to legal
                      and regulatory requirements. Users may also withdraw
                      consent for certain data processing activities where
                      applicable. Requests related to personal data may be
                      submitted to Hostiggo through the contact details provided
                      below.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      9. Cookies & Tracking Technologies
                    </h3>
                    <p>
                      Hostiggo may use cookies and similar technologies to
                      enhance user experience, analyze platform usage, improve
                      services, and maintain platform security. Users may manage
                      cookie preferences through their device or browser
                      settings, though disabling cookies may affect platform
                      functionality.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      10. Third-Party Links
                    </h3>
                    <p>
                      The Hostiggo platform may contain links to third-party
                      websites or services. Hostiggo is not responsible for the
                      privacy practices or content of such third-party
                      platforms, and users are encouraged to review their
                      respective privacy policies independently.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      11. Children’s Privacy
                    </h3>
                    <p>
                      Hostiggo does not knowingly collect personal data from
                      individuals under the age of eighteen (18). If such data
                      is discovered, Hostiggo will take appropriate steps to
                      delete it promptly.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      12. Legal Compliance
                    </h3>
                    <p>
                      Hostiggo processes personal data in compliance with the
                      Digital Personal Data Protection Act, 2023, the
                      Information Technology Act, 2000, and all other applicable
                      Indian data protection and privacy laws. Where required,
                      Hostiggo may cooperate with government or regulatory
                      authorities.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      13. Policy Updates
                    </h3>
                    <p>
                      Hostiggo reserves the right to modify or update this
                      Privacy Policy at any time. Any changes will be effective
                      immediately upon publication on the platform. Continued
                      use of Hostiggo after such updates constitutes acceptance
                      of the revised Privacy Policy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1E1E1E]">
                      14. Contact & Grievance Redressal
                    </h3>
                    <p>
                      For questions, concerns, or requests related to this
                      Privacy Policy or personal data, users may contact:
                    </p>
                    <div className="mt-3 rounded-2xl border border-[#004772]/20 bg-[#F5FBFF] p-4">
                      <p className="font-semibold text-[#004772]">
                        Hostiggo Support Team
                      </p>
                      <p>Email: support@hostiggo.com</p>
                      <p className="text-[16px] text-[#6B7280] mt-2">
                        Hostiggo will make reasonable efforts to address
                        grievances and data-related requests in a timely manner
                        in accordance with applicable law.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-16 rounded-2xl border border-[#004772]/20 bg-[#F5FBFF] p-6">
              <h3 className="text-[22px] font-semibold text-[#004772]">
                Acceptance
              </h3>
              <p className="text-[#3A3A3A] text-[18px] mt-2">
                By accessing or using Hostiggo, you acknowledge that you have
                read, understood, and agree to all terms and policies listed
                above.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <CopyrightBar />
    </main>
  );
}
