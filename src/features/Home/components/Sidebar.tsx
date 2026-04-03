import { ChevronDown, ChevronRight } from "lucide-react";
import type { Category } from "../types/category.types";

interface SidebarProps {
  onCategorySelect: (id: string | null) => void;
  onSubcategoryToggle: (sub: string) => void;
  selectedCategory: string | null;
  selectedSubcategories: string[];
  categories: Category[];
  loading?: boolean;
}

export const Sidebar = ({ 
  onCategorySelect, 
  onSubcategoryToggle, 
  selectedCategory, 
  selectedSubcategories,
  categories,
  loading = false
}: SidebarProps) => {

  return (
    <aside className="w-[240px] flex-shrink-0 pr-6 mr-6 h-full border-r border-transparent">
      <h3 className="font-bold text-[#033f63] mb-5 text-[15px]">Categories</h3>
      
      <div className="space-y-4">
        <div 
          onClick={() => {
            onCategorySelect(null);
          }}
          className={`text-sm font-medium block w-full text-left cursor-pointer transition-colors ${
            !selectedCategory ? "text-[#eda52d]" : "text-gray-700 hover:text-[#eda52d]"
          }`}
        >
          All categories
        </div>
        
        {loading ? (
          <div className="animate-pulse space-y-4 pt-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : (
          categories.map((cat) => {
            const isExpanded = selectedCategory === cat._id;
            return (
              <div key={cat._id} className="pt-2">
                <div 
                  onClick={() => onCategorySelect(isExpanded ? null : cat._id)}
                  className={`flex justify-between items-center text-sm font-medium mb-3 cursor-pointer transition-colors ${
                    isExpanded ? "text-[#eda52d]" : "text-gray-800 hover:text-[#eda52d]"
                  }`}
                >
                  <span>{cat.name}</span>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                
                {isExpanded && cat.subcategories.length > 0 && (
                  <div className="pl-3 space-y-3">
                    {cat.subcategories.map((sub) => {
                      const isChecked = selectedSubcategories.includes(sub);
                      return (
                        <div 
                          key={sub}
                          onClick={() => onSubcategoryToggle(sub)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input 
                            type="checkbox" 
                            className="w-[18px] h-[18px] rounded border-gray-300 accent-[#033f63] cursor-pointer" 
                            checked={isChecked}
                            readOnly
                          />
                          <span className={`text-sm transition-colors ${
                            isChecked ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"
                          }`}>
                            {sub}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
