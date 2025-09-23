import { useContext, useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../types/types";
import { ThemeContext } from "../contexts/ThemeContext";

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      className={`pt-24 container mx-auto theme-transition ${
        theme === "theme2" ? "flex" : "block"
      }`}
    >
      {theme === "theme2" && (
        <aside className="w-1/4 p-4 bg-gray-800 min-h-screen">
          <h2 className="text-xl font-bold mb-4">Sidebar</h2>
          <ul>
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
          </ul>
        </aside>
      )}
      <main className={`${theme === "theme2" ? "w-3/4 p-4" : "p-4"}`}>
        <h2
          className={`text-2xl font-bold mb-4 ${
            theme === "theme3" ? "text-white" : ""
          }`}
        >
          Welcome to Our Store
        </h2>
        <p className="mb-4">
          Discover our amazing products with a theme that suits your style!
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className={`${
              theme === "theme1"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                : theme === "theme2"
                ? "grid grid-cols-1 gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
