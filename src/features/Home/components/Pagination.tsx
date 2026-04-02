import { ChevronDown } from "lucide-react";

interface PaginationProps {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export const Pagination = ({ totalItems, currentPage, totalPages, limit, onPageChange, onLimitChange }: PaginationProps) => {
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalItems);

    return (
        <div className="flex justify-between items-center py-8 mt-4 border-t border-transparent text-sm">
            <div className="text-gray-500">
                {totalItems > 0 ? `${startItem}-${endItem} of ${totalItems} items` : "0 items"}
            </div>
            
            <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    const isActive = page === currentPage;
                    return (
                        <button 
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                                isActive ? "bg-[#eda52d] text-white shadow-sm" : "text-[#eda52d] hover:bg-orange-50"
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
            
            <div className="flex items-center gap-3 text-gray-500">
                <span>Show</span>
                <div className="relative flex items-center gap-1 font-medium text-[#eda52d] cursor-pointer hover:underline group">
                    <select 
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="appearance-none bg-transparent outline-none cursor-pointer pr-5 font-medium"
                    >
                        <option value={4}>4 rows</option>
                        <option value={8}>8 rows</option>
                        <option value={10}>10 rows</option>
                    </select>
                    <ChevronDown size={14} className="text-gray-400 absolute right-0 pointer-events-none group-hover:text-[#eda52d]" />
                </div>
            </div>
        </div>
    );
};
