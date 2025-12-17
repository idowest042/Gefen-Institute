import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const useAdminData = create((set) => ({
  adminData: null,
  FetchingAdminData: false,
  DeleteMessage: false,
  FetchById: false,
  
  fetchAdminData: async () => {
    set({ FetchingAdminData: true });
    try {
      const response = await axiosInstance.get("/user/message");
      set({ adminData: response.data });
    } catch (error) {
      toast.error("Failed to fetch admin data");
      console.log("Fetch Admin Data Error:", error.response?.data || error.message);
    } finally {
      set({ FetchingAdminData: false });
    }
  },
  
  deleteMessage: async (id) => {
    set({ DeleteMessage: true });
    try {
      await axiosInstance.delete(`/user/message/${id}`); // ✅ Fixed: Use backticks, not template literal with delete
      set((state) => ({
        adminData: state.adminData.filter((msg) => msg._id !== id)
      }));
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete message");
      console.log("Delete Message Error:", error.response?.data || error.message);
    } finally {
      set({ DeleteMessage: false });
    }
  },
  
  fetchById: async (id) => {
    set({ FetchById: true });
    try {
      const response = await axiosInstance.get(`/user/message/${id}`); // ✅ Fixed: Use backticks
      return response.data; // ✅ Return the data instead of setting it
    } catch (error) {
      toast.error("Failed to fetch message details");
      console.log("Fetch Admin Data Error:", error.response?.data || error.message);
    } finally {
      set({ FetchById: false });
    }
  }
}));

export default useAdminData;