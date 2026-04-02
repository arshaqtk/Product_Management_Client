import { useState } from "react";
import toast from "react-hot-toast";
import { useCategoryStore } from "../../../store/useCategoryStore";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCategoryModal = ({ isOpen, onClose }: AddCategoryModalProps) => {
  const { createCategory } = useCategoryStore();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setLoading(true);
    try {
      const res = await createCategory(name.trim());
      if (res.success) {
        toast.success("Category added successfully!");
        setName("");
        onClose();
      } else {
        toast.error(res.message || "Failed to add category");
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={!loading ? onClose : undefined}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[500px] rounded-[32px] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-[#033f63] text-center mb-8">Add Category</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full h-[60px] px-6 rounded-[16px] border border-gray-300 focus:border-[#eda52d] outline-none text-gray-700 transition-all placeholder:text-gray-400 mb-10"
            autoFocus
          />

          <div className="flex gap-4 w-full justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`h-[48px] px-10 rounded-[12px] bg-[#eda52d] text-white font-bold text-sm shadow-md hover:bg-[#db9624] transition-all transform active:scale-95 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "ADDING..." : "ADD"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-[48px] px-8 rounded-[12px] bg-[#f2f2f2] text-gray-800 font-bold text-sm hover:bg-gray-200 transition-all transform active:scale-95"
            >
              DISCARD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
