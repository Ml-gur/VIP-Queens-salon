import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { QuickInfo } from './components/QuickInfo'
import { Services } from './components/Services'
import { WhyChooseUs } from './components/WhyChooseUs'
import { Stats } from './components/Stats'
import { Gallery } from './components/Gallery'
import { SpecialOffers } from './components/SpecialOffers'
import { Team } from './components/Team'
import { BookingSection } from './components/BookingSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ChatWidget } from './components/ChatWidget'
import { StaffPortal } from './components/StaffPortal'
import { OwnerPortal } from './components/OwnerPortal'
import { projectId, publicAnonKey } from './utils/supabase/info'

export default function App() {
  const [currentView, setCurrentView] = useState('home')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize salon data
    const initializeSalon = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e43aaacd/init`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          setIsInitialized(true)
        }
      } catch (error) {
        console.error('Failed to initialize salon:', error)
      }
    }

    initializeSalon()
  }, [])

  const renderCurrentView = () => {
    switch (currentView) {
      case 'staff-portal':
        return <StaffPortal onBack={() => setCurrentView('home')} />
      case 'owner-portal':
        return <OwnerPortal onBack={() => setCurrentView('home')} />
      default:
        return (
          <>
            <Hero />
            <QuickInfo />
            <Services />
            <WhyChooseUs />
            <Stats />
            <Gallery />
            <SpecialOffers />
            <Team />
            <BookingSection />
            <Contact />
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
          <p className="text-gray-600 font-inter">Setting up your beautiful experience...</p>
          
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
    <div className="min-h-screen bg-warm-white">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView}
      />
      
      <main>
        {renderCurrentView()}
      </main>
      
      {currentView === 'home' && (
        <>
          <Footer />
          <ChatWidget />
        </>
      )}
    </div>
  )
}