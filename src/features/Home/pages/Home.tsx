import { useEffect, useState } from "react";
import { Navbar } from "../../../components/layout/Navbar";
import { Sidebar } from "../components/Sidebar";
import { HomeActions } from "../components/HomeActions";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { getProducts } from "../services/product.service";

export const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: limit,
        categoryId: selectedCategory || undefined,
        subcategory: selectedSubcategories.length > 0 ? selectedSubcategories : undefined,
      };
      const res = await getProducts(params);
      if (res.success) {
        setProducts(res.data.products);
        setTotalItems(res.data.total);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit, selectedCategory, selectedSubcategories]);

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(id);
    setSelectedSubcategories([]);
    setCurrentPage(1);
  };

  const handleSubcategoryToggle = (sub: string) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(sub)) {
        return prev.filter((s) => s !== sub);
      } else {
        return [...prev, sub];
      }
    });
    setCurrentPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8">
        <HomeActions />

        <div className="flex mt-2 pb-10">
          <Sidebar 
            selectedCategory={selectedCategory}
            selectedSubcategories={selectedSubcategories}
            onCategorySelect={handleCategorySelect}
            onSubcategoryToggle={handleSubcategoryToggle}
          />

          <div className="flex-1 flex flex-col pl-4 relative">
            {/* Minimal overlay for filtering feedback */}
            {loading && products.length > 0 && (
              <div className="absolute inset-0 bg-white/40 z-20 flex items-start justify-center pt-20 backdrop-blur-[1px]">
                 <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#eda52d]"></div>
              </div>
            )}

            {loading && products.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-[320px] bg-gray-50 animate-pulse rounded-2xl border border-gray-100"></div>
                ))}
              </div>
            ) : (
              <>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 ${loading ? 'opacity-50' : 'opacity-100'}`}>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  ) : (
                    !loading && (
                      <div className="col-span-full py-20 text-center text-gray-500 font-medium bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        No products found in this category.
                      </div>
                    )
                  )}
                </div>

                {products.length > 0 && (
                  <div className="mt-8">
                    <Pagination 
                      totalItems={totalItems}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      limit={limit}
                      onPageChange={(page) => setCurrentPage(page)}
                      onLimitChange={handleLimitChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
