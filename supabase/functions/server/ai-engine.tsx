// AI Engine for Annabella's Hair Salon Chat Receptionist
import * as kv from './kv_store.tsx'

interface ConversationContext {
  sessionId: string
  customerId?: string
  currentStage: string
  bookingData: Partial<BookingData>
  messageHistory: ChatMessage[]
  lastActivity: string
  language: 'en' | 'sw'
}

interface BookingData {
  serviceId: string
  serviceName: string
  staffId?: string
  staffName?: string
  date?: string
  time?: string
  customerName?: string
  customerPhone?: string
  notes?: string
}

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: string
  intent?: string
  entities?: any[]
}

interface IntentResult {
  intent: string
  confidence: number
  entities: any[]
}

export class AIEngine {
  private readonly CONVERSATION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  
  // Fuzzy matching for services
  private readonly SERVICE_SYNONYMS = {
    'cut': ['haircut', 'hair cut', 'trim', 'cutting', 'kugema', 'kata'],
    'style': ['styling', 'blow dry', 'blowout', 'set', 'mpangilio'],
    'braids': ['braiding', 'plaits', 'cornrows', 'box braids', 'sukuma', 'nyuzi'],
    'relaxer': ['straightening', 'relaxing', 'chemical straightening', 'rebonding'],
    'treatment': ['conditioning', 'deep conditioning', 'hair mask', 'matibabu'],
    'wash': ['shampoo', 'wash and blow dry', 'osha'],
    'color': ['dyeing', 'coloring', 'highlights', 'lowlights', 'rangi'],
    'manicure': ['mani', 'nail polish', 'nail art', 'makucha'],
    'pedicure': ['pedi', 'foot care', 'toe nails'],
    'wig': ['wig installation', 'weave', 'extensions', 'attachment']
  }

  // Staff name variations
  private readonly STAFF_SYNONYMS = {
    'catherine': ['cate', 'cathy', 'mama catherine', 'owner'],
    'grace': ['gracie', 'mama grace']
  }

  // Time interpretations
  private readonly TIME_PATTERNS = {
    'morning': ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30'],
    'afternoon': ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
    'evening': ['17:00', '17:30', '18:00', '18:30'],
    'asubuhi': ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30'],
    'mchana': ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
    'jioni': ['17:00', '17:30', '18:00', '18:30']
  }

  // Intent patterns
  private readonly INTENT_PATTERNS = {
    BOOKING: [
      'book', 'appointment', 'schedule', 'reserve', 'nalaka', 'nafanya appointment'
    ],
    PRICING: [
      'price', 'cost', 'how much', 'bei', 'pesa', 'gharama'
    ],
    AVAILABILITY: [
      'available', 'free', 'open', 'time', 'when', 'uko wapi', 'muda'
    ],
    SERVICES: [
      'service', 'what do you do', 'offer', 'huduma', 'unafanya nini'
    ],
    CANCELLATION: [
      'cancel', 'change', 'reschedule', 'sitaki', 'badilisha'
    ],
    LOCATION: [
      'where', 'location', 'address', 'directions', 'wapi', 'mahali'
    ],
    GREETING: [
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'habari', 'mambo', 'niaje'
    ]
  }

  async processMessage(sessionId: string, userMessage: string, phoneNumber?: string): Promise<{
    response: string
    suggestions?: string[]
    context?: ConversationContext
  }> {
    try {
      // Get or create conversation context
      let context = await this.getConversationContext(sessionId)
      if (!context) {
        context = await this.createNewConversation(sessionId, phoneNumber)
      }

      // Add user message to history
      const userMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        type: 'user',
        content: userMessage,
        timestamp: new Date().toISOString()
      }
      context.messageHistory.push(userMsg)

      // Analyze user intent
      const intentResult = this.analyzeIntent(userMessage, context)
      userMsg.intent = intentResult.intent
      userMsg.entities = intentResult.entities

      // Generate response based on current stage and intent
      const response = await this.generateResponse(context, intentResult)

      // Add bot response to history
      const botMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        type: 'bot',
        content: response.response,
        timestamp: new Date().toISOString()
      }
      context.messageHistory.push(botMsg)

      // Update conversation context
      context.lastActivity = new Date().toISOString()
      await this.saveConversationContext(context)

