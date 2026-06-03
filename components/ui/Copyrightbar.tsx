const Icons = {
  Translation: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.87 15.07L10.33 12.56L10.29 12.52C12.02 10.59 13.26 8.41 13.97 6H17V4H10V2H8V4H1V6H11.97C11.31 8.05 10.24 9.91 8.85 11.51C7.96 10.51 7.21 9.42 6.62 8.25H4.62C5.31 9.79 6.27 11.21 7.45 12.51L3 16.94L4.41 18.35L8.85 13.91L11.66 16.72L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.87 17L17.5 12.67L19.12 17H15.87Z"
        fill="currentColor"
      />
    </svg>
  ),
  Instagram: () => (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  Linkedin: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  X: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
  Copyright: () => (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M15 9.354a4 4 0 1 0 0 5.292"></path>
    </svg>
  ),
};

export default function CopyrightBar() {
  return (
    <div className="w-full bg-[#004772] py-10">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center gap-3 text-white text-center">
        <div className="flex items-center gap-3">
          <Icons.Copyright />
          <p className="text-lg font-semibold tracking-wide">
            2026 Hostiggo Trips Private Ltd. Travel made simple
          </p>
        </div>
        <p className="text-sm text-blue-200">
          Hostiggo Trips Private Ltd. | A-176-A, Basement, Ganesh Nagar, Tilak Nagar (West Delhi), New Delhi, West Delhi – 110018, Delhi
        </p>
      </div>
    </div>
  );
}
