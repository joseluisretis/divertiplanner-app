import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services";
import type { User } from "../models/auth.model";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          if (!email || !password) {
            throw new Error("Credenciales incompletas");
          }

          const data = await authService.login({ 
            username: email, 
            password 
          });

          if (data.ok === false || !data.data) {
            const errorMsg = Array.isArray(data.messages) ? data.messages[0] : data.messages;
            throw new Error(errorMsg || "Credenciales inválidas");
          }

          const result = data.data;
          const token = result.token || result.accessToken || null;
          const userData = result.user;

          const user: User = {
            id: userData?.id || "1",
            email: userData?.email || email,
            name: userData?.name || email.split("@")[0],
            role: userData?.role
          };

          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Error de red",
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "divertiplanner-auth",
    }
  )
);
