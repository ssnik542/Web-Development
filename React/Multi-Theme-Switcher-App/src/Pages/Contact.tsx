import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const Contact: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  return (
    <div
      className={`pt-24 container mx-auto p-4 theme-transition ${
        theme === "theme2" ? "flex" : "block"
      }`}
    >
      {theme === "theme2" && (
        <aside className="w-1/4 p-4 bg-gray-800 min-h-screen">
          <h2 className="text-xl font-bold mb-4">Sidebar</h2>
          <ul>
            <li>Contact Info</li>
            <li>Support</li>
          </ul>
        </aside>
      )}
      <main className={`${theme === "theme2" ? "w-3/4 p-4" : "p-4"}`}>
        <h2
          className={`text-2xl font-bold mb-4 ${
            theme === "theme3" ? "text-white" : ""
          }`}
        >
          Contact Us
        </h2>
        <p className="mb-4">
          Reach out to us at support@themeapp.com or call us at (123) 456-7890.
        </p>
        <button
          className={`px-4 py-2 rounded ${
            theme === "theme1"
              ? "bg-blue-500 text-white"
              : theme === "theme2"
              ? "bg-blue-600 text-white"
              : "bg-pink-500 text-white"
          }`}
        >
          Send Message
        </button>
      </main>
    </div>
  );
};
