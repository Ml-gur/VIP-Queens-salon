import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Phone, MapPin, Clock, Star } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chat is first opened
      const welcomeMessage: Message = {
        id: '1',
        text: "👋 Hello! Welcome to VIP Queens Salon! I'm your AI assistant. How can I help you today?\n\n• Book an appointment\n• Ask about our services\n• Get location & hours\n• Special offers\n• Contact information",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  const businessInfo = {
    name: "VIP Queens Salon",
    location: "Ronald Ngala Street, RNG Plaza 2nd floor S41, Nairobi, Kenya",
    phone: "0718 779 129",
    hours: "Mon-Sat: 6:00 AM - 10:00 PM, Sun: 9:00 AM - 6:00 PM",
    services: [
      "Hair Styling & Cutting",
      "Hair Braiding & Extensions", 
      "Hair Treatment & Care",
      "Hair Relaxing",
      "Wig Installation & Styling",
      "Nail Care Services (Manicure, Pedicure, Nail Art)"
    ],
    specialties: "Natural hair care, protective styles, and premium beauty services",
    team: ["Catherine (Senior Stylist & Owner)", "Njeri (Hair Specialist)", "Ann (Braiding Expert)", "Rachael (Nail Technician)"]
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Booking related
    if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      return `📅 I'd be happy to help you book an appointment at VIP Queens Salon!\n\nTo book your appointment:\n1. Click the "Book Appointment" button on our website\n2. Choose your preferred service\n3. Select your stylist: ${businessInfo.team.join(', ')}\n4. Pick your date and time\n5. We'll confirm via WhatsApp!\n\nOr call us directly at ${businessInfo.phone}. We're open ${businessInfo.hours}.`
    }

    // Services related
    if (lowerMessage.includes('service') || lowerMessage.includes('hair') || lowerMessage.includes('nail') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return `💅 Our premium services at VIP Queens Salon include:\n\n${businessInfo.services.map(service => `• ${service}`).join('\n')}\n\nWe specialize in ${businessInfo.specialties}.\n\nPrices vary based on hair length and service complexity. Would you like to book a consultation to get an accurate quote?`
    }

    // Location related
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('direction')) {
      return `📍 Visit us at VIP Queens Salon:\n\n${businessInfo.location}\n\nWe're easily accessible by public transport and have parking available. Need directions? Just let me know and I can help you get here!`
    }

    // Hours related
    if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('close') || lowerMessage.includes('time')) {
      return `🕐 VIP Queens Salon is open:\n\n${businessInfo.hours}\n\nWe have extended hours to accommodate your busy schedule! Call ${businessInfo.phone} to book your appointment.`
    }

    // Contact related
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('number')) {
      return `📱 Contact VIP Queens Salon:\n\n• Phone: ${businessInfo.phone}\n• Location: ${businessInfo.location}\n• Hours: ${businessInfo.hours}\n\n💬 You can also reach us on:\n• WhatsApp: ${businessInfo.phone}\n• Instagram: @vipqueenssalon\n• TikTok: @vipqueenssalon`
    }

    // Team/Staff related
    if (lowerMessage.includes('staff') || lowerMessage.includes('stylist') || lowerMessage.includes('team') || lowerMessage.includes('who')) {
      return `👩‍💼 Meet our expert team at VIP Queens Salon:\n\n${businessInfo.team.map(member => `• ${member}`).join('\n')}\n\nAll our stylists are experienced professionals specializing in African hair care and the latest beauty trends. Would you like to book with a specific stylist?`
    }

    // Special offers
    if (lowerMessage.includes('offer') || lowerMessage.includes('discount') || lowerMessage.includes('special') || lowerMessage.includes('promotion')) {
      return `🎉 Current Special Offers at VIP Queens Salon:\n\n• 20% off first-time visits\n• Student discounts available\n• Group booking packages\n• Loyalty rewards program\n\nCall ${businessInfo.phone} or book online to take advantage of these amazing deals!`
    }

    // Emergency or urgent
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('today') || lowerMessage.includes('now')) {
      return `🚨 For same-day appointments at VIP Queens Salon:\n\nCall us directly at ${businessInfo.phone} or message us on WhatsApp. We'll do our best to accommodate urgent requests!\n\nWe're open ${businessInfo.hours} and always ready to help with your beauty needs.`
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good')) {
      return `Hello! 👋 Welcome to VIP Queens Salon - where beauty meets excellence!\n\nI'm here to help you with:\n• Booking appointments\n• Service information\n• Location & hours\n• Our expert team\n• Special offers\n\nWhat would you like to know about VIP Queens Salon?`
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return `You're welcome! 😊 \n\nVIP Queens Salon is always here to help you look and feel your best. Don't forget to follow us:\n• Instagram: @vipqueenssalon\n• TikTok: @vipqueenssalon\n\nSee you soon at ${businessInfo.location}!`
    }

    // Default response
    return `I'm here to help with VIP Queens Salon! 💅✨\n\nI can assist you with:\n• 📅 Booking appointments\n• 💇‍♀️ Service information & pricing\n• 📍 Location & directions\n• 🕐 Hours & availability\n• 👩‍💼 Our expert team\n• 🎉 Special offers\n\nWhat would you like to know? Or call us at ${businessInfo.phone}!`
  }

  const sendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 second delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = [
    { text: "Book an appointment", action: "book" },
    { text: "View services & prices", action: "services" },
    { text: "Get location & hours", action: "location" },
    { text: "Special offers", action: "offers" }
  ]

  const handleQuickAction = (action: string) => {
    setInputText(quickActions.find(qa => qa.action === action)?.text || '')
    setTimeout(() => sendMessage(), 100)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isOpen 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark hover:shadow-xl animate-glow'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white mx-auto" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white mx-auto" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 animate-slideInUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold font-inter">VIP Queens Assistant</h3>
                <p className="text-xs opacity-90 font-inter">Always here to help! 💅</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-inter">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-pearl-rose-dark' 
                      : 'bg-champagne-silk-dark'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-pearl-rose-dark text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-line font-inter">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 font-inter">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-champagne-silk-dark rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="text-xs p-2 bg-gray-50 hover:bg-pearl-rose-light/30 rounded-lg border border-gray-200 transition-colors font-inter"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about VIP Queens Salon..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white p-2 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick Contact Actions */}
            <div className="flex justify-center space-x-4 mt-3">
              <button 
                onClick={() => window.open('tel:0718779129')}
                className="flex items-center space-x-1 text-xs text-gray-600 hover:text-pearl-rose-dark transition-colors font-inter"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </button>
              <button 
                onClick={() => window.open('https://wa.me/254718779129')}
                className="flex items-center space-x-1 text-xs text-gray-600 hover:text-pearl-rose-dark transition-colors font-inter"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </button>
              <button 
                onClick={() => window.open('https://maps.google.com?q=Ronald+Ngala+Street+RNG+Plaza+Nairobi')}
                className="flex items-center space-x-1 text-xs text-gray-600 hover:text-pearl-rose-dark transition-colors font-inter"
              >
                <MapPin className="w-3 h-3" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}