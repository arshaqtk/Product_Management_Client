import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { Navbar } from "../../../components/layout/Navbar";
import { getProductById } from "../services/productDetail.service";
import { ProductGallery } from "../components/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
       const fetchDetail = async () => {
         try {
           const res = await getProductById(id);
           if (res.success) {
             setProduct(res.data);
           }
         } catch (err: any) {
           const errorMsg = err.response?.data?.message || err.message || "Failed to load product details";
           toast.error(errorMsg);
         } finally {
           setLoading(false);
         }
       };
       fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
       <div className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-[1400px] mx-auto px-8 pt-20 animate-pulse">
            <div className="h-6 w-48 bg-gray-100 rounded mb-10"></div>
            <div className="flex gap-16">
              <div className="w-[500px] aspect-square bg-gray-100 rounded-[24px]"></div>
              <div className="flex-1 space-y-6">
                 <div className="h-10 w-3/4 bg-gray-100 rounded"></div>
                 <div className="h-6 w-1/4 bg-gray-100 rounded"></div>
                 <div className="h-20 w-full bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
       </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
         <Navbar />
         <div className="py-20 text-center text-gray-500 font-bold">
            Product not found!
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col pb-20">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 py-10 transition-all">
          <Link to="/" className="text-sm text-gray-500 hover:text-[#033f63] font-medium">Home</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">Product details</span>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-sm text-[#033f63] font-bold">{product.title}</span>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-8 self-start">
             <ProductGallery images={product.images} />
          </div>

          {/* Right: Details / Info */}
          <div className="flex-1">
             <ProductInfo 
               productId={product._id}
               title={product.title}
               initialPrice={product.variants[0]?.price}
               initialStock={product.variants[0]?.qty}
               variants={product.variants}
             />
          </div>

        </div>
      </main>
    </div>
  );
};
