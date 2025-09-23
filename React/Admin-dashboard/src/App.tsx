import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <div className="admin-container">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
