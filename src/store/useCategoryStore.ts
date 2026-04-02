import { create } from "zustand";
import { getCategoriesApi, createCategoryApi, createSubCategoryApi } from "../features/Home/services/category.service";

import type { Category } from "../features/Home/types/category.types";

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (name: string) => Promise<{ success: boolean; message?: string }>;
  addSubcategory: (categoryId: string, name: string) => Promise<{ success: boolean; message?: string }>;
}

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getCategoriesApi();
      if (res.success) {
        set({ categories: res.data, loading: false });
      } else {
        set({ error: res.message || "Failed to fetch categories", loading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
    }
  },
  createCategory: async (name: string) => {
    try {
      const res = await createCategoryApi(name);
      if (res.success) {
        const categoriesRes = await getCategoriesApi();
        if (categoriesRes.success) {
          set({ categories: categoriesRes.data });
        }
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || err.message || "Something went wrong" };
    }
  },
  addSubcategory: async (categoryId: string, name: string) => {
    try {
      const res = await createSubCategoryApi(categoryId, name);
      if (res.success) {
        const categoriesRes = await getCategoriesApi();
        if (categoriesRes.success) {
          set({ categories: categoriesRes.data });
        }
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || err.message || "Something went wrong" };
    }
  },
}));
