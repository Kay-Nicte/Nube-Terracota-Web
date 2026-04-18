import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import { API_URL } from '../config'
import './Home.css'

function Home() {
  const featured = products.filter(p => p.featured)
  const { t } = useTranslation()
  const [subEmail, setSubEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail }),
      })
      setSubDone(true)
    } catch {}
  }

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <span className="hero-tag">{t('hero.tag')}</span>
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className="hero-actions">
            <Link to="/tienda" className="btn btn-primary">{t('hero.cta')}</Link>
            <Link to="/nosotras" className="btn btn-secondary">{t('hero.story')}</Link>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section values">
        <div className="container">
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">~</div>
              <h3>{t('values.pod_title')}</h3>
              <p>{t('values.pod_text')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">*</div>
              <h3>{t('values.materials_title')}</h3>
              <p>{t('values.materials_text')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">^</div>
              <h3>{t('values.design_title')}</h3>
              <p>{t('values.design_text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>{t('featured.title')}</h2>
            <p>{t('featured.subtitle')}</p>
          </div>
          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/tienda" className="btn btn-secondary">{t('featured.cta')}</Link>
          </div>
        </div>
      </section>

      {/* Banner print on demand */}
      <section className="pod-banner">
        <div className="container pod-content">
          <div className="pod-text">
            <h2>{t('pod_banner.title')}</h2>
            <p>{t('pod_banner.text1')}</p>
            <p>{t('pod_banner.text2')}</p>
            <Link to="/nosotras" className="btn btn-turquesa">{t('pod_banner.cta')}</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <h2>{t('newsletter.title')}</h2>
            <p>{t('newsletter.subtitle')}</p>
            {subDone ? (
              <p className="newsletter-done">Ya formas parte. Te avisaremos.</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input type="email" placeholder={t('newsletter.placeholder')} value={subEmail} onChange={e => setSubEmail(e.target.value)} required />
                <button type="submit" className="btn btn-primary">{t('newsletter.cta')}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
