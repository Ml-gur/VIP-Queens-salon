import React, { useState, useEffect } from 'react'
import { Star, ArrowRight, Phone, Sparkles, ChevronDown } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleWhatsAppBooking = () => {
    window.open('https://wa.me/254718779129?text=Hello! I would like to book an appointment at VIP Queens Salon.', '_blank')
  }

  const handleCallNow = () => {
    window.location.href = 'tel:+254718779129'
  }

  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Enhanced hero slider images showcasing transformations and styles
  const sliderImages = [
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753683879/Braids_xjnqib.jpg',
      alt: 'Beautiful braiding styles and transformations',
      category: 'braids'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753692313/hair_fuqb3b.jpg',
      alt: 'Stunning hair transformation results',
      category: 'transformation'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684824/saloonists_ccr7fv.jpg',
      alt: 'Professional salon stylists at work',
      category: 'team'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753692608/naturalafter_heny7b.jpg',
      alt: 'Natural hair styling excellence',
      category: 'natural'
    },
    {
      src: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753683880/sallon_qkqdig.jpg',
      alt: 'Modern salon interior and atmosphere',
      category: 'salon'
    }
  ]

  // Auto-advance slider every 4 seconds with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [sliderImages.length])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background Image Slider */}
      <div className="absolute inset-0 hero-slider">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Enhanced multi-layered overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pearl-rose-dark/25 via-transparent to-champagne-silk-dark/25"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Floating Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pearl-rose/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-champagne-silk/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-rose-gold/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-pearl-rose/35 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        
        {/* Enhanced Sparkle Elements */}
        <Sparkles className="absolute top-20 right-20 h-8 w-8 text-rose-gold/50 animate-pulse" />
        <Sparkles className="absolute bottom-32 left-16 h-6 w-6 text-pearl-rose/60 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <Sparkles className="absolute top-1/3 left-1/2 h-4 w-4 text-champagne-silk/40 animate-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative container-mobile py-12 min-h-screen flex flex-col justify-center">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center text-center space-y-8">
          {/* Enhanced Badge with Animation */}
          <div className="inline-flex items-center justify-center mx-auto animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-sm border border-white/40 rounded-full px-6 py-3 flex items-center space-x-3 shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-800 font-inter">Best Salon in Town</span>
            </div>
          </div>

          {/* Enhanced Main Heading with Better Typography */}
          <div className="space-y-6 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              <span className="block mb-3 font-script text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-pearl-rose-light via-champagne-silk-light to-rose-gold-light bg-clip-text text-transparent filter drop-shadow-lg">
                VIP Queens Salon
              </span>
              <span className="block text-3xl md:text-5xl lg:text-6xl font-inter leading-tight">
                Where Beauty Meets Excellence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-inter">
              Experience professional African hair care and beauty services. 
              From natural styles to elegant transformations.
            </p>
          </div>

          {/* Enhanced Action Buttons with Better Spacing */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={handleWhatsAppBooking}
              className="group w-full sm:w-auto bg-gradient-to-r from-pearl-rose-dark to-rose-gold-dark hover:from-rose-gold-dark hover:to-pearl-rose-dark text-white px-10 py-5 rounded-2xl font-semibold shadow-2xl hover:shadow-pearl-rose/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 font-inter"
            >
              <span className="text-2xl">📱</span>
              <span>Book via WhatsApp</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleCallNow}
              className="w-full sm:w-auto bg-white/95 hover:bg-white border border-white/40 text-gray-800 hover:text-pearl-rose-dark px-10 py-5 rounded-2xl font-semibold shadow-2xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center space-x-3 font-inter backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="flex justify-center mt-8 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={scrollToServices}
            className="group text-white/80 hover:text-white transition-colors duration-300 flex flex-col items-center space-y-3 drop-shadow-lg animate-bounce hover:animate-none"
          >
            <span className="text-sm font-medium font-inter bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              Explore Services
            </span>
            <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-3 bg-white shadow-lg' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}