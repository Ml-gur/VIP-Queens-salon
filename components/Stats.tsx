import React, { useEffect, useState } from 'react'
import { Users, Calendar, Star, Award, Heart, TrendingUp } from 'lucide-react'

export function Stats() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const stats = [
    {
      id: 1,
      number: '500+',
      label: 'Happy Clients',
      description: 'Beautiful transformations',
      icon: <Users className="w-8 h-8" />,
      color: 'pearl-rose'
    },
    {
      id: 2,
      number: '15+',
      label: 'Years Combined',
      description: 'Professional experience',
      icon: <Calendar className="w-8 h-8" />,
      color: 'champagne-silk'
    },
    {
      id: 3,
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'Customer approval',
      icon: <Star className="w-8 h-8" />,
      color: 'rose-gold'
    },
    {
      id: 4,
      number: '20+',
      label: 'Services Offered',
      description: 'Beauty solutions',
      icon: <Award className="w-8 h-8" />,
      color: 'pearl-rose'
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Aisha Kamau',
      text: 'VIP Queens Salon transformed my hair beautifully! The braiding service was exceptional and the staff made me feel like royalty.',
      rating: 5,
      location: 'Nairobi'
    },
    {
      id: 2,
      name: 'Grace Wanjiku',
      text: 'Best salon in town! Catherine and her team are so professional. My nails have never looked better. Highly recommend!',
      rating: 5,
      location: 'Rongai'
    },
    {
      id: 3,
      name: 'Mary Njeri',
      text: 'Amazing hair treatment service! My hair feels so healthy and strong now. The team really knows what they are doing.',
      rating: 5,
      location: 'Karen'
    },
    {
      id: 4,
      name: 'Fatima Hassan',
      text: 'Love coming here! Always leave feeling beautiful and confident. The atmosphere is welcoming and the results are always perfect.',
      rating: 5,
      location: 'Westlands'
    },
    {
      id: 5,
      name: 'Jane Muthoni',
      text: 'Professional service from start to finish. The wig installation was flawless and looks so natural. Thank you VIP Queens!',
      rating: 5,
      location: 'Kilimani'
    }
  ]

  // Auto-advance testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const getStatIconBg = (color: string) => {
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

  return (
    <section id="stats" className="py-16 lg:py-24 bg-gradient-to-b from-rose-gold-light to-champagne-silk-light">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm border border-pearl-rose/20 rounded-full px-6 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-pearl-rose-dark mr-2" />
            <span className="text-sm font-medium text-gray-800 font-inter">Our Achievement</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-inter">
            Trusted by Hundreds of{' '}
            <span className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              Beautiful Women
            </span>
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            Join our community of satisfied clients who trust VIP Queens Salon 
            for their beauty needs and transformation journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={`${getStatIconBg(stat.color)} text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-inter">
                {stat.number}
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 font-inter">
                {stat.label}
              </h3>
              
              <p className="text-sm text-gray-600 font-inter">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-inter">
              What Our Clients Say
            </h3>
            <p className="text-gray-600 font-inter">
              Real reviews from real clients who experienced the VIP Queens difference
            </p>
          </div>

          {/* Animated Testimonial Display */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    {/* Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current mx-1" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-inter italic">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Client Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="bg-pearl-rose-gradient w-12 h-12 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-pearl-rose-dark" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-800 font-inter">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 font-inter">{testimonial.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-pearl-rose-dark w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button 
              onClick={() => window.open('https://wa.me/254718779129?text=Hello! I would like to book an appointment at VIP Queens Salon based on the great reviews I have seen.', '_blank')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-inter"
            >
              <span>Join Our Happy Clients</span>
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}