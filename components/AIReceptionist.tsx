import { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  RefreshCw, 
  ArrowLeft, 
  Sparkles, 
  Phone, 
  MapPin,
  Clock,
  Star,
  Zap,
  Heart,
  Settings,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react'
import { useBooking } from './booking/BookingContext'

// AI Response Interface
interface AIResponse {
  text: string
  type: 'welcome' | 'booking' | 'info' | 'confirmation' | 'escalation' | 'error'
  quickActions?: string[]
  confidence: number
  suggestions?: string[]
  bookingData?: any
}

// Message Interface
interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: AIResponse['type']
  quickActions?: string[]
  suggestions?: string[]
  confidence?: number
  bookingData?: any
}

// Customer Memory Interface
interface CustomerMemory {
  id: string
  name?: string
  phone?: string
  email?: string
  preferredServices: string[]
  preferredStylists: string[]
  conversationHistory: string[]
  lastVisit?: Date
}

// Booking Flow State
interface BookingFlowState {
  step: 'greeting' | 'service_selection' | 'stylist_selection' | 'slot_selection' | 'customer_info' | 'confirmation' | 'completed'
  selectedService?: any
  selectedStylist?: any
  selectedSlot?: { date: string; time: string }
  customerInfo?: { name: string; phone: string; email?: string }
  notes?: string
}

// Salon Information
const SALON_INFO = {
  name: "VIP Queens Salon",
  tagline: "Where Beauty Meets Excellence",
  location: {
    address: "Ronald Ngala Street",
    building: "RNG Plaza, 2nd floor S41",
    area: "Nairobi",
    city: "Nairobi"
  },
  contact: {
    phone: "0718 779 129",
    whatsapp: "254718779129",
    email: "info@vipqueenssalon.com"
  },
  hours: {
    weekdays: "6:00 AM - 10:00 PM",
    sunday: "9:00 AM - 6:00 PM"
  }
}

