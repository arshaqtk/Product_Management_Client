import { api } from "../../../api/axiosInstance";
import type{ LoginPayload, SignupPayload } from "../types/auth.types";

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const signupUser = async (data: SignupPayload) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const checkAuthUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};