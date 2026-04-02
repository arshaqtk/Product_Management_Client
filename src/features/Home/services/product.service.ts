import { api } from "../../../api/axiosInstance";

export const getProducts = async (params = {}) => {
  const res = await api.get("/product", { params });
  return res.data;
};

export const createProduct = async (formData: FormData) => {
  const res = await api.post("/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await api.put(`/product/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getProductSuggestions = async (q: string) => {
  const res = await api.get("/product/suggestions", { params: { q } });
  return res.data;
};
