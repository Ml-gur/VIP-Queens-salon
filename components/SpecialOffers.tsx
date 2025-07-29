import React, { useState, useEffect } from 'react'
import { Gift, Clock, Star, ArrowRight, Sparkles, Calendar, Percent } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function SpecialOffers() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 45
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleBookOffer = (offerTitle: string) => {
    window.open(`https://wa.me/254718779129?text=Hello! I'm interested in the "${offerTitle}" offer at VIP Queens Salon.`, '_blank')
  }

  return (
    <section id="offers" className="py-16 lg:py-24 bg-gradient-to-b from-champagne-silk-light via-pearl-rose-light to-rose-gold-light">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-pearl-rose/20 rounded-full px-6 py-2 mb-6">
            <Gift className="w-4 h-4 text-pearl-rose-dark mr-2" />
            <span className="text-sm font-medium text-gray-700 font-inter">Special Offers</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-inter">
            Limited Time{' '}
            <span className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              Exclusive Deals
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Don't miss out on our amazing beauty packages designed to give you 
            the VIP treatment you deserve at unbeatable prices.
          </p>
        </div>

        {/* Limited Time Offers - 2x2 Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-inter">⏰ Limited Time Offers</h3>
            
            {/* Countdown Timer */}
            <div className="inline-flex items-center space-x-2 bg-pearl-rose-dark text-white rounded-2xl px-6 py-3 shadow-lg">
              <Clock className="w-5 h-5" />
              <span className="font-semibold font-inter">Ends in:</span>
              <div className="flex space-x-1">
                <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold">{timeLeft.days}d</span>
                <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold">{timeLeft.hours}h</span>
                <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold">{timeLeft.minutes}m</span>
                <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold">{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>

          {/* 2x2 Grid for Limited Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Offer 1 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-pearl-rose/20">
              <div className="absolute top-4 right-4 bg-pearl-rose-dark text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                50% OFF
              </div>
              
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src="https://res.cloudinary.com/deasyoglq/image/upload/v1753685236/braiding_y39r45.jpg"
                  alt="Hair braiding special offer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-5 h-5 text-pearl-rose-dark" />
                  <span className="text-sm font-semibold text-pearl-rose-dark font-inter">LIMITED TIME</span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-2 font-inter">Ultimate Braiding Package</h4>
                <p className="text-gray-600 mb-4 text-sm font-inter">
                  Complete braiding service with premium extensions, scalp treatment, and styling consultation.
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-pearl-rose-dark font-inter">KES 2,500</span>
                    <span className="text-lg text-gray-400 line-through ml-2 font-inter">KES 5,000</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleBookOffer('Ultimate Braiding Package')}
                  className="w-full bg-gradient-to-r from-pearl-rose-dark to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 font-inter"
                >
                  <span>Book This Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-champagne-silk/20">
              <div className="absolute top-4 right-4 bg-champagne-silk-dark text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                40% OFF
              </div>
              
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src="https://res.cloudinary.com/deasyoglq/image/upload/v1753683879/manicure_fxjdnw.jpg"
                  alt="Nail care special offer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-5 h-5 text-champagne-silk-dark" />
                  <span className="text-sm font-semibold text-champagne-silk-dark font-inter">THIS WEEK ONLY</span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-2 font-inter">Complete Nail Makeover</h4>
                <p className="text-gray-600 mb-4 text-sm font-inter">
                  Manicure, pedicure, nail art, and cuticle care - everything for beautiful nails.
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-champagne-silk-dark font-inter">KES 1,800</span>
                    <span className="text-lg text-gray-400 line-through ml-2 font-inter">KES 3,000</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleBookOffer('Complete Nail Makeover')}
                  className="w-full bg-gradient-to-r from-champagne-silk-dark to-yellow-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 font-inter"
                >
                  <span>Book This Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-rose-gold/20">
              <div className="absolute top-4 right-4 bg-rose-gold-dark text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                35% OFF
              </div>
              
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src="https://res.cloudinary.com/deasyoglq/image/upload/v1753685235/treatment_wnk1wm.jpg"
                  alt="Hair treatment special offer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Percent className="w-5 h-5 text-rose-gold-dark" />
                  <span className="text-sm font-semibold text-rose-gold-dark font-inter">WEEKEND SPECIAL</span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-2 font-inter">Deep Hair Treatment</h4>
                <p className="text-gray-600 mb-4 text-sm font-inter">
                  Intensive conditioning, protein treatment, and scalp therapy for healthy hair.
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-rose-gold-dark font-inter">KES 2,100</span>
                    <span className="text-lg text-gray-400 line-through ml-2 font-inter">KES 3,200</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleBookOffer('Deep Hair Treatment')}
                  className="w-full bg-gradient-to-r from-rose-gold-dark to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 font-inter"
                >
                  <span>Book This Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Offer 4 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-pearl-rose/20">
              <div className="absolute top-4 right-4 bg-pearl-rose-dark text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                NEW CLIENT
              </div>
              
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src="https://res.cloudinary.com/deasyoglq/image/upload/v1753685236/wigin_pokrio.jpg"
                  alt="New client special offer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Gift className="w-5 h-5 text-pearl-rose-dark" />
                  <span className="text-sm font-semibold text-pearl-rose-dark font-inter">FIRST TIME BONUS</span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-2 font-inter">New Client Package</h4>
                <p className="text-gray-600 mb-4 text-sm font-inter">
                  Free consultation + 30% off any service for first-time VIP Queens clients.
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-pearl-rose-dark font-inter">30% OFF</span>
                    <span className="text-sm text-gray-600 ml-2 font-inter">+ Free Consultation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleBookOffer('New Client Package')}
                  className="w-full bg-gradient-to-r from-pearl-rose-dark to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 font-inter"
                >
                  <span>Claim This Offer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-inter">
              Ready to Treat Yourself?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-inter">
              Book your appointment today and experience the VIP Queens difference. 
              These exclusive offers won't last long!
            </p>
            
            <button 
              onClick={() => window.open('https://wa.me/254718779129?text=Hello! I would like to book an appointment and learn about your special offers at VIP Queens Salon.', '_blank')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-inter"
            >
              <span>📱 Book Now via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}