import { create } from "zustand";
import { toast } from "sonner";
import { supabase } from "../services/supabase/supabase";
import { authService } from "../services";
import type { User } from "../models/auth.model";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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

    login: async (username: string, password: string) => {
      set({ isLoading: true });
      try {
        if (!username || !password) {
          toast.error("Credenciales incompletas");
          set({ isLoading: false });
          return;
        }

        const result = await authService.login({ username, password });

        if (!result.ok) {
          const msg = Array.isArray(result.messages)
            ? result.messages[0]
            : result.messages;
          toast.error(msg ?? "Credenciales inválidas");
          set({ isLoading: false });
          return;
        }

        // Si el login es exitoso, establecer el usuario directamente
        // (Supabase onAuthStateChange también se encargará si es necesario)
        if (result.data?.user) {
          set({
            user: result.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          toast.success("¡Bienvenido!");
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Error de red";
        toast.error(errorMsg);
        set({ isLoading: false });
      }
    },

    logout: async () => {
      await authService.logout();
      toast.success("Sesión cerrada");
      // onAuthStateChange se encarga de limpiar user e isAuthenticated
    },
  };
});
