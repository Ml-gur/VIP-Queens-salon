import { useState, useEffect } from 'react'
import { Menu, X, Calendar, Users, Phone, Settings, Crown } from 'lucide-react'

interface HeaderProps {
  currentView: string
  onNavigate: (view: string) => void
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showPortalMenu, setShowPortalMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      onNavigate('home')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Team', id: 'team' },
    { label: 'Book Now', id: 'booking' },
    { label: 'Contact', id: 'contact' }
  ]

  const handlePortalAccess = (portal: 'owner' | 'staff') => {
    setShowPortalMenu(false)
    setIsMenuOpen(false)
    
    if (portal === 'owner') {
      // Simple access for now - in production, you'd add authentication
      const ownerAccess = prompt('Enter owner access code:')
      if (ownerAccess === 'VIPOWNER2024' || ownerAccess === 'catherine123') {
        onNavigate('owner-portal')
      } else if (ownerAccess !== null) {
        alert('Invalid access code. Contact Catherine for owner portal access.')
      }
    } else {
      // Staff portal access
      const staffAccess = prompt('Enter staff ID or name:')
      if (staffAccess && staffAccess.length > 2) {
        onNavigate('staff-portal')
      } else if (staffAccess !== null) {
        alert('Please enter a valid staff ID or name.')
      }
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      {/* Reduced container padding and moved logo further left */}
      <div className="mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Moved Further Left with Minimal Spacing */}
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-shrink-0 -ml-1 sm:ml-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              isScrolled 
                ? 'bg-pearl-rose-dark' 
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <span className="text-white font-bold text-base sm:text-lg lg:text-xl">V</span>
            </div>
            
            {/* Business Name - Pushed Further Left with Minimal Spacing */}
            <div className="min-w-0 flex-1 -ml-1">
              <h1 className={`font-script font-bold transition-colors duration-300 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
                isScrolled 
                  ? 'text-pearl-rose-dark' 
                  : 'text-white'
              }`}>
                VIP Queens Salon
              </h1>
              
              {/* Tagline - Hidden on small mobile, minimal spacing */}
              <p className={`font-inter transition-colors duration-300 text-xs lg:text-sm leading-tight hidden sm:block -mt-0.5 ${
                isScrolled 
                  ? 'text-gray-600' 
                  : 'text-white/90'
              }`}>
                Where Beauty Meets Excellence
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Compressed */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <nav className="flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap text-sm lg:text-base ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-pearl-rose-dark' 
                      : 'text-white hover:text-pearl-rose-light'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Portal Access Button - Compact */}
            <div className="relative">
              <button
                onClick={() => setShowPortalMenu(!showPortalMenu)}
                className={`flex items-center space-x-1.5 lg:space-x-2 px-3 lg:px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 whitespace-nowrap text-sm lg:text-base ${
                  isScrolled 
                    ? 'bg-pearl-rose-dark hover:bg-pearl-rose-dark/90 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                }`}
              >
                <Settings className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span className="font-medium font-inter">Portal</span>
              </button>

              {/* Portal Dropdown */}
              {showPortalMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => handlePortalAccess('owner')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-sm"
                  >
                    <Crown className="w-4 h-4 text-pearl-rose-dark" />
                    <div>
                      <div className="font-medium text-gray-800">Owner Portal</div>
                      <div className="text-xs text-gray-600">Full salon management</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handlePortalAccess('staff')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-sm"
                  >
                    <Users className="w-4 h-4 text-champagne-silk-dark" />
                    <div>
                      <div className="font-medium text-gray-800">Staff Portal</div>
                      <div className="text-xs text-gray-600">Appointments & earnings</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Compact */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-1.5 sm:p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
              isScrolled 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
            }`}
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Adjusted for new layout */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="mx-auto px-3 sm:px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 hover:text-pearl-rose-dark font-medium transition-colors text-sm"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Portal Access */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="text-sm font-medium text-gray-600 mb-2">Portal Access</div>
                <button
                  onClick={() => handlePortalAccess('owner')}
                  className="flex items-center space-x-3 text-gray-700 hover:text-pearl-rose-dark font-medium transition-colors w-full p-3 rounded-lg hover:bg-gray-50 text-sm"
                >
                  <Crown className="w-4 h-4 text-pearl-rose-dark" />
                  <div className="text-left">
                    <div>Owner Portal</div>
                    <div className="text-xs text-gray-600">Manage salon, staff & bookings</div>
                  </div>
                </button>
                <button
                  onClick={() => handlePortalAccess('staff')}
                  className="flex items-center space-x-3 text-gray-700 hover:text-pearl-rose-dark font-medium transition-colors w-full p-3 rounded-lg hover:bg-gray-50 text-sm"
                >
                  <Users className="w-4 h-4 text-champagne-silk-dark" />
                  <div className="text-left">
                    <div>Staff Portal</div>
                    <div className="text-xs text-gray-600">View appointments & earnings</div>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Click outside to close portal menu */}
      {showPortalMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowPortalMenu(false)}
        />
      )}
    </header>
  )
}