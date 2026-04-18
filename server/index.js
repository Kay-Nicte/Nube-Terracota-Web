import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Stripe from 'stripe'
import passport from 'passport'
import authRouter from './auth.js'
import { initDB, addSubscriber } from './db.js'

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const GELATO_API_KEY = process.env.GELATO_API_KEY
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174'

// Webhook needs raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderData = JSON.parse(session.metadata.gelato_order)

    try {
      const gelatoRes = await fetch('https://order.gelatoapis.com/v4/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': GELATO_API_KEY,
        },
        body: JSON.stringify(orderData),
      })

      const result = await gelatoRes.json()
      console.log('Gelato order created:', result)
    } catch (err) {
      console.error('Gelato order failed:', err)
    }
  }

  res.json({ received: true })
})

app.use(cors({ origin: FRONTEND_URL }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

// Newsletter
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email requerido' })
    await addSubscriber(email)
    res.json({ ok: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    res.status(500).json({ error: 'Error al suscribirse' })
  }
})

// Auth routes
app.use('/api/auth', authRouter)

// Create checkout session
app.post('/api/checkout', async (req, res) => {
  try {
    const { items, shippingAddress } = req.body

    // Build line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${item.name} - ${item.size} - ${item.color}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    // Add shipping if under 45 EUR
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    if (subtotal < 45) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: 'Envío' },
          unit_amount: 395,
        },
        quantity: 1,
      })
    }

    // Build Gelato order data to store in metadata
    const gelatoOrder = {
      orderType: 'order',
      orderReferenceId: `NT-${Date.now()}`,
      customerReferenceId: `customer-${Date.now()}`,
      currency: 'EUR',
      items: items.map(item => ({
        itemReferenceId: `item-${item.id}-${item.size}-${item.color}`,
        productUid: item.gelatoProductUid || 'generic_product',
        quantity: item.quantity,
        fileUrl: item.designUrl || 'https://nubeterracota.com/placeholder.png',
      })),
      shippingAddress: shippingAddress || {},
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['ES', 'FR', 'PT', 'IT', 'DE', 'GB', 'US', 'MX', 'AR', 'CL', 'CO'],
      },
      success_url: `${FRONTEND_URL}/pedido-completado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/carrito`,
      metadata: {
        gelato_order: JSON.stringify(gelatoOrder),
      },
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    res.status(500).json({ error: err.message })
  }
})

// Get order status
app.get('/api/order/:id', async (req, res) => {
  try {
    const gelatoRes = await fetch(`https://order.gelatoapis.com/v4/orders/${req.params.id}`, {
      headers: { 'X-API-KEY': GELATO_API_KEY },
    })
    const data = await gelatoRes.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3001

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch(err => {
  console.error('Database init failed:', err)
  process.exit(1)
})
