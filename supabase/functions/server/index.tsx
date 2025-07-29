import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'
import { AIEngine } from './ai-engine.tsx'

const app = new Hono()

app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))

app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
)

const aiEngine = new AIEngine()

// Initialize default data
app.get('/make-server-e43aaacd/init', async (c) => {
  try {
    // Check if business already exists
    const existingBusiness = await kv.get('business:annabellas')
    
    if (!existingBusiness) {
      // Create business
      await kv.set('business:annabellas', {
        id: 'annabellas',
        name: "Annabella's Hair Salon",
        phone: '+254712345678',
        email: 'info@annabellashair.co.ke',
        address: 'Ongata Rongai, Kenya',
        currency: 'KES',
        settings: {
          operatingHours: {
            monday: { start: '08:00', end: '18:00' },
            tuesday: { start: '08:00', end: '18:00' },
            wednesday: { start: '08:00', end: '18:00' },
            thursday: { start: '08:00', end: '18:00' },
            friday: { start: '08:00', end: '18:00' },
            saturday: { start: '08:00', end: '19:00' },
            sunday: { start: '10:00', end: '17:00' }
          },
          bookingSlotDuration: 30,
          advanceBookingDays: 30
        }
      })

      // Create default staff
      const staff = [
        {
          id: 'staff_001',
          businessId: 'annabellas',
          name: 'Catherine Wanjiku',
          phone: '+254712345678',
          email: 'catherine@annabellashair.co.ke',
          role: 'owner',
          specialties: ['All Services', 'Hair Styling', 'Hair Treatment'],
          active: true
        },
        {
          id: 'staff_002',
          businessId: 'annabellas',
          name: 'Grace Muthoni',
          phone: '+254723456789',
          email: 'grace@annabellashair.co.ke',
          role: 'stylist',
          specialties: ['Hair Braiding', 'Natural Hair Care', 'Hair Styling'],
          active: true
        }
      ]

      for (const member of staff) {
        await kv.set(`staff:${member.id}`, member)
      }

      // Create default services
      const services = [
        {
          id: 'service_001',
          businessId: 'annabellas',
          name: 'Haircut & Styling',
          description: 'Professional haircut with styling and finish',
          durationMinutes: 60,
          price: 1500,
          category: 'cutting',
          active: true
        },
        {
          id: 'service_002',
          businessId: 'annabellas',
          name: 'Hair Braiding',
          description: 'Traditional and modern braiding styles',
          durationMinutes: 120,
          price: 2500,
          category: 'braiding',
          active: true
        },
        {
          id: 'service_003',
          businessId: 'annabellas',
          name: 'Hair Treatment',
          description: 'Deep conditioning and scalp treatment',
          durationMinutes: 90,
          price: 2000,
          category: 'treatment',
          active: true
        },
        {
          id: 'service_004',
          businessId: 'annabellas',
          name: 'Hair Relaxing',
          description: 'Chemical relaxing and styling',
          durationMinutes: 150,
          price: 3500,
          category: 'chemical',
          active: true
        },
        {
          id: 'service_005',
          businessId: 'annabellas',
          name: 'Wig Installation',
          description: 'Professional wig fitting and styling',
          durationMinutes: 90,
          price: 3000,
          category: 'styling',
          active: true
        }
      ]

      for (const service of services) {
        await kv.set(`service:${service.id}`, service)
      }
    }

    return c.json({ message: 'Salon data initialized successfully' })
  } catch (error) {
    console.log('Error initializing salon data:', error)
    return c.json({ error: 'Failed to initialize salon data' }, 500)
  }
})

// Get all services
app.get('/make-server-e43aaacd/api/services', async (c) => {
  try {
    const services = await kv.getByPrefix('service:')
    const activeServices = services.filter(service => service.active)
    return c.json(activeServices)
  } catch (error) {
    console.log('Error fetching services:', error)
    return c.json({ error: 'Failed to fetch services' }, 500)
  }
})

// Get all staff
app.get('/make-server-e43aaacd/api/staff', async (c) => {
  try {
    const staff = await kv.getByPrefix('staff:')
    const activeStaff = staff.filter(member => member.active)
    return c.json(activeStaff)
  } catch (error) {
    console.log('Error fetching staff:', error)
    return c.json({ error: 'Failed to fetch staff' }, 500)
  }
})

