import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) {
      removeItem(index);
      return;
    }
    const updated = [...cart];
    updated[index].quantity = newQty;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price.replace(/[^\d]/g, ""));
    const qty = item.quantity || 1;
    return sum + (price * qty);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/Speaker")}
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 hover:-translate-y-1 transition-all text-slate-700 font-semibold max-w-max"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Back to Shopping</span>
          </button>

          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-slate-100">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-12 h-12 text-indigo-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
              No items in your cart yet. Add some speakers to get started!
            </p>
            <Link
              to="/Speaker"
              className="inline-flex items-center gap-3 w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-lg justify-center"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 hover:-translate-y-1 transition-all text-slate-700 font-semibold max-w-max"
        >
          <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline">Back to Shopping</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent text-center leading-tight">
          Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item, i) => (
            <CartItem
              key={item.id || i}
              item={item}
              index={i}
              onRemove={() => removeItem(i)}
              onQuantityChange={(qty) => updateQuantity(i, qty)}
            />
          ))}
        </div>

        {/* Totals & Checkout */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Total Items: {cart.length}</h2>
              <p className="text-xl text-slate-600">Shipping calculated at checkout</p>
            </div>

            <div className="text-right min-w-[220px]">
              <div className="text-4xl lg:text-5xl font-bold text-indigo-600 mb-6 font-mono">
                ₹{total.toLocaleString()}
              </div>
              <button
                onClick={() => navigate("/payment")}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, index, onRemove, onQuantityChange }) => {
  const priceNum = Number(item.price.replace(/[^\d]/g, ""));
  const qty = item.quantity || 1;
  const subtotal = priceNum * qty;

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 cursor-default flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 h-full">
      {/* Image */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center shadow-md p-3 group-hover:scale-105 transition-transform">
          <img
            src={item.img}
            alt={item.name}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-3">
        <h2 className="text-lg lg:text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-900 transition-colors leading-tight">
          {item.name}
        </h2>

        <div className="text-2xl font-bold text-indigo-600 font-mono">
          {item.price}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Qty:</span>
          <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm p-1">
            <button
              onClick={() => onQuantityChange(qty - 1)}
              className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50"
              disabled={qty <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-6 py-2 font-bold text-lg text-slate-900 min-w-[2.5rem] text-center">
              {qty}
            </span>
            <button
              onClick={() => onQuantityChange(qty + 1)}
              className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-xl font-bold text-slate-900">
          Subtotal: ₹{subtotal.toLocaleString()}
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="group/remove flex flex-col items-center gap-2 p-4 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-200 transition-all duration-300 hover:scale-105 self-start lg:self-end"
      >
        <div className="w-10 h-10 bg-red-100 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center text-red-600 group-hover/remove:text-white transition-all duration-200 shadow-sm hover:shadow-md">
          <Trash2 className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-slate-700 hover:text-red-600 whitespace-nowrap">Remove</span>
      </button>
    </div>
  );
};

export default Cart;
