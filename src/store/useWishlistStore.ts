import { create } from "zustand";
import { getWishlistApi, addToWishlistApi, removeFromWishlistApi } from "../features/Product/services/wishlist.service";
import toast from "react-hot-toast";

interface WishlistItem {
    _id: string;
    title: string;
    image: string;
    price: number;
}

export interface WishlistState {
    items: WishlistItem[];
    loading: boolean;
    fetchWishlist: () => Promise<void>;
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
    items: [],
    loading: false,

    fetchWishlist: async () => {
        set({ loading: true });
        try {
            const res = await getWishlistApi();
            if (res.success) {
                set({ items: res.data, loading: false });
            }
        } catch (error: any) {
            console.error("Fetch wishlist error:", error);
            toast.error("Failed to fetch wishlist");
            set({ loading: false });
        }
    },

    addToWishlist: async (productId: string) => {
        try {
            const res = await addToWishlistApi(productId);
            if (res.success) {
                await get().fetchWishlist();
                toast.success("Added to wishlist");
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || "Failed to add to wishlist";
            toast.error(msg);
        }
    },

    removeFromWishlist: async (productId: string) => {
        try {
            const res = await removeFromWishlistApi(productId);
            if (res.success) {
                set({ items: get().items.filter(item => item._id !== productId) });
                toast.success("Removed from wishlist");
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || "Failed to remove from wishlist";
            toast.error(msg);
        }
    },

    isInWishlist: (productId: string) => {
        return get().items.some(item => item._id === productId);
    }
}));
