import { Appointment, StaffInfo } from './types'

export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    clientName: 'Sarah Wanjiku',
    service: 'Hair Styling & Cut',
    date: '2025-01-30',
    time: '10:00 AM',
    duration: '1.5 hours',
    price: 2500,
    status: 'Confirmed',
    clientPhone: '0712 345 678',
    notes: 'First time client, prefers natural look'
  },
  {
    id: 2,
    clientName: 'Grace Mwangi',
    service: 'Color Treatment',
    date: '2025-01-30',
    time: '2:00 PM',
    duration: '2 hours',
    price: 4500,
    status: 'Pending',
    clientPhone: '0723 456 789',
    notes: 'Wants to go blonde, patch test completed'
  },
  {
    id: 3,
    clientName: 'Mary Kamau',
    service: 'Bridal Styling',
    date: '2025-01-31',
    time: '11:00 AM',
    duration: '3 hours',
    price: 6000,
    status: 'Confirmed',
    clientPhone: '0734 567 890',
    notes: 'Wedding on Feb 2nd, trial run'
  },
  {
    id: 4,
    clientName: 'Jane Ochieng',
    service: 'Deep Conditioning',
    date: '2025-01-29',
    time: '3:00 PM',
    duration: '1.5 hours',
    price: 2000,
    status: 'Completed',
    clientPhone: '0745 678 901',
    notes: 'Regular client, loves our protein treatment'
  }
]

export const INITIAL_STAFF_INFO: StaffInfo = {
  name: 'Catherine',
  role: 'Senior Stylist & Owner',
  image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/catherine_s3vklr.jpg',
  rating: 4.9,
  totalClients: 250,
  completedAppointments: 180,
  email: 'catherine@vipqueenssalon.com',
  phone: '0718 779 129',
  specialties: ['Hair Styling', 'Color Expert', 'Bridal Styling'],
  experience: '15+ years'
}

export const NAVIGATION_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'Calendar' },
  { id: 'appointments', label: 'Appointments', icon: 'Clock' },
  { id: 'profile', label: 'My Profile', icon: 'User' },
  { id: 'earnings', label: 'Earnings', icon: 'Star' }
] as const