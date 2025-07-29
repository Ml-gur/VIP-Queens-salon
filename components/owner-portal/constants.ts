import { Staff, Promotion } from './types'

export const SAMPLE_STAFF: Staff[] = [
  {
    id: 1,
    name: 'Catherine',
    role: 'Senior Stylist & Owner',
    email: 'catherine@vipqueenssalon.com',
    phone: '0718 779 129',
    salary: 50000,
    specialties: ['Hair Styling', 'Color Expert', 'Bridal Styling'],
    experience: '15+ years',
    rating: 4.9,
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/catherine_s3vklr.jpg',
    status: 'Active',
    hireDate: '2020-01-15'
  },
  {
    id: 2,
    name: 'Njeri',
    role: 'Hair Specialist',
    email: 'njeri@vipqueenssalon.com',
    phone: '0712 345 678',
    salary: 35000,
    specialties: ['Natural Hair Care', 'Protective Styles', 'Hair Treatments'],
    experience: '8+ years',
    rating: 4.8,
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/njeri_i7nxbj.jpg',
    status: 'Active',
    hireDate: '2021-03-10'
  },
  {
    id: 3,
    name: 'Ann',
    role: 'Braiding Expert',
    email: 'ann@vipqueenssalon.com',
    phone: '0723 456 789',
    salary: 32000,
    specialties: ['Braiding', 'Weaving', 'Extensions'],
    experience: '10+ years',
    rating: 4.9,
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/ann_qcjpxg.jpg',
    status: 'Active',
    hireDate: '2020-08-22'
  },
  {
    id: 4,
    name: 'Rachael',
    role: 'Nail Technician',
    email: 'rachael@vipqueenssalon.com',
    phone: '0734 567 890',
    salary: 28000,
    specialties: ['Manicure', 'Pedicure', 'Nail Art'],
    experience: '6+ years',
    rating: 4.7,
    image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753684481/rachael_r0w9s6.jpg',
    status: 'Active',
    hireDate: '2022-02-14'
  }
]

export const SAMPLE_PROMOTIONS: Promotion[] = [
  {
    id: 1,
    title: 'First Time Discount',
    description: '20% off your first visit to VIP Queens Salon',
    discount: 20,
    validFrom: '2025-01-01',
    validTo: '2025-12-31',
    isActive: true,
    category: 'New Client'
  },
  {
    id: 2,
    title: 'Student Special',
    description: 'Show your student ID and get 15% off all services',
    discount: 15,
    validFrom: '2025-01-01',
    validTo: '2025-06-30',
    isActive: true,
    category: 'Student'
  },
  {
    id: 3,
    title: 'Bridal Package',
    description: 'Complete bridal package with hair, makeup, and nails',
    discount: 25,
    validFrom: '2025-02-01',
    validTo: '2025-12-31',
    isActive: false,
    category: 'Wedding'
  }
]

export const NAVIGATION_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
  { id: 'bookings', label: 'Live Bookings', icon: 'Calendar' },
  { id: 'staff', label: 'Staff Management', icon: 'Users' },
  { id: 'promotions', label: 'Promotions', icon: 'Star' }
] as const