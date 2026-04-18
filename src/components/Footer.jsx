import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Footer.css'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <span className="footer-logo-nube">Nube</span>{' '}
              <span className="footer-logo-terracota">Terracota</span>
            </h3>
            <p>{t('footer.tagline')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.shop')}</h4>
            <Link to="/tienda">{t('footer.see_all')}</Link>
            <Link to="/tienda?cat=camisetas">{t('footer.tshirts')}</Link>
            <Link to="/tienda?cat=sudaderas">{t('footer.hoodies')}</Link>
            <Link to="/tienda?cat=banadores">{t('footer.swimwear')}</Link>
          </div>

          <div className="footer-links">
            <h4>{t('footer.info')}</h4>
            <Link to="/nosotras">{t('footer.about')}</Link>
            <Link to="/contacto">{t('footer.contact')}</Link>
            <a href="#">{t('footer.shipping')}</a>
            <a href="#">{t('footer.sustainability')}</a>
          </div>

          <div className="footer-links">
            <h4>{t('footer.follow')}</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Nube Terracota {new Date().getFullYear()} -- {t('footer.bottom')}</p>
          <div className="footer-bottom-links">
            <Link to="/aviso-legal">{t('footer.legal')}</Link>
            <Link to="/privacidad">{t('footer.privacy')}</Link>
            <Link to="/cookies">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
