import { Booking } from '../booking/BookingContext'
import { Staff, OwnerStats } from './types'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0
  }).format(amount)
}

export const calculateOwnerStats = (bookings: Booking[], staffList: Staff[]): OwnerStats => {
  const today = new Date().toISOString().split('T')[0]
  
  return {
    totalRevenue: bookings.filter(apt => apt.status === 'Completed').reduce((sum, apt) => sum + apt.price, 0),
    totalBookings: bookings.length,
    activeStaff: staffList.filter(staff => staff.status === 'Active').length,
    pendingBookings: bookings.filter(apt => apt.status === 'Pending').length,
    todayBookings: bookings.filter(apt => apt.date === today).length
  }
}

export const validateStaffForm = (staff: Partial<Staff>): boolean => {
  return !!(staff.name && staff.role && staff.email && staff.phone && staff.salary)
}

export const validatePromotionForm = (promotion: any): boolean => {
  return !!(promotion.title && promotion.description && promotion.discount && promotion.validFrom && promotion.validTo)
}

export const createNewStaff = (staffData: Partial<Staff>): Staff => {
  return {
    id: Date.now(),
    name: staffData.name!,
    role: staffData.role!,
    email: staffData.email!,
    phone: staffData.phone!,
    salary: staffData.salary!,
    specialties: staffData.specialties || [],
    experience: staffData.experience || '0 years',
    rating: 5.0,
    image: staffData.image || 'https://via.placeholder.com/100',
    status: 'Active',
    hireDate: new Date().toISOString().split('T')[0]
  }
}