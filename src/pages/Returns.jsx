import './Legal.css'

function Returns() {
  return (
    <div className="legal-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container legal-content">
        <h1>Envíos y devoluciones</h1>

        <h2>Envíos</h2>
        <p>
          Todos nuestros productos se fabrican bajo demanda en el momento de recibir el pedido.
          El plazo de producción es de <strong>3 a 7 días hábiles</strong>, tras los cuales se procede al envío.
        </p>
        <p>
          El coste de envío es de <strong>3,95 EUR</strong>. Los pedidos superiores a <strong>45 EUR</strong> tienen envío gratuito.
        </p>

        <h2>Productos personalizados — exclusión del derecho de desistimiento</h2>
        <p>
          Todos los productos de Nube Terracota se fabrican específicamente para cada pedido (print on demand).
          De acuerdo con el artículo 103, apartado c) del Real Decreto Legislativo 1/2007, de 16 de noviembre
          (Ley General para la Defensa de los Consumidores y Usuarios), <strong>el derecho de desistimiento
          no es aplicable a productos confeccionados conforme a las especificaciones del consumidor
          o claramente personalizados</strong>.
        </p>
        <p>
          Al realizar tu pedido, aceptas expresamente esta condición.
        </p>

        <h2>Devoluciones por defecto o error</h2>
        <p>
          Si recibes un producto defectuoso o diferente al pedido, contáctanos en <strong>hola@nubeterracota.com</strong>
          en un plazo de <strong>48 horas</strong> desde la recepción, adjuntando fotografías del producto y del embalaje.
          En ese caso, procederemos a la reposición o reembolso íntegro sin coste para ti.
        </p>

        <h2>Contacto</h2>
        <p>
          Para cualquier consulta sobre tu pedido, escríbenos a <strong>hola@nubeterracota.com</strong>.
        </p>
      </div>
    </div>
  )
}

export default Returns
