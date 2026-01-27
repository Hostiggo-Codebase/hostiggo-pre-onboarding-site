'use client';

export default function Hero({ onStartOnboarding }: { onStartOnboarding: () => void }) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-50 via-white to-stone-50">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-blue-950 text-balance">
            For Homes That Deserve <span className="font-semibold">Thoughtful Hosting</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 text-balance max-w-2xl mx-auto leading-relaxed">
            A quiet, assisted onboarding experience designed for well-kept homestays — where care, verification, and support come before visibility.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={onStartOnboarding}
            className="px-8 py-3 bg-blue-950 text-white rounded-lg font-medium hover:bg-blue-900 transition text-center"
          >
            Start Host Onboarding
          </button>
          <a
            href="#how"
            className="px-8 py-3 border border-stone-300 text-blue-950 rounded-lg font-medium hover:bg-stone-50 transition text-center"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
