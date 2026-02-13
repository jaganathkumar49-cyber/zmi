import { ArrowLeft, Star, Play, Volume2, Battery, Shield, Bluetooth, MessageCircle, ShoppingCart, CheckCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { speakers } from "utils/SpeakerData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpeakerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sp = speakers.find((s) => s.id === Number(id));
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const showToast = (message, type = "success") => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: type === "success"
          ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
          : type === "info" ? "#f1f5f9" : "#f8fafc",
        color: type === "success" ? "white" : "#1e293b",
        borderRadius: "16px",
        boxShadow: "0 20px 25px -5px rgba(0, 0,0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)"
      },
      icon: type === "success" ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : false,
    });
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // ✅ NO DUPLICATES - Just show already added message
      showToast("🛒 Already added to cart!", "info");
    } else {
      // ✅ ADD ONLY ONCE
      const newItem = { ...product, quantity: 1 };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      showToast("🎉 Added to cart successfully!", "success");
    }
  };

  const viewCart = () => {
    navigate("/CartList");
  };

  if (!sp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Product Not Found</h1>
          <button onClick={() => navigate("/Speaker")} className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Back to Speakers
          </button>
        </div>
      </div>
    );
  }

  const rating = 4.7;
  const reviewCount = 289;
  const isInCart = cart.some(item => item.id === sp.id);

  const reviews = [
    { id: 1, user: "Rahul K.", rating: 5, date: "2 days ago", comment: "Incredible sound quality!", verified: true },
    { id: 2, user: "Priya S.", rating: 4, date: "1 week ago", comment: "Great speaker for the price.", verified: true }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 text-slate-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Back to Collection</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image & Features - SAME */}
            <div className="space-y-8">
              <div className="group relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl overflow-hidden shadow-lg p-6 lg:p-12">
                <img src={sp.img} className="w-full h-80 lg:h-96 object-contain group-hover:scale-105 transition-transform duration-500" alt={sp.name} />
                <button onClick={() => setIsPlaying(!isPlaying)} className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 group-hover:scale-110">
                  <div className={`w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 ${isPlaying ? 'bg-green-500 text-white' : ''}`}>
                    {isPlaying ? <Volume2 className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1 text-indigo-600" />}
                  </div>
                </button>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-100 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 group hover:scale-105"><Battery className="w-10 h-10 text-indigo-500 mb-2 group-hover:scale-110" /><span className="text-sm font-medium text-slate-700 text-center">Long Battery</span></div>
                <div className="flex flex-col items-center p-3 group hover:scale-105"><Shield className="w-10 h-10 text-emerald-500 mb-2 group-hover:scale-110" /><span className="text-sm font-medium text-slate-700 text-center">Waterproof</span></div>
                <div className="flex flex-col items-center p-3 group hover:scale-105"><Bluetooth className="w-10 h-10 text-purple-500 mb-2 group-hover:scale-110" /><span className="text-sm font-medium text-slate-700 text-center">Bluetooth 5.0</span></div>
                <div className="flex flex-col items-center p-3 group hover:scale-105"><Volume2 className="w-10 h-10 text-indigo-600 mb-2 group-hover:scale-110" /><span className="text-sm font-medium text-slate-700 text-center">Deep Bass</span></div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent leading-tight">
                  {sp.name}
                </h1>
                <div className="text-4xl lg:text-5xl font-bold text-indigo-600 font-mono">{sp.price}</div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 shadow-lg">
                <div className="flex items-center gap-1 p-2 bg-white/70 rounded-xl">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{rating}</div>
                  <div className="text-sm text-slate-500">({reviewCount} reviews)</div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-slate-100 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Why You'll Love It</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{sp.desc}</p>
              </div>

              {/* ✅ NO DUPLICATE CART BUTTONS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <button
                  onClick={() => addToCart(sp)}
                  disabled={isInCart}
                  className={`group h-16 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg w-full ${isInCart
                    ? 'bg-emerald-100 border-2 border-emerald-200 text-emerald-700 cursor-not-allowed shadow-md'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                    }`}
                >
                  {isInCart ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>In Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={viewCart}
                  className="group h-16 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-slate-200 hover:border-indigo-200 text-slate-800 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  disabled={cart.length === 0}
                >
                  <ShoppingCart className="w-5 h-5" />
                  View Cart ({cart.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default SpeakerDetail;
