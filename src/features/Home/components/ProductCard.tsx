import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    price: number;
    image?: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 flex flex-col relative bg-white hover:shadow-lg transition-all duration-300 group">
      <button className="absolute top-4 right-4 bg-[#e2eff8] text-[#aed0eb] p-2 rounded-full hover:bg-[#c2dcf0] hover:text-[#033f63] transition-colors z-10">
        <Heart size={16} className="fill-transparent" />
      </button>
      
      {/* Image holding area */}
      <div className="h-[180px] w-full flex items-center justify-center mb-4 p-2 overflow-hidden">
         {product.image ? (
           <img 
             src={product.image} 
             alt={product.title} 
             className="h-full w-full object-contain"
           />
         ) : (
           <div className="relative w-full h-full flex flex-col items-center justify-center pt-8">
              {/* Screen */}
              <div className="w-[80%] h-[65%] bg-blue-500 border-[6px] border-gray-800 rounded-t-md relative shadow-inner overflow-hidden flex flex-col">
                <div className="flex-1 bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 opacity-80 backdrop-blur-sm"></div>
                <div className="absolute top-0 right-0 w-full h-[150%] bg-white/20 -skew-x-[45deg] origin-bottom-right"></div>
              </div>
              {/* Base/Keyboard */}
              <div className="w-[95%] h-[15%] bg-gray-300 rounded-b-xl border-t border-gray-400 shadow-md relative perspective-100 flex items-start justify-center">
                 <div className="w-[30%] h-[30%] bg-gray-400/50 mt-1 rounded-sm"></div>
              </div>
           </div>
         )}
      </div>
      
      <h3 className="font-bold text-[#033f63] text-sm mb-1 line-clamp-1">{product.title}</h3>
      <p className="font-bold text-gray-800 mb-3 text-sm">${product.price.toFixed(2)}</p>
      
      {/* Stars */}
      <div className="flex gap-1 mt-auto">
         {[1, 2, 3, 4, 5].map((i) => (
           <Star 
             key={i} 
             size={14} 
             className={i <= 4 ? "fill-gray-400 text-gray-400" : "text-gray-300"} 
           />
         ))}
      </div>
    </div>
  );
};
