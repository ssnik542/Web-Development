import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ThemeContext } from "../contexts/ThemeContext";

export const Header: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  return (
    <header
      className={`fixed top-0 w-full p-4 shadow-md theme-transition z-10 ${
        theme === "theme1"
          ? "bg-white"
          : theme === "theme2"
          ? "bg-gray-800"
          : "bg-gradient-to-r from-blue-500 to-purple-500"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
        <h1
          className={`text-2xl font-bold ${
            theme === "theme3" ? "text-white" : "text-gray-900"
          }`}
        >
          Theme App
        </h1>
        <nav className="flex items-center space-x-4 mt-2 md:mt-0">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};
