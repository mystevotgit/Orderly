/* ===== File: CartContext.jsx ============================================ */
import React, { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext();
const useCart = () => useContext(CartContext);

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const add = (product) => {
    setItems((curr) => {
      const idx = curr.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        const clone = [...curr];
        clone[idx].qty += 1;
        return clone;
      }
      return [...curr, { ...product, qty: 1 }];
    });
  };

  const remove = (id) => setItems((c) => c.filter((p) => p.id !== id));
  const clear = () => setItems([]);
  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, useCart };