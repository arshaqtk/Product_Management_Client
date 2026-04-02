import { api } from "../../../api/axiosInstance";

export const getCategoriesApi = async () => {
  const res = await api.get("/category");
  return res.data;
};

export const createCategoryApi = async (name: string) => {
  const res = await api.post("/category", { name });
  return res.data;
};

export const createSubCategoryApi = async (categoryId: string, subCategoryName: string) => {
  const res = await api.post("/category/sub", { 
    categoryId, 
    subcategories: subCategoryName 
  });
  return res.data;
};
