import { DollarSign, Calendar, Users, Clock, Star, TrendingUp, CheckCircle, Sparkles } from 'lucide-react'
import { OwnerStats } from './types'
import { formatCurrency } from './utils'
import { Booking } from '../booking/BookingContext'

interface DashboardTabProps {
  stats: OwnerStats
  bookings: Booking[]
  promotions: any[]
}

export function DashboardTab({ stats, bookings, promotions }: DashboardTabProps) {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">
            {formatCurrency(stats.totalRevenue)}
          </h3>
          <p className="text-gray-600 font-inter">Total Revenue</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-inter">
              {stats.pendingBookings} pending
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{stats.totalBookings}</h3>
          <p className="text-gray-600 font-inter">Total Bookings</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{stats.activeStaff}</h3>
          <p className="text-gray-600 font-inter">Active Staff</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-inter">
              Today
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{stats.todayBookings}</h3>
          <p className="text-gray-600 font-inter">Today's Bookings</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-rose-100 p-3 rounded-xl">
              <Star className="w-6 h-6 text-rose-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full font-inter">
              {promotions.filter(p => p.isActive).length} active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{promotions.length}</h3>
          <p className="text-gray-600 font-inter">Promotions</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 font-inter flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-pearl-rose-dark" />
            <span>Recent Bookings</span>
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-inter">Live Updates</span>
          </div>
        </div>
        <div className="space-y-4">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  booking.status === 'Confirmed' ? 'bg-green-500' :
                  booking.status === 'Pending' ? 'bg-yellow-500' :
                  booking.status === 'Completed' ? 'bg-blue-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-semibold text-gray-800 font-inter">{booking.customerName}</p>
                  <p className="text-sm text-gray-600 font-inter">{booking.service} with {booking.stylistName}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span className="font-inter">{booking.bookingMethod}</span>
                    <span>•</span>
                    <span className="font-inter">{booking.customerPhone}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800 font-inter">{formatCurrency(booking.price)}</p>
                <p className="text-sm text-gray-600 font-inter">{booking.date} at {booking.time}</p>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium font-inter ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-inter">No bookings yet. Bookings will appear here in real-time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}