import { useState } from 'react'
import { Mail, Phone, Star, Edit3, Save, X, User } from 'lucide-react'
import { StaffInfo } from './types'

interface ProfileTabProps {
  staffInfo: StaffInfo
  onUpdateProfile: (field: keyof StaffInfo, value: any) => void
}

export function ProfileTab({ staffInfo, onUpdateProfile }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState(staffInfo)

  const handleSave = () => {
    Object.keys(editedInfo).forEach(key => {
      const field = key as keyof StaffInfo
      if (editedInfo[field] !== staffInfo[field]) {
        onUpdateProfile(field, editedInfo[field])
      }
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(staffInfo)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 font-inter">My Profile</h3>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-inter"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 font-inter"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-pearl-rose-dark text-white px-4 py-2 rounded-lg hover:bg-pearl-rose-dark/90 transition-colors flex items-center space-x-2 font-inter"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-8">
          <img
            src={staffInfo.image}
            alt={staffInfo.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-pearl-rose-dark/20"
          />
          
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedInfo.name}
                    onChange={(e) => setEditedInfo({...editedInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-800 font-inter">{staffInfo.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedInfo.role}
                    onChange={(e) => setEditedInfo({...editedInfo, role: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
                  />
                ) : (
                  <p className="text-lg text-gray-600 font-inter">{staffInfo.role}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editedInfo.email}
                    onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-inter"
                  />
                ) : (
                  <span className="text-gray-700 font-inter">{staffInfo.email}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedInfo.phone}
                    onChange={(e) => setEditedInfo({...editedInfo, phone: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-inter"
                  />
                ) : (
                  <span className="text-gray-700 font-inter">{staffInfo.phone}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedInfo.experience}
                    onChange={(e) => setEditedInfo({...editedInfo, experience: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
                  />
                ) : (
                  <p className="text-gray-700 font-inter">{staffInfo.experience}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Rating</label>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-800 font-inter">{staffInfo.rating}</span>
                  <span className="text-gray-500 font-inter">({staffInfo.totalClients} clients)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-xl font-bold text-gray-800 mb-4 font-inter">Specialties</h4>
        <div className="flex flex-wrap gap-3">
          {staffInfo.specialties.map((specialty, index) => (
            <span key={index} className="px-4 py-2 bg-pearl-rose-light text-pearl-rose-dark rounded-full font-inter">
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-xl font-bold text-gray-800 mb-6 font-inter">Performance Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-xl mb-3 inline-block">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h5 className="text-2xl font-bold text-gray-800 font-inter">{staffInfo.totalClients}</h5>
            <p className="text-gray-600 font-inter">Total Clients</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-xl mb-3 inline-block">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h5 className="text-2xl font-bold text-gray-800 font-inter">{staffInfo.completedAppointments}</h5>
            <p className="text-gray-600 font-inter">Completed Services</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-xl mb-3 inline-block">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h5 className="text-2xl font-bold text-gray-800 font-inter">{staffInfo.rating}</h5>
            <p className="text-gray-600 font-inter">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}