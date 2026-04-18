import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import products from '../data/products'
import ImageZoom from '../components/ImageZoom'
import './Product.css'

function Product() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [measureUnit, setMeasureUnit] = useState('metric')
  const [showMeasurements, setShowMeasurements] = useState(false)
  const [showCare, setShowCare] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!product) return
    const seo = product.seo
    if (seo) {
      document.title = seo.title
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = seo.description
    }
    return () => {
      document.title = 'Nube Terracota'
    }
  }, [product])

  if (!product) {
    return (
      <div className="product-page" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
          <h2>{t('product.not_found')}</h2>
          <Link to="/tienda" className="btn btn-primary" style={{ marginTop: 24 }}>{t('product.back')}</Link>
        </div>
      </div>
    )
  }

  const currentPrice = (product.priceBySize && selectedSize)
    ? product.priceBySize[selectedSize]
    : product.price

  const currentImages = (product.imagesByColor && selectedColor && product.imagesByColor[selectedColor])
    ? product.imagesByColor[selectedColor]
    : product.images

  const availableSizes = (product.sizesByColor && selectedColor && product.sizesByColor[selectedColor])
    ? product.sizesByColor[selectedColor]
    : product.sizes

  const handleColorChange = (color) => {
    setSelectedColor(color)
    setActiveImage(0)
    if (selectedSize && product.sizesByColor?.[color] && !product.sizesByColor[color].includes(selectedSize)) {
      setSelectedSize('')
    }
  }

  const handleAdd = () => {
    if (!selectedSize) return
    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      size: selectedSize,
      color: selectedColor || product.colors[0],
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const measureTable = product.measurements?.[measureUnit]

  return (
    <div className="product-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container">
        <div className="product-breadcrumb">
          <Link to="/tienda">{t('nav.shop')}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="product-image-main">
              <ImageZoom src={currentImages[activeImage]} alt={product.name} />
            </div>
            {currentImages.length > 1 && (
              <div className="product-thumbnails">
                {currentImages.map((img, i) => (
                  <button
                    key={i}
                    className={`product-thumb ${activeImage === i ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt={`${product.name} - ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-price">
              {currentPrice.toFixed(2)} EUR
              {product.priceBySize && !selectedSize && <span className="price-note"> — el precio varía según la talla</span>}
            </p>

            <p className="product-desc">
              {product.descriptionBold && <strong>{product.descriptionBold} </strong>}
              {product.description}
            </p>

            <div className="product-pod-badge">
              {t('product.pod_badge')}
            </div>

            <div className="product-option">
              <label>{t('product.color')}</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => handleColorChange(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-option">
              <label>{t('product.size')} {!selectedSize && <span className="required">{t('product.size_required')}</span>}</label>
              <div className="size-options">
                {product.sizes.map(size => {
                  const unavailable = !availableSizes.includes(size)
                  return (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''} ${unavailable ? 'unavailable' : ''}`}
                      onClick={() => !unavailable && setSelectedSize(size)}
                      disabled={unavailable}
                      title={unavailable ? 'No disponible en este color' : undefined}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              className={`btn btn-primary add-to-cart ${added ? 'added' : ''}`}
              onClick={handleAdd}
              disabled={!selectedSize}
            >
              {added ? t('product.added') : t('product.add_to_cart')}
            </button>

            {product.details && (
              <div className="product-details">
                <h3>{t('product.details')}</h3>
                <ul>
                  {product.details.map((d, i) => (
                    <li key={i}>
                      {typeof d === 'object'
                        ? <><strong>{d.label}:</strong> {d.text}</>
                        : d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {measureTable && (
              <div className="product-accordion">
                <button className="accordion-header" onClick={() => setShowMeasurements(v => !v)}>
                  Guia de tallas
                  <span className={`accordion-arrow ${showMeasurements ? 'open' : ''}`}>&#8250;</span>
                </button>
                {showMeasurements && (
                  <div className="accordion-body">
                    <div className="measure-toggle">
                      <button className={measureUnit === 'metric' ? 'active' : ''} onClick={() => setMeasureUnit('metric')}>cm</button>
                      <button className={measureUnit === 'imperial' ? 'active' : ''} onClick={() => setMeasureUnit('imperial')}>pulg.</button>
                    </div>
                    <div className="measure-table-wrap">
                      <table className="measure-table">
                        <tbody>
                          {measureTable.map((row, i) => (
                            <tr key={i} className={i === 0 ? 'measure-header' : ''}>
                              {row.map((cell, j) => (
                                i === 0 || j === 0
                                  ? <th key={j}>{cell}</th>
                                  : <td key={j}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {product.care && (
              <div className="product-accordion">
                <button className="accordion-header" onClick={() => setShowCare(v => !v)}>
                  Instrucciones de cuidado
                  <span className={`accordion-arrow ${showCare ? 'open' : ''}`}>&#8250;</span>
                </button>
                {showCare && (
                  <div className="accordion-body">
                    <ul className="care-list">
                      {product.care.map((item, i) => (
                        <li key={i}><strong>{item.label}:</strong> {item.text}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
