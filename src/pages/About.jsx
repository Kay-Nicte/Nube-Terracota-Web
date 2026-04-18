import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './About.css'

function About() {
  const { t } = useTranslation()

  return (
    <div className="about-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container">
        <div className="about-hero">
          <h1>{t('about.title')}</h1>
          <p className="about-subtitle">{t('about.subtitle')}</p>
        </div>

        <div className="about-content">
          <div className="about-block">
            <h2>{t('about.history_title')}</h2>
            <p>{t('about.history_p1')}</p>
            <p>{t('about.history_p2')}</p>
          </div>

          <div className="about-block">
            <h2>{t('about.pod_title')}</h2>
            <p>{t('about.pod_intro')}</p>
            <ul className="about-list">
              <li>{t('about.pod_item1')}</li>
              <li>{t('about.pod_item2')}</li>
              <li>{t('about.pod_item3')}</li>
              <li>{t('about.pod_item4')}</li>
            </ul>
            <p>{t('about.pod_outro')}</p>
          </div>

          <div className="about-block">
            <h2>{t('about.turtles_title')}</h2>
            <p>{t('about.turtles_p1')}</p>
            <p>{t('about.turtles_p2')}</p>
          </div>
        </div>

        <div className="about-cta">
          <h2>{t('about.cta_title')}</h2>
          <p>{t('about.cta_subtitle')}</p>
          <Link to="/tienda" className="btn btn-primary">{t('about.cta_button')}</Link>
        </div>
      </div>
    </div>
  )
}

export default About
