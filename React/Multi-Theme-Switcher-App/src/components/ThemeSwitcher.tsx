import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeSwitcher: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { setTheme } = context;

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  return (
    <select
      onChange={handleThemeChange}
      className="p-2 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none"
      defaultValue={localStorage.getItem("theme") || "theme1"}
    >
      <option value="theme1">Theme 1 (Minimalist)</option>
      <option value="theme2">Theme 2 (Dark Sidebar)</option>
      <option value="theme3">Theme 3 (Colorful Cards)</option>
    </select>
  );
};
