import { Router } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import appleSignin from 'apple-signin-auth'
import pool, { findUserByEmail, findUserById, createUser, createOrder, getOrdersByUser } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const router = Router()

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No autorizado' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

// Google OAuth setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.FRONTEND_URL ? 'https://nube-terracota-service-production.up.railway.app/api/auth/google/callback' : '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value
    const name = profile.displayName
    let user = await findUserByEmail(email)
    if (!user) {
      user = await createUser({ id: Date.now().toString(), name, email, googleId: profile.id })
    }
    done(null, user)
  } catch (err) {
    done(err)
  }
}))

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
    }
    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(400).json({ error: 'Ya existe una cuenta con este email' })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await createUser({ id: Date.now().toString(), name, email, password: hash })
    const token = generateToken(user)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Error al crear la cuenta' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    if (!user) return res.status(400).json({ error: 'Email o contraseña incorrectos' })
    if (!user.password) return res.status(400).json({ error: 'Esta cuenta usa Google o Apple para entrar' })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ error: 'Email o contraseña incorrectos' })
    const token = generateToken(user)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})

// Helper: build redirect URL for web or app
function buildAuthRedirect(token, user, fromApp) {
  const params = `token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&id=${user.id}`
  if (fromApp) {
    return `nubeterracota://auth?${params}`
  }
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174'
  return `${frontendUrl}/login?${params}`
}

// Google login
router.get('/google', (req, res, next) => {
  if (req.query.from === 'app') {
    res.cookie('nt_from', 'app', { maxAge: 5 * 60 * 1000, httpOnly: true, sameSite: 'lax' })
  }
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next)
})

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), (req, res) => {
  const token = generateToken(req.user)
  const fromApp = req.cookies?.nt_from === 'app'
  res.clearCookie('nt_from')
  res.redirect(buildAuthRedirect(token, req.user, fromApp))
})

// Apple login
router.get('/apple', (req, res) => {
  if (req.query.from === 'app') {
    res.cookie('nt_from', 'app', { maxAge: 5 * 60 * 1000, httpOnly: true, sameSite: 'lax' })
  }
  const url = appleSignin.getAuthorizationUrl({
    clientID: process.env.APPLE_SERVICE_ID,
    redirectUri: 'https://nube-terracota-service-production.up.railway.app/api/auth/apple/callback',
    scope: 'name email',
    responseMode: 'form_post',
  })
  res.redirect(url)
})

router.post('/apple/callback', async (req, res) => {
  try {
    const { code } = req.body
    const privateKey = readFileSync(join(__dirname, 'AuthKey_K6A2256HQS.p8'), 'utf8')

    const clientSecret = appleSignin.getClientSecret({
      clientID: process.env.APPLE_SERVICE_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyIdentifier: process.env.APPLE_KEY_ID,
      privateKey,
    })

    const tokens = await appleSignin.getAuthorizationToken(code, {
      clientID: process.env.APPLE_SERVICE_ID,
      clientSecret,
      redirectUri: 'https://nube-terracota-service-production.up.railway.app/api/auth/apple/callback',
    })

    const appleUser = await appleSignin.verifyIdToken(tokens.id_token, { audience: process.env.APPLE_SERVICE_ID })
    const email = appleUser.email

    let name = 'Usuario'
    if (req.body.user) {
      try {
        const userData = JSON.parse(req.body.user)
        name = [userData.name?.firstName, userData.name?.lastName].filter(Boolean).join(' ') || email.split('@')[0]
      } catch { name = email.split('@')[0] }
    } else {
      name = email ? email.split('@')[0] : 'Usuario'
    }

    let user = await findUserByEmail(email)
    if (!user) {
      user = await createUser({ id: Date.now().toString(), name, email, appleId: appleUser.sub })
    }

    const token = generateToken(user)
    const fromApp = req.cookies?.nt_from === 'app'
    res.clearCookie('nt_from')
    res.redirect(buildAuthRedirect(token, user, fromApp))
  } catch (err) {
    console.error('Apple auth error:', err.message, err)
    const fromApp = req.cookies?.nt_from === 'app'
    res.clearCookie('nt_from')
    if (fromApp) {
      res.redirect('nubeterracota://auth?error=apple_auth_failed')
    } else {
      const frontendUrl = process.env.FRONTEND_URL || 'https://nubeterracota.com'
      res.redirect(`${frontendUrl}/login?error=apple_auth_failed`)
    }
  }
})

// Update profile
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { name, avatar } = req.body
    if (name) {
      await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, req.user.id])
    }
    if (avatar !== undefined) {
      await pool.query('UPDATE users SET avatar = $1 WHERE id = $2', [avatar, req.user.id])
    }
    const { rows } = await pool.query('SELECT id, name, email, avatar FROM users WHERE id = $1', [req.user.id])
    if (!rows[0]) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar perfil' })
  }
})

// Get profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
})

// Save order
router.post('/orders', authMiddleware, async (req, res) => {
  try {
    const order = await createOrder({
      id: `NT-${Date.now()}`,
      userId: req.user.id,
      items: req.body.items,
      total: req.body.total,
    })
    res.json(order)
  } catch (err) {
    console.error('Order error:', err)
    res.status(500).json({ error: 'Error al guardar pedido' })
  }
})

// Get user orders
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.user.id)
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedidos' })
  }
})

export default router
export { authMiddleware }
