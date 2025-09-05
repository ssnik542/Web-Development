import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen md:mx-10 mx-5">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-100">
        Made with 💖 by Hirred
      </div>
    </div>
  )
}
