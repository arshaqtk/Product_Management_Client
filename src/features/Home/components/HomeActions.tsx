import { ChevronRight } from "lucide-react";

export const HomeActions = () => {
    return (
        <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-2 text-sm text-[#033f63] font-bold">
                <span>Home</span>
                <ChevronRight size={16} strokeWidth={2.5} />
            </div>
            <div className="flex gap-4">
                <button className="bg-[#eda52d] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-[#d99527] transition-all transform hover:-translate-y-[1px]">
                    Add category
                </button>
                <button className="bg-[#eda52d] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-[#d99527] transition-all transform hover:-translate-y-[1px]">
                    Add sub category
                </button>
                <button className="bg-[#eda52d] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-[#d99527] transition-all transform hover:-translate-y-[1px]">
                    Add product
                </button>
            </div>
        </div>
    )
}
