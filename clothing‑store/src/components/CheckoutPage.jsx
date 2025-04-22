// src/components/CheckoutPage.jsx
import React from "react";
import { useCart } from "./CartContext.jsx";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();

  const placeOrder = () => {
    fetch("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then((r) => r.json())
      .then(() => {
        clear();
        alert("Order placed! 🎉");
      })
      .catch((err) => {
        console.error("Order failed:", err);
        alert("Sorry, something went wrong.");
      });
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => {
              // Try both imageUrl and image fields
              const src = item.imageUrl || item.image || "";
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-4"
                >
                  {/* Thumbnail + name/qty */}
                  <div className="flex items-center space-x-3">
                    {src ? (
                      <img
                        src={src}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                    <span>
                      {item.qty} × {item.name}
                    </span>
                  </div>

                  {/* Line total */}
                  <span className="font-medium">
                    ${(item.qty * item.price).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <hr />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-pink-600 text-white rounded-xl py-3 hover:bg-pink-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}