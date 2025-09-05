import { Outlet } from "react-router-dom";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header"
import { CartProvider } from '../src/Context/cartContext'
function App() {
  return (
    <CartProvider>
      <div>
        <Header />
        <div className='h-[82vh]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
