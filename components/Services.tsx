import React, { useState } from 'react'
import { Scissors, Palette, Sparkles, Crown, Heart, ArrowRight, Star, Clock, DollarSign } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      name: 'Haircut & Styling',
      shortDescription: 'Professional cuts and elegant styling',
      fullDescription: 'Transform your look with our expert haircut and styling service. Our skilled stylists understand African hair textures and will create a cut that enhances your natural beauty while being easy to maintain.',
      price: 1500,
      duration: '60-90 minutes',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685235/natural_n5fsbo.jpg',
      icon: <Scissors className="w-6 h-6" />,
      color: 'pearl-rose',
      features: ['Consultation', 'Wash & Cut', 'Professional Styling', 'Finishing Products']
    },
    {
      id: 2,
      name: 'Hair Braiding & Extensions',
      shortDescription: 'Beautiful traditional and modern braiding',
      fullDescription: 'Celebrate your heritage with stunning braiding styles. From classic box braids to intricate cornrows and modern protective styles, we create beautiful looks that protect and showcase your hair.',
      price: 2500,
      duration: '2-4 hours',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685236/braiding_y39r45.jpg',
      icon: <Crown className="w-6 h-6" />,
      color: 'champagne-silk',
      features: ['Style Consultation', 'Premium Extensions', 'Scalp Treatment', 'Maintenance Tips']
    },
    {
      id: 3,
      name: 'Hair Treatment & Care',
      shortDescription: 'Deep conditioning and scalp therapy',
      fullDescription: 'Nourish and restore your hair with our comprehensive treatment services. Perfect for damaged, dry, or chemically treated hair, our treatments will bring back health, shine, and manageability.',
      price: 2000,
      duration: '90-120 minutes',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685235/treatment_wnk1wm.jpg',
      icon: <Heart className="w-6 h-6" />,
      color: 'rose-gold',
      features: ['Hair Analysis', 'Deep Conditioning', 'Scalp Massage', 'Protein Treatment']
    },
    {
      id: 4,
      name: 'Hair Relaxing',
      shortDescription: 'Smooth, manageable hair transformation',
      fullDescription: 'Achieve silky smooth hair with our professional relaxing service. Using gentle, high-quality products, we transform curly or coily hair into smooth, manageable styles while maintaining hair health.',
      price: 3500,
      duration: '2-3 hours',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'pearl-rose',
      features: ['Hair Assessment', 'Gentle Relaxing', 'Neutralizing Treatment', 'Styling & Finish']
    },
    {
      id: 5,
      name: 'Wig Installation & Styling',
      shortDescription: 'Professional wig fitting and styling',
      fullDescription: 'Get a flawless wig installation that looks completely natural. We specialize in lace front wigs, closure wigs, and protective styling options that give you versatility and convenience.',
      price: 3000,
      duration: '90-150 minutes',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685236/wigin_pokrio.jpg',
      icon: <Palette className="w-6 h-6" />,
      color: 'champagne-silk',
      features: ['Wig Consultation', 'Custom Fitting', 'Professional Installation', 'Styling & Cut']
    },
    {
      id: 6,
      name: 'Nail Care Services',
      shortDescription: 'Complete manicure and pedicure treatments',
      fullDescription: 'Pamper yourself with our comprehensive nail care services. From basic manicures to elaborate nail art, we provide professional treatments that leave your nails looking beautiful and healthy.',
      price: 1200,
      duration: '45-75 minutes',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753683879/manicure_fxjdnw.jpg',
      icon: <Star className="w-6 h-6" />,
      color: 'rose-gold',
      features: ['Nail Consultation', 'Cuticle Care', 'Polish Application', 'Nail Art Options']
    }
  ]

  const handleBookService = (serviceId: number) => {
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getServiceButtonClass = (color: string, variant: 'primary' | 'secondary') => {
    if (variant === 'primary') {
      switch (color) {
        case 'pearl-rose':
          return 'bg-gradient-to-r from-pearl-rose-dark to-pink-600 hover:from-pink-600 hover:to-pink-700'
        case 'champagne-silk':
          return 'bg-gradient-to-r from-champagne-silk-dark to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
        case 'rose-gold':
          return 'bg-gradient-to-r from-rose-gold-dark to-orange-600 hover:from-orange-600 hover:to-orange-700'
        default:
          return 'bg-gradient-to-r from-pearl-rose-dark to-pink-600 hover:from-pink-600 hover:to-pink-700'
      }
    }
    return 'bg-gray-100 hover:bg-gray-200'
  }

  const getServiceIconBg = (color: string) => {
    switch (color) {
      case 'pearl-rose':
        return 'bg-pearl-rose-dark'
      case 'champagne-silk':
        return 'bg-champagne-silk-dark'
      case 'rose-gold':
        return 'bg-rose-gold-dark'
      default:
        return 'bg-pearl-rose-dark'
    }
  }

  const getServiceFeatureDot = (color: string) => {
    switch (color) {
      case 'pearl-rose':
        return 'bg-pearl-rose-dark'
      case 'champagne-silk':
        return 'bg-champagne-silk-dark'
      case 'rose-gold':
        return 'bg-rose-gold-dark'
      default:
        return 'bg-pearl-rose-dark'
    }
  }

  const getServiceStarColor = (color: string) => {
    switch (color) {
      case 'pearl-rose':
        return 'text-pearl-rose-dark'
      case 'champagne-silk':
        return 'text-champagne-silk-dark'
      case 'rose-gold':
        return 'text-rose-gold-dark'
      default:
        return 'text-pearl-rose-dark'
    }
  }

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-pearl-rose-light to-champagne-silk-light">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-pearl-rose/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-pearl-rose-dark mr-2" />
            <span className="text-sm font-medium text-gray-700 font-inter">Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-inter">
            Professional{' '}
            <span className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              Beauty Services
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            From hair care to nail treatments, we specialize in comprehensive beauty services 
            with techniques that celebrate your natural beauty and enhance your confidence.
          </p>
        </div>

        {/* Services Grid - 2 columns on mobile, responsive scaling */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 border border-gray-100"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Service icon */}
                <div className={`absolute top-2 md:top-4 right-2 md:right-4 ${getServiceIconBg(service.color)} p-2 md:p-3 rounded-lg md:rounded-xl text-white shadow-lg`}>
                  {service.icon}
                </div>
                
                {/* Price badge */}
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-3 py-1 md:py-2">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                    <span className="text-xs md:text-sm font-bold text-gray-800 font-inter">KES {service.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 md:p-6">
                <div className="flex items-center space-x-1 md:space-x-2 mb-2 md:mb-3">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                  <span className="text-xs md:text-sm text-gray-500 font-inter">{service.duration}</span>
                </div>
                
                <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2 md:mb-3 font-inter leading-tight">{service.name}</h3>
                <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed font-inter line-clamp-2 md:line-clamp-none">{service.shortDescription}</p>
                
                {/* Features - Show only on larger screens */}
                <div className="hidden md:block space-y-2 mb-6">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${getServiceFeatureDot(service.color)} rounded-full`}></div>
                      <span className="text-sm text-gray-600 font-inter">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col space-y-2 md:space-y-3">
                  <button
                    onClick={() => handleBookService(service.id)}
                    className={`w-full ${getServiceButtonClass(service.color, 'primary')} text-white py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-base font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 font-inter`}
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                  
                  <button
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-base font-medium transition-colors duration-200 font-inter"
                  >
                    {selectedService === service.id ? 'Show Less' : 'Learn More'}
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedService === service.id && (
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100 space-y-3 md:space-y-4 animate-fadeIn">
                    <p className="text-xs md:text-base text-gray-600 leading-relaxed font-inter">{service.fullDescription}</p>
                    
                    <div>
                      <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2 font-inter">What's Included:</h4>
                      <div className="grid grid-cols-1 gap-1 md:gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Star className={`w-3 h-3 md:w-4 md:h-4 ${getServiceStarColor(service.color)}`} />
                            <span className="text-xs md:text-sm text-gray-600 font-inter">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Horizontal Buttons */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-inter">
              Not Sure Which Service You Need?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-inter">
              Our expert stylists are here to help! Get a free consultation to find the perfect 
              service for your hair type and desired look.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 font-inter">
                <span>Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => window.open('https://wa.me/254718779129?text=Hello! I would like to know more about your services at VIP Queens Salon.', '_blank')}
                className="w-full sm:w-auto bg-champagne-silk-dark hover:bg-champagne-silk-dark/90 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-inter"
              >
                📱 WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}