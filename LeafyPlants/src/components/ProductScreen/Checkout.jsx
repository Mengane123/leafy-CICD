import React, { useState } from "react";
import { useCartStore } from "../../store/CartStore"; // Adjust the path if necessary

const Checkout = () => {
  const { cart, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    clearCart: state.clearCart,
  }));

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = totalPrice > 3000 ? 0.05 * totalPrice : 0;
  const finalPrice = totalPrice - discount;

  const [form, setForm] = useState({
    FName: "",
    LName: "",
    Email: "",
    Phone: "",
    Address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Split full name into First Name and Last Name
    const nameParts = form.FName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = form.LName.trim().split(" ");
  
    const orderData = {
      FName: firstName,
      LName: lastName,
      Email: form.Email,
      Phone: form.Phone,
      Address: form.Address,
      Total_price: totalPrice,
      Discount: discount,
      Final_price: finalPrice,
      items: cart.map((item) => ({
        Product_name: item.title,
        Quantity: item.quantity,
        Price: item.price,
        Subtotal: item.price * item.quantity,
      })),
    };
  
    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
        clearCart();
        setForm({ FName: "", LName: "", Email: "", Phone: "", Address: "" }); // Clear the form
      } else {
        alert(`Order failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <main className="p-4 min-h-screen bg-gray-50 mt-12 sm:mt-14 md:mt-14 lg:mt-14">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold  flex  justify-center mb-5">Order Details</h2>
        <div className="border-b border-gray-300 pb-4 mb-4">
          {cart.map((product) => (
            <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span>
                {product.title} (x{product.quantity})
              </span>
              <span>₹{(product.price * product.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-2 text-lg font-semibold">
            <p>Original Total Price: ₹{totalPrice.toFixed(2)}</p>
            {discount > 0 && <p className="text-red-500">Discount Applied: ₹{discount.toFixed(2)}</p>}
            <p className="text-xl">Final Price: ₹{finalPrice.toFixed(2)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="FName"
            placeholder="Frist Name"
            value={form.FName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="LName"
            placeholder="Last Name"
            value={form.LName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={form.Email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="Phone"
            placeholder="Phone Number"
            value={form.Phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="Address"
            placeholder="Shipping Address"
            value={form.Address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>

          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded text-lg">
            Place Order
          </button>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
