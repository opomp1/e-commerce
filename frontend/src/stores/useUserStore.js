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
      if (res.data) {
        set({ user: res.data });
        toast.success("Account created successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error("Full error object:", error);
      console.log("error.response:", error.response);
      console.log("error.response.data:", error?.response?.data);
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
      toast.success("Logout successful");
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
      // toast.error(error?.response?.data?.message || "Something went wrong");
      set({ user: null });
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  refreshToken: async () => {
    // prevent multiple simultaneous refresh attempts
    if (get().checkingAuth && refreshPromise) return;

    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.post("/auth/refresh-token");
      return response.data;
    } catch (error) {
      set({ user: null });
      throw error;
    } finally {
      set({ checkingAuth: false });
    }
  },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // if refresh fails, redirect to login
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
  }
);
