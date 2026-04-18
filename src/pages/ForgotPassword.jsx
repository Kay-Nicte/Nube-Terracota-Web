import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: conectar con backend para enviar email de recuperación
    setSent(true)
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Recuperar contraseña</h1>

        {sent ? (
          <div className="auth-success">
            <p>Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.</p>
            <Link to="/login" className="btn btn-primary auth-submit" style={{ marginTop: 20 }}>Volver al login</Link>
          </div>
        ) : (
          <>
            <p className="auth-forgot-text">Escribe tu email y te enviaremos un enlace para restablecer tu contraseña.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary auth-submit">Enviar enlace</button>
            </form>
            <p className="auth-switch">
              <Link to="/login">Volver al login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
