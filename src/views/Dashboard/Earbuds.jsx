import React from "react";
import { useNavigate } from "react-router-dom";
import { earbuds } from "utils/earbudData";

const Earbuds = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-4 leading-tight">
            Earbuds Collection
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            True wireless freedom with crystal clear sound quality
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {earbuds.map((buds, index) => (
            <ProductCard
              key={buds.id}
              product={buds}
              index={index}
              onClick={() => navigate(`/EarbudDetail/${buds.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, index, onClick }) => {
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden flex flex-col h-full"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="mb-6 h-48 lg:h-52 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
        <img
          src={product.img}
          className="max-h-full max-w-full object-contain p-4 lg:p-6 group-hover:drop-shadow-xl transition-all duration-500"
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between space-y-3">
        <div className="flex-grow">
          <h2 className="text-lg lg:text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-900 transition-colors leading-tight">
            {product.name}
          </h2>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {product.desc}
          </p>
        </div>

        {/* Price - perfectly aligned */}
        <div className="pt-4 border-t border-slate-200">
          <div className="text-2xl lg:text-3xl font-bold text-indigo-600 font-mono text-center">
            {product.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earbuds;
