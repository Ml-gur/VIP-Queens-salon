import React from 'react'
import { User, Phone, Clock, CheckCircle, XCircle } from 'lucide-react'
import { STAFF_PORTAL_CONSTANTS } from './constants'

interface Appointment {
  id: string
  customerName: string
  customerPhone: string
  startTime: string
  endTime: string
  status: string
  service: {
    name: string
    price: number
  }
}

interface AppointmentCardProps {
  appointment: Appointment
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    return STAFF_PORTAL_CONSTANTS.STATUS_COLORS[status as keyof typeof STAFF_PORTAL_CONSTANTS.STATUS_COLORS] || 
           STAFF_PORTAL_CONSTANTS.STATUS_COLORS.default
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-pink-100 p-2 rounded-full">
              <User className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{appointment.customerName}</h4>
              <p className="text-gray-600">{appointment.service?.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{appointment.startTime} - {appointment.endTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <a 
                href={`tel:${appointment.customerPhone}`} 
                className="font-medium text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Phone className="h-3 w-3" />
                <span>{appointment.customerPhone}</span>
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service Price</p>
              <p className="font-medium text-green-600">KES {appointment.service?.price?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusIcon(appointment.status)}
                <span className="capitalize">{appointment.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100">
        <a
          href={`tel:${appointment.customerPhone}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Phone className="h-4 w-4" />
          <span>Call Customer</span>
        </a>
        
        <a
          href={`https://wa.me/${appointment.customerPhone.replace('+', '')}?text=Hello ${appointment.customerName}, this is regarding your appointment at Annabella's Hair Salon.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <span>💬</span>
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}