import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { authService } from "../services";
import type { User } from "../models/auth.model";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()((set) => {
  // Sincroniza el store con la sesión de Supabase automáticamente.
  // INITIAL_SESSION dispara al crear el store y restaura la sesión existente en localStorage.
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      const u = session.user;
      set({
        user: {
          id: u.id,
          email: u.email!,
          name: u.user_metadata?.name ?? u.email!.split("@")[0],
          role: u.user_metadata?.role,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  });

  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    login: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        if (!username || !password) throw new Error("Credenciales incompletas");

        const result = await authService.login({ username, password });

        if (!result.ok) {
          const msg = Array.isArray(result.messages)
            ? result.messages[0]
            : result.messages;
          throw new Error(msg ?? "Credenciales inválidas");
        }
        // onAuthStateChange se encarga de actualizar user e isAuthenticated
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : "Error de red",
          isLoading: false,
        });
      }
    },

    logout: async () => {
      await authService.logout();
      // onAuthStateChange se encarga de limpiar user e isAuthenticated
    },

    clearError: () => set({ error: null }),
  };
});
