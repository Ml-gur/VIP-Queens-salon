export interface Appointment {
  id: number
  clientName: string
  service: string
  date: string
  time: string
  duration: string
  price: number
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
  clientPhone: string
  notes?: string
}

export interface StaffInfo {
  name: string
  role: string
  image: string
  rating: number
  totalClients: number
  completedAppointments: number
  email: string
  phone: string
  specialties: string[]
  experience: string
}

export interface StaffStats {
  todayAppointments: number
  upcomingAppointments: number
  totalRevenue: number
  completionRate: number
}