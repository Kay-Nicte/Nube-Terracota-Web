import { useState } from 'react'
import './ImageZoom.css'

function ImageZoom({ src, alt }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <img src={src} alt={alt} onClick={() => setOpen(true)} className="zoomable" />
      {open && (
        <div className="image-zoom-overlay" onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className="image-zoom-full" />
        </div>
      )}
    </>
  )
}

export default ImageZoom
