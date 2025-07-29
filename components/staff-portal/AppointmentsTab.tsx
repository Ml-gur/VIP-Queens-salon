import { CheckCircle, XCircle, Clock, Phone } from 'lucide-react'
import { Appointment } from './types'
import { formatCurrency } from './utils'

interface AppointmentsTabProps {
  appointments: Appointment[]
  onUpdateStatus: (id: number, status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => void
}

export function AppointmentsTab({ appointments, onUpdateStatus }: AppointmentsTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Completed': return 'bg-blue-100 text-blue-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 font-inter">My Appointments</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-inter">Total:</span>
          <span className="text-lg font-bold text-pearl-rose-dark font-inter">
            {formatCurrency(appointments.reduce((sum, apt) => sum + (apt.status === 'Completed' ? apt.price : 0), 0))}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800 font-inter">{appointment.clientName}</h4>
                <p className="text-gray-600 font-inter">{appointment.service}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-inter">{appointment.date} at {appointment.time}</span>
                  </span>
                  <span className="font-inter">Duration: {appointment.duration}</span>
                  <span className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span className="font-inter">{appointment.clientPhone}</span>
                  </span>
                </div>
                {appointment.notes && (
                  <p className="text-sm text-gray-600 mt-2 font-inter bg-white p-2 rounded-lg">
                    <strong>Notes:</strong> {appointment.notes}
                  </p>
                )}
              </div>
              <div className="text-right ml-4">
                <p className="text-xl font-bold text-gray-800 font-inter mb-2">
                  {formatCurrency(appointment.price)}
                </p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium font-inter ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                {appointment.status === 'Pending' && (
                  <button
                    onClick={() => onUpdateStatus(appointment.id, 'Confirmed')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-inter"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm</span>
                  </button>
                )}
                {appointment.status === 'Confirmed' && (
                  <button
                    onClick={() => onUpdateStatus(appointment.id, 'Completed')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-inter"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                )}
                {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                  <button
                    onClick={() => onUpdateStatus(appointment.id, 'Cancelled')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 font-inter"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.open(`tel:${appointment.clientPhone}`, '_self')}
                  className="bg-pearl-rose-dark text-white px-4 py-2 rounded-lg hover:bg-pearl-rose-dark/90 transition-colors font-inter"
                >
                  Call Client
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/254${appointment.clientPhone.slice(1)}`, '_blank')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-inter"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}