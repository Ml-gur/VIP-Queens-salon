import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Inline all the booking utility functions and types
export interface BookingData {
  id: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  service: string
  serviceCategory: string
  price: number
  duration: string
  stylistId: string
  stylistName: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  bookingMethod: 'website' | 'whatsapp' | 'ai_chat' | 'website_form'
  createdAt: string
  updatedAt: string
}

// Utility functions inlined to avoid import issues
export const timeToMinutes = (timeStr: string): number => {
  try {
    const cleanTime = timeStr.replace(/\s*(AM|PM)\s*/i, '')
    const [hours, minutes] = cleanTime.split(':').map(Number)
    
    let totalMinutes = hours * 60 + (minutes || 0)
    
    // Handle AM/PM format
    if (timeStr.match(/PM/i) && hours !== 12) {
      totalMinutes += 12 * 60
    } else if (timeStr.match(/AM/i) && hours === 12) {
      totalMinutes -= 12 * 60
    }
    
    return totalMinutes
  } catch (error) {
    return 0
  }
}

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  const period = hours >= 12 ? 'PM' : 'AM'
  
  return `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`
}

export const generateBookingId = (): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `booking_${timestamp}_${random}`
}

export const getDateDayName = (dateStr: string): string => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  } catch (error) {
    return ''
  }
}

export const isDateInWorkingDays = (dateStr: string, workingDays: string[]): boolean => {
  const dayName = getDateDayName(dateStr)
  return workingDays.includes(dayName)
}

export const generateTimeSlots = (
  startTime: string, 
  endTime: string, 
  intervalMinutes: number = 60
): string[] => {
  const slots: string[] = []
  const startMinutes = timeToMinutes(startTime)
  const endMinutes = timeToMinutes(endTime)
  
  for (let minutes = startMinutes; minutes < endMinutes; minutes += intervalMinutes) {
    slots.push(minutesToTime(minutes))
  }
  
  return slots
}

export const checkTimeConflict = (
  newStart: string,
  newDuration: number,
  existingStart: string,
  existingDuration: number
): boolean => {
  const newStartMinutes = timeToMinutes(newStart)
  const newEndMinutes = newStartMinutes + newDuration
  const existingStartMinutes = timeToMinutes(existingStart)
  const existingEndMinutes = existingStartMinutes + existingDuration
  
  return (newStartMinutes < existingEndMinutes && newEndMinutes > existingStartMinutes)
}

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export const loadFromLocalStorage = (key: string): any => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Failed to load from localStorage:', error)
    return null
  }
}

export interface Booking extends BookingData {}

export interface Staff {
  id: string
  name: string
  role: string
  image: string
  specialties: string[]
  isAvailable: boolean
  workingHours: {
    start: string
    end: string
    days: string[]
  }
}

export interface Service {
  id: string
  name: string
  category: string
  price: { min: number; max: number }
  duration: string
  durationMinutes: number
  description: string
}

