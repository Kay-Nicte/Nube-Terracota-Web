import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'
import products, { categories } from '../data/products'
import './Shop.css'

const categoryKeys = {
  todos: 'shop.all',
  camisetas: 'shop.tshirts',
  sudaderas: 'shop.hoodies',
  banadores: 'shop.swimwear',
  pantalones: 'shop.pants',
  vestidos: 'shop.dresses',
  accesorios: 'shop.accessories',
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const catParam = searchParams.get('cat') || 'todos'
  const [activeCategory, setActiveCategory] = useState(catParam)
  const { t } = useTranslation()

  const filtered = activeCategory === 'todos'
    ? products
    : products.filter(p => p.category === activeCategory)

  const handleCategory = (catId) => {
    setActiveCategory(catId)
    if (catId === 'todos') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: catId })
    }
  }

  return (
    <div className="shop-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container">
        <div className="shop-header section-title">
          <h1>{t('shop.title')}</h1>
          <p>{t('shop.subtitle')}</p>
        </div>

        <div className="shop-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategory(cat.id)}
            >
              {t(categoryKeys[cat.id] || cat.name)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="shop-empty">{t('shop.empty')}</p>
        ) : (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
