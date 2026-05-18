import type { SignInDto, AuthResponse } from "../../models/auth.model";
import type { IAuthService } from "../interfaces/IAuthService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export class AuthApi implements IAuthService {
  async login(credentials: SignInDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return response.json();
  }

  async logout(): Promise<void> {
    // no-op: la API legacy no tiene endpoint de logout
  }
}
