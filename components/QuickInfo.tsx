import React from 'react'
import { MapPin, Clock, Phone, TrendingUp } from 'lucide-react'

export function QuickInfo() {
  return (
    <section className="py-12 bg-pearl-gradient relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-16 h-16 bg-pearl-rose/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-champagne-silk/10 rounded-full blur-xl"></div>
      </div>

      <div className="container-mobile relative">
        {/* Mobile: 2x2 Grid Layout */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pearl-rose/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-pearl-rose-gradient p-3 rounded-xl shadow-md">
                <MapPin className="w-5 h-5 text-pearl-rose-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">Our Location</div>
                <div className="text-xs text-gray-600 font-inter">Ronald Ngala Street</div>
                <div className="text-xs text-gray-600 font-inter">RNG Plaza 2nd floor S41</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-champagne-silk/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-champagne-gradient p-3 rounded-xl shadow-md">
                <Clock className="w-5 h-5 text-champagne-silk-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">Opening Hours</div>
                <div className="text-xs text-gray-600 font-inter">6AM - 10PM</div>
                <div className="text-xs text-gray-600 font-inter">Sun: 9AM - 6PM</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-rose-gold/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-rose-gold-gradient p-3 rounded-xl shadow-md">
                <Phone className="w-5 h-5 text-rose-gold-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">Contact Us</div>
                <div className="text-xs text-gray-600 font-inter">0718 779 129</div>
                <div className="text-xs text-gray-600 font-inter">Call anytime</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pearl-rose/20 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-pearl-rose-gradient p-3 rounded-xl shadow-md">
                <TrendingUp className="w-5 h-5 text-pearl-rose-dark" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800 font-inter">Top Rated</div>
                <div className="text-xs text-gray-600 font-inter">Best Salon in Town</div>
                <div className="text-xs text-gray-600 font-inter">5-star reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pearl-rose/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-pearl-rose-gradient p-3 rounded-xl shadow-md">
                <MapPin className="w-6 h-6 text-pearl-rose-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">Our Location</div>
                <div className="text-sm text-gray-600 font-inter">Ronald Ngala Street</div>
                <div className="text-sm text-gray-600 font-inter">RNG Plaza 2nd floor S41</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-champagne-silk/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-champagne-gradient p-3 rounded-xl shadow-md">
                <Clock className="w-6 h-6 text-champagne-silk-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">Opening Hours</div>
                <div className="text-sm text-gray-600 font-inter">Mon-Sat: 6AM - 10PM</div>
                <div className="text-sm text-gray-600 font-inter">Sunday: 9AM - 6PM</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-gold/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-rose-gold-gradient p-3 rounded-xl shadow-md">
                <Phone className="w-6 h-6 text-rose-gold-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">Contact Us</div>
                <div className="text-sm text-gray-600 font-inter">0718 779 129</div>
                <div className="text-sm text-gray-600 font-inter">Call anytime</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pearl-rose/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-pearl-rose-gradient p-3 rounded-xl shadow-md">
                <TrendingUp className="w-6 h-6 text-pearl-rose-dark" />
              </div>
              <div className="text-left">
                <div className="text-base font-semibold text-gray-800 font-inter">Top Rated</div>
                <div className="text-sm text-gray-600 font-inter">Best Salon in Town</div>
                <div className="text-sm text-gray-600 font-inter">5-star reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4">
            <a 
              href="https://www.tiktok.com/@vipqueenssalon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
            </a>
            <a 
              href="https://www.instagram.com/vipqueenssalon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/80 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">IG</span>
              </div>
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-inter">Follow us for daily inspiration</p>
        </div>
      </div>
    </section>
  )
}