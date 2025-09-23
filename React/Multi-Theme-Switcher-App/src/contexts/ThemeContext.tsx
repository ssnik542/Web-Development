import { createContext, useEffect, useState } from "react";

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "theme1"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = `min-h-screen ${
      theme === "theme1"
        ? "bg-gray-100 font-roboto"
        : theme === "theme2"
        ? "bg-gray-900 text-white font-merriweather"
        : "bg-gradient-to-r from-purple-400 to-pink-500 font-pacifico"
    }`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
