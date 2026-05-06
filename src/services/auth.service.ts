import type { SignInDto, AuthResponse } from "../models/auth.model";

const API_BASE_URL = "https://rs-agenda-api.onrender.com/api/v1";

export class AuthService {
  static async login(credentials: SignInDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    
    return response.json();
  }

  // Aquí se pueden agregar más métodos como register, getProfile, etc. basados en el swagger.
}
