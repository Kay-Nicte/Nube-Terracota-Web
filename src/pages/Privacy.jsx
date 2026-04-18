import './Legal.css'

function Privacy() {
  return (
    <div className="legal-page">
      <div className="container legal-content">
        <h1>Política de privacidad</h1>

        <h2>Responsable del tratamiento</h2>
        <ul>
          <li><strong>Titular:</strong> PENDIENTE</li>
          <li><strong>NIF/CIF:</strong> PENDIENTE</li>
          <li><strong>Domicilio:</strong> PENDIENTE</li>
          <li><strong>Email:</strong> hola@nubeterracota.com</li>
        </ul>

        <h2>Datos que recogemos</h2>
        <p>Recogemos los siguientes datos personales cuando realizas una compra o nos contactas:</p>
        <ul>
          <li>Nombre y apellidos</li>
          <li>Dirección de envío</li>
          <li>Dirección de email</li>
          <li>Datos de pago (gestionados por Stripe, no almacenamos datos de tarjeta)</li>
        </ul>

        <h2>Finalidad del tratamiento</h2>
        <ul>
          <li>Gestionar y procesar tus pedidos</li>
          <li>Enviarte información sobre tu pedido</li>
          <li>Responder a tus consultas</li>
          <li>Enviarte comunicaciones comerciales (solo si das tu consentimiento)</li>
        </ul>

        <h2>Base legal</h2>
        <p>
          La base legal para el tratamiento de tus datos es la ejecución del contrato
          de compraventa (cuando realizas un pedido), tu consentimiento (para comunicaciones
          comerciales) y el interés legítimo (para responder a consultas).
        </p>

        <h2>Destinatarios</h2>
        <p>Tus datos podrán ser comunicados a:</p>
        <ul>
          <li><strong>Gelato:</strong> nuestro proveedor de fabricación bajo demanda, para la producción y envío de tu pedido</li>
          <li><strong>Stripe:</strong> pasarela de pago, para procesar tu transacción</li>
        </ul>
        <p>No vendemos ni compartimos tus datos con terceros con fines comerciales.</p>

        <h2>Conservación de datos</h2>
        <p>
          Conservaremos tus datos mientras sea necesario para cumplir con la finalidad
          para la que fueron recogidos y durante los plazos legalmente establecidos.
        </p>

        <h2>Tus derechos</h2>
        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tus datos personales</li>
          <li>Rectificar datos inexactos</li>
          <li>Solicitar la supresión de tus datos</li>
          <li>Oponerte al tratamiento</li>
          <li>Solicitar la portabilidad de tus datos</li>
          <li>Limitar el tratamiento</li>
        </ul>
        <p>
          Para ejercer estos derechos, escríbenos a hola@nubeterracota.com.
          También puedes presentar una reclamación ante la Agencia Española de
          Protección de Datos (www.aepd.es).
        </p>
      </div>
    </div>
  )
}

export default Privacy
