import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Contact.css'

function Contact() {
  const [sent, setSent] = useState(false)
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container">
        <div className="contact-header section-title">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-card">
              <h3>{t('contact.email')}</h3>
              <a href="mailto:hola@nubeterracota.com">hola@nubeterracota.com</a>
            </div>
            <div className="contact-card">
              <h3>{t('contact.social')}</h3>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
            <div className="contact-card">
              <h3>{t('contact.response_title')}</h3>
              <p>{t('contact.response_text')}</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {sent ? (
              <div className="contact-success">
                <h3>{t('contact.success_title')}</h3>
                <p>{t('contact.success_text')}</p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.email')}</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{t('contact.subject')}</label>
                  <select id="subject" required>
                    <option value="">{t('contact.subject_placeholder')}</option>
                    <option value="pedido">{t('contact.subject_order')}</option>
                    <option value="producto">{t('contact.subject_product')}</option>
                    <option value="colaboracion">{t('contact.subject_collab')}</option>
                    <option value="otro">{t('contact.subject_other')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea id="message" rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary">{t('contact.send')}</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
