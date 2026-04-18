import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'
import './LanguageSelector.css'

function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const current = languages.find(l => l.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleChange = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className="lang-selector" ref={ref}>
      <button className="lang-current" onClick={() => setOpen(!open)}>
        {current.code.toUpperCase()}
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`lang-option ${lang.code === i18n.language ? 'active' : ''}`}
              onClick={() => handleChange(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
