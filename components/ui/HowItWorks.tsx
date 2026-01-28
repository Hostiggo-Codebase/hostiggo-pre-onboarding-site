'use client';

const steps = [
  {
    step: '01',
    title: 'Submit Your Details',
    description: 'Tell us about your property, ownership details, and guest preferences in our simple form.',
  },
  {
    step: '02',
    title: 'Hostiggo Team Connects',
    description: 'We reach out via WhatsApp or call within 24 hours to understand your property better.',
  },
  {
    step: '03',
    title: 'Verification & Refinement',
    description: 'We verify details, suggest optimal pricing, and help perfect your listing photos.',
  },
  {
    step: '04',
    title: 'Approved & Live',
    description: 'Your property launches on our platform. We continue supporting you as hosts arrive.',
  },
];

export default function HowItWorks({ onStartOnboarding }: { onStartOnboarding: () => void }) {
  return (
    <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-blue-950">How Host Onboarding Works</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Four simple steps from property submission to approved listing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-stone-200" style={{ left: 'calc(50% + 48px)' }} />
              )}
              <div className="relative z-10 space-y-4">
                <div className="w-24 h-24 rounded-full bg-blue-950 text-white flex items-center justify-center">
                  <span className="text-3xl font-light">{item.step}</span>
                </div>
                <h3 className="text-xl font-medium text-blue-950">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onStartOnboarding}
            className="px-8 py-3 bg-blue-950 text-white rounded-lg font-medium hover:bg-blue-900 transition"
          >
            Begin Onboarding
          </button>
        </div>
      </div>
    </section>
  );
}
