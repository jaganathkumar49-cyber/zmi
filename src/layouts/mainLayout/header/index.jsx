import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiSpeaker, FiHeadphones, FiShoppingCart } from "react-icons/fi";
import { IoEarOutline } from "react-icons/io5";


const Header = ({ logo, name }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);


  const navItems = [
    { label: "Home", path: "/HomePage", icon: <FiHome size={18} /> },
    { label: "Speakers", path: "/Speaker", icon: <FiSpeaker size={18} /> },
    { label: "Headphones", path: "/Headphones", icon: <FiHeadphones size={18} /> },
    { label: "Earbuds", path: "/Earbuds", icon: <IoEarOutline size={18} /> },
    { label: "Cart", path: "/CartList", icon: <FiShoppingCart size={18} /> },

  ];


  return (
    <header className="fixed top-0 w-full h-20 backdrop-blur-md bg-white/90 shadow-sm border-b border-slate-100/50 z-50 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo - Ultra minimal */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-colors duration-200">
          {logo || (
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <FiHome size={18} className="text-white" />
            </div>
          )}
          {name && (
            <h1 className="text-lg font-semibold text-slate-900 hidden lg:block">
              {name}
            </h1>
          )}
        </div>


        {/* Navigation - Clean minimal tabs */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`
                  h-11 px-3 flex items-center gap-1.5 rounded-xl font-medium text-xs lg:text-sm
                  bg-white/70 hover:bg-white/90 border border-slate-200/50 hover:border-slate-300/60
                  shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200
                  ${active
                    ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-md ring-1 ring-indigo-100/50"
                    : "text-slate-700 hover:text-slate-900"
                  }
                `}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${active ? "bg-indigo-100" : "bg-slate-50 hover:bg-indigo-50/30"
                  }`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};


export default Header;