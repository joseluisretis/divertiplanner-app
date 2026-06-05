import { supabase } from "../supabase/supabase";
import type { IAuthService } from "../interfaces/IAuthService";
import type { SignInDto, AuthResponse } from "../../models/auth.model";

export class AuthSupabase implements IAuthService {
  private toEmail(username: string): string {
    return username.includes("@") ? username : `${username}@divertiplanner.com`;
  }

  async login(credentials: SignInDto): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.toEmail(credentials.username),
      password: credentials.password,
    });

    if (error || !data.user) {
      return {
        ok: false,
        messages: error?.message ?? "Credenciales inválidas",
        data: null,
      };
    }

    const u = data.user;
    return {
      ok: true,
      data: {
        user: {
          id: u.id,
          email: u.email!,
          name: u.user_metadata?.name ?? u.email!.split("@")[0],
          role: u.user_metadata?.role,
        },
      },
    };
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
  }
}
