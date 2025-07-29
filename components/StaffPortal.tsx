import { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, Clock, User, Star } from 'lucide-react'
import { Appointment, StaffInfo } from './staff-portal/types'
import { SAMPLE_APPOINTMENTS, INITIAL_STAFF_INFO } from './staff-portal/constants'
import { calculateStats } from './staff-portal/utils'
import { DashboardTab } from './staff-portal/DashboardTab'
import { AppointmentsTab } from './staff-portal/AppointmentsTab'
import { ProfileTab } from './staff-portal/ProfileTab'
import { EarningsTab } from './staff-portal/EarningsTab'

interface StaffPortalProps {
  onBack: () => void
}

export function StaffPortal({ onBack }: StaffPortalProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [staffInfo, setStaffInfo] = useState<StaffInfo>(INITIAL_STAFF_INFO)

  useEffect(() => {
    setAppointments(SAMPLE_APPOINTMENTS)
  }, [])

  const updateAppointmentStatus = (id: number, status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ))
  }

  const handleProfileUpdate = (field: keyof StaffInfo, value: any) => {
    setStaffInfo({ ...staffInfo, [field]: value })
  }

  const stats = calculateStats(appointments)

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'appointments', label: 'Appointments', icon: Clock },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'earnings', label: 'Earnings', icon: Star }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab stats={stats} staffInfo={staffInfo} appointments={appointments} />
      case 'appointments':
        return <AppointmentsTab appointments={appointments} onUpdateStatus={updateAppointmentStatus} />
      case 'profile':
        return <ProfileTab staffInfo={staffInfo} onUpdateProfile={handleProfileUpdate} />
      case 'earnings':
        return <EarningsTab appointments={appointments} />
      default:
        return <DashboardTab stats={stats} staffInfo={staffInfo} appointments={appointments} />
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
                <h1 className="text-3xl font-bold text-gray-800 font-inter">Staff Portal</h1>
                <p className="text-gray-600 font-inter">Manage your appointments and profile</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 font-inter">Welcome back,</p>
                <p className="font-semibold text-gray-800 font-inter">{staffInfo.name}</p>
              </div>
              <img
                src={staffInfo.image}
                alt={staffInfo.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-pearl-rose-dark"
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 mb-8 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
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