      return response

    } catch (error) {
      console.error('Error processing message:', error)
      return {
        response: "I'm sorry, I'm having trouble understanding right now. Please try calling us at +254 712 345 678 or WhatsApp us for immediate assistance.",
        suggestions: ['Call Now', 'Try Again', 'Speak to Human']
      }
    }
  }

  private analyzeIntent(message: string, context: ConversationContext): IntentResult {
    const lowerMessage = message.toLowerCase()
    
    // Check for intent patterns
    for (const [intent, patterns] of Object.entries(this.INTENT_PATTERNS)) {
      for (const pattern of patterns) {
        if (lowerMessage.includes(pattern.toLowerCase())) {
          return {
            intent,
            confidence: 0.8,
            entities: this.extractEntities(message, intent)
          }
        }
      }
    }

    // Context-based intent inference
    if (context.currentStage === 'service_discovery' && this.hasServiceMention(lowerMessage)) {
      return { intent: 'SERVICE_SELECTION', confidence: 0.9, entities: this.extractServiceEntities(message) }
    }

    if (context.currentStage === 'time_selection' && this.hasTimeMention(lowerMessage)) {
      return { intent: 'TIME_SELECTION', confidence: 0.9, entities: this.extractTimeEntities(message) }
    }

    // Default intent
    return { intent: 'GENERAL_INQUIRY', confidence: 0.5, entities: [] }
  }

  private extractEntities(message: string, intent: string): any[] {
    const entities = []
    const lowerMessage = message.toLowerCase()

    // Extract service entities
    if (intent === 'BOOKING' || intent === 'SERVICES' || intent === 'PRICING') {
      const serviceEntities = this.extractServiceEntities(message)
      entities.push(...serviceEntities)
    }

    // Extract time entities
    if (intent === 'BOOKING' || intent === 'AVAILABILITY') {
      const timeEntities = this.extractTimeEntities(message)
      entities.push(...timeEntities)
    }

    // Extract staff entities
    const staffEntities = this.extractStaffEntities(message)
    entities.push(...staffEntities)

    return entities
  }

  private extractServiceEntities(message: string): any[] {
    const entities = []
    const lowerMessage = message.toLowerCase()

    for (const [service, synonyms] of Object.entries(this.SERVICE_SYNONYMS)) {
      for (const synonym of synonyms) {
        if (lowerMessage.includes(synonym.toLowerCase())) {
          entities.push({
            type: 'service',
            value: service,
            confidence: this.calculateSimilarity(synonym, lowerMessage)
          })
        }
      }
    }

    return entities.sort((a, b) => b.confidence - a.confidence)
  }

  private extractTimeEntities(message: string): any[] {
    const entities = []
    const lowerMessage = message.toLowerCase()

    // Check for time patterns
    for (const [timePhrase, times] of Object.entries(this.TIME_PATTERNS)) {
      if (lowerMessage.includes(timePhrase)) {
        entities.push({
          type: 'time_preference',
          value: timePhrase,
          times: times,
          confidence: 0.8
        })
      }
    }

    // Extract specific times (HH:MM format)
    const timeRegex = /(\d{1,2}):?(\d{2})?\s*(am|pm|morning|afternoon|evening)?/gi
    const timeMatches = message.match(timeRegex)
    if (timeMatches) {
      timeMatches.forEach(match => {
        entities.push({
          type: 'specific_time',
          value: match,
          confidence: 0.9
        })
      })
    }

    // Extract dates
    const dateRegex = /(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2}|\d{1,2}-\d{1,2})/gi
    const dateMatches = message.match(dateRegex)
    if (dateMatches) {
      dateMatches.forEach(match => {
        entities.push({
          type: 'date',
          value: match,
          confidence: 0.8
        })
      })
    }

    return entities
  }

  private extractStaffEntities(message: string): any[] {
    const entities = []
    const lowerMessage = message.toLowerCase()

    for (const [staff, variations] of Object.entries(this.STAFF_SYNONYMS)) {
      for (const variation of variations) {
        if (lowerMessage.includes(variation.toLowerCase())) {
          entities.push({
            type: 'staff',
            value: staff,
            confidence: 0.8
          })
        }
      }
    }

    return entities
  }

  private async generateResponse(context: ConversationContext, intentResult: IntentResult): Promise<{
    response: string
    suggestions?: string[]
  }> {
    const { intent, entities } = intentResult

    // Handle based on current conversation stage
    switch (context.currentStage) {
      case 'greeting':
        return this.handleGreeting(context, intent, entities)
      
      case 'service_discovery':
        return this.handleServiceDiscovery(context, intent, entities)
      
      case 'availability_check':
        return this.handleAvailabilityCheck(context, intent, entities)
      
      case 'staff_selection':
        return this.handleStaffSelection(context, intent, entities)
      
      case 'customer_details':
        return this.handleCustomerDetails(context, intent, entities)
      
      case 'confirmation':
        return this.handleConfirmation(context, intent, entities)
      
      default:
        return this.handleGreeting(context, intent, entities)
    }
  }

  private async handleGreeting(context: ConversationContext, intent: string, entities: any[]): Promise<{
    response: string
    suggestions?: string[]
  }> {
    // Check if user mentioned specific service or intent
    if (intent === 'BOOKING' || intent === 'SERVICES') {
      const serviceEntities = entities.filter(e => e.type === 'service')
      
      if (serviceEntities.length > 0) {
        // User mentioned specific service
        const service = await this.findServiceByName(serviceEntities[0].value)
        if (service) {
          context.bookingData.serviceId = service.id
          context.bookingData.serviceName = service.name
          context.currentStage = 'availability_check'
          
          return {
            response: `Perfect! I can help you book ${service.name}. This service takes ${service.durationMinutes} minutes and costs KES ${service.price.toLocaleString()}.\n\nWhat date would you prefer for your appointment?`,
            suggestions: ['Today', 'Tomorrow', 'This Weekend', 'Next Week']
          }
        }
      }
      
      // General booking inquiry
      context.currentStage = 'service_discovery'
      return {
        response: "I'd be happy to help you book an appointment! 💇‍♀️\n\nWe offer these popular services:\n• Haircut & Styling - KES 1,500\n• Hair Braiding - KES 2,500\n• Hair Treatment - KES 2,000\n• Hair Relaxing - KES 3,500\n• Wig Installation - KES 3,000\n\nWhich service interests you?",
        suggestions: ['Haircut', 'Braiding', 'Treatment', 'See All Services']
      }
    }

    if (intent === 'PRICING') {
      return {
        response: "Here are our service prices:\n\n💇‍♀️ Hair Services:\n• Haircut & Styling - KES 1,500\n• Hair Treatment - KES 2,000\n• Hair Relaxing - KES 3,500\n\n🤲 Braiding & Extensions:\n• Hair Braiding - KES 2,500\n• Wig Installation - KES 3,000\n\nWould you like to book any of these services?",
        suggestions: ['Book Haircut', 'Book Braiding', 'More Info', 'Call Salon']
      }
    }

    // Default greeting
    const timeOfDay = new Date().getHours()
    const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 17 ? 'Good afternoon' : 'Good evening'
    
    return {
      response: `${greeting}! Welcome to Annabella's Hair Salon! 💇‍♀️\n\nI'm here to help you book an appointment or answer questions about our services.\n\nWe're located in Ongata Rongai and specialize in:\n• Professional haircuts & styling\n• Beautiful braiding & extensions\n• Hair treatments & relaxing\n• Wig installation\n\nHow can I assist you today?`,
      suggestions: ['Book Appointment', 'View Services', 'Check Prices', 'Location Info']
    }
  }

  private async handleServiceDiscovery(context: ConversationContext, intent: string, entities: any[]): Promise<{
    response: string
    suggestions?: string[]
  }> {
    const serviceEntities = entities.filter(e => e.type === 'service')
    
    if (serviceEntities.length > 0) {
      const service = await this.findServiceByName(serviceEntities[0].value)
      if (service) {
        context.bookingData.serviceId = service.id
        context.bookingData.serviceName = service.name
        context.currentStage = 'availability_check'
        
        return {
          response: `Excellent choice! ${service.name} is one of our popular services.\n\n📋 Service Details:\n• Duration: ${service.durationMinutes} minutes\n• Price: KES ${service.price.toLocaleString()}\n• Description: ${service.description}\n\nWhat date would work best for you?`,
          suggestions: ['Today', 'Tomorrow', 'This Weekend', 'Different Service']
        }
      }
    }

    // Fuzzy match attempt
    const userMessage = context.messageHistory[context.messageHistory.length - 2]?.content || ''
    const fuzzyMatch = await this.fuzzyMatchService(userMessage)
    
    if (fuzzyMatch) {
      context.bookingData.serviceId = fuzzyMatch.id
      context.bookingData.serviceName = fuzzyMatch.name
      context.currentStage = 'availability_check'
      
      return {
        response: `I think you're looking for ${fuzzyMatch.name}! This service costs KES ${fuzzyMatch.price.toLocaleString()} and takes ${fuzzyMatch.durationMinutes} minutes.\n\nIs this the service you want to book?`,
        suggestions: ['Yes, Book This', 'Different Service', 'More Details', 'See All Services']
      }
    }

    // Couldn't match - ask for clarification
    return {
      response: "I want to make sure I understand exactly what you're looking for! 😊\n\nCould you tell me more about the service you want? For example:\n• 'I want a haircut'\n• 'I need braiding'\n• 'Hair treatment'\n\nOr you can browse all our services:",
      suggestions: ['Haircut & Styling', 'Hair Braiding', 'Hair Treatment', 'All Services']
    }
  }

  private async handleAvailabilityCheck(context: ConversationContext, intent: string, entities: any[]): Promise<{
    response: string
    suggestions?: string[]
  }> {
    const dateEntities = entities.filter(e => e.type === 'date')
    const timeEntities = entities.filter(e => e.type === 'time_preference' || e.type === 'specific_time')
    
    let targetDate = new Date().toISOString().split('T')[0] // Default to today

    // Parse date from entities
    if (dateEntities.length > 0) {
      targetDate = this.parseDate(dateEntities[0].value)
    }

    // Store the selected date in booking data
    context.bookingData.date = targetDate

    // Get availability for the service
    const availability = await this.getServiceAvailability(context.bookingData.serviceId!, targetDate)
    
    if (availability.length === 0) {
      return {
        response: `I'm sorry, we don't have any available slots for ${context.bookingData.serviceName} on ${this.formatDate(targetDate)}. 😔\n\nWould you like to try a different date?`,
        suggestions: ['Tomorrow', 'Day After', 'This Weekend', 'Call Salon']
      }
    }

    // Filter by time preference if provided
    let filteredSlots = availability
    if (timeEntities.length > 0) {
      const timePreference = timeEntities[0]
      if (timePreference.type === 'time_preference') {
        filteredSlots = availability.filter(slot => 
          this.TIME_PATTERNS[timePreference.value as keyof typeof this.TIME_PATTERNS]?.includes(slot.time)
        )
      }
    }

    if (filteredSlots.length === 0) {
      return {
        response: `We don't have slots available during your preferred time on ${this.formatDate(targetDate)}.\n\nHere are our available times:\n${this.formatAvailableSlots(availability)}\n\nWhich time works for you?`,
        suggestions: availability.slice(0, 4).map(slot => `${slot.time} with ${slot.staffName}`)
      }
    }

    context.currentStage = 'staff_selection'
    return {
      response: `Great! Here are available times for ${context.bookingData.serviceName} on ${this.formatDate(targetDate)}:\n\n${this.formatAvailableSlots(filteredSlots)}\n\nWhich stylist and time would you prefer?`,
      suggestions: filteredSlots.slice(0, 4).map(slot => `${slot.time} with ${slot.staffName}`)
    }
  }

  private async handleStaffSelection(context: ConversationContext, intent: string, entities: any[]): Promise<{
    response: string
    suggestions?: string[]
  }> {
    // User selected a time slot
    const userMessage = context.messageHistory[context.messageHistory.length - 2]?.content || ''
    const timeMatch = userMessage.match(/(\d{1,2}:?\d{0,2})/g)
    const staffMatch = this.extractStaffFromMessage(userMessage)

    if (timeMatch && staffMatch) {
      context.bookingData.time = timeMatch[0]
      context.bookingData.staffId = staffMatch.id
      context.bookingData.staffName = staffMatch.name
      context.currentStage = 'customer_details'

      return {
        response: `Perfect! I have you down for:\n\n📅 ${context.bookingData.serviceName}\n🕐 ${context.bookingData.time}\n👩‍💼 with ${context.bookingData.staffName}\n💰 KES ${await this.getServicePrice(context.bookingData.serviceId!)}\n\nTo confirm your appointment, I'll need:\n• Your full name\n• Your phone number\n\nWhat name should I put the appointment under?`,
        suggestions: []
      }
    }

    return {
      response: "I'd like to confirm which time slot you prefer. Please tell me the time and stylist, for example:\n• '2:00 PM with Catherine'\n• '10:30 AM with Grace'\n\nOr choose from the available options I showed you earlier.",
      suggestions: ['Show Times Again', 'Any Stylist', 'Call to Book']
    }
  }

  private async handleCustomerDetails(context: ConversationContext, intent: string, entities: any[]): Promise<{
    response: string
    suggestions?: string[]
  }> {
    const userMessage = context.messageHistory[context.messageHistory.length - 2]?.content || ''

    // Check if we're collecting name
    if (!context.bookingData.customerName) {
      // Simple name validation
      if (userMessage.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(userMessage.trim())) {
        context.bookingData.customerName = userMessage.trim()
        return {
          response: `Thank you, ${context.bookingData.customerName}! 😊\n\nNow I need your phone number for appointment confirmation and reminders. Please provide your mobile number:`,
          suggestions: []
        }
      } else {
        return {
          response: "Please provide your full name (first and last name) for the appointment:",
          suggestions: []
        }
      }
    }

    // Check if we're collecting phone
    if (!context.bookingData.customerPhone) {
      const phoneMatch = userMessage.match(/(\+254|0)[7-9]\d{8}/)
      if (phoneMatch) {
        context.bookingData.customerPhone = phoneMatch[0]
        context.currentStage = 'confirmation'
        
        return this.generateBookingConfirmation(context)
      } else {
        return {
          response: "Please provide a valid Kenyan phone number (e.g., 0712345678 or +254712345678):",
          suggestions: []
        }
      }
    }

    return {
      response: "I need a bit more information to complete your booking. What would you like to provide?",
      suggestions: ['Start Over', 'Call Salon', 'Speak to Human']
    }
  }

  private async generateBookingConfirmation(context: ConversationContext): Promise<{
    response: string
    suggestions?: string[]
  }> {
    const bookingData = context.bookingData
    const servicePrice = await this.getServicePrice(bookingData.serviceId!)

    return {
      response: `🎉 Perfect! Here's your booking summary:\n\n📋 APPOINTMENT DETAILS:\n• Service: ${bookingData.serviceName}\n• Date: ${this.formatDate(bookingData.date!)}\n• Time: ${bookingData.time}\n• Stylist: ${bookingData.staffName}\n• Customer: ${bookingData.customerName}\n• Phone: ${bookingData.customerPhone}\n• Price: KES ${servicePrice?.toLocaleString()}\n\n📍 Location: Annabella's Hair Salon, Ongata Rongai\n\nIs everything correct? Reply 'CONFIRM' to book your appointment!`,
      suggestions: ['CONFIRM', 'Change Time', 'Change Service', 'Start Over']
    }
  }

  private async handleConfirmation(context: ConversationContext, intent: string, entities: any[]): Promise<{
    response: string
    suggestions?: string[]
  }> {
    const userMessage = context.messageHistory[context.messageHistory.length - 2]?.content || ''
    
    if (userMessage.toLowerCase().includes('confirm') || userMessage.toLowerCase().includes('yes')) {
      // Create the actual booking
      const bookingResult = await this.createBooking(context.bookingData)
      
      if (bookingResult.success) {
        // Generate receipt
        return {
          response: `🎉 APPOINTMENT CONFIRMED!\n\n📋 Booking Reference: ${bookingResult.bookingId}\n\n📅 ${context.bookingData.serviceName}\n🗓️ ${this.formatDate(context.bookingData.date!)}\n🕐 ${context.bookingData.time}\n👩‍💼 ${context.bookingData.staffName}\n💰 KES ${bookingResult.price?.toLocaleString()}\n\n📍 Annabella's Hair Salon\nOngata Rongai, Kenya\n📞 +254 712 345 678\n\n⏰ Please arrive 10 minutes early\n🔄 To reschedule/cancel, call us or WhatsApp\n📲 You'll receive a reminder 24 hours before\n\nThank you for choosing Annabella's! We can't wait to see you! 💇‍♀️✨`,
          suggestions: ['Get Directions', 'Add to Calendar', 'Call Salon', 'Book Another']
        }
      } else {
        return {
          response: `I'm sorry, there was an issue confirming your appointment: ${bookingResult.error}\n\nPlease try again or call us directly at +254 712 345 678.`,
          suggestions: ['Try Again', 'Call Salon', 'Different Time', 'WhatsApp']
        }
      }
    }

    return {
      response: "To confirm your appointment, please reply with 'CONFIRM' or let me know if you'd like to make any changes:",
      suggestions: ['CONFIRM', 'Change Details', 'Start Over', 'Call Salon']
    }
  }

  // Helper methods
  private async getConversationContext(sessionId: string): Promise<ConversationContext | null> {
    try {
      return await kv.get(`conversation:${sessionId}`)
    } catch {
      return null
    }
  }

  private async createNewConversation(sessionId: string, phoneNumber?: string): Promise<ConversationContext> {
    const context: ConversationContext = {
      sessionId,
      customerId: phoneNumber,
      currentStage: 'greeting',
      bookingData: {},
      messageHistory: [],
      lastActivity: new Date().toISOString(),
      language: 'en'
    }
    
    await this.saveConversationContext(context)
    return context
  }

  private async saveConversationContext(context: ConversationContext): Promise<void> {
    await kv.set(`conversation:${context.sessionId}`, context)
  }

  private async findServiceByName(serviceName: string): Promise<any> {
    const services = await kv.getByPrefix('service:')
    return services.find(s => 
      s.name.toLowerCase().includes(serviceName.toLowerCase()) ||
      serviceName.toLowerCase().includes(s.name.toLowerCase())
    )
  }

  private async fuzzyMatchService(userInput: string): Promise<any> {
    const services = await kv.getByPrefix('service:')
    const lowerInput = userInput.toLowerCase()
    
    let bestMatch = null
    let bestScore = 0

    for (const service of services) {
      // Check against service synonyms
      for (const [key, synonyms] of Object.entries(this.SERVICE_SYNONYMS)) {
        for (const synonym of synonyms) {
          if (lowerInput.includes(synonym.toLowerCase())) {
            const score = this.calculateSimilarity(synonym, lowerInput)
            if (score > bestScore && score > 0.6) {
              bestScore = score
              // Find service that matches this category
              const matchingService = services.find(s => 
                s.name.toLowerCase().includes(key) ||
                s.description.toLowerCase().includes(key)
              )
              if (matchingService) {
                bestMatch = matchingService
              }
            }
          }
        }
      }
    }

    return bestMatch
  }

  private calculateSimilarity(str1: string, str2: string): number {
    // Simple similarity calculation - could be enhanced with Levenshtein distance
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    
    if (longer.length === 0) return 1.0
    
    const commonLength = longer.length - this.editDistance(longer, shorter)
    return commonLength / longer.length
  }

  private editDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        )
      }
    }
    
    return matrix[str2.length][str1.length]
  }

  private hasServiceMention(message: string): boolean {
    for (const synonyms of Object.values(this.SERVICE_SYNONYMS)) {
      for (const synonym of synonyms) {
        if (message.includes(synonym.toLowerCase())) {
          return true
        }
      }
    }
    return false
  }

  private hasTimeMention(message: string): boolean {
    return /(\d{1,2}:?\d{0,2}|morning|afternoon|evening|asubuhi|mchana|jioni|today|tomorrow)/i.test(message)
  }

  private parseDate(dateString: string): string {
    const today = new Date()
    const lowerDate = dateString.toLowerCase()
    
    if (lowerDate.includes('today')) {
      return today.toISOString().split('T')[0]
    }
    
    if (lowerDate.includes('tomorrow')) {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    }
    
    // Handle other date formats...
    return today.toISOString().split('T')[0]
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  private async getServiceAvailability(serviceId: string, date: string): Promise<any[]> {
    try {
      // Get all staff who can perform this service
      const staff = await kv.getByPrefix('staff:')
      const availableSlots = []

      for (const member of staff) {
        // Use the same availability checking logic as the main API
        const availability = await this.checkStaffAvailability(member.id, date)
        for (const slot of availability.availableSlots) {
          if (slot.available) {
            availableSlots.push({
              time: slot.time,
              staffId: member.id,
              staffName: member.name
            })
          }
        }
      }

      return availableSlots
    } catch (error) {
      console.error('Error getting service availability:', error)
      return []
    }
  }

  private async checkStaffAvailability(staffId: string, date: string): Promise<{ availableSlots: any[] }> {
    try {
      // Get staff member
      const staff = await kv.get(`staff:${staffId}`)
      if (!staff) {
        return { availableSlots: [] }
      }

      // Get business settings
      const business = await kv.get('business:annabellas')
      if (!business) {
        return { availableSlots: [] }
      }

      const operatingHours = business.settings.operatingHours
      const slotDuration = business.settings.bookingSlotDuration

      // Get day of week
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' })
      const hours = operatingHours[dayOfWeek]

      if (!hours) {
        return { availableSlots: [] }
      }

      // Generate time slots
      const slots = []
      const startTime = new Date(`${date}T${hours.start}:00`)
      const endTime = new Date(`${date}T${hours.end}:00`)
      
      let currentTime = new Date(startTime)
      while (currentTime < endTime) {
        const timeString = currentTime.toTimeString().slice(0, 5)
        
        // Check if slot is booked
        const appointmentKey = `appointment:${staffId}:${date}:${timeString}`
        const existingAppointment = await kv.get(appointmentKey)
        
        if (!existingAppointment) {
          slots.push({
            time: timeString,
            available: true
          })
        }
        
        currentTime.setMinutes(currentTime.getMinutes() + slotDuration)
      }

      return { availableSlots: slots }
    } catch (error) {
      console.error('Error checking staff availability:', error)
      return { availableSlots: [] }
    }
  }

  private formatAvailableSlots(slots: any[]): string {
    return slots.map(slot => `• ${slot.time} with ${slot.staffName}`).join('\n')
  }

  private extractStaffFromMessage(message: string): { id: string; name: string } | null {
    const lowerMessage = message.toLowerCase()
    
    // Check for Catherine variations
    if (lowerMessage.includes('catherine') || lowerMessage.includes('cate') || lowerMessage.includes('cathy')) {
      return { id: 'staff_001', name: 'Catherine Wanjiku' }
    }
    
    // Check for Grace variations
    if (lowerMessage.includes('grace') || lowerMessage.includes('gracie')) {
      return { id: 'staff_002', name: 'Grace Muthoni' }
    }
    
    return null
  }

  private async getServicePrice(serviceId: string): Promise<number> {
    const service = await kv.get(`service:${serviceId}`)
    return service?.price || 0
  }

  private async createBooking(bookingData: Partial<BookingData>): Promise<{
    success: boolean
    bookingId?: string
    price?: number
    error?: string
  }> {
    try {
      // Direct booking creation using the same logic as the main API
      const { staffId, serviceId, customerName, customerPhone, date, time } = bookingData

      if (!staffId || !serviceId || !customerName || !customerPhone || !date || !time) {
        return { success: false, error: 'Missing required booking information' }
      }

      // Get service details
      const service = await kv.get(`service:${serviceId}`)
      if (!service) {
        return { success: false, error: 'Service not found' }
      }

      // Get staff details
      const staff = await kv.get(`staff:${staffId}`)
      if (!staff) {
        return { success: false, error: 'Staff member not found' }
      }

      // Check if slot is still available
      const appointmentKey = `appointment:${staffId}:${date}:${time}`
      const existingAppointment = await kv.get(appointmentKey)
      
      if (existingAppointment) {
        return { success: false, error: 'Time slot is no longer available' }
      }

      // Calculate end time
      const startDateTime = new Date(`${date}T${time}:00`)
      const endDateTime = new Date(startDateTime.getTime() + service.durationMinutes * 60000)
      const endTime = endDateTime.toTimeString().slice(0, 5)

      // Create appointment
      const appointmentId = `apt_${Date.now()}`
      const appointment = {
        id: appointmentId,
        businessId: 'annabellas',
        staffId,
        serviceId,
        customerName,
        customerPhone,
        date,
        startTime: time,
        endTime,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        notes: 'Booked via AI Chat Assistant'
      }

      // Store appointment
      await kv.set(appointmentKey, appointment)
      await kv.set(`appointment_by_id:${appointmentId}`, appointment)

      // Block additional slots if service duration spans multiple slots
      const business = await kv.get('business:annabellas')
      const slotDuration = business.settings.bookingSlotDuration
      const slotsNeeded = Math.ceil(service.durationMinutes / slotDuration)
      
      for (let i = 1; i < slotsNeeded; i++) {
        const blockTime = new Date(startDateTime.getTime() + i * slotDuration * 60000)
        const blockTimeString = blockTime.toTimeString().slice(0, 5)
        const blockKey = `appointment:${staffId}:${date}:${blockTimeString}`
        
        await kv.set(blockKey, {
          ...appointment,
          isBlocked: true,
          blockReason: `Continuation of ${appointmentId}`
        })
      }

      return {
        success: true,
        bookingId: appointmentId,
        price: service.price
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      return {
        success: false,
        error: 'System error occurred while creating booking'
      }
    }
  }
}