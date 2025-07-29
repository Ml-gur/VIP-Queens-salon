import { Appointment } from './types'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0
  }).format(amount)
}

export const getTodaysAppointments = (appointments: Appointment[]): Appointment[] => {
  const today = new Date().toISOString().split('T')[0]
  return appointments.filter(apt => apt.date === today)
}

export const getUpcomingAppointments = (appointments: Appointment[]): Appointment[] => {
  const today = new Date().toISOString().split('T')[0]
  return appointments.filter(apt => apt.date > today)
}

export const calculateStats = (appointments: Appointment[]) => {
  const todayAppointments = getTodaysAppointments(appointments)
  const upcomingAppointments = getUpcomingAppointments(appointments)
  const completedAppointments = appointments.filter(apt => apt.status === 'Completed')
  const totalRevenue = completedAppointments.reduce((sum, apt) => sum + apt.price, 0)
  const completionRate = appointments.length > 0 
    ? Math.round((completedAppointments.length / appointments.length) * 100)
    : 0

  return {
    todayAppointments: todayAppointments.length,
    upcomingAppointments: upcomingAppointments.length,
    totalRevenue,
    completionRate
  }
}