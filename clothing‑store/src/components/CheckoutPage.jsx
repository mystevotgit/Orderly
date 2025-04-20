/* ===== File: CheckoutPage.jsx ========================================= */
function CheckoutPage() {
  const { items, total, clear } = useCart();
  const placeOrder = () => {
    // Call API Gateway endpoint /orders
    fetch("/orders", {
      method: "POST",
      body: JSON.stringify({ items }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then(() => {
        clear();
        alert("Order placed! 🎉");
      });
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>
            {item.qty} × {item.name}
          </span>
          <span>${(item.qty * item.price).toFixed(2)}</span>
        </div>
      ))}
      <hr />
      <p className="text-lg font-semibold flex justify-between">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </p>
      <button
        className="w-full bg-pink-600 text-white rounded-xl py-3 hover:bg-pink-700"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default CheckoutPage;