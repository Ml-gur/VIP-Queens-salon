import { DollarSign, TrendingUp, Calendar, Target } from 'lucide-react'
import { Appointment } from './types'
import { formatCurrency } from './utils'

interface EarningsTabProps {
  appointments: Appointment[]
}

export function EarningsTab({ appointments }: EarningsTabProps) {
  const completedAppointments = appointments.filter(apt => apt.status === 'Completed')
  const totalEarnings = completedAppointments.reduce((sum, apt) => sum + apt.price, 0)
  const averageService = totalEarnings > 0 ? Math.round(totalEarnings / completedAppointments.length) : 0
  const thisMonthEarnings = completedAppointments
    .filter(apt => new Date(apt.date).getMonth() === new Date().getMonth())
    .reduce((sum, apt) => sum + apt.price, 0)

  return (
    <div className="space-y-8">
      {/* Earnings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">
            {formatCurrency(totalEarnings)}
          </h3>
          <p className="text-gray-600 font-inter">Total Earnings</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-inter">
              This Month
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">
            {formatCurrency(thisMonthEarnings)}
          </h3>
          <p className="text-gray-600 font-inter">Monthly Earnings</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-inter">
              Average
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">
            {formatCurrency(averageService)}
          </h3>
          <p className="text-gray-600 font-inter">Per Service</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full font-inter">
              +15%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-inter">{completedAppointments.length}</h3>
          <p className="text-gray-600 font-inter">Services Completed</p>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 font-inter">Earnings Breakdown</h3>
        <div className="space-y-4">
          {completedAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-800 font-inter">{appointment.clientName}</p>
                  <p className="text-sm text-gray-600 font-inter">{appointment.service}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800 font-inter">
                  {formatCurrency(appointment.price)}
                </p>
                <p className="text-sm text-gray-600 font-inter">{appointment.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 font-inter">Performance Goals</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700 font-inter">Monthly Target</span>
              <span className="font-semibold text-gray-800 font-inter">
                {formatCurrency(thisMonthEarnings)} / {formatCurrency(50000)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((thisMonthEarnings / 50000) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1 font-inter">
              {Math.round((thisMonthEarnings / 50000) * 100)}% of monthly target achieved
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700 font-inter">Client Services</span>
              <span className="font-semibold text-gray-800 font-inter">
                {completedAppointments.length} / 30
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((completedAppointments.length / 30) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1 font-inter">
              {Math.round((completedAppointments.length / 30) * 100)}% of service target achieved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}