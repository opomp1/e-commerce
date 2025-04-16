import { create } from "zustand";
import { toast } from "react-hot-toast";

import axiosInstance from "../lib/axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async (data) => {
    set({ loading: true });

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      set({ loading: false });
      return;
    }
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ user: res.data.user });

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ user: null });
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ user: res.data.user });

      toast.success("Login successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ user: null });
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/profile");

      set({ user: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ user: null });
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
