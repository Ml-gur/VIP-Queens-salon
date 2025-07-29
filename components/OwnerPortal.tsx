import { useState, useEffect } from 'react'
import { ArrowLeft, BarChart3, Calendar, Users, Star } from 'lucide-react'
import { useBooking } from './booking/BookingContext'
import { Staff, Promotion } from './owner-portal/types'
import { SAMPLE_STAFF, SAMPLE_PROMOTIONS } from './owner-portal/constants'
import { calculateOwnerStats } from './owner-portal/utils'
import { DashboardTab } from './owner-portal/DashboardTab'
import { BookingsTab } from './owner-portal/BookingsTab'
import { StaffTab } from './owner-portal/StaffTab'
import { PromotionsTab } from './owner-portal/PromotionsTab'

interface OwnerPortalProps {
  onBack: () => void
}

export function OwnerPortal({ onBack }: OwnerPortalProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])

  const { bookings, updateBooking, refreshBookings } = useBooking()

  // Auto-refresh bookings every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshBookings()
    }, 30000)

    return () => clearInterval(interval)
  }, [refreshBookings])

  // Initialize data
  useEffect(() => {
    setStaffList(SAMPLE_STAFF)
    setPromotions(SAMPLE_PROMOTIONS)
  }, [])

  const handleBookingStatusUpdate = async (bookingId: string, newStatus: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => {
    try {
      await updateBooking(bookingId, { status: newStatus })
    } catch (error) {
      console.error('Failed to update booking status:', error)
    }
  }

  // Staff Management Functions
  const handleAddStaff = (staff: Staff) => {
    setStaffList([...staffList, staff])
  }

  const handleEditStaff = (id: number, field: keyof Staff, value: any) => {
    setStaffList(staffList.map(staff => 
      staff.id === id ? { ...staff, [field]: value } : staff
    ))
  }

  const handleDeleteStaff = (id: number) => {
    setStaffList(staffList.filter(staff => staff.id !== id))
  }

  // Promotion Management Functions
  const handleAddPromotion = (promotion: Promotion) => {
    setPromotions([...promotions, promotion])
  }

  const handleEditPromotion = (id: number, field: keyof Promotion, value: any) => {
    setPromotions(promotions.map(promo => 
      promo.id === id ? { ...promo, [field]: value } : promo
    ))
  }

  const handleDeletePromotion = (id: number) => {
    setPromotions(promotions.filter(promo => promo.id !== id))
  }

  const stats = calculateOwnerStats(bookings, staffList)

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'bookings', label: 'Live Bookings', icon: Calendar },
    { id: 'staff', label: 'Staff Management', icon: Users },
    { id: 'promotions', label: 'Promotions', icon: Star }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab stats={stats} bookings={bookings} promotions={promotions} />
      case 'bookings':
        return <BookingsTab bookings={bookings} totalRevenue={stats.totalRevenue} onUpdateBookingStatus={handleBookingStatusUpdate} />
      case 'staff':
        return <StaffTab staffList={staffList} onAddStaff={handleAddStaff} onEditStaff={handleEditStaff} onDeleteStaff={handleDeleteStaff} />
      case 'promotions':
        return <PromotionsTab promotions={promotions} onAddPromotion={handleAddPromotion} onEditPromotion={handleEditPromotion} onDeletePromotion={handleDeletePromotion} />
      default:
        return <DashboardTab stats={stats} bookings={bookings} promotions={promotions} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl-rose-light to-champagne-silk-light">
      <div className="container-mobile py-8">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="bg-pearl-rose-light hover:bg-pearl-rose text-pearl-rose-dark p-3 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 font-inter">Owner Dashboard</h1>
                <p className="text-gray-600 font-inter">Real-time business management for VIP Queens Salon</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-inter">Live Updates</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 mb-8 shadow-lg border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 font-inter ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white shadow-lg'
                    : 'text-gray-600 hover:bg-pearl-rose-light/30'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
}