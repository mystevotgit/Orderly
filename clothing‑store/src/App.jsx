// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCart }    from "./components/CartContext.jsx";
import RequireAuth     from "./components/RequireAuth.jsx";
import Filters         from "./components/Filters.jsx";
import ProductList     from "./components/ProductList.jsx";
import CartDrawer      from "./components/CartDrawer.jsx";
import SearchBar       from "./components/SearchBar.jsx";
import CheckoutPage    from "./components/CheckoutPage.jsx";

// your API and bucket constants
const API_BASE = "https://ht6v4zlpkd.execute-api.us-east-1.amazonaws.com/prod";

export default function App() {
  // 1) State
  const [products, setProducts] = useState([]);
  const [filters,  setFilters]  = useState({
    gender:   "",
    category: "",
    range:    [0, 0],     // start at [0,0], will reset below
  });
  const [search,   setSearch]   = useState("");
  const [openCart, setOpenCart] = useState(false);

  const { add } = useCart();

  // 2) Fetch + flatten + init filters
  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((items) => {
        // flatten each field
        const prods = items.map((p) => {
          const idRaw       = p.id;
          const nameRaw     = p.name;
          const priceRaw    = p.price;
          const categoryRaw = p.category;
          const genderRaw   = p.gender;
          const imageRaw    = p.image;

          const id       = typeof idRaw === "object" ? idRaw.S : idRaw;
          const name     = typeof nameRaw === "object" ? nameRaw.S : nameRaw;
          const price    =
            typeof priceRaw === "object"
              ? parseFloat(priceRaw.N)
              : Number(priceRaw);
          const category =
            typeof categoryRaw === "object" ? categoryRaw.S : categoryRaw;
          const gender =
            typeof genderRaw === "object" ? genderRaw.S : genderRaw;
          // imageRaw should already be a full URL string
          const imageUrl =
            typeof imageRaw === "object" ? imageRaw.S : imageRaw;

          return { id, name, price, category, gender, imageUrl };
        });

        setProducts(prods);

        if (prods.length) {
          const prices      = prods.map((p) => p.price);
          const absoluteMin = Math.min(...prices);
          const absoluteMax = Math.max(...prices);
          // reset your filter range now that data is here
          setFilters((f) => ({ ...f, range: [absoluteMin, absoluteMax] }));
        }
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

      <header className="flex items-center justify-between p-4 bg-white shadow sticky top-0 z-30">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-pink-600">clothy.</span>
        </Link>
        <button onClick={() => setOpenCart(true)}>
          <ShoppingCart size={28} />
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid lg:grid-cols-[250px_1fr] gap-6">
                <Filters
                  min={filters.range[0]}
                  max={filters.range[1]}
                  filters={filters}
                  setFilters={setFilters}
                />
                <div className="space-y-6">
                  <SearchBar value={search} onChange={setSearch} />
                  <ProductList
                    products={products}
                    filters={filters}
                    search={search}
                    onAdd={add}
                  />
                </div>
              </div>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <CheckoutPage />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}