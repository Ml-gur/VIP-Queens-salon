import React, { useState } from 'react'
import { Star, Instagram, User, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Team() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const teamMembers = [
    {
      id: 1,
      name: 'Catherine',
      role: 'Owner & Master Stylist',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687019/Catherine_m6vvoq.jpg',
      specialties: ['Hair Relaxing', 'Color Treatments', 'Salon Management'],
      experience: '8+ years',
      bio: 'Catherine is the visionary behind VIP Queens Salon. With over 8 years of experience, she specializes in advanced hair treatments and business leadership.',
      instagram: '@catherine_vipqueens'
    },
    {
      id: 2,
      name: 'Njeri',
      role: 'Senior Hair Stylist',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687020/njeri_momehb.jpg',
      specialties: ['Braiding', 'Natural Hair Care', 'Protective Styles'],
      experience: '5+ years',
      bio: 'Njeri is our braiding specialist who creates stunning protective styles. Her expertise in natural hair care makes her a client favorite.',
      instagram: '@njeri_vipqueens'
    },
    {
      id: 3,
      name: 'Ann',
      role: 'Hair Stylist & Nail Technician',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687496/Ann_gatgo6.jpg',
      specialties: ['Nail Art', 'Hair Styling', 'Manicures & Pedicures'],
      experience: '4+ years',
      bio: 'Ann brings creativity to both hair and nail services. Her artistic touch and attention to detail ensure every client leaves feeling beautiful.',
      instagram: '@ann_vipqueens'
    },
    {
      id: 4,
      name: 'Rachael',
      role: 'Junior Stylist & Receptionist',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687504/Rachael_rkzce3.jpg',
      specialties: ['Customer Service', 'Basic Styling', 'Consultation'],
      experience: '2+ years',
      bio: 'Rachael is our friendly face who ensures every client feels welcomed. She\'s also developing her styling skills under our senior team.',
      instagram: '@rachael_vipqueens'
    }
  ]

  const scrollToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="team" className="py-16 lg:py-24 bg-gradient-to-b from-rose-gold-light to-pearl-rose-light">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-pearl-rose/20 rounded-full px-6 py-2 mb-6">
            <User className="w-4 h-4 text-pearl-rose-dark mr-2" />
            <span className="text-sm font-medium text-gray-700 font-inter">Our Team</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-inter">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              Expert Stylists
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Our passionate team of professionals is dedicated to making you look and feel your absolute best. 
            Each stylist brings unique skills and creativity to deliver exceptional results.
          </p>
        </div>

        {/* Desktop Team Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Member Photo */}
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social Media Link */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 font-inter">{member.name}</h3>
                    <p className="text-sm text-pearl-rose-dark font-medium font-inter">{member.role}</p>
                  </div>
                  <div className="bg-pearl-rose-gradient p-2 rounded-lg">
                    <Award className="w-4 h-4 text-pearl-rose-dark" />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed font-inter">{member.bio}</p>
                
                {/* Experience */}
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 font-inter">{member.experience}</span>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800 font-inter">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-pearl-rose-light text-pearl-rose-dark px-2 py-1 rounded-full font-inter"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Team Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {teamMembers.map((member) => (
                  <div key={member.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                      {/* Member Photo */}
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <Instagram className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 font-inter">{member.name}</h3>
                            <p className="text-sm text-pearl-rose-dark font-medium font-inter">{member.role}</p>
                          </div>
                          <div className="bg-pearl-rose-gradient p-2 rounded-lg">
                            <Award className="w-4 h-4 text-pearl-rose-dark" />
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed font-inter">{member.bio}</p>
                        
                        {/* Experience */}
                        <div className="flex items-center space-x-2 mb-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700 font-inter">{member.experience}</span>
                        </div>

                        {/* Specialties */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-800 font-inter">Specialties:</h4>
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.map((specialty, idx) => (
                              <span 
                                key={idx}
                                className="text-xs bg-pearl-rose-light text-pearl-rose-dark px-2 py-1 rounded-full font-inter"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => scrollToSlide(currentSlide > 0 ? currentSlide - 1 : teamMembers.length - 1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => scrollToSlide(currentSlide < teamMembers.length - 1 ? currentSlide + 1 : 0)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-pearl-rose-dark w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-inter">
              Ready to Meet Our Team?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-inter">
              Book your appointment today and experience the VIP Queens difference. 
              Our expert stylists are ready to transform your look!
            </p>
            
            <button 
              onClick={() => window.open('https://wa.me/254718779129?text=Hello! I would like to book an appointment at VIP Queens Salon.', '_blank')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-inter"
            >
              <span>Book Your Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}