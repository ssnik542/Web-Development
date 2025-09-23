import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import { Home } from "./Pages/Home.tsx";
import { About } from "./Pages/About.tsx";
import { Contact } from "./Pages/Contact.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
