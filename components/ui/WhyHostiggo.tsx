import { CheckCircle2 } from 'lucide-react';

const features = [
  {
    title: 'Assisted Onboarding',
    description: 'Our team guides you through every step. No self-publishing confusion.',
  },
  {
    title: 'Property Verification',
    description: 'We verify your listing details to ensure quality and trustworthiness.',
  },
  {
    title: 'Pricing & Policy Guidance',
    description: 'Expert recommendations on pricing strategy and house rules.',
  },
  {
    title: 'Dedicated Support',
    description: 'Direct WhatsApp and call support from our team throughout onboarding.',
  },
  {
    title: 'Professional Platform',
    description: 'Urban-focused, premium brand positioning for your property.',
  },
  {
    title: 'No Hidden Charges',
    description: 'Transparent pricing. No surprise commissions before you know the full picture.',
  },
];

export default function WhyHostiggo() {
  return (
    <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-blue-950">Why Choose Hostiggo?</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We believe in genuine partnerships with hosts, not one-click automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="space-y-3 p-6 rounded-lg border border-stone-100 hover:border-stone-200 transition bg-stone-50/50">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-900 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-medium text-blue-950">{feature.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
