import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import OrderComplete from './pages/OrderComplete'
import Legal from './pages/Legal'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import ForgotPassword from './pages/ForgotPassword'
import Returns from './pages/Returns'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/producto/:id" element={<Product />} />
            <Route path="/nosotras" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/pedido-completado" element={<OrderComplete />} />
            <Route path="/aviso-legal" element={<Legal />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/cuenta" element={<Account />} />
            <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
            <Route path="/envios-y-devoluciones" element={<Returns />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
