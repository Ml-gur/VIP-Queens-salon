export interface Staff {
  id: number
  name: string
  role: string
  email: string
  phone: string
  salary: number
  specialties: string[]
  experience: string
  rating: number
  image: string
  status: 'Active' | 'Inactive'
  hireDate: string
}

export interface Promotion {
  id: number
  title: string
  description: string
  discount: number
  validFrom: string
  validTo: string
  isActive: boolean
  category: string
}

export interface OwnerStats {
  totalRevenue: number
  totalBookings: number
  activeStaff: number
  pendingBookings: number
  todayBookings: number
}