// Get availability for a staff member on a specific date
app.get('/make-server-e43aaacd/api/availability/:staffId', async (c) => {
  try {
    const staffId = c.req.param('staffId')
    const date = c.req.query('date') || new Date().toISOString().split('T')[0]
    
    // Get staff member
    const staff = await kv.get(`staff:${staffId}`)
    if (!staff) {
      return c.json({ error: 'Staff member not found' }, 404)
    }

    // Get business settings
    const business = await kv.get('business:annabellas')
    const operatingHours = business.settings.operatingHours
    const slotDuration = business.settings.bookingSlotDuration

    // Get day of week
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' })
    const hours = operatingHours[dayOfWeek]

    if (!hours) {
      return c.json({ availableSlots: [] })
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

    return c.json({ availableSlots: slots })
  } catch (error) {
    console.log('Error fetching availability:', error)
    return c.json({ error: 'Failed to fetch availability' }, 500)
  }
})

// Create appointment
app.post('/make-server-e43aaacd/api/appointments', async (c) => {
  try {
    const body = await c.req.json()
    const { staffId, serviceId, customerName, customerPhone, date, time, notes } = body

    if (!staffId || !serviceId || !customerName || !customerPhone || !date || !time) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Get service details
    const service = await kv.get(`service:${serviceId}`)
    if (!service) {
      return c.json({ error: 'Service not found' }, 404)
    }

    // Get staff details
    const staff = await kv.get(`staff:${staffId}`)
    if (!staff) {
      return c.json({ error: 'Staff member not found' }, 404)
    }

    // Check if slot is still available
    const appointmentKey = `appointment:${staffId}:${date}:${time}`
    const existingAppointment = await kv.get(appointmentKey)
    
    if (existingAppointment) {
      return c.json({ error: 'Time slot is no longer available' }, 409)
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
      notes: notes || ''
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

    return c.json({
      appointment,
      service: {
        name: service.name,
        price: service.price,
        duration: service.durationMinutes
      },
      staff: {
        name: staff.name
      }
    })
  } catch (error) {
    console.log('Error creating appointment:', error)
    return c.json({ error: 'Failed to create appointment' }, 500)
  }
})

// Get appointments for a specific date
app.get('/make-server-e43aaacd/api/appointments', async (c) => {
  try {
    const date = c.req.query('date') || new Date().toISOString().split('T')[0]
    const staffId = c.req.query('staffId')
    
    const appointments = await kv.getByPrefix('appointment_by_id:')
    
    let filteredAppointments = appointments.filter(apt => 
      apt.date === date && !apt.isBlocked
    )
    
    if (staffId) {
      filteredAppointments = filteredAppointments.filter(apt => apt.staffId === staffId)
    }

    // Enrich with service and staff details
    const enrichedAppointments = await Promise.all(
      filteredAppointments.map(async (appointment) => {
        const service = await kv.get(`service:${appointment.serviceId}`)
        const staff = await kv.get(`staff:${appointment.staffId}`)
        
        return {
          ...appointment,
          service: service ? { name: service.name, price: service.price } : null,
          staff: staff ? { name: staff.name } : null
        }
      })
    )

    return c.json(enrichedAppointments)
  } catch (error) {
    console.log('Error fetching appointments:', error)
    return c.json({ error: 'Failed to fetch appointments' }, 500)
  }
})

// Enhanced AI Chat endpoint
app.post('/make-server-e43aaacd/api/chat', async (c) => {
  try {
    const body = await c.req.json()
    const { message, sessionId, phoneNumber } = body

    if (!message || !sessionId) {
      return c.json({ error: 'Message and sessionId are required' }, 400)
    }

    console.log(`Processing chat message from session ${sessionId}: ${message}`)

    // Process message through AI Engine
    const response = await aiEngine.processMessage(sessionId, message, phoneNumber)

    return c.json(response)

  } catch (error) {
    console.log('Error in enhanced chat:', error)
    return c.json({ 
      response: "I'm sorry, I'm having trouble responding right now. Please try calling us at +254 712 345 678 or WhatsApp us for immediate assistance.",
      suggestions: ['Call Now', 'WhatsApp', 'Try Again']
    }, 500)
  }
})

// Get business info
app.get('/make-server-e43aaacd/api/business', async (c) => {
  try {
    const business = await kv.get('business:annabellas')
    return c.json(business)
  } catch (error) {
    console.log('Error fetching business info:', error)
    return c.json({ error: 'Failed to fetch business information' }, 500)
  }
})

// Chat session management
app.delete('/make-server-e43aaacd/api/chat/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId')
    await kv.del(`conversation:${sessionId}`)
    return c.json({ message: 'Session cleared successfully' })
  } catch (error) {
    console.log('Error clearing chat session:', error)
    return c.json({ error: 'Failed to clear session' }, 500)
  }
})

Deno.serve(app.fetch)