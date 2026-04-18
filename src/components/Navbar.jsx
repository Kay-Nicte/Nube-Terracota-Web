import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import LanguageSelector from './LanguageSelector'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-nube">Nube</span>
          <span className="logo-terracota">Terracota</span>
        </Link>

        <button
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/tienda" onClick={() => setMenuOpen(false)}>{t('nav.shop')}</NavLink>
          <NavLink to="/nosotras" onClick={() => setMenuOpen(false)}>{t('nav.about')}</NavLink>
          <NavLink to="/contacto" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavLink>
          <NavLink to="/carrito" className="navbar-cart" onClick={() => setMenuOpen(false)}>
            {t('nav.cart')}
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
          <NavLink to={user ? '/cuenta' : '/login'} onClick={() => setMenuOpen(false)}>
            {user ? user.name.split(' ')[0] : 'Entrar'}
          </NavLink>
          <LanguageSelector />
        </div>
        <div className={`navbar-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      </div>
    </nav>
  )
}

export default Navbar
