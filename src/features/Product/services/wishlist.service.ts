import { api } from "../../../api/axiosInstance";

export const getWishlistApi = async () => {
    const res = await api.get("/wishlist");
    return res.data;
};

export const addToWishlistApi = async (productId: string) => {
    const res = await api.post("/wishlist", { productId });
    return res.data;
};

export const removeFromWishlistApi = async (productId: string) => {
    const res = await api.delete(`/wishlist/${productId}`);
    return res.data;
};
