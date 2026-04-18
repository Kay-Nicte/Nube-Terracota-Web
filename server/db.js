import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('railway') ? { rejectUnauthorized: false } : false,
})

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      google_id TEXT,
      apple_id TEXT,
      avatar TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      items JSONB NOT NULL,
      total NUMERIC(10,2),
      status TEXT DEFAULT 'Fabricando',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  // Add avatar column if missing (for existing tables)
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT`).catch(() => {})
  console.log('Database tables ready')
}

export async function findUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  return rows[0] || null
}

export async function findUserById(id) {
  const { rows } = await pool.query('SELECT id, name, email, avatar FROM users WHERE id = $1', [id])
  return rows[0] || null
}

export async function createUser({ id, name, email, password, googleId, appleId }) {
  const { rows } = await pool.query(
    'INSERT INTO users (id, name, email, password, google_id, apple_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email',
    [id, name, email, password || null, googleId || null, appleId || null]
  )
  return rows[0]
}

export async function createOrder({ id, userId, items, total, status }) {
  const { rows } = await pool.query(
    'INSERT INTO orders (id, user_id, items, total, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, userId, JSON.stringify(items), total, status || 'Fabricando']
  )
  return rows[0]
}

export async function getOrdersByUser(userId) {
  const { rows } = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId])
  return rows
}

export async function addSubscriber(email) {
  const { rows } = await pool.query(
    'INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *',
    [email]
  )
  return rows[0]
}

export default pool
