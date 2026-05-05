import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
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
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Mock login — replace with real API call
          await new Promise((resolve) => setTimeout(resolve, 800));
          if (password.length < 1) {
            throw new Error("Contraseña requerida");
          }
          const mockUser: User = {
            id: "1",
            email,
            name: email.split("@")[0],
          };
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Error de autenticación",
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "party-pulse-auth",
    }
  )
);
