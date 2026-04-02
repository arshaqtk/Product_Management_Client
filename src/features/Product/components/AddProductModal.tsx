import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ChevronDown, Plus, X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { createProduct, updateProduct } from "../../Home/services/product.service";
import { useCategoryStore } from "../../../store/useCategoryStore";
import type { AddProductForm, AddProductModalProps } from "../types/product.types";

const RAM_OPTIONS = ["2 GB", "4 GB", "8 GB", "12 GB", "16 GB", "24 GB", "32 GB", "64 GB", "128 GB"];

export const AddProductModal = ({ isOpen, onClose, onSuccess, initialData }: AddProductModalProps) => {
  const categories = useCategoryStore((state) => state.categories);
  
  // Mixed state for images: can be File objects (newly selected) or strings (existing URLs)
  const [images, setImages] = useState<(File | string)[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSubcategoryDropdownOpen, setIsSubcategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<AddProductForm>({
    defaultValues: {
      variants: [{ ram: "4 GB", price: 0, qty: 1 }],
      categoryId: "",
      subcategory: ""
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants"
  });

  const selectedCategoryId = watch("categoryId");
  const selectedSubcategory = watch("subcategory");
  const selectedCategory = categories.find(c => c._id === (typeof selectedCategoryId === 'string' ? selectedCategoryId : (selectedCategoryId as any)?._id));

  // Initialize form when editing
  useEffect(() => {
    if (initialData && isOpen) {
      const catId = typeof initialData.categoryId === 'string' 
        ? initialData.categoryId 
        : (initialData.categoryId as { _id: string })._id;
        
      reset({
        title: initialData.title,
        description: initialData.description,
        categoryId: catId,
        subcategory: initialData.subcategory,
        variants: initialData.variants
      });
      setImages(initialData.images || []);
      setImagePreviews(initialData.images || []);
    } else if (!initialData && isOpen) {
      reset({
        variants: [{ ram: "4 GB", price: 0, qty: 1 }],
        categoryId: "",
        subcategory: ""
      });
      setImages([]);
      setImagePreviews([]);
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      toast.error("You can only upload up to 5 images");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const removedItem = images[index];
    
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    // Only revoke if it was a newly created object URL (not an existing server URL)
    if (typeof removedItem !== 'string') {
      URL.revokeObjectURL(newPreviews[index]);
    }
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const onSubmit = async (data: AddProductForm) => {
    if (images.length === 0) {
      toast.error("At least one product image is required");
      return;
    }
    if (!data.categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!data.subcategory) {
      toast.error("Please select a subcategory");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("subcategory", data.subcategory);
    formData.append("variants", JSON.stringify(data.variants));

    const existingImageUrls: string[] = [];
    images.forEach(img => {
      if (typeof img === 'string') {
        existingImageUrls.push(img);
      } else {
        formData.append("images", img);
      }
    });

    // Send existing images as a JSON string so server can identify them
    if (existingImageUrls.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImageUrls));
    }

    try {
      const res = initialData 
        ? await updateProduct(initialData._id, formData)
        : await createProduct(formData);
        
      if (res.success) {
        toast.success(initialData ? "Product updated successfully!" : "Product added successfully!");
        handleClose();
        onSuccess();
      } else {
        toast.error(res.message || `Failed to ${initialData ? 'update' : 'add'} product`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setImages([]);
    setImagePreviews([]);
    onClose();
  };

  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={!loading ? handleClose : undefined}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[32px] p-10 shadow-2xl animate-in fade-in zoom-in duration-300 scrollbar-hide">
        <h2 className="text-2xl font-bold text-[#033f63] text-center mb-8">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <label className="w-[140px] text-gray-500 font-medium whitespace-nowrap">Title :</label>
            <div className="flex-1 flex flex-col">
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="e.g. HP AMD Ryzen 3"
                className={`w-full h-[56px] px-6 rounded-[16px] border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:border-[#eda52d] outline-none text-gray-700 transition-all font-medium`}
              />
              {errors.title && <span className="text-xs text-red-500 mt-1 ml-1">{errors.title.message}</span>}
            </div>
          </div>

          {/* Variants */}
          <div className="flex flex-col md:flex-row gap-6">
            <label className="w-[140px] text-gray-500 font-medium pt-2 whitespace-nowrap">Variants :</label>
            <div className="flex-1 space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-left duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-gray-400 font-medium">Ram:</span>
                    <div className="relative">
                      <select
                        {...register(`variants.${index}.ram`, { required: "RAM is required" })}
                        className={`w-[110px] h-[48px] px-4 rounded-[12px] border ${errors.variants?.[index]?.ram ? 'border-red-500' : 'border-gray-200'} outline-none focus:border-[#eda52d] text-sm text-gray-700 font-bold appearance-none bg-white cursor-pointer`}
                      >
                        {RAM_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-gray-400 font-medium">Price:</span>
                    <div className="relative flex flex-col">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          {...register(`variants.${index}.price`, { 
                            required: "Price is required", 
                            min: { value: 0.01, message: "Price > 0" },
                            valueAsNumber: true 
                          })}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className={`w-[120px] h-[48px] pl-8 pr-4 rounded-[12px] border ${errors.variants?.[index]?.price ? 'border-red-500' : 'border-gray-200'} outline-none focus:border-[#eda52d] text-sm text-gray-700 font-bold`}
                        />
                      </div>
                      {errors.variants?.[index]?.price && (
                        <span className="text-[10px] text-red-500 mt-1 absolute -bottom-4 left-0">
                          {errors.variants?.[index]?.price?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-gray-400 font-medium">QTY:</span>
                    <div className="flex items-center h-[48px] border border-gray-200 rounded-[12px] px-2 bg-gray-50">
                      <button 
                        type="button"
                        onClick={() => {
                          const val = watch(`variants.${index}.qty`);
                          if (val > 1) setValue(`variants.${index}.qty`, val - 1);
                        }}
                        className="p-2 hover:text-[#eda52d] transition-colors"
                      >
                        -
                      </button>
                      <input
                        {...register(`variants.${index}.qty`, { required: true, valueAsNumber: true })}
                        type="number"
                        className="w-[40px] text-center bg-transparent outline-none text-sm font-bold text-gray-700"
                        readOnly
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const val = watch(`variants.${index}.qty`);
                          setValue(`variants.${index}.qty`, val + 1);
                        }}
                        className="p-2 hover:text-[#eda52d] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {fields.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => remove(index)}
                      className="text-red-400 hover:text-red-500 p-2 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ ram: "8 GB", price: 0.01, qty: 1 })}
                className="bg-[#282828] text-white px-6 h-[44px] rounded-[12px] text-[12px] font-bold shadow-md hover:bg-black transition-all transform active:scale-95 flex items-center gap-2"
              >
                <Plus size={16} />
                Add variants
              </button>
            </div>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-medium">Category :</label>
              <div className="relative">
                <input type="hidden" {...register("categoryId", { required: "Category is required" })} />
                <div 
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className={`w-full h-[56px] px-6 rounded-[16px] border ${errors.categoryId ? 'border-red-500' : isCategoryDropdownOpen ? 'border-[#eda52d]' : 'border-gray-300'} flex items-center justify-between cursor-pointer bg-white transition-all`}
                >
                  <span className={selectedCategoryId ? "text-gray-700 font-medium" : "text-gray-400 font-medium"}>
                    {selectedCategory ? selectedCategory.name : "Select category"}
                  </span>
                  <ChevronDown className={`text-gray-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                </div>
                {errors.categoryId && <span className="text-xs text-red-500 mt-1 ml-1">{errors.categoryId.message}</span>}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-[62px] left-0 right-0 bg-white border border-gray-100 rounded-[16px] shadow-xl z-20 max-h-[160px] overflow-y-auto">
                    {categories.map((cat) => (
                      <div 
                        key={cat._id}
                        onClick={() => {
                          setValue("categoryId", cat._id);
                          setValue("subcategory", "");
                          setIsCategoryDropdownOpen(false);
                        }}
                        className="px-6 py-4 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm border-b border-gray-50 last:border-0"
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-medium">Sub category :</label>
              <div className="relative">
                <input type="hidden" {...register("subcategory", { required: "Subcategory is required" })} />
                <div 
                  onClick={() => selectedCategoryId && setIsSubcategoryDropdownOpen(!isSubcategoryDropdownOpen)}
                  className={`w-full h-[56px] px-6 rounded-[16px] border ${errors.subcategory ? 'border-red-500' : !selectedCategoryId ? 'bg-gray-50 cursor-not-allowed' : 'bg-white cursor-pointer'} ${isSubcategoryDropdownOpen ? 'border-[#eda52d]' : 'border-gray-300'} flex items-center justify-between transition-all`}
                >
                  <span className={selectedSubcategory ? "text-gray-700 font-medium" : "text-gray-400 font-medium"}>
                    {selectedSubcategory || "Select sub category"}
                  </span>
                  <ChevronDown className={`text-gray-400 transition-transform ${isSubcategoryDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                </div>
                {errors.subcategory && <span className="text-xs text-red-500 mt-1 ml-1">{errors.subcategory.message}</span>}
                {isSubcategoryDropdownOpen && selectedCategory && (
                  <div className="absolute top-[62px] left-0 right-0 bg-white border border-gray-100 rounded-[16px] shadow-xl z-20 max-h-[160px] overflow-y-auto">
                    {selectedCategory.subcategories.map((sub) => (
                      <div 
                        key={sub}
                        onClick={() => {
                          setValue("subcategory", sub);
                          setIsSubcategoryDropdownOpen(false);
                        }}
                        className="px-6 py-4 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm border-b border-gray-50 last:border-0"
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 font-medium">Description :</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Describe the product..."
              rows={4}
              className={`w-full p-6 rounded-[16px] border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:border-[#eda52d] outline-none text-gray-700 transition-all font-medium resize-none shadow-sm`}
            />
            {errors.description && <span className="text-xs text-red-500 ml-1">{errors.description.message}</span>}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-4">
            <label className="text-gray-500 font-medium">Upload image:</label>
            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative w-[110px] h-[110px] rounded-[16px] border border-gray-200 overflow-hidden group shadow-sm transition-transform hover:scale-105">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <X className="text-white" size={24} />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="w-[110px] h-[110px] rounded-[16px] border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#eda52d] hover:bg-gray-50 transition-all group">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                  <Upload className="text-gray-300 group-hover:text-[#eda52d] transition-colors" size={32} />
                  <span className="text-[10px] text-gray-400 mt-2 font-medium">Add Image</span>
                </label>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`h-[56px] px-14 rounded-[16px] bg-[#eda52d] text-white font-bold text-sm shadow-xl hover:bg-[#db9624] transition-all transform active:scale-95 flex items-center justify-center min-w-[170px] ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (isEdit ? "UPDATING..." : "ADDING...") : (isEdit ? "UPDATE PRODUCT" : "ADD PRODUCT")}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-[56px] px-12 rounded-[16px] bg-[#f2f2f2] text-gray-800 font-bold text-sm hover:bg-gray-200 transition-all transform active:scale-95 min-w-[170px]"
            >
              DISCARD
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
