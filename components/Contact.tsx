import { useState } from 'react'
import { MapPin, Phone, Clock, Mail, MessageCircle, Send, Star, Instagram } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const whatsappMessage = `Hello VIP Queens Salon! 
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Interested Service: ${formData.service}
Message: ${formData.message}

I would like to book an appointment or get more information about your services.`

    window.open(`https://wa.me/254718779129?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-pearl-rose-light to-warm-white">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-pearl-rose/20 rounded-full px-6 py-2 mb-6">
            <MessageCircle className="w-4 h-4 text-pearl-rose-dark mr-2" />
            <span className="text-sm font-medium text-gray-700 font-inter">Contact Us</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-inter">
            Get in{' '}
            <span className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              Touch Today
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Ready to transform your look? Contact VIP Queens Salon for bookings, 
            consultations, or any questions about our beauty services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 font-inter">Visit Our Salon</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-pearl-rose-gradient p-3 rounded-xl flex-shrink-0">
                    <MapPin className="w-6 h-6 text-pearl-rose-dark" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 font-inter">Our Location</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 font-inter">Ronald Ngala Street</p>
                      <p className="text-gray-600 font-inter">RNG Plaza 2nd floor S41</p>
                      <p className="text-gray-600 font-inter">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-champagne-gradient p-3 rounded-xl flex-shrink-0">
                    <Phone className="w-6 h-6 text-champagne-silk-dark" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 font-inter">Call Us</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 font-inter text-lg font-medium">0718 779 129</p>
                      <p className="text-sm text-gray-500 font-inter">Available during business hours</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-rose-gold-gradient p-3 rounded-xl flex-shrink-0">
                    <Clock className="w-6 h-6 text-rose-gold-dark" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 font-inter">Opening Hours</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Monday - Saturday:</span>
                        <span className="text-gray-800 font-medium font-inter">6:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Sunday:</span>
                        <span className="text-gray-800 font-medium font-inter">9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pearl-rose-gradient p-3 rounded-xl flex-shrink-0">
                    <Mail className="w-6 h-6 text-pearl-rose-dark" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 font-inter">Email Us</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 font-inter">info@vipqueenssalon.com</p>
                      <p className="text-sm text-gray-500 font-inter">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links - Fixed Alignment */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-6 font-inter">Follow Us</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a 
                    href="https://www.instagram.com/vipqueenssalon" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 h-14"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm font-medium font-inter">Instagram</span>
                  </a>
                  
                  <a 
                    href="https://www.tiktok.com/@vipqueenssalon" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-black to-gray-800 text-white p-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 h-14"
                  >
                    <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xs font-bold">TT</span>
                    </div>
                    <span className="text-sm font-medium font-inter">TikTok</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/254718779129" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 h-14"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium font-inter">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Why Choose Us Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 font-inter">Why Choose VIP Queens?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter mb-1">Expert Stylists</h4>
                    <p className="text-sm text-gray-600 font-inter leading-relaxed">Experienced professionals specialized in African hair care and modern styling techniques</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter mb-1">Quality Products</h4>
                    <p className="text-sm text-gray-600 font-inter leading-relaxed">Premium hair care products and tools for lasting, beautiful results</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter mb-1">Personalized Service</h4>
                    <p className="text-sm text-gray-600 font-inter leading-relaxed">Consultations tailored to your hair type, lifestyle, and personal style preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter mb-1">Comfortable Environment</h4>
                    <p className="text-sm text-gray-600 font-inter leading-relaxed">Relaxing, luxurious atmosphere where you feel pampered and valued</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 font-inter">Book Your Appointment</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-inter">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-pearl-rose-dark transition-colors font-inter"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 font-inter">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-pearl-rose-dark transition-colors font-inter"
                    placeholder="0712 345 678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 font-inter">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-pearl-rose-dark transition-colors font-inter"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 font-inter">Service Interested In</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-pearl-rose-dark transition-colors font-inter"
                >
                  <option value="">Select a service</option>
                  <option value="Haircut & Styling">Haircut & Styling</option>
                  <option value="Hair Braiding & Extensions">Hair Braiding & Extensions</option>
                  <option value="Hair Treatment & Care">Hair Treatment & Care</option>
                  <option value="Hair Relaxing">Hair Relaxing</option>
                  <option value="Wig Installation & Styling">Wig Installation & Styling</option>
                  <option value="Nail Care Services">Nail Care Services</option>
                  <option value="Consultation">Free Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 font-inter">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-pearl-rose-dark transition-colors font-inter"
                  placeholder="Tell us about your preferred date, time, or any special requests..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
              >
                <Send className="w-5 h-5" />
                <span>Send via WhatsApp</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500 font-inter leading-relaxed">
                  By submitting this form, you'll be redirected to WhatsApp to complete your booking request.
                </p>
              </div>
            </form>

            {/* Quick Action Buttons - Fixed 2 Card Grid */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4 font-inter">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => window.open('https://wa.me/254718779129?text=Hello! I need an emergency appointment at VIP Queens Salon.', '_blank')}
                  className="bg-pearl-rose-dark text-white py-3 px-4 rounded-xl hover:bg-pearl-rose-dark/90 transition-colors font-inter text-center text-sm font-medium h-14 flex items-center justify-center"
                >
                  📱 Emergency Booking
                </button>
                <button 
                  onClick={() => window.open('tel:0718779129', '_self')}
                  className="bg-champagne-silk-dark text-white py-3 px-4 rounded-xl hover:bg-champagne-silk-dark/90 transition-colors font-inter text-center text-sm font-medium h-14 flex items-center justify-center"
                >
                  📞 Call Directly
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-inter">Easy to Find</h3>
            <p className="text-gray-600 mb-6 font-inter leading-relaxed">
              Located in the heart of Nairobi at Ronald Ngala Street, RNG Plaza 2nd floor S41. 
              Easily accessible by public transport and private vehicles with convenient parking available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => window.open('https://maps.google.com?q=Ronald+Ngala+Street+RNG+Plaza+Nairobi', '_blank')}
                className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 font-inter"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Directions</span>
              </button>
              
              <div className="text-sm text-gray-500 font-inter">
                <span>Open 7 days a week • Call 0718 779 129</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}