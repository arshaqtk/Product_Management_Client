import { useState } from "react";
import toast from "react-hot-toast";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { ChevronDown } from "lucide-react";

interface AddSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSubCategoryModal = ({ isOpen, onClose }: AddSubCategoryModalProps) => {
  const { categories, addSubcategory } = useCategoryStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!subCategoryName.trim()) {
      toast.error("Please enter a subcategory name");
      return;
    }

    setLoading(true);
    try {
      const res = await addSubcategory(selectedCategoryId, subCategoryName.trim());
      if (res.success) {
        toast.success("Subcategory added successfully!");
        setSubCategoryName("");
        setSelectedCategoryId("");
        onClose();
      } else {
        toast.error(res.message || "Failed to add subcategory");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(c => c._id === selectedCategoryId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={!loading ? onClose : undefined}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[580px] rounded-[32px] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-[#033f63] text-center mb-8">Add Sub Category</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Custom Select Box */}
          <div className="relative">
            <div 
              onClick={() => !loading && setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full h-[60px] px-6 rounded-[16px] border ${isDropdownOpen ? 'border-[#eda52d]' : 'border-gray-300'} flex items-center justify-between cursor-pointer bg-white transition-all`}
            >
              <span className={selectedCategoryId ? "text-gray-700" : "text-gray-400"}>
                {selectedCategory ? selectedCategory.name : "Select category"}
              </span>
              <ChevronDown className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-[65px] left-0 right-0 bg-white border border-gray-100 rounded-[16px] shadow-xl z-10 max-h-[200px] overflow-y-auto">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <div 
                      key={cat._id}
                      onClick={() => {
                        setSelectedCategoryId(cat._id);
                        setIsDropdownOpen(false);
                      }}
                      className="px-6 py-4 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm transition-colors border-b border-gray-50 last:border-0"
                    >
                      {cat.name}
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-gray-400 text-sm italic">No categories available</div>
                )}
              </div>
            )}
          </div>

          {/* Subcategory Input */}
          <input
            type="text"
            placeholder="Enter sub category name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            disabled={loading}
            className="w-full h-[60px] px-6 rounded-[16px] border border-gray-300 focus:border-[#eda52d] outline-none text-gray-700 transition-all placeholder:text-gray-400"
          />

          <div className="flex gap-4 pt-4 justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`h-[56px] px-12 rounded-[16px] bg-[#eda52d] text-white font-bold text-sm shadow-lg hover:bg-[#db9624] transition-all transform active:scale-95 flex items-center justify-center min-w-[140px] ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "ADDING..." : "ADD"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-[56px] px-10 rounded-[16px] bg-[#f2f2f2] text-gray-800 font-bold text-sm hover:bg-gray-200 transition-all transform active:scale-95 min-w-[140px]"
            >
              DISCARD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
