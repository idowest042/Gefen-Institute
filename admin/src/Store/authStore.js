import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const AuthStore = create(
  persist(
    (set, get) => ({
      isLoggingIn: false,
      authUser: null,
      isCheckingAuth: true,
      isLoggingOut: false,
      token: null,

      login: async (data, navigate) => {
        set({ isLoggingIn: true });
        try {
          const response = await axiosInstance.post("/user/login", data);
          console.log("📥 Login response:", response.data);

          // 🔧 FIX: Your API returns 'admin' not 'user'
          const adminData = response.data.admin;
          const tokenData = response.data.token;

          console.log("Setting authUser to:", adminData);
          console.log("Setting token to:", tokenData);

          set({ 
            authUser: adminData,
            token: tokenData
          });

          // Verify it was saved
          setTimeout(() => {
            const currentState = get();
            console.log("🔍 State after login:");
            console.log("authUser:", currentState.authUser);
            console.log("token:", currentState.token);

            // Check localStorage
            const stored = localStorage.getItem("auth-storage");
            console.log("📦 LocalStorage content:", stored);
            
            if (stored) {
              const parsed = JSON.parse(stored);
              console.log("📦 Parsed authUser:", parsed.state.authUser);
              console.log("📦 Parsed token:", parsed.state.token);
            }
          }, 100);

          toast.success("Login successful!");
          
          if (navigate) {
            navigate("/");
          }
          
          return response.data;
        } catch (error) {
          console.error("Login Error:", error.response?.data || error.message);
          toast.error(error.response?.data?.message || "Wrong Email or password");
          throw error;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: (navigate) => {
        set({ authUser: null, token: null });
        toast.success("Logged out");
        if (navigate) {
          navigate("/login");
        }
      },

      checkAuth: async () => {
        console.log("🔍 ===== CHECK AUTH STARTED =====");
        set({ isCheckingAuth: true });

        const currentState = get();
        const token = currentState.token;
        const authUser = currentState.authUser;

        console.log("Current authUser:", authUser);
        console.log("Current token:", token);

        // Check localStorage directly
        const stored = localStorage.getItem("auth-storage");
        console.log("📦 LocalStorage raw:", stored);

        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            console.log("📦 LocalStorage parsed:", parsed);
          } catch (e) {
            console.error("Failed to parse localStorage:", e);
          }
        }

        if (!token) {
          console.log("❌ No token found, setting authUser to null");
          set({ isCheckingAuth: false, authUser: null });
          return;
        }

        try {
          console.log("📤 Calling /user/check-auth with token");
          const response = await axiosInstance.get("/user/check-auth", {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("✅ Auth check successful:", response.data);
          
          // 🔧 FIX: Your API likely returns 'admin' here too
          const userData = response.data.admin || response.data;
          
          console.log("Setting authUser from checkAuth to:", userData);
          
          set({ 
            authUser: userData,
            token: token
          });
        } catch (error) {
          console.error("❌ Auth Check Error:", error.response?.data || error.message);
          set({ authUser: null, token: null });
        } finally {
          set({ isCheckingAuth: false });
          console.log("🔍 ===== CHECK AUTH ENDED =====");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        authUser: state.authUser,
        token: state.token,
      }),
    }
  )
);