import { useState } from "react";
import { Check, Heart, Minus, Plus, X } from "lucide-react";

interface Variant {
  ram: string;
  price: number;
  qty: number;
}

interface ProductInfoProps {
  productId: string;
  title: string;
  initialPrice: number;
  initialStock: number;
  variants: Variant[];
  onEdit: () => void;
}

export const ProductInfo = ({ productId, title, initialPrice, initialStock, variants, onEdit }: ProductInfoProps) => {
  const [selectedRam, setSelectedRam] = useState(variants[0]?.ram || "");
  const [quantity, setQuantity] = useState(1);

  // Derived state: find the current variant details locally
  const currentVariant = variants.find(v => v.ram === selectedRam) || { price: initialPrice, qty: initialStock };
  const price = currentVariant.price;
  const stock = currentVariant.qty;

  return (
    <div className="flex-1 flex flex-col pt-4">
      <h1 className="text-3xl font-bold text-[#033f63] mb-4">{title}</h1>
      <p className="text-[26px] font-bold text-gray-800 mb-6">${price.toFixed(2)}</p>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-600 font-medium">Availability:</span>
        <div className={`flex items-center gap-1 ${stock > 0 ? "text-[#28a745]" : "text-red-500"} font-bold text-sm`}>
           {stock > 0 ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
           {stock > 0 ? <span>In stock</span> : <span>Out of stock</span>}
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-10">
        Hurry up! only <span className="font-bold text-gray-700">{stock}</span> product left in stock!
      </p>

      <hr className="border-gray-200 mb-8" />

      {/* RAM Variants */}
      <div className="flex items-center gap-6 mb-8">
        <span className="text-sm font-bold text-[#033f63] min-w-[60px]">Ram:</span>
        <div className="flex gap-4">
          {variants.map((v) => (
            <button
              key={v.ram}
              onClick={() => setSelectedRam(v.ram)}
              className={`px-5 py-2 rounded-md font-bold text-sm transition-all border ${
                selectedRam === v.ram 
                  ? "bg-gray-100 border-gray-400 text-gray-800 shadow-inner" 
                  : "bg-transparent border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
            >
              {v.ram}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-6 mb-12">
        <span className="text-sm font-bold text-[#033f63] min-w-[60px]">Quantity :</span>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50 h-[40px]">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 border-r border-gray-300"
          >
            <Minus size={16} />
          </button>
          <div className="w-12 text-center text-sm font-bold text-gray-700">
             {quantity}
          </div>
          <button 
            onClick={() => setQuantity(q => Math.min(stock, q + 1))}
            className="w-10 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 border-l border-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onEdit}
          className="flex-1 bg-[#eda52d] text-white py-4 rounded-full font-bold text-sm shadow-md hover:bg-[#db9624] transition-all transform active:scale-[0.98]"
        >
           Edit product
        </button>
        <button className="flex-1 bg-[#eda52d] text-white py-4 rounded-full font-bold text-sm shadow-md hover:bg-[#db9624] transition-all transform active:scale-[0.98]">
           Buy it now
        </button>
        <button className="p-4 bg-gray-100 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-600 transition-all shadow-sm">
           <Heart size={20} />
        </button>
      </div>
    </div>
  );
};
