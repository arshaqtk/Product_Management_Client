import { Search, Heart, ShoppingCart } from "lucide-react";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <nav className="bg-[#033f63] h-[80px] flex items-center justify-between px-10 text-white w-full shadow-md z-10">
      <div className="w-[200px]">
        {/* Placeholder for Logo */}
        <span className="text-xl font-bold tracking-wider cursor-pointer" onClick={() => navigate("/")}>SECLOB</span>
      </div>
      
      {/* Search Bar */}
      <div className="flex flex-1 max-w-[600px] bg-white rounded-full overflow-hidden h-[45px] shadow-sm">
        <input 
          type="text" 
          placeholder="Search any things" 
          className="flex-1 px-6 text-gray-700 outline-none text-sm"
        />
        <button className="bg-[#eda52d] text-white px-8 font-semibold text-sm hover:bg-[#d99527] transition-colors">
          Search
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-8 w-[200px] justify-end">
        <div className="flex items-center gap-2 cursor-pointer hover:text-[#eda52d] transition-colors">
          <div className="relative">
            <Heart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#eda52d] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </div>
          <span className="text-sm font-medium">{user ? user.name.split(" ")[0] : "Sign in"}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-[#eda52d] transition-colors">
          <div className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#eda52d] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </div>
          <span className="text-sm font-medium">Cart</span>
        </div>
      </div>
    </nav>
  );
};
