import React, { useMemo } from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products, filters, search, onAdd }) {
  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (filters.gender && p.gender !== filters.gender) return false;
        if (filters.category && p.category !== filters.category) return false;
        if (p.price < filters.range[0] || p.price > filters.range[1]) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [products, filters, search]
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((product) => (
        // key is now a string, never an object
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}