interface BookingContextType {
  bookings: Booking[]
  staff: Staff[]
  services: Service[]
  isLoading: boolean
  error: string | null
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Booking>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>
  deleteBooking: (id: string) => Promise<void>
  getAvailableSlots: (date: string, stylistId: string, durationMinutes: number) => Promise<string[]>
  isSlotAvailable: (date: string, time: string, stylistId: string, durationMinutes: number) => Promise<boolean>
  getStaffBySpecialty: (specialty: string) => Staff[]
  getServicesByCategory: (category: string) => Service[]
  refreshBookings: () => Promise<void>
  refreshAll: () => Promise<void>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

// Static services data
const SERVICES_DATA: Service[] = [
  {
    id: 'service_1',
    name: 'Basic Haircut & Styling',
    category: 'Hair Styling',
    price: { min: 1500, max: 2500 },
    duration: '1.5 hours',
    durationMinutes: 90,
    description: 'Professional haircut with styling and finishing'
  },
  {
    id: 'service_2',
    name: 'Premium Cut & Style',
    category: 'Hair Styling',
    price: { min: 2500, max: 3500 },
    duration: '2 hours',
    durationMinutes: 120,
    description: 'Luxurious haircut with advanced styling techniques'
  },
  {
    id: 'service_3',
    name: 'Professional Blow Dry',
    category: 'Hair Styling',
    price: { min: 1200, max: 2000 },
    duration: '1 hour',
    durationMinutes: 60,
    description: 'Expert blow dry with volume and shine'
  },
  {
    id: 'service_4',
    name: 'Box Braids',
    category: 'Hair Braiding',
    price: { min: 3000, max: 6000 },
    duration: '4 hours',
    durationMinutes: 240,
    description: 'Beautiful protective box braids in various sizes'
  },
  {
    id: 'service_5',
    name: 'Cornrows',
    category: 'Hair Braiding',
    price: { min: 2000, max: 4000 },
    duration: '2.5 hours',
    durationMinutes: 150,
    description: 'Classic cornrow styles with creative patterns'
  },
  {
    id: 'service_6',
    name: 'Twist Styles',
    category: 'Hair Braiding',
    price: { min: 2500, max: 5000 },
    duration: '3 hours',
    durationMinutes: 180,
    description: 'Elegant twist styles for all occasions'
  },
  {
    id: 'service_7',
    name: 'Deep Conditioning Treatment',
    category: 'Hair Treatment',
    price: { min: 1500, max: 2500 },
    duration: '1.5 hours',
    durationMinutes: 90,
    description: 'Intensive moisture treatment for healthy hair'
  },
  {
    id: 'service_8',
    name: 'Protein Hair Treatment',
    category: 'Hair Treatment',
    price: { min: 2000, max: 3000 },
    duration: '2 hours',
    durationMinutes: 120,
    description: 'Strengthening protein treatment for damaged hair'
  },
  {
    id: 'service_9',
    name: 'Hot Oil Treatment',
    category: 'Hair Treatment',
    price: { min: 1000, max: 1800 },
    duration: '1 hour',
    durationMinutes: 60,
    description: 'Nourishing hot oil treatment for scalp health'
  },
  {
    id: 'service_10',
    name: 'Chemical Relaxer',
    category: 'Hair Relaxing',
    price: { min: 2000, max: 3500 },
    duration: '2.5 hours',
    durationMinutes: 150,
    description: 'Professional chemical relaxer for smooth results'
  },
  {
    id: 'service_11',
    name: 'Keratin Treatment',
    category: 'Hair Relaxing',
    price: { min: 4000, max: 6000 },
    duration: '3 hours',
    durationMinutes: 180,
    description: 'Premium keratin treatment for frizz-free hair'
  },
  {
    id: 'service_12',
    name: 'Gel Manicure',
    category: 'Nail Services',
    price: { min: 1200, max: 1800 },
    duration: '1.25 hours',
    durationMinutes: 75,
    description: 'Long-lasting gel manicure with chip-resistant finish'
  },
  {
    id: 'service_13',
    name: 'Spa Pedicure',
    category: 'Nail Services',
    price: { min: 1500, max: 2000 },
    duration: '1.5 hours',
    durationMinutes: 90,
    description: 'Luxurious spa pedicure with exfoliation and massage'
  },
  {
    id: 'service_14',
    name: 'Nail Art Design',
    category: 'Nail Services',
    price: { min: 500, max: 1500 },
    duration: '1 hour',
    durationMinutes: 60,
    description: 'Creative nail art designs and decorations'
  }
]

// Static staff data
const STAFF_DATA: Staff[] = [
  {
    id: 'staff_1',
    name: 'Catherine',
    role: 'Senior Stylist & Owner',
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/catherine_s3vklr.jpg',
    specialties: ['Hair Styling', 'Hair Treatment', 'Hair Relaxing'],
    isAvailable: true,
    workingHours: {
      start: '06:00',
      end: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  {
    id: 'staff_2',
    name: 'Njeri',
    role: 'Hair Specialist',
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/njeri_i7nxbj.jpg',
    specialties: ['Hair Styling', 'Hair Treatment', 'Hair Relaxing'],
    isAvailable: true,
    workingHours: {
      start: '06:00',
      end: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  {
    id: 'staff_3',
    name: 'Ann',
    role: 'Braiding Expert',
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/ann_qcjpxg.jpg',
    specialties: ['Hair Braiding'],
    isAvailable: true,
    workingHours: {
      start: '06:00',
      end: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  {
    id: 'staff_4',
    name: 'Rachael',
    role: 'Nail Technician',
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/rachael_r0w9s6.jpg',
    specialties: ['Nail Services'],
    isAvailable: true,
    workingHours: {
      start: '06:00',
      end: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  }
]

const BOOKINGS_STORAGE_KEY = 'vip-queens-bookings'

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [staff] = useState<Staff[]>(STAFF_DATA)
  const [services] = useState<Service[]>(SERVICES_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load initial bookings from localStorage
  useEffect(() => {
    loadBookings()
  }, [])

  // Auto-save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length >= 0) { // Save even when empty
      saveToLocalStorage(BOOKINGS_STORAGE_KEY, bookings)
    }
  }, [bookings])

  const loadBookings = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const stored = loadFromLocalStorage(BOOKINGS_STORAGE_KEY)
      if (stored && Array.isArray(stored)) {
        setBookings(stored)
      }
    } catch (err) {
      console.error('Failed to load bookings:', err)
      setError('Failed to load existing bookings')
    } finally {
      setIsLoading(false)
    }
  }

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> => {
    try {
      setError(null)
      
      // Validate that service exists
      const service = services.find(s => s.name === bookingData.service)
      if (!service) {
        throw new Error('Selected service not found')
      }

      // Validate that staff exists
      const staffMember = staff.find(s => s.name === bookingData.stylistName)
      if (!staffMember) {
        throw new Error('Selected stylist not found')
      }

      // Check for conflicts
      const hasConflict = bookings.some(booking => {
        if (booking.date !== bookingData.date || 
            booking.stylistId !== bookingData.stylistId || 
            booking.status === 'cancelled') {
          return false
        }
        
        // Calculate time overlap
        return checkTimeConflict(
          bookingData.time,
          service.durationMinutes,
          booking.time,
          parseInt(booking.duration.split(' ')[0]) * 60
        )
      })

      if (hasConflict) {
        throw new Error('This time slot is no longer available')
      }

      const newBooking: Booking = {
        ...bookingData,
        id: generateBookingId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setBookings(prev => [newBooking, ...prev])
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return newBooking
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      setError(null)
      
      setBookings(prev => prev.map(booking => 
        booking.id === id 
          ? { ...booking, ...updates, updatedAt: new Date().toISOString() }
          : booking
      ))

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update booking'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const deleteBooking = async (id: string) => {
    try {
      setError(null)
      
      setBookings(prev => prev.filter(booking => booking.id !== id))

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete booking'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const getAvailableSlots = async (date: string, stylistId: string, durationMinutes: number): Promise<string[]> => {
    try {
      const staffMember = staff.find(s => s.id === stylistId)
      if (!staffMember) return []

      // Check if date is within working days
      if (!isDateInWorkingDays(date, staffMember.workingHours.days)) {
        return []
      }

      // Get existing bookings for this date and staff
      const existingBookings = bookings.filter(booking => 
        booking.date === date && 
        booking.stylistId === stylistId && 
        booking.status !== 'cancelled'
      )

      // Generate all possible time slots
      const allSlots = generateTimeSlots(
        staffMember.workingHours.start,
        staffMember.workingHours.end,
        60 // 1 hour intervals
      )

      // Filter out conflicted slots
      const availableSlots = allSlots.filter(slot => {
        return !existingBookings.some(booking => {
          const bookingDurationMinutes = parseInt(booking.duration.split(' ')[0]) * 60
          return checkTimeConflict(slot, durationMinutes, booking.time, bookingDurationMinutes)
        })
      })
      
      return availableSlots.slice(0, 8) // Limit to 8 slots for UI
    } catch (err) {
      console.error('Failed to get available slots:', err)
      return []
    }
  }

  const isSlotAvailable = async (date: string, time: string, stylistId: string, durationMinutes: number): Promise<boolean> => {
    try {
      const availableSlots = await getAvailableSlots(date, stylistId, durationMinutes)
      return availableSlots.includes(time)
    } catch (err) {
      console.error('Failed to check slot availability:', err)
      return false
    }
  }

  const getStaffBySpecialty = (specialty: string): Staff[] => {
    return staff.filter(member => member.specialties.includes(specialty) && member.isAvailable)
  }

  const getServicesByCategory = (category: string): Service[] => {
    return services.filter(service => service.category === category)
  }

  const refreshBookings = async () => {
    await loadBookings()
  }

  const refreshAll = async () => {
    await loadBookings()
  }

  const contextValue: BookingContextType = {
    bookings,
    staff,
    services,
    isLoading,
    error,
    addBooking,
    updateBooking,
    deleteBooking,
    getAvailableSlots,
    isSlotAvailable,
    getStaffBySpecialty,
    getServicesByCategory,
    refreshBookings,
    refreshAll
  }

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  )
}