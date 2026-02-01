"use client";

export default function WhyHostiggo() {
  const features = [
    {
      title: "Low Commission",
      desc: "0% on first 10 booking, 2% after 10 bookings, Lowest commission in compare to other available platforms.",
      highlight: true,
    },
    {
      title: "Earn Beyond Stays",
      desc: "Add paid services like meals, transports & experience. Edit services and earn, with no extra hidden charges.",
    },
    {
      title: "Secure & Transparent",
      desc: "Verified users, secure payouts, clear policies.",
    },
    {
      title: "Fully Controlled By YOU",
      desc: "Approve guests, pause listing, set prices, edit anytime, all according to you.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white" id="why">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[59px] font-bold text-[#004772] text-center mb-20 tracking-[0.04em]">
          Why Choose Hostiggo?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-10 rounded-[43px] border border-[#A2A2A2] bg-white min-h-[352px]"
            >
              <h3
                className={`text-[38px] font-semibold mb-4 ${f.highlight ? "text-yellow-600" : "text-[#3A3A3A]"}`}
              >
                {f.title}
              </h3>
              <p className="text-[#494949] text-2xl font-medium leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}

          {/* Centered Illustration */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center pointer-events-none">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D2EEFF] rounded-full blur-3xl opacity-50 scale-150" />
              <img
                src="/D5561eafd4c1425eb173bd439aa0db661.png"
                alt="Success"
                className="relative h-[521px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
