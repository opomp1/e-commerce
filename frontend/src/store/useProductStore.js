import { create } from "zustand";
import toast from "react-hot-toast";

import axiosInstance from "../lib/axios";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
      }));
      toast.success("Product created!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occured during creating product "
      );
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data.products });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occured during fetching products"
      );
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products/category/${category}`
      );
      set({ products: response.data.products });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occured during fetching product "
      );
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
      }));

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occured during deleting product "
      );
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.patch(`/products/${productId}`);

      const isFeatured = response.data.isFeatured;

      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id == productId
            ? { ...product, isFeatured: isFeatured }
            : product
        ),
      }));

      toast.success(
        isFeatured
          ? "Product marked as featured"
          : "Product unfeatured successfully"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occured during toggling featured  product "
      );
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
