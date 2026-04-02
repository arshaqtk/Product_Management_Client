import { api } from "../../../api/axiosInstance";

export const getProductById = async (id: string) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

