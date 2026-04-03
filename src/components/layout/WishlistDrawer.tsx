import { X, Heart } from "lucide-react";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer = ({ isOpen, onClose }: WishlistDrawerProps) => {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlistStore();

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[9999] backdrop-blur-[2px] transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl z-[10000] transform transition-transform duration-300 ease-out flex flex-col animate-in slide-in-from-right">
        
        {/* Header */}
        <div className="bg-[#033f63] text-white p-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#033f63]">
              <Heart size={20} className="fill-current" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Items</span>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-white/10 p-2 rounded-full transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <Heart size={40} className="opacity-20" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-600">Your wishlist is empty</p>
                <p className="text-sm mt-1 text-gray-400">Save items you like here!</p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 text-[#eda52d] font-semibold text-sm hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item._id} 
                className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#eda52d]/30 transition-all hover:bg-gray-50 group relative"
              >
                <div 
                  className="w-20 h-20 bg-white rounded-xl border border-gray-100 p-2 flex items-center justify-center flex-shrink-0 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow"
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    onClose();
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center gap-1 pr-6">
                  <h4 
                    className="text-sm font-bold text-[#033f63] leading-snug line-clamp-2 cursor-pointer hover:text-[#eda52d] transition-colors"
                    onClick={() => {
                      navigate(`/product/${item._id}`);
                      onClose();
                    }}
                  >
                    {item.title}
                  </h4>
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-bold text-gray-900">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute right-3 top-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all p-1.5"
                  title="Remove from wishlist"
                >
                  <X size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white shadow-2xl">
            <button 
                onClick={() => {
                    navigate("/");
                    onClose();
                }}
                className="w-full bg-[#eda52d] text-white py-4 rounded-xl font-bold hover:bg-[#d99527] transition-all transform active:scale-[0.98] shadow-lg shadow-orange-100"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>,
    document.body
  );
};
