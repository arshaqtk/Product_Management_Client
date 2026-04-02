import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-[500px]">
        <div className="w-full aspect-square bg-gray-50 border border-gray-200 rounded-[24px] flex items-center justify-center">
            <span className="text-gray-300">No Image Available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px]">
      {/* Main Image */}
      <div className="w-full aspect-square border border-gray-200 rounded-[24px] p-8 flex items-center justify-center bg-white shadow-sm overflow-hidden">
        <img 
          src={activeImage} 
          alt="Product" 
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105" 
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`w-[120px] h-[100px] flex-shrink-0 border rounded-[16px] p-3 flex items-center justify-center bg-white transition-all ${
              activeImage === img ? "border-[#eda52d] ring-1 ring-[#eda52d]" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img src={img} alt={`Thumb ${i}`} className="max-h-full max-w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};
