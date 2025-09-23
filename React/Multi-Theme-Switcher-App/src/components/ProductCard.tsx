import { useContext } from "react";
import type { Product } from "../types/types";
import { ThemeContext } from "../contexts/ThemeContext";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  return (
    <div
      className={`theme-transition ${
        theme === "theme1"
          ? "bg-white p-4 rounded-lg shadow"
          : theme === "theme2"
          ? "bg-gray-700 p-4 rounded-lg"
          : "bg-white p-4 rounded-lg shadow-lg transform hover:scale-105"
      }`}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-32 object-contain mb-2"
      />
      <h3
        className={`font-bold ${theme === "theme3" ? "text-lg" : "text-base"}`}
      >
        {product.title.substring(0, 20)}...
      </h3>
      <p className="text-sm">${product.price}</p>
      <button
        className={`mt-2 px-4 py-2 rounded ${
          theme === "theme1"
            ? "bg-blue-500 text-white"
            : theme === "theme2"
            ? "bg-blue-600 text-white"
            : "bg-pink-500 text-white"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};
