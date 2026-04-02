import { api } from "../../../api/axiosInstance";

export const getCategories = async () => {
  const res = await api.get("/category");
  return res.data;
};
