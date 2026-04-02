import { api } from "../../../api/axiosInstance";

export const getProductById = async (id: string) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

export const getVariantDetails = async (productId: string, ram: string) => {
  const res = await api.get(`/product/variant/${productId}/${ram}`);
  return res.data;
};
