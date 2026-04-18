import './Legal.css'

function Cookies() {
  return (
    <div className="legal-page">
      <div className="container legal-content">
        <h1>Política de cookies</h1>

        <h2>Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu navegador
          cuando visitas un sitio web. Nos ayudan a que el sitio funcione correctamente
          y a mejorar tu experiencia.
        </p>

        <h2>Cookies que utilizamos</h2>

        <h3>Cookies técnicas (necesarias)</h3>
        <p>
          Son imprescindibles para que la web funcione. Incluyen cookies de sesión,
          preferencia de idioma y estado del carrito de compra. No requieren tu
          consentimiento.
        </p>

        <h3>Cookies de preferencias</h3>
        <ul>
          <li><strong>i18nextLng:</strong> guarda tu preferencia de idioma para que no tengas que elegirlo cada vez</li>
        </ul>

        <h3>Cookies de terceros</h3>
        <ul>
          <li><strong>Stripe:</strong> necesarias para procesar pagos de forma segura</li>
        </ul>

        <h2>Cómo gestionar las cookies</h2>
        <p>
          Puedes configurar tu navegador para rechazar cookies o para que te avise
          cuando se envíen. Ten en cuenta que si desactivas las cookies, algunas
          funciones de la web podrían no funcionar correctamente.
        </p>
        <p>Instrucciones por navegador:</p>
        <ul>
          <li>Chrome: Configuración &gt; Privacidad y seguridad &gt; Cookies</li>
          <li>Firefox: Configuración &gt; Privacidad y seguridad</li>
          <li>Safari: Preferencias &gt; Privacidad</li>
          <li>Edge: Configuración &gt; Privacidad y servicios</li>
        </ul>

        <h2>Actualización de esta política</h2>
        <p>
          Esta política de cookies puede actualizarse en cualquier momento.
          Te recomendamos revisarla periódicamente.
        </p>

        <p><strong>Última actualización:</strong> marzo 2026</p>
      </div>
    </div>
  )
}

export default Cookies
