import { Search, Heart, Loader2, X } from "lucide-react";
import { useAuthStore, type AuthState } from "../../features/auth/store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getProductSuggestions } from "../../features/Home/services/product.service";
import { useSearchStore, type SearchState } from "../../store/useSearchStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { WishlistDrawer } from "./WishlistDrawer";

interface Suggestion {
  _id: string;
  title: string;
}

export const Navbar = () => {
  const user = useAuthStore((state: AuthState) => state.user);
  const navigate = useNavigate();
  
  const setSearchQuery = useSearchStore((state: SearchState) => state.setSearchQuery);
  const clearGlobalSearch = useSearchStore((state: SearchState) => state.clearSearch);
  
  const wishlistItems = useWishlistStore((state) => state.items);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user, fetchWishlist]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        try {
          const res = await getProductSuggestions(query);
          if (res.success) {
            setSuggestions(res.data);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Suggestion error:", error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (id: string) => {
    navigate(`/product/${id}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    clearGlobalSearch();
  };

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query.trim());
      navigate("/"); // Ensure we are on home to see results
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="bg-[#033f63] h-[80px] flex items-center justify-between px-10 text-white w-full shadow-md z-50">
      <div className="w-[200px]">
        <span className="text-xl font-bold tracking-wider cursor-pointer" onClick={() => navigate("/")}>SECLOB</span>
      </div>
      
      {/* Search Bar Container */}
      <div className="flex-1 max-w-[600px] relative" ref={dropdownRef}>
         <div className="flex bg-white rounded-full overflow-hidden h-[45px] shadow-sm">
            <div className="flex-1 relative flex items-center">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length > 1 && setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search any things" 
                className="w-full h-full px-6 text-gray-700 outline-none text-sm pr-16" // More padding for icons
              />
              <div className="absolute right-3 flex items-center gap-2">
                {query && (
                  <button 
                    onClick={clearSearch}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
                {loading && (
                  <div className="animate-spin text-gray-400">
                    <Loader2 size={16} />
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="bg-[#eda52d] text-white px-8 font-semibold text-sm hover:bg-[#d99527] transition-colors"
            >
              Search
            </button>
         </div>

         {/* Suggestions Dropdown */}
         {showSuggestions && suggestions.length > 0 && (
           <div className="absolute top-[55px] left-0 right-0 bg-white rounded-[20px] shadow-2xl py-3 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
             {suggestions.map((item: Suggestion) => (
               <div 
                 key={item._id}
                 onClick={() => handleSelectSuggestion(item._id)}
                 className="px-6 py-3 cursor-pointer hover:bg-gray-50 flex items-center gap-3 transition-colors group"
               >
                 <Search size={14} className="text-gray-300 group-hover:text-[#eda52d]" />
                 <span className="text-sm text-gray-700 font-medium line-clamp-1">{item.title}</span>
               </div>
             ))}
           </div>
         )}
         
         {showSuggestions && query.length > 1 && !loading && suggestions.length === 0 && (
           <div className="absolute top-[55px] left-0 right-0 bg-white rounded-[20px] shadow-2xl py-6 px-6 text-center text-gray-400 text-sm italic border border-gray-100 z-[100]">
             No matches found for "{query}"
           </div>
         )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-8 w-[200px] justify-end">
        <div 
          onClick={() => setIsWishlistOpen(true)}
          className="flex items-center gap-2 cursor-pointer hover:text-[#eda52d] transition-colors"
        >
          <div className="relative">
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#eda52d] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </div>
          <span className="text-sm font-medium">{user ? user.name.split(" ")[0] : "Sign in"}</span>
        </div>
      </div>

      <WishlistDrawer 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />
    </nav>
  );
};
