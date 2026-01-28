import { MessageCircle, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-950 text-sm font-bold">H</span>
              </div>
              <span className="text-xl font-light tracking-wide">Hostiggo</span>
            </div>
            <p className="text-sm text-stone-400">Premium urban hosting platform with assisted onboarding.</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-medium">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <a href="https://wa.me" className="flex items-center gap-2 text-stone-300 hover:text-white transition">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </a>
              <a href="mailto:hosts@hostiggo.com" className="flex items-center gap-2 text-stone-300 hover:text-white transition">
                <Mail className="w-4 h-4" />
                hosts@hostiggo.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-stone-300 hover:text-white transition">
                <Phone className="w-4 h-4" />
                +91 XXXX XXXX 90
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-medium">Legal</h3>
            <div className="space-y-2 text-sm text-stone-400">
              <a href="#" className="block hover:text-white transition">
                Terms & Conditions
              </a>
              <a href="#" className="block hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white transition">
                Host Agreement
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900 pt-8 text-center text-sm text-stone-400">
          <p>© 2024 Hostiggo. All rights reserved. Crafted for premium hosts.</p>
        </div>
      </div>
    </footer>
  );
}
