import { Calendar, Phone, MessageCircle, Sparkles } from 'lucide-react'
import { formatCurrency } from './utils'
import { Booking } from '../booking/BookingContext'

interface BookingsTabProps {
  bookings: Booking[]
  totalRevenue: number
  onUpdateBookingStatus: (bookingId: string, newStatus: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => Promise<void>
}

export function BookingsTab({ bookings, totalRevenue, onUpdateBookingStatus }: BookingsTabProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 font-inter flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-pearl-rose-dark" />
          <span>Live Booking Management</span>
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-inter">Auto-refreshing</span>
          </div>
          <span className="text-lg font-bold text-green-600 font-inter">
            {formatCurrency(totalRevenue)}
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 font-inter">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 font-inter">Service</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 font-inter">Stylist</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 font-inter">Date & Time</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 font-inter">Price</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700 font-inter">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700 font-inter">Method</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700 font-inter">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-semibold text-gray-800 font-inter">{booking.customerName}</p>
                    <p className="text-sm text-gray-600 font-inter">{booking.customerPhone}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-gray-800 font-inter">{booking.service}</p>
                    <p className="text-sm text-gray-600 font-inter">{booking.duration}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-gray-800 font-inter">{booking.stylistName}</p>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-gray-800 font-inter">{booking.date}</p>
                    <p className="text-sm text-gray-600 font-inter">{booking.time}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="font-semibold text-gray-800 font-inter">
                    {formatCurrency(booking.price)}
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  <select
                    value={booking.status}
                    onChange={(e) => onUpdateBookingStatus(booking.id, e.target.value as any)}
                    className={`px-3 py-1 rounded-full text-sm font-medium font-inter border-0 ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-inter bg-gray-100 text-gray-800">
                    {booking.bookingMethod === 'AI_Chat' ? '🤖 AI Chat' : 
                     booking.bookingMethod === 'Website' ? '🌐 Website' : 
                     '📱 WhatsApp'}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => window.open(`tel:${booking.customerPhone}`, '_self')}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      title="Call Customer"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(`https://wa.me/254${booking.customerPhone.slice(1)}`, '_blank')}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      title="WhatsApp Customer"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {bookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2 font-inter">No Bookings Yet</h4>
            <p className="text-gray-500 font-inter">
              New bookings from the website, AI chat, and WhatsApp will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}