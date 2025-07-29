import React from 'react'
import { User, Calendar, RefreshCw } from 'lucide-react'
import { getDateRange } from './constants'

interface StaffMember {
  id: string
  name: string
  role: string
}

interface StaffSidebarProps {
  staff: StaffMember[]
  selectedStaff: string
  selectedDate: string
  dayStats: {
    total: number
    confirmed: number
    completed: number
    revenue: number
  }
  loading: boolean
  onStaffChange: (staffId: string) => void
  onDateChange: (date: string) => void
  onRefresh: () => void
}

export function StaffSidebar({
  staff,
  selectedStaff,
  selectedDate,
  dayStats,
  loading,
  onStaffChange,
  onDateChange,
  onRefresh
}: StaffSidebarProps) {
  const dateRange = getDateRange()

  return (
    <div className="space-y-6">
      {/* Staff Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Staff Member</h3>
        <select
          value={selectedStaff}
          onChange={(e) => onStaffChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
        >
          {staff.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} ({member.role})
            </option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
        <div className="space-y-2">
          {dateRange.map((date) => (
            <button
              key={date.value}
              onClick={() => onDateChange(date.value)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                selectedDate === date.value
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-50 hover:bg-pink-50 text-gray-700'
              }`}
            >
              {date.label}
            </button>
          ))}
        </div>
      </div>

      {/* Day Statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Day Summary</h3>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Appointments</span>
            <span className="font-semibold">{dayStats.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Confirmed</span>
            <span className="font-semibold text-green-600">{dayStats.confirmed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completed</span>
            <span className="font-semibold text-blue-600">{dayStats.completed}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-600">Revenue</span>
            <span className="font-bold text-pink-600">KES {dayStats.revenue.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}