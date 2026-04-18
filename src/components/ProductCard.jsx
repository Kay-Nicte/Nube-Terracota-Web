import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <Link to={`/producto/${product.id}`} className="product-card">
      <div className={`product-card-image ${product.rotateImage ? 'rotate-image' : ''}`}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p className="product-card-price">{product.price.toFixed(2)} EUR</p>
        <div className="product-card-colors">
          {product.colors.map(color => (
            <span key={color} className="product-card-color" title={color}>
              {color}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
