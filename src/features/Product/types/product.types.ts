export interface Variant {
  ram: string;
  price: number;
  qty: number;
}

export interface Product {
    _id: string;
    title: string;
    description: string;
    categoryId: string;
    subcategory: string;
    variants: Variant[];
    images: string[];
    image?: string;
    price?: number;
}

export interface AddProductForm {
  title: string;
  description: string;
  categoryId: string;
  subcategory: string;
  variants: Variant[];
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Product | null;
}
