import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { API_URL } from '../config'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
    }
    setLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="cart-page" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container cart-empty">
          <h1>{t('cart.empty_title')}</h1>
          <p>{t('cart.empty_text')}</p>
          <Link to="/tienda" className="btn btn-primary">{t('cart.go_shop')}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container">
        <h1 className="cart-title">{t('cart.title')}</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-image">
                  <div className="product-card-placeholder" style={{ width: 80, height: 100, borderRadius: 8 }}>
                    <span>{item.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="cart-item-info">
                  <h3>
                    <Link to={`/producto/${item.id}`}>{item.name}</Link>
                  </h3>
                  <p className="cart-item-meta">{t('cart.size')}: {item.size} | {t('cart.color')}: {item.color}</p>
                  <p className="cart-item-pod">{t('cart.pod_note')}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-price">
                  {(item.price * item.quantity).toFixed(2)} EUR
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id, item.size)}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>{t('cart.summary')}</h3>
            <div className="cart-summary-row">
              <span>{t('cart.subtotal')}</span>
              <span>{totalPrice.toFixed(2)} EUR</span>
            </div>
            <div className="cart-summary-row">
              <span>{t('cart.shipping')}</span>
              <span>{totalPrice >= 45 ? t('cart.free') : '3.95 EUR'}</span>
            </div>
            <div className="cart-summary-total">
              <span>{t('cart.total')}</span>
              <span>{(totalPrice + (totalPrice >= 45 ? 0 : 3.95)).toFixed(2)} EUR</span>
            </div>
            <p className="cart-free-shipping">
              {totalPrice >= 45
                ? t('cart.free_shipping')
                : t('cart.shipping_left', { amount: (60 - totalPrice).toFixed(2) })}
            </p>
            <button className="btn btn-primary cart-checkout" onClick={handleCheckout} disabled={loading}>
              {loading ? '...' : t('cart.checkout')}
            </button>
            <button className="btn btn-secondary cart-clear" onClick={clearCart}>
              {t('cart.clear')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
