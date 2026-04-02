import { create } from "zustand";
import { checkAuthUser, logoutUser } from "../services/auth.service";

type User = {
  _id: string;
  email: string;
  name: string;
};

export interface AuthState {
  user: User | null;
  isCheckingAuth: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isCheckingAuth: true,

  login: (user) => {
    set({ user });
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      set({ user: null });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await checkAuthUser();
      if (res && res.user) {
        set({ user: res.user, isCheckingAuth: false });
      } else {
        set({ user: null, isCheckingAuth: false });
      }
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));