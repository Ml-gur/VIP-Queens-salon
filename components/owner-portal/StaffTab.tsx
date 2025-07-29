import { useState } from 'react'
import { UserPlus, Edit3, Trash2, Save, X, Mail, Phone, DollarSign, Star } from 'lucide-react'
import { Staff } from './types'
import { formatCurrency, validateStaffForm, createNewStaff } from './utils'

interface StaffTabProps {
  staffList: Staff[]
  onAddStaff: (staff: Staff) => void
  onEditStaff: (id: number, field: keyof Staff, value: any) => void
  onDeleteStaff: (id: number) => void
}

export function StaffTab({ staffList, onAddStaff, onEditStaff, onDeleteStaff }: StaffTabProps) {
  const [isEditingStaff, setIsEditingStaff] = useState<number | null>(null)
  const [isAddingStaff, setIsAddingStaff] = useState(false)
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({})

  const handleAddStaff = () => {
    if (validateStaffForm(newStaff)) {
      const staff = createNewStaff(newStaff)
      onAddStaff(staff)
      setNewStaff({})
      setIsAddingStaff(false)
    }
  }

  const handleDeleteStaff = (id: number) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      onDeleteStaff(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 font-inter">Staff Directory</h3>
          <button
            onClick={() => setIsAddingStaff(true)}
            className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-inter"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Staff</span>
          </button>
        </div>

        {/* Add Staff Form */}
        {isAddingStaff && (
          <div className="mb-6 p-6 border-2 border-pearl-rose/20 rounded-xl bg-pearl-rose-light/10">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 font-inter">Add New Staff Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newStaff.name || ''}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
              />
              <input
                type="text"
                placeholder="Role/Position"
                value={newStaff.role || ''}
                onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newStaff.email || ''}
                onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newStaff.phone || ''}
                onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
              />
              <input
                type="number"
                placeholder="Monthly Salary (KES)"
                value={newStaff.salary || ''}
                onChange={(e) => setNewStaff({...newStaff, salary: parseInt(e.target.value)})}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
              />
              <input
                type="text"
                placeholder="Experience (e.g., 5+ years)"
                value={newStaff.experience || ''}
                onChange={(e) => setNewStaff({...newStaff, experience: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddStaff}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2 font-inter"
              >
                <Save className="w-4 h-4" />
                <span>Add Staff</span>
              </button>
              <button
                onClick={() => {setIsAddingStaff(false); setNewStaff({})}}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors flex items-center space-x-2 font-inter"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* Staff Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {staffList.map((staff) => (
            <div key={staff.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    {isEditingStaff === staff.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={staff.name}
                          onChange={(e) => onEditStaff(staff.id, 'name', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg font-inter text-sm"
                        />
                        <input
                          type="text"
                          value={staff.role}
                          onChange={(e) => onEditStaff(staff.id, 'role', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg font-inter text-sm"
                        />
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 font-inter">{staff.name}</h4>
                        <p className="text-sm text-gray-600 font-inter">{staff.role}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 font-inter">{staff.rating}</span>
                          <span className="text-sm text-gray-500 font-inter">• {staff.experience}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditingStaff === staff.id ? (
                    <>
                      <button
                        onClick={() => setIsEditingStaff(null)}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsEditingStaff(null)}
                        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditingStaff(staff.id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(staff.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    {isEditingStaff === staff.id ? (
                      <input
                        type="email"
                        value={staff.email}
                        onChange={(e) => onEditStaff(staff.id, 'email', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg font-inter text-sm flex-1"
                      />
                    ) : (
                      <span className="text-sm text-gray-700 font-inter truncate">{staff.email}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    {isEditingStaff === staff.id ? (
                      <input
                        type="tel"
                        value={staff.phone}
                        onChange={(e) => onEditStaff(staff.id, 'phone', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg font-inter text-sm flex-1"
                      />
                    ) : (
                      <span className="text-sm text-gray-700 font-inter">{staff.phone}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    {isEditingStaff === staff.id ? (
                      <input
                        type="number"
                        value={staff.salary}
                        onChange={(e) => onEditStaff(staff.id, 'salary', parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg font-inter text-sm w-32"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-gray-800 font-inter">
                        {formatCurrency(staff.salary)}/month
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium font-inter ${
                    staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {staff.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-inter mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {staff.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-pearl-rose-light/50 text-pearl-rose-dark text-xs rounded-lg font-inter">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}