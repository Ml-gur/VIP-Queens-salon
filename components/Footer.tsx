import React from 'react'
import { MapPin, Phone, Clock, Mail, Instagram, MessageCircle, Heart, Star } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    'Haircut & Styling',
    'Hair Braiding & Extensions',
    'Hair Treatment & Care',
    'Hair Relaxing',
    'Wig Installation & Styling',
    'Nail Care Services'
  ]

  const quickLinks = [
    { name: 'About Us', href: '#team' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Special Offers', href: '#offers' },
    { name: 'Contact', href: '#contact' },
    { name: 'Book Appointment', href: '#booking' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gradient-to-b from-pearl-rose-dark to-gray-900 text-white">
      <div className="container-mobile py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pearl-rose-light to-champagne-silk-light rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-pearl-rose-dark text-xl font-bold font-script">VQ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-script">VIP Queens Salon</h3>
                <p className="text-pearl-rose-light text-sm font-inter">Best Salon in Town</p>
              </div>
            </div>
            
            <p className="text-pearl-rose-light mb-6 leading-relaxed font-inter">
              Transform your look with Kenya's premier beauty salon. 
              Expert stylists, quality products, and personalized service 
              in the heart of Nairobi.
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-pearl-rose-light text-sm font-inter">4.9/5 (500+ reviews)</span>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/vipqueenssalon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@vipqueenssalon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-pearl-rose-dark text-xs font-bold">TT</span>
                </div>
              </a>
              <a 
                href="https://wa.me/254718779129" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-inter">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection('#services')}
                    className="text-pearl-rose-light hover:text-white transition-colors duration-200 text-sm font-inter hover:translate-x-1 transform transition-transform"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-inter">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-pearl-rose-light hover:text-white transition-colors duration-200 text-sm font-inter hover:translate-x-1 transform transition-transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-inter">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-pearl-rose-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-pearl-rose-light font-inter">Ronald Ngala Street</p>
                  <p className="text-sm text-pearl-rose-light font-inter">RNG Plaza 2nd floor S41</p>
                  <p className="text-sm text-pearl-rose-light font-inter">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pearl-rose-light flex-shrink-0" />
                <a 
                  href="tel:0718779129" 
                  className="text-sm text-pearl-rose-light hover:text-white transition-colors duration-200 font-inter"
                >
                  0718 779 129
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pearl-rose-light flex-shrink-0" />
                <a 
                  href="mailto:info@vipqueenssalon.com" 
                  className="text-sm text-pearl-rose-light hover:text-white transition-colors duration-200 font-inter"
                >
                  info@vipqueenssalon.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-pearl-rose-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-pearl-rose-light font-inter">Mon-Sat: 6:00 AM - 10:00 PM</p>
                  <p className="text-sm text-pearl-rose-light font-inter">Sunday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <h5 className="font-semibold text-sm mb-2 font-inter">Emergency Appointments</h5>
              <a 
                href="https://wa.me/254718779129?text=Hello! I need an emergency appointment at VIP Queens Salon."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-pearl-rose-light hover:text-white transition-colors duration-200 font-inter"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="bg-white/10 rounded-2xl p-8 text-center">
            <h4 className="text-xl font-semibold mb-4 font-inter">Stay Updated</h4>
            <p className="text-pearl-rose-light mb-6 max-w-2xl mx-auto font-inter">
              Get the latest beauty tips, special offers, and appointment reminders 
              delivered straight to your phone via WhatsApp.
            </p>
            <a
              href="https://wa.me/254718779129?text=Hello! I would like to receive updates about VIP Queens Salon services and offers."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pearl-rose-light to-champagne-silk-light text-pearl-rose-dark px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-inter"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join WhatsApp Updates</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-pearl-rose-light font-inter">
              © {currentYear} VIP Queens Salon. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-pearl-rose-light">
              <span className="font-inter">Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span className="font-inter">in Nairobi, Kenya</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-pearl-rose-light/80 font-inter">
            <p>Ronald Ngala Street, RNG Plaza 2nd floor S41 | Phone: 0718 779 129</p>
            <p>Best Salon in Town - Your Beauty, Our Priority</p>
          </div>
        </div>
      </div>
    </footer>
  )
}