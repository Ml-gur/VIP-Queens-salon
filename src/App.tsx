import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { QuickInfo } from '../components/QuickInfo'
import { Services } from '../components/Services'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { Stats } from '../components/Stats'
import { Gallery } from '../components/Gallery'
import { SpecialOffers } from '../components/SpecialOffers'
import { Team } from '../components/Team'
import { BookingSection } from '../components/BookingSection'
import { PortalAccess } from '../components/PortalAccess'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { AIReceptionist } from '../components/AIReceptionist'
import { StaffPortal } from '../components/StaffPortal'
import { OwnerPortal } from '../components/OwnerPortal'
import { BookingProvider } from '../components/booking/BookingContext'

// Error Boundary Component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  try {
    return <>{children}</>
  } catch (error) {
    console.error('Component render error:', error)
    return <>{fallback}</>
  }
}

// Safe Component Wrapper
function SafeComponent({ children, name }: { children: React.ReactNode; name: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg m-4">
          <p className="text-red-600">Error loading {name} component</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

export default function App() {
  const [currentView, setCurrentView] = useState('home')
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)

  useEffect(() => {
    // Simple initialization without API calls
    const initializeApp = () => {
      try {
        console.log('Initializing VIP Queens Salon app...')
        
        // Check if localStorage is available
        if (typeof Storage !== 'undefined') {
          // Initialize with some welcome data if needed
          const hasVisited = localStorage.getItem('vip-queens-visited')
          if (!hasVisited) {
            localStorage.setItem('vip-queens-visited', 'true')
            localStorage.setItem('vip-queens-initialized', new Date().toISOString())
            console.log('First visit - localStorage initialized')
          }
        } else {
          console.warn('localStorage not available')
        }
        
        // Set a small delay for smooth loading animation
        setTimeout(() => {
          console.log('App initialization complete')
          setIsInitialized(true)
        }, 1000)
      } catch (error) {
        console.error('App initialization error:', error)
        setInitError(error instanceof Error ? error.message : 'Unknown initialization error')
        // Always set initialized to true to prevent infinite loading
        setIsInitialized(true)
      }
    }

    initializeApp()
  }, [])

  const handlePortalAccess = (portal: 'owner' | 'staff') => {
    console.log(`Navigating to ${portal} portal`)
    if (portal === 'owner') {
      setCurrentView('owner-portal')
    } else {
      setCurrentView('staff-portal')
    }
  }

  const renderCurrentView = () => {
    console.log('Rendering view:', currentView)
    
    switch (currentView) {
      case 'staff-portal':
        return (
          <SafeComponent name="Staff Portal">
            <StaffPortal onBack={() => setCurrentView('home')} />
          </SafeComponent>
        )
      case 'owner-portal':
        return (
          <SafeComponent name="Owner Portal">
            <OwnerPortal onBack={() => setCurrentView('home')} />
          </SafeComponent>
        )
      default:
        return (
          <>
            <SafeComponent name="Hero">
              <Hero />
            </SafeComponent>
            <SafeComponent name="Quick Info">
              <QuickInfo />
            </SafeComponent>
            <SafeComponent name="Services">
              <Services />
            </SafeComponent>
            <SafeComponent name="Why Choose Us">
              <WhyChooseUs />
            </SafeComponent>
            <SafeComponent name="Stats">
              <Stats />
            </SafeComponent>
            <SafeComponent name="Gallery">
              <Gallery />
            </SafeComponent>
            <SafeComponent name="Special Offers">
              <SpecialOffers />
            </SafeComponent>
            <SafeComponent name="Team">
              <Team />
            </SafeComponent>
            <SafeComponent name="Booking Section">
              <BookingSection />
            </SafeComponent>
            <SafeComponent name="Portal Access">
              <PortalAccess onNavigateToPortal={handlePortalAccess} />
            </SafeComponent>
            <SafeComponent name="Contact">
              <Contact />
            </SafeComponent>
          </>
        )
    }
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-pearl-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pearl-rose-light border-t-pearl-rose-dark mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            <span className="font-script bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              VIP Queens Salon
            </span>
          </h2>
          <p className="text-gray-600 font-inter">Preparing your beautiful experience...</p>
          {initError && (
            <p className="text-red-600 text-sm mt-2">Initialization warning: {initError}</p>
          )}
          
          {/* Loading animation with floating elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-pearl-rose-dark rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-champagne-silk-dark rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-rose-gold-dark rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen bg-warm-white flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">VIP Queens Salon</h2>
            <p className="text-gray-600 mb-4">Something went wrong loading the website</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-pearl-rose-dark text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              Reload Page
            </button>
          </div>
        </div>
      }
    >
      <BookingProvider>
        <div className="min-h-screen bg-warm-white">
          <SafeComponent name="Header">
            <Header 
              currentView={currentView} 
              onNavigate={setCurrentView}
            />
          </SafeComponent>
          
          <main>
            {renderCurrentView()}
          </main>
          
          {currentView === 'home' && (
            <>
              <SafeComponent name="Footer">
                <Footer />
              </SafeComponent>
              <SafeComponent name="AI Receptionist">
                <AIReceptionist />
              </SafeComponent>
            </>
          )}
        </div>
      </BookingProvider>
    </ErrorBoundary>
  )
}