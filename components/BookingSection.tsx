import { useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { useBooking } from './booking/BookingContext'

export function BookingSection() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedStylist, setSelectedStylist] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { services, staff, addBooking, getStaffBySpecialty, getAvailableSlots } = useBooking()

  // Get available staff for selected service
  const availableStaff = selectedService 
    ? getStaffBySpecialty(selectedService) 
    : staff

  // Get service details
  const serviceDetails = services.find(s => s.category === selectedService)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBookingStatus('loading')
    setErrorMessage('')

    try {
      // Validate required fields
      if (!selectedService || !selectedStylist || !selectedDate || !selectedTime || !customerName || !customerPhone) {
        throw new Error('Please fill in all required fields')
      }

      // Find selected staff member
      const stylistDetails = staff.find(s => s.id === selectedStylist)
      if (!stylistDetails) {
        throw new Error('Selected stylist not found')
      }

      // Create booking data
      const bookingData = {
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        service: serviceDetails?.name || selectedService,
        serviceCategory: selectedService,
        price: serviceDetails?.price.min || 0,
        duration: serviceDetails?.duration || '1 hour',
        stylistId: selectedStylist,
        stylistName: stylistDetails.name,
        date: selectedDate,
        time: selectedTime,
        status: 'confirmed' as const,
        notes: notes || undefined,
        bookingMethod: 'website_form' as const
      }

      // Add booking to system
      const booking = await addBooking(bookingData)
      
      setBookingStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setSelectedService('')
        setSelectedStylist('')
        setSelectedDate('')
        setSelectedTime('')
        setCustomerName('')
        setCustomerPhone('')
        setCustomerEmail('')
        setNotes('')
        setBookingStatus('idle')
      }, 3000)

    } catch (error) {
      console.error('Booking error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create booking')
      setBookingStatus('error')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { 
      style: 'currency', 
      currency: 'KES', 
      minimumFractionDigits: 0 
    }).format(amount)
  }

  // Generate available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  // Generate next 30 days for date selection
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-pearl-rose-light/30 to-champagne-silk-light/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="font-script bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              Book Your Session
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your look? Schedule your appointment with our expert stylists today.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Schedule Your Appointment</h3>
              <p className="opacity-90">Fill out the form below to book your beauty session</p>
            </div>

            <div className="p-8">
              {/* Success Message */}
              {bookingStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 animate-fadeIn">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Booking Confirmed! 🎉</h4>
                    <p className="text-sm text-green-700">
                      Your appointment has been successfully booked. We'll send you a confirmation shortly.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {bookingStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-fadeIn">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <h4 className="font-medium text-red-800">Booking Failed</h4>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Select Service *
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => {
                        setSelectedService(e.target.value)
                        setSelectedStylist('') // Reset stylist when service changes
                      }}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Choose a service...</option>
                      {[...new Set(services.map(s => s.category))].map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {serviceDetails && (
                      <div className="mt-2 p-3 bg-pearl-rose-light/20 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Duration:</strong> {serviceDetails.duration} | 
                          <strong> Price:</strong> {formatCurrency(serviceDetails.price.min)} - {formatCurrency(serviceDetails.price.max)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stylist Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Select Stylist *
                    </label>
                    <select
                      value={selectedStylist}
                      onChange={(e) => setSelectedStylist(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors"
                      required
                      disabled={!selectedService}
                    >
                      <option value="">Choose your stylist...</option>
                      {availableStaff.map(stylist => (
                        <option key={stylist.id} value={stylist.id}>
                          {stylist.name} - {stylist.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Select Date *
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Choose a date...</option>
                      {generateDates().map(date => {
                        const dateObj = new Date(date)
                        return (
                          <option key={date} value={date}>
                            {dateObj.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time *
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors"
                      required
                      disabled={!selectedDate}
                    >
                      <option value="">Choose a time...</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors"
                      required
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0712345678"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Customer Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or preferences..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={bookingStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white py-4 px-8 rounded-xl font-medium text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    {bookingStatus === 'loading' ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Booking Your Appointment...</span>
                      </div>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </form>

              {/* Contact Information */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-4">Need Help? Contact Us</h4>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                    <a
                      href="tel:0718779129"
                      className="flex items-center space-x-2 text-pearl-rose-dark hover:text-pearl-rose-dark/80 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>0718 779 129</span>
                    </a>
                    <a
                      href="https://wa.me/254718779129"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}