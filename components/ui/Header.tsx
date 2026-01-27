import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">H</span>
          </div>
          <span className="text-xl font-light tracking-wide text-blue-950">Hostiggo</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <a href="#why" className="text-sm text-stone-600 hover:text-blue-950 transition">
            Why Hostiggo
          </a>
          <a href="#how" className="text-sm text-stone-600 hover:text-blue-950 transition">
            How It Works
          </a>
        </nav>
      </div>
    </header>
  );
}
