import { Shield, Star, Users, Clock, Heart, Award, Sparkles, CheckCircle } from 'lucide-react'

export function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <Star className="w-6 h-6" />,
      title: 'Expert Stylists',
      description: 'Experienced professionals specialized in African hair care',
      color: 'pearl-rose'
    },
    {
      id: 2,
      icon: <Shield className="w-6 h-6" />,
      title: 'Quality Products',
      description: 'Premium hair care products for lasting results',
      color: 'champagne-silk'
    },
    {
      id: 3,
      icon: <Heart className="w-6 h-6" />,
      title: 'Personalized Service',
      description: 'Consultations tailored to your hair type and lifestyle',
      color: 'rose-gold'
    },
    {
      id: 4,
      icon: <Users className="w-6 h-6" />,
      title: 'Comfortable Environment',
      description: 'Relaxing atmosphere where you feel like royalty',
      color: 'pearl-rose'
    },
    {
      id: 5,
      icon: <Clock className="w-6 h-6" />,
      title: 'Flexible Hours',
      description: 'Open 6AM-10PM daily to fit your busy schedule',
      color: 'champagne-silk'
    },
    {
      id: 6,
      icon: <Award className="w-6 h-6" />,
      title: 'Best Salon in Town',
      description: '500+ happy clients with 5-star reviews',
      color: 'rose-gold'
    },
    {
      id: 7,
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Natural Hair Expertise',
      description: 'Specialists in protective styles and natural care',
      color: 'pearl-rose'
    },
    {
      id: 8,
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Satisfaction Guarantee',
      description: '98% customer satisfaction rate with amazing results',
      color: 'champagne-silk'
    }
  ]

  const getIconBg = (color: string) => {
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

  const getCardBorder = (color: string) => {
    switch (color) {
      case 'pearl-rose':
        return 'border-pearl-rose/30 hover:border-pearl-rose-dark/50'
      case 'champagne-silk':
        return 'border-champagne-silk/30 hover:border-champagne-silk-dark/50'
      case 'rose-gold':
        return 'border-rose-gold/30 hover:border-rose-gold-dark/50'
      default:
        return 'border-pearl-rose/30 hover:border-pearl-rose-dark/50'
    }
  }

  return (
    <section id="why-choose-us" className="py-16 lg:py-24 bg-gradient-to-b from-soft-cream to-pearl-rose-light">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-pearl-rose/20 rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-pearl-rose-dark mr-2" />
            <span className="text-sm font-medium text-gray-700 font-inter">Why Choose Us</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-inter">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              VIP Queens Salon
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            Experience the difference with Kenya's premier beauty salon. 
            Our commitment to excellence and personalized care sets us apart.
          </p>
        </div>

        {/* Features Grid - 2 columns on mobile, responsive scaling */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`group bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border ${getCardBorder(feature.color)}`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Icon */}
              <div className={`${getIconBg(feature.color)} text-white w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-2 font-inter leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-inter">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-inter">
              Ready to Experience the VIP Treatment?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-inter">
              Join hundreds of satisfied clients who trust VIP Queens Salon for their beauty needs. 
              Book your appointment today and discover why we're the best salon in town.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => {
                  const bookingSection = document.getElementById('booking')
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
              >
                <span>Book Your Appointment</span>
                <Star className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => window.open('https://wa.me/254718779129?text=Hello! I would like to learn more about VIP Queens Salon services.', '_blank')}
                className="w-full sm:w-auto bg-champagne-silk-dark hover:bg-champagne-silk-dark/90 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-inter"
              >
                📱 Chat with Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}