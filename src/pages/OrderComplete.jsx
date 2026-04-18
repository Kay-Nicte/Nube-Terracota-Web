import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'
import './OrderComplete.css'

function OrderComplete() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="order-complete">
      <div className="container order-complete-content">
        <h1>Pedido completado</h1>
        <p>
          Tu pedido se ha recibido correctamente. Ahora empieza la magia:
          tus prendas se van a fabricar especialmente para ti.
        </p>
        <p className="order-time">
          Tiempo estimado de entrega: 5-8 días laborables.
        </p>
        <p>
          Recibirás un email con los detalles y el seguimiento de tu pedido.
        </p>
        <Link to="/tienda" className="btn btn-primary" style={{ marginTop: 24 }}>
          Seguir comprando
        </Link>
      </div>
    </div>
  )
}

export default OrderComplete
