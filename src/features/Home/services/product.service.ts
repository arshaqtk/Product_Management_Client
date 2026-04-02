import { api } from "../../../api/axiosInstance";

export const getProducts = async (params = {}) => {
  const res = await api.get("/product", { params });
  return res.data;
};