export function AIReceptionist() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState('greeting')
  const [customerMemory, setCustomerMemory] = useState<CustomerMemory | null>(null)
  const [bookingFlow, setBookingFlow] = useState<BookingFlowState>({ step: 'greeting' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { 
    isLoading, 
    addBooking, 
    services, 
    staff, 
    getStaffBySpecialty, 
    getAvailableSlots 
  } = useBooking()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Simple Memory System
  const initializeMemory = (): CustomerMemory => {
    const sessionId = `session_${Date.now()}`
    const memory: CustomerMemory = {
      id: sessionId,
      preferredServices: [],
      preferredStylists: [],
      conversationHistory: []
    }
    setCustomerMemory(memory)
    return memory
  }

  const updateMemory = (updates: Partial<CustomerMemory>) => {
    if (customerMemory) {
      const updated = { ...customerMemory, ...updates }
      setCustomerMemory(updated)
      localStorage.setItem('vip_queens_customer_memory', JSON.stringify(updated))
    }
  }

  // AI Intent Analysis
  const analyzeIntent = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    const intents = {
      booking: ['book', 'appointment', 'schedule', 'reserve', 'available'],
      services: ['service', 'treatment', 'hair', 'nails', 'what do you offer'],
      pricing: ['price', 'cost', 'how much', 'rate', 'fee', 'charge'],
      staff: ['staff', 'stylist', 'who', 'catherine', 'njeri', 'ann', 'rachael'],
      location: ['where', 'location', 'address', 'direction'],
      hours: ['hour', 'time', 'open', 'close', 'when'],
      greeting: ['hello', 'hi', 'hey', 'good morning'],
      confirmation: ['yes', 'confirm', 'proceed', 'book it'],
      back: ['back', 'previous', 'go back'],
      reset: ['start over', 'reset', 'new conversation']
    }

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent
      }
    }
    
    return 'general'
  }

  const findService = (message: string) => {
    const lowerMessage = message.toLowerCase()
    return services.find(service => 
      lowerMessage.includes(service.name.toLowerCase()) ||
      lowerMessage.includes(service.category.toLowerCase())
    )
  }

  const findStaff = (message: string) => {
    const lowerMessage = message.toLowerCase()
    return staff.find(member => 
      lowerMessage.includes(member.name.toLowerCase()) ||
      lowerMessage.includes(member.role.toLowerCase())
    )
  }

  // Enhanced Booking Flow Handler
  const handleBookingFlow = async (message: string, intent: string): Promise<AIResponse> => {
    const lowerMessage = message.toLowerCase()

    switch (bookingFlow.step) {
      case 'greeting':
        // Initial booking request
        setBookingFlow({ step: 'service_selection' })
        setConversationStage('booking')
        return {
          text: `Perfect! I'd love to help you book an appointment! 📅\n\n**Our Popular Services:**\n\n• Hair Styling - KES 1,500 - 3,500\n• Hair Braiding - KES 2,000 - 6,000\n• Hair Treatment - KES 1,000 - 3,000\n• Hair Relaxing - KES 2,000 - 6,000\n• Nail Services - KES 500 - 2,000\n\nWhich service would you like to book? ✨`,
          type: 'booking',
          quickActions: ['Hair Styling', 'Hair Braiding', 'Hair Treatment', 'Nail Services'],
          confidence: 1.0
        }

      case 'service_selection':
        const detectedService = findService(message)
        if (detectedService) {
          const availableStaff = getStaffBySpecialty(detectedService.category)
          setBookingFlow(prev => ({ ...prev, selectedService: detectedService, step: 'stylist_selection' }))
          
          let response = `Excellent choice! **${detectedService.name}** 💫\n\n**Service Details:**\n• Duration: ${detectedService.duration}\n• Price: KES ${detectedService.price.min} - ${detectedService.price.max}\n\n**Available Stylists:**\n`
          
          availableStaff.forEach(stylist => {
            response += `• **${stylist.name}** - ${stylist.role}\n`
          })
          
          response += `\nWho would you prefer? 👩‍💼`
          
          return {
            text: response,
            type: 'booking',
            quickActions: availableStaff.map(s => s.name).concat(['Any available stylist']),
            confidence: 0.9
          }
        } else {
          return {
            text: `I'd love to help you find the perfect service! Could you tell me which service you're interested in?\n\n**Available Services:**\n• Hair Styling\n• Hair Braiding\n• Hair Treatment\n• Hair Relaxing\n• Nail Services\n\nJust click one above or tell me what you're looking for! 💇‍♀️`,
            type: 'booking',
            quickActions: ['Hair Styling', 'Hair Braiding', 'Hair Treatment', 'Nail Services'],
            confidence: 0.7
          }
        }

      case 'stylist_selection':
        const detectedStylist = findStaff(message) || 
          (lowerMessage.includes('any') ? getStaffBySpecialty(bookingFlow.selectedService!.category)[0] : null)

        if (detectedStylist) {
          try {
            // Get available slots for the next 7 days
            const today = new Date()
            const availableSlots = []
            
            for (let i = 1; i <= 7; i++) {
              const date = new Date(today)
              date.setDate(today.getDate() + i)
              const dateStr = date.toISOString().split('T')[0]
              
              try {
                const slots = await getAvailableSlots(
                  dateStr, 
                  detectedStylist.id, 
                  bookingFlow.selectedService!.durationMinutes || 60
                )
                
                if (slots.length > 0) {
                  availableSlots.push({
                    date: dateStr,
                    displayDate: date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    }),
                    slots: slots.slice(0, 3)
                  })
                }
                
                if (availableSlots.length >= 3) break
              } catch (error) {
                console.error('Error getting slots:', error)
              }
            }

            setBookingFlow(prev => ({ ...prev, selectedStylist: detectedStylist, step: 'slot_selection' }))

            if (availableSlots.length === 0) {
              return {
                text: `${detectedStylist.name} is currently fully booked. Let me help you with alternatives:\n\n📞 **Call us:** ${SALON_INFO.contact.phone}\n💬 **WhatsApp:** For real-time availability\n\nOr would you like to try a different stylist? 🌟`,
                type: 'escalation',
                quickActions: ['Try different stylist', 'Call salon', 'WhatsApp'],
                confidence: 0.8
              }
            }

            let response = `Perfect! **${detectedStylist.name}** is available! 🌟\n\n**Next Available Times:**\n\n`
            
            availableSlots.forEach((day, index) => {
              response += `**${day.displayDate}:**\n`
              day.slots.forEach(slot => {
                response += `• ${slot}\n`
              })
              if (index < availableSlots.length - 1) response += '\n'
            })
            
            response += '\nWhich time works best for you? 🕐'

            return {
              text: response,
              type: 'booking',
              quickActions: availableSlots.flatMap(day => day.slots.slice(0, 2)),
              confidence: 0.9
            }
          } catch (error) {
            return {
              text: `Let me connect you with our team for real-time availability:\n\n📱 **Call:** ${SALON_INFO.contact.phone}\n💬 **WhatsApp:** Instant booking\n\nThey'll find the perfect time for you! 🚀`,
              type: 'escalation',
              quickActions: ['Call now', 'WhatsApp', 'Try again'],
              confidence: 0.7
            }
          }
        } else {
          const availableStaff = getStaffBySpecialty(bookingFlow.selectedService!.category)
          let response = `Please choose your preferred stylist:\n\n`
          availableStaff.forEach(stylist => {
            response += `👩‍💼 **${stylist.name}** - ${stylist.role}\n`
          })
          response += `\nWho would you like to book with? ✨`
          
          return {
            text: response,
            type: 'booking',
            quickActions: availableStaff.map(s => s.name),
            confidence: 0.8
          }
        }

      case 'slot_selection':
        // Extract time from message
        const timeMatch = message.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)/i) || 
                         message.match(/(\d{1,2})\s*(am|pm)/i)
        
        if (timeMatch || lowerMessage.includes('first') || lowerMessage.includes('available')) {
          const today = new Date()
          const tomorrow = new Date(today)
          tomorrow.setDate(today.getDate() + 1)
          
          const selectedSlot = {
            date: tomorrow.toISOString().split('T')[0],
            time: timeMatch ? timeMatch[0] : '10:00 AM'
          }

          setBookingFlow(prev => ({ ...prev, selectedSlot, step: 'customer_info' }))

          return {
            text: `Great! I've reserved **${tomorrow.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}** at **${selectedSlot.time}** for you! 🎉\n\n📝 **Just need your details:**\n\n• Your full name\n• Phone number\n• Email (optional)\n\nPlease share them with me to complete your booking! 😊`,
            type: 'booking',
            quickActions: [],
            confidence: 0.9
          }
        } else {
          return {
            text: `What time works best for you? You can say:\n\n• "10am tomorrow"\n• "2pm"\n• "First available"\n• "Morning time"\n\nJust let me know your preference! 🕐`,
            type: 'booking',
            quickActions: ['10:00 AM', '2:00 PM', 'First available', 'Morning'],
            confidence: 0.8
          }
        }

      case 'customer_info':
        // Extract customer information
        const nameMatch = message.match(/(?:name is|i'm|my name|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i) ||
                          message.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i)
        const phoneMatch = message.match(/(\+?254\d{9}|\d{10}|\d{9})/i)
        const emailMatch = message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
        
        const customerInfo = {
          name: nameMatch ? nameMatch[1] : '',
          phone: phoneMatch ? phoneMatch[1] : '',
          email: emailMatch ? emailMatch[1] : ''
        }

        if (customerInfo.name && customerInfo.phone) {
          setBookingFlow(prev => ({ ...prev, customerInfo, step: 'confirmation' }))
          updateMemory({ name: customerInfo.name, phone: customerInfo.phone, email: customerInfo.email })

          return {
            text: `Perfect! Let me confirm your booking details: ✨\n\n📋 **BOOKING SUMMARY**\n\n👤 **Customer:** ${customerInfo.name}\n📱 **Phone:** ${customerInfo.phone}\n${customerInfo.email ? `📧 **Email:** ${customerInfo.email}\n` : ''}💇‍♀️ **Service:** ${bookingFlow.selectedService!.name}\n👩‍💼 **Stylist:** ${bookingFlow.selectedStylist!.name}\n📅 **Date & Time:** ${new Date(bookingFlow.selectedSlot!.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })} at ${bookingFlow.selectedSlot!.time}\n💰 **Price:** KES ${bookingFlow.selectedService!.price.min} - ${bookingFlow.selectedService!.price.max}\n\n✅ **Confirm this booking?**`,
            type: 'booking',
            quickActions: ['Yes, confirm booking', 'Make changes', 'Cancel'],
            confidence: 1.0,
            bookingData: {
              customerName: customerInfo.name,
              customerPhone: customerInfo.phone,
              customerEmail: customerInfo.email,
              service: bookingFlow.selectedService!.name,
              serviceCategory: bookingFlow.selectedService!.category,
              price: bookingFlow.selectedService!.price.min,
              duration: bookingFlow.selectedService!.duration,
              stylistId: bookingFlow.selectedStylist!.id,
              stylistName: bookingFlow.selectedStylist!.name,
              date: bookingFlow.selectedSlot!.date,
              time: bookingFlow.selectedSlot!.time,
              status: 'confirmed',
              bookingMethod: 'ai_chat'
            }
          }
        } else {
          return {
            text: `I need your contact details to complete the booking:\n\n📝 **Please provide:**\n• Your full name\n• Phone number\n\n**Example:** "My name is Sarah Wanjiku and my phone is 0712345678"\n\nThis helps us send confirmations and reminders! 📱`,
            type: 'booking',
            quickActions: [],
            confidence: 0.8
          }
        }

      case 'confirmation':
        if (intent === 'confirmation' || lowerMessage.includes('yes') || lowerMessage.includes('confirm')) {
          try {
            // Create the booking using the BookingContext
            const bookingData = {
              customerName: bookingFlow.customerInfo!.name,
              customerPhone: bookingFlow.customerInfo!.phone,
              customerEmail: bookingFlow.customerInfo?.email,
              service: bookingFlow.selectedService!.name,
              serviceCategory: bookingFlow.selectedService!.category,
              price: bookingFlow.selectedService!.price.min,
              duration: bookingFlow.selectedService!.duration,
              stylistId: bookingFlow.selectedStylist!.id,
              stylistName: bookingFlow.selectedStylist!.name,
              date: bookingFlow.selectedSlot!.date,
              time: bookingFlow.selectedSlot!.time,
              status: 'confirmed',
              notes: bookingFlow.notes,
              bookingMethod: 'ai_chat'
            }

            const booking = await addBooking(bookingData)
            setBookingFlow({ step: 'completed' })
            setConversationStage('completed')

            return {
              text: `🎉 **BOOKING CONFIRMED!** 🎉\n\n✅ Congratulations ${bookingFlow.customerInfo!.name}! Your appointment is booked!\n\n🆔 **Booking ID:** ${booking.id.slice(-8).toUpperCase()}\n📱 **Confirmation sent via SMS**\n⏰ **Reminder set for 24 hours before**\n\n**📍 Location:**\n${SALON_INFO.location.address}\n${SALON_INFO.location.building}\n${SALON_INFO.location.area}\n\n**📞 Need to make changes?**\nCall: ${SALON_INFO.contact.phone}\n\n**We can't wait to make you look stunning!** ✨👑`,
              type: 'confirmation',
              quickActions: ['Book another appointment', 'Get directions', 'Call salon'],
              confidence: 1.0
            }
          } catch (error) {
            console.error('Booking creation failed:', error)
            return {
              text: `There was an issue creating your booking. Please contact us directly:\n\n📱 **Call:** ${SALON_INFO.contact.phone}\n💬 **WhatsApp:** +${SALON_INFO.contact.whatsapp}\n\nOur team will complete your booking immediately! 🤝`,
              type: 'error',
              quickActions: ['Call now', 'WhatsApp', 'Try again'],
              confidence: 0.7
            }
          }
        } else if (lowerMessage.includes('change') || lowerMessage.includes('back')) {
          setBookingFlow(prev => ({ ...prev, step: 'service_selection' }))
          return {
            text: `No problem! Let's make some changes to your booking.\n\nWhich part would you like to modify? 🔄`,
            type: 'booking',
            quickActions: ['Change service', 'Change stylist', 'Change time', 'Start over'],
            confidence: 0.9
          }
        } else {
          setBookingFlow({ step: 'greeting' })
          setConversationStage('greeting')
          return {
            text: `Booking cancelled. No worries! I'm here whenever you're ready to book.\n\nHow else can I help you today? 😊`,
            type: 'welcome',
            quickActions: ['Book appointment', 'View services', 'Ask questions'],
            confidence: 1.0
          }
        }

      default:
        return {
          text: `I'm here to help you book an appointment! Let's start fresh.\n\nWhat service would you like to book? 📅`,
          type: 'booking',
          quickActions: ['Hair Styling', 'Hair Braiding', 'Hair Treatment', 'Nail Services'],
          confidence: 0.8
        }
    }
  }

  // AI Response Generation
  const generateResponse = async (message: string): Promise<AIResponse> => {
    const intent = analyzeIntent(message)
    const service = findService(message)
    const staff = findStaff(message)

    // Update memory
    if (service && customerMemory) {
      updateMemory({
        preferredServices: [...new Set([...customerMemory.preferredServices, service.name])]
      })
    }
    if (staff && customerMemory) {
      updateMemory({
        preferredStylists: [...new Set([...customerMemory.preferredStylists, staff.name])]
      })
    }

    // Handle booking flow if active
    if (bookingFlow.step !== 'greeting' || intent === 'booking') {
      return await handleBookingFlow(message, intent)
    }

    // Handle other intents
    switch (intent) {
      case 'reset':
        setBookingFlow({ step: 'greeting' })
        setConversationStage('greeting')
        return {
          text: `🔄 Perfect! Let's start fresh.\n\nWelcome to ${SALON_INFO.name}! I'm here to help you with:\n\n• Booking appointments 📅\n• Service information 💇‍♀️\n• Pricing details 💰\n• Location & directions 📍\n\nHow can I help you today? ✨`,
          type: 'welcome',
          quickActions: ['Book appointment', 'View services', 'Check prices', 'Location info'],
          confidence: 1.0
        }

      case 'greeting':
        return {
          text: `Hello! 👋 Welcome to ${SALON_INFO.name}!\n\nI'm your AI beauty assistant, here to help you:\n• Book appointments 📅\n• Learn about our services 💇‍♀️\n• Meet our expert team 👩‍💼\n• Get pricing information 💰\n• Find our location 📍\n\nHow can I make you look and feel amazing today?`,
          type: 'welcome',
          quickActions: ['Book appointment', 'View services', 'Check prices', 'Location info', 'Meet the team', 'Special offers'],
          confidence: 1.0
        }

      case 'services':
        return {
          text: `💇‍♀️ **Our Expert Services:**\n\n**💫 Hair Styling**\n• Haircut & Styling - KES 1,500 - 3,500\n• Professional Blow Dry - KES 1,200 - 2,000\n\n**🎨 Hair Braiding**\n• Box Braids - KES 3,000 - 6,000\n• Cornrows - KES 2,000 - 4,000\n\n**✨ Hair Treatment**\n• Deep Conditioning - KES 1,500 - 2,500\n• Protein Treatment - KES 2,000 - 3,000\n\n**💅 Nail Services**\n• Gel Manicure - KES 1,200 - 1,800\n• Spa Pedicure - KES 1,500 - 2,000\n\nWhich service interests you most? ✨`,
          type: 'info',
          quickActions: ['Book Hair Styling', 'Book Hair Braiding', 'Book Hair Treatment', 'Book Nail Services', 'View all services', 'Get pricing'],
          confidence: 0.9
        }

      case 'pricing':
        return {
          text: `💰 **VIP Queens Salon Pricing:**\n\n• **Hair Styling:** KES 1,500 - 3,500\n• **Hair Braiding:** KES 2,000 - 6,000\n• **Hair Treatment:** KES 1,000 - 3,000\n• **Hair Relaxing:** KES 2,000 - 6,000\n• **Nail Services:** KES 500 - 2,000\n\n*Prices vary based on hair length and service complexity.*\n\n🎉 **Special Offers:**\n• First-time clients: 20% off\n• Student discount: 15% off\n\nReady to book your appointment? 📅`,
          type: 'info',
          quickActions: ['Book appointment', 'Ask about offers', 'View services', 'Contact salon'],
          confidence: 0.9
        }

      case 'staff':
        return {
          text: `👩‍💼 **Meet Our Expert Team:**\n\n**Catherine** - Senior Stylist & Owner\n• Specializes in: Hair Styling, Hair Treatment\n\n**Njeri** - Hair Specialist\n• Specializes in: Hair Styling, Hair Treatment\n\n**Ann** - Braiding Expert\n• Specializes in: Hair Braiding\n\n**Rachael** - Nail Technician\n• Specializes in: Nail Services\n\nWho would you like to book with? 🌟`,
          type: 'info',
          quickActions: ['Book with Catherine', 'Book with Njeri', 'Book with Ann', 'Book with Rachael', 'Any available stylist'],
          confidence: 0.9
        }

      case 'location':
        return {
          text: `📍 **Visit VIP Queens Salon:**\n\n🏢 ${SALON_INFO.location.address}\n${SALON_INFO.location.building}\n${SALON_INFO.location.area}, ${SALON_INFO.location.city}\n\n📱 **Contact:**\n• Phone: ${SALON_INFO.contact.phone}\n• WhatsApp: Available 24/7\n\n⏰ **Hours:**\n• Mon-Sat: ${SALON_INFO.hours.weekdays}\n• Sunday: ${SALON_INFO.hours.sunday}`,
          type: 'info',
          quickActions: ['Book appointment', 'Call now', 'Get directions', 'WhatsApp'],
          confidence: 0.9
        }

      case 'hours':
        return {
          text: `⏰ **VIP Queens Salon Hours:**\n\n📅 **Monday - Saturday:** ${SALON_INFO.hours.weekdays}\n📅 **Sunday:** ${SALON_INFO.hours.sunday}\n\n💡 We recommend booking in advance for the best availability!\n\nReady to schedule your visit? 📱`,
          type: 'info',
          quickActions: ['Book appointment', 'Check availability', 'Ask questions', 'Call salon'],
          confidence: 0.9
        }

      default:
        return {
          text: `I'm here to help you with ${SALON_INFO.name}! ✨\n\n**I can assist with:**\n• 📅 Booking appointments\n• 💇‍♀️ Service information\n• 👩‍💼 Meeting our stylists\n• 💰 Pricing details\n• 📍 Location & directions\n\nWhat would you like to know? 🌟`,
          type: 'info',
          quickActions: ['Book appointment', 'View services', 'Meet team', 'Check prices', 'Get location', 'Ask questions'],
          confidence: 0.7
        }
    }
  }

  const initializeConversation = async () => {
    setIsTyping(true)
    initializeMemory()
    
    setTimeout(async () => {
      try {
        const response = await generateResponse('hello')
        const welcomeMessage: Message = {
          id: '1',
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          type: response.type,
          quickActions: response.quickActions,
          confidence: response.confidence
        }
        setMessages([welcomeMessage])
      } catch (error) {
        console.error('Failed to initialize conversation:', error)
        const errorMessage: Message = {
          id: '1',
          text: `Welcome to ${SALON_INFO.name}! 🏛️\n\nI'm here to help you book appointments and answer questions.\n\nHow can I assist you today?`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'welcome'
        }
        setMessages([errorMessage])
      } finally {
        setIsTyping(false)
      }
    }, 800)
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    const currentInput = inputText
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Add to conversation history
    if (customerMemory) {
      updateMemory({
        conversationHistory: [...customerMemory.conversationHistory, currentInput]
      })
    }

    setTimeout(async () => {
      try {
        const response = await generateResponse(currentInput)
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          type: response.type,
          quickActions: response.quickActions,
          confidence: response.confidence,
          bookingData: response.bookingData
        }
        
        setMessages(prev => [...prev, botMessage])
        
      } catch (error) {
        console.error('AI processing error:', error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `I apologize for the technical issue! Please contact our team:\n\n📱 **Call:** ${SALON_INFO.contact.phone}\n💬 **WhatsApp:** +${SALON_INFO.contact.whatsapp}\n\nThey'll provide immediate assistance! 🤝`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'error'
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
    }, 1200)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    setInputText(action)
    setTimeout(() => sendMessage(), 100)
  }

  const resetConversation = () => {
    setMessages([])
    setInputText('')
    setIsTyping(false)
    setConversationStage('greeting')
    setBookingFlow({ step: 'greeting' })
    initializeConversation()
  }

  const quickActions = [
    { text: 'Book appointment', icon: '📅', action: 'I want to book an appointment' },
    { text: 'View services', icon: '💇‍♀️', action: 'Show me your services' },
    { text: 'Check prices', icon: '💰', action: 'What are your prices?' },
    { text: 'Location info', icon: '📍', action: 'Where are you located?' },
    { text: 'Meet the team', icon: '👥', action: 'Tell me about your staff' },
    { text: 'Special offers', icon: '🎉', action: 'Do you have any special offers?' }
  ]

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'greeting': return '👋'
      case 'exploring': return '🔍'
      case 'booking': return '📅'
      case 'confirmation': return '✅'
      case 'completed': return '🎉'
      default: return '💬'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'greeting': return 'bg-blue-100 text-blue-800'
      case 'exploring': return 'bg-purple-100 text-purple-800'
      case 'booking': return 'bg-orange-100 text-orange-800'
      case 'confirmation': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
              isOpen 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                : 'bg-gradient-to-r from-pearl-rose-dark to-rose-gold-dark hover:from-pearl-rose-dark hover:to-champagne-silk-dark animate-glow'
            }`}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white mx-auto" />
            ) : (
              <div className="flex flex-col items-center justify-center relative">
                <Bot className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
            )}
          </button>
          
          {/* Hover tooltip */}
          {!isOpen && (
            <div className="absolute -left-52 top-1/2 transform -translate-y-1/2 bg-black/80 text-white rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="text-sm font-medium">🤖 VIP Queens AI Assistant</div>
              <div className="text-xs opacity-90">Available 24/7 • Smart booking • Instant help</div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[650px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 animate-slideInUp overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pearl-rose-dark via-rose-gold-dark to-champagne-silk-dark text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={resetConversation}
                  className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
                  title="Start new conversation"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold tracking-wide">VIP Queens AI</h3>
                  <div className="flex items-center space-x-2 text-xs opacity-90">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStageColor(conversationStage)} bg-white/20`}>
                      {getStageIcon(conversationStage)} {conversationStage}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-pearl-rose-light/10 to-champagne-silk-light/10">
            {messages.length === 0 || (messages.length === 1 && messages[0].type === 'welcome') ? (
              // Welcome State
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3 animate-fadeIn">
                    <div className="w-10 h-10 bg-gradient-to-r from-pearl-rose-dark to-rose-gold-dark rounded-full flex items-center justify-center shadow-md">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                          {message.text}
                        </div>
                        
                        {message.confidence && message.confidence < 0.8 && (
                          <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Enhanced Quick Actions Grid - Single Column */}
                <div className="space-y-3">
                  <div className="text-xs text-gray-600 px-2 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Quick actions:</span>
                  </div>
                  <div className="space-y-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        className="w-full p-4 bg-white hover:bg-gradient-to-r hover:from-pearl-rose-light hover:to-champagne-silk-light rounded-xl border border-gray-200 hover:border-pearl-rose-dark/30 transition-all duration-200 text-sm text-gray-700 hover:text-pearl-rose-dark group shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl group-hover:scale-110 transition-transform">{action.icon}</span>
                          <span className="font-medium text-left">{action.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Conversation State
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.sender === 'bot' && (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-pearl-rose-dark to-rose-gold-dark rounded-full flex items-center justify-center shadow-sm">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                              <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                                {message.text}
                              </div>
                              
                              {message.quickActions && message.quickActions.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  {message.quickActions.map((action, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleQuickAction(action)}
                                      className="w-full px-3 py-2 bg-pearl-rose-light/50 hover:bg-pearl-rose-light text-xs text-pearl-rose-dark rounded-lg border border-pearl-rose-dark/20 hover:border-pearl-rose-dark/40 transition-colors text-left"
                                    >
                                      {action}
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center space-x-2">
                                  {message.type === 'booking' && <span className="text-orange-600">📅 Booking</span>}
                                  {message.type === 'confirmation' && <span className="text-green-600">✅ Confirmed</span>}
                                  {message.type === 'escalation' && <span className="text-red-600">🔗 Escalated</span>}
                                </div>
                                {message.confidence && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 fill-current text-yellow-400" />
                                    <span>{Math.round(message.confidence * 100)}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {message.sender === 'user' && (
                        <div className="bg-gradient-to-r from-pearl-rose-dark to-rose-gold-dark text-white p-3 rounded-2xl shadow-sm">
                          <div className="text-sm whitespace-pre-line leading-relaxed">{message.text}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start space-x-3 animate-fadeIn">
                    <div className="w-8 h-8 bg-gradient-to-r from-pearl-rose-dark to-rose-gold-dark rounded-full flex items-center justify-center shadow-sm">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-pearl-rose-dark rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pearl-rose-dark rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-pearl-rose-dark rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Navigation Controls */}
          {messages.length > 1 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleQuickAction('go back')}
                  className="flex items-center space-x-1 text-xs text-gray-600 hover:text-pearl-rose-dark transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Go Back</span>
                </button>
                <button
                  onClick={resetConversation}
                  className="flex items-center space-x-1 text-xs text-gray-600 hover:text-pearl-rose-dark transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Start Over</span>
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3 mb-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about VIP Queens..."
                  className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent text-sm resize-none"
                  rows={2}
                  disabled={isLoading || isTyping}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading || isTyping}
                  className="absolute right-2 bottom-2 bg-gradient-to-r from-pearl-rose-dark to-rose-gold-dark text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Contact options */}
            <div className="flex justify-center space-x-6 mb-2">
              <button 
                onClick={() => window.open(`https://wa.me/${SALON_INFO.contact.whatsapp}`)}
                className="flex items-center space-x-2 text-xs text-green-600 hover:text-green-700 transition-colors group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </button>
              <button 
                onClick={() => window.open(`tel:${SALON_INFO.contact.phone}`)}
                className="flex items-center space-x-2 text-xs text-blue-600 hover:text-blue-700 transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Call</span>
              </button>
              <button 
                onClick={() => window.open('https://maps.google.com')}
                className="flex items-center space-x-2 text-xs text-purple-600 hover:text-purple-700 transition-colors group"
              >
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Directions</span>
              </button>
            </div>
            
            <div className="text-center text-xs text-gray-500 flex items-center justify-center space-x-1">
              <Heart className="w-3 h-3 text-red-400 animate-pulse" />
              <span>Powered by AI • Available 24/7</span>
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}