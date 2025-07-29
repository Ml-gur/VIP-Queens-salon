import { Calendar, Clock, Star, DollarSign } from 'lucide-react'
import { StaffStats, StaffInfo, Appointment } from './types'
import { formatCurrency } from './utils'

interface DashboardTabProps {
  stats: StaffStats
  staffInfo: StaffInfo
  appointments: Appointment[]
}

export function DashboardTab({ stats, staffInfo, appointments }: DashboardTabProps) {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-inter">
              Today
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{stats.todayAppointments}</h3>
          <p className="text-gray-600 font-inter">Today's Appointments</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full font-inter">
              Upcoming
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{stats.upcomingAppointments}</h3>
          <p className="text-gray-600 font-inter">Upcoming Bookings</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700 font-inter">{staffInfo.rating}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{staffInfo.totalClients}</h3>
          <p className="text-gray-600 font-inter">Total Clients</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-inter">
              {stats.completionRate}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">
            {formatCurrency(stats.totalRevenue)}
          </h3>
          <p className="text-gray-600 font-inter">Total Earnings</p>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 font-inter">Recent Appointments</h3>
        <div className="space-y-4">
          {appointments.slice(0, 5).map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  appointment.status === 'Confirmed' ? 'bg-green-500' :
                  appointment.status === 'Pending' ? 'bg-yellow-500' :
                  appointment.status === 'Completed' ? 'bg-blue-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-semibold text-gray-800 font-inter">{appointment.clientName}</p>
                  <p className="text-sm text-gray-600 font-inter">{appointment.service}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800 font-inter">{formatCurrency(appointment.price)}</p>
                <p className="text-sm text-gray-600 font-inter">{appointment.date} at {appointment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}