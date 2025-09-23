import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Footer from './components/Footer/Footer'
import Header from "./components/Header/header"
import { Outlet } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      setLoading(true);
      if (userData) {
        dispatch(login({ ...userData }))
      }
      else {
        dispatch(logout())
      }
    }).finally(() => setLoading(false));

  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#333333] text-white">
      <Header />
      <main>
        {loading ? <div className="flex justify-center items-center w-full h-[80vh]">
          <span className="loader"></span>
        </div> :
          <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default App
