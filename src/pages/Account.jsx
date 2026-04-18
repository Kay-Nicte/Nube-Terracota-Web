import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_URL } from '../config'
import avatars from '../data/avatars'
import './Account.css'

function Account() {
  const { user, token, logout, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('pedidos')
  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [currentAvatar, setCurrentAvatar] = useState(null)
  const fileRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
    if (user) {
      setNewName(user.name)
      setCurrentAvatar(user.avatar || null)
    }
  }, [user, authLoading])

  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/api/auth/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => { if (Array.isArray(data)) setOrders(data) })
        .catch(() => {})
    }
  }, [token])

  if (authLoading || !user) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSaveName = async () => {
    if (!newName.trim() || newName === user.name) {
      setEditingName(false)
      return
    }
    setSaving(true)
    try {
      await fetch(`${API_URL}/api/auth/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newName.trim() }),
      })
      window.location.reload()
    } catch {}
    setSaving(false)
    setEditingName(false)
  }

  const handleSelectAvatar = async (avatarId) => {
    setCurrentAvatar(avatarId)
    setShowAvatarPicker(false)
    await fetch(`${API_URL}/api/auth/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ avatar: avatarId }),
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 500000) {
      alert('La imagen es demasiado grande. Maximo 500KB.')
      return
    }
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result
      setCurrentAvatar(base64)
      setShowAvatarPicker(false)
      await fetch(`${API_URL}/api/auth/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ avatar: base64 }),
      })
    }
    reader.readAsDataURL(file)
  }

  const renderAvatar = (size) => {
    if (!currentAvatar) {
      return (
        <div className="account-avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      )
    }
    if (currentAvatar.startsWith('data:')) {
      return <img src={currentAvatar} alt="Avatar" className="account-avatar-img" style={{ width: size, height: size }} />
    }
    const preset = avatars.find(a => a.id === currentAvatar)
    if (preset) {
      return <div className="account-avatar-svg" style={{ width: size, height: size }} dangerouslySetInnerHTML={{ __html: preset.svg }} />
    }
    return (
      <div className="account-avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>
        {user.name.charAt(0).toUpperCase()}
      </div>
    )
  }

  const activeOrders = orders.filter(o => o.status !== 'Entregado')
  const pastOrders = orders.filter(o => o.status === 'Entregado')

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <div className="account-avatar-wrap" onClick={() => setShowAvatarPicker(!showAvatarPicker)}>
            {renderAvatar(56)}
            <span className="avatar-edit-hint">Cambiar</span>
          </div>
          <div>
            <h1>Hola, {user.name.split(' ')[0]}</h1>
            <p className="account-email">{user.email}</p>
          </div>
        </div>

        {showAvatarPicker && (
          <div className="avatar-picker">
            <h3>Elige tu avatar</h3>
            <div className="avatar-grid">
              {avatars.map(a => (
                <button
                  key={a.id}
                  className={`avatar-option ${currentAvatar === a.id ? 'active' : ''}`}
                  onClick={() => handleSelectAvatar(a.id)}
                  dangerouslySetInnerHTML={{ __html: a.svg }}
                />
              ))}
              <button className="avatar-option avatar-upload" onClick={() => fileRef.current.click()}>
                <span>+</span>
                <small>Subir foto</small>
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUploadPhoto} style={{ display: 'none' }} />
          </div>
        )}

        <div className="account-tabs">
          <button
            className={`account-tab ${activeTab === 'pedidos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pedidos')}
          >
            Mis pedidos
          </button>
          <button
            className={`account-tab ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveTab('perfil')}
          >
            Mi perfil
          </button>
        </div>

        {activeTab === 'pedidos' && (
          <div className="account-section">
            {orders.length === 0 ? (
              <div className="account-empty">
                <h3>Aun no tienes pedidos</h3>
                <p>Cuando compres algo, aqui veras el estado de tus pedidos.</p>
                <Link to="/tienda" className="btn btn-primary" style={{ marginTop: 16 }}>Ir a la tienda</Link>
              </div>
            ) : (
              <>
                {activeOrders.length > 0 && (
                  <div className="orders-section">
                    <h2>Pedidos activos</h2>
                    <div className="orders-list">
                      {activeOrders.map(order => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <span className="order-id">{order.id}</span>
                            <span className={`order-status status-${order.status?.toLowerCase()}`}>{order.status}</span>
                          </div>
                          <div className="order-items">
                            {order.items?.map((item, i) => (
                              <div key={i} className="order-item-row">
                                <span>{item.name}</span>
                                <span className="order-item-detail">{item.size} / {item.color} x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="order-footer">
                            <span className="order-date">{new Date(order.created_at).toLocaleDateString('es-ES')}</span>
                            <span className="order-total">{Number(order.total).toFixed(2)} EUR</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pastOrders.length > 0 && (
                  <div className="orders-section">
                    <h2>Compras anteriores</h2>
                    <div className="orders-list">
                      {pastOrders.map(order => (
                        <div key={order.id} className="order-card past">
                          <div className="order-header">
                            <span className="order-id">{order.id}</span>
                            <span className="order-status status-entregado">Entregado</span>
                          </div>
                          <div className="order-items">
                            {order.items?.map((item, i) => (
                              <div key={i} className="order-item-row">
                                <span>{item.name}</span>
                                <span className="order-item-detail">{item.size} / {item.color} x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="order-footer">
                            <span className="order-date">{new Date(order.created_at).toLocaleDateString('es-ES')}</span>
                            <span className="order-total">{Number(order.total).toFixed(2)} EUR</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'perfil' && (
          <div className="account-section">
            <div className="profile-card">
              <div className="profile-field">
                <label>Nombre</label>
                {editingName ? (
                  <div className="profile-edit-row">
                    <input
                      type="text"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      className="profile-input"
                    />
                    <button className="btn btn-primary btn-small" onClick={handleSaveName} disabled={saving}>
                      {saving ? '...' : 'Guardar'}
                    </button>
                    <button className="btn btn-secondary btn-small" onClick={() => { setEditingName(false); setNewName(user.name) }}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="profile-value-row">
                    <p>{user.name}</p>
                    <button className="profile-edit-btn" onClick={() => setEditingName(true)}>Editar</button>
                  </div>
                )}
              </div>
              <div className="profile-field">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handleLogout} style={{ marginTop: 32 }}>
              Cerrar sesion
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Account
