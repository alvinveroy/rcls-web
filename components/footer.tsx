import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#333333] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#F7A81B] rounded-full flex items-center justify-center">
                <span className="text-[#01579B] font-bold">RC</span>
              </div>
              <span className="font-bold text-lg">Rotary Club of Lucena South</span>
            </div>
            <p className="text-white/70 mb-4">Service Above Self - Building Community Through Action</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-[#F7A81B] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#F7A81B] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#F7A81B] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F7A81B]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/70 hover:text-[#F7A81B] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 hover:text-[#F7A81B] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#events" className="text-white/70 hover:text-[#F7A81B] transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#get-involved" className="text-white/70 hover:text-[#F7A81B] transition-colors">
                  Get Involved
                </a>
              </li>
            </ul>
          </div>

          {/* Meeting Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F7A81B]">Meeting Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#F7A81B] flex-shrink-0 mt-0.5" />
                <span className="text-white/70">Community Center, Lucena South</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-[#F7A81B] flex-shrink-0 mt-0.5" />
                <span className="text-white/70">(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-[#F7A81B] flex-shrink-0 mt-0.5" />
                <span className="text-white/70">info@rotarylucenasouth.org</span>
              </li>
            </ul>
          </div>

          {/* Rotary Badge */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F7A81B]">Rotary International</h4>
            <p className="text-white/70 mb-4">
              Member of Rotary International, a global network of service-minded professionals.
            </p>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <p className="text-[#F7A81B] font-bold">Rotary International</p>
              <p className="text-white/60 text-sm">Serving Humanity</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2025 Rotary Club of Lucena South. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-[#F7A81B] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[#F7A81B] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-[#F7A81B] transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
