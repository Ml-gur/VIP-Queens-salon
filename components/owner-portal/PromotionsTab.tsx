import { useState } from 'react'
import { Plus, Edit3, Trash2, Save, X, Eye, EyeOff } from 'lucide-react'
import { Promotion } from './types'
import { validatePromotionForm } from './utils'

interface PromotionsTabProps {
  promotions: Promotion[]
  onAddPromotion: (promotion: Promotion) => void
  onEditPromotion: (id: number, field: keyof Promotion, value: any) => void
  onDeletePromotion: (id: number) => void
}

export function PromotionsTab({ promotions, onAddPromotion, onEditPromotion, onDeletePromotion }: PromotionsTabProps) {
  const [isEditingPromotion, setIsEditingPromotion] = useState<number | null>(null)
  const [isAddingPromotion, setIsAddingPromotion] = useState(false)
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({})

  const handleAddPromotion = () => {
    if (validatePromotionForm(newPromotion)) {
      const promotion: Promotion = {
        id: Date.now(),
        title: newPromotion.title!,
        description: newPromotion.description!,
        discount: newPromotion.discount!,
        validFrom: newPromotion.validFrom!,
        validTo: newPromotion.validTo!,
        isActive: newPromotion.isActive || false,
        category: newPromotion.category || 'General'
      }
      onAddPromotion(promotion)
      setNewPromotion({})
      setIsAddingPromotion(false)
    }
  }

  const handleDeletePromotion = (id: number) => {
    if (confirm('Are you sure you want to delete this promotion?')) {
      onDeletePromotion(id)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 font-inter">Promotion Management</h3>
        <button
          onClick={() => setIsAddingPromotion(true)}
          className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-inter"
        >
          <Plus className="w-4 h-4" />
          <span>Add Promotion</span>
        </button>
      </div>

      {/* Add Promotion Form */}
      {isAddingPromotion && (
        <div className="mb-6 p-6 border-2 border-pearl-rose/20 rounded-xl bg-pearl-rose-light/10">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 font-inter">Create New Promotion</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Promotion Title"
              value={newPromotion.title || ''}
              onChange={(e) => setNewPromotion({...newPromotion, title: e.target.value})}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
            />
            <input
              type="text"
              placeholder="Category"
              value={newPromotion.category || ''}
              onChange={(e) => setNewPromotion({...newPromotion, category: e.target.value})}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              value={newPromotion.discount || ''}
              onChange={(e) => setNewPromotion({...newPromotion, discount: parseInt(e.target.value)})}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newPromotion.isActive || false}
                onChange={(e) => setNewPromotion({...newPromotion, isActive: e.target.checked})}
                className="w-5 h-5 text-pearl-rose-dark"
              />
              <label className="text-sm text-gray-700 font-inter">Active</label>
            </div>
            <input
              type="date"
              placeholder="Valid From"
              value={newPromotion.validFrom || ''}
              onChange={(e) => setNewPromotion({...newPromotion, validFrom: e.target.value})}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
            />
            <input
              type="date"
              placeholder="Valid To"
              value={newPromotion.validTo || ''}
              onChange={(e) => setNewPromotion({...newPromotion, validTo: e.target.value})}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter"
            />
          </div>
          <textarea
            placeholder="Promotion Description"
            value={newPromotion.description || ''}
            onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pearl-rose-dark transition-colors font-inter mb-4"
          />
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddPromotion}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2 font-inter"
            >
              <Save className="w-4 h-4" />
              <span>Create Promotion</span>
            </button>
            <button
              onClick={() => {setIsAddingPromotion(false); setNewPromotion({})}}
              className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors flex items-center space-x-2 font-inter"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Promotions List */}
      <div className="space-y-4">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {isEditingPromotion === promotion.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={promotion.title}
                      onChange={(e) => onEditPromotion(promotion.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-inter"
                    />
                    <textarea
                      value={promotion.description}
                      onChange={(e) => onEditPromotion(promotion.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-inter"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <input
                        type="number"
                        value={promotion.discount}
                        onChange={(e) => onEditPromotion(promotion.id, 'discount', parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg font-inter"
                      />
                      <input
                        type="text"
                        value={promotion.category}
                        onChange={(e) => onEditPromotion(promotion.id, 'category', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg font-inter"
                      />
                      <input
                        type="date"
                        value={promotion.validFrom}
                        onChange={(e) => onEditPromotion(promotion.id, 'validFrom', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg font-inter"
                      />
                      <input
                        type="date"
                        value={promotion.validTo}
                        onChange={(e) => onEditPromotion(promotion.id, 'validTo', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg font-inter"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-800 font-inter">{promotion.title}</h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-pearl-rose-dark font-inter">
                          {promotion.discount}% OFF
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium font-inter ${
                          promotion.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {promotion.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 font-inter">{promotion.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="bg-pearl-rose-light/50 text-pearl-rose-dark px-2 py-1 rounded-lg font-inter">
                        {promotion.category}
                      </span>
                      <span className="font-inter">
                        Valid: {promotion.validFrom} to {promotion.validTo}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {isEditingPromotion === promotion.id ? (
                  <>
                    <button
                      onClick={() => setIsEditingPromotion(null)}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsEditingPromotion(null)}
                      className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onEditPromotion(promotion.id, 'isActive', !promotion.isActive)}
                      className={`p-2 rounded-lg transition-colors ${
                        promotion.isActive 
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {promotion.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsEditingPromotion(promotion.id)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePromotion(promotion.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}