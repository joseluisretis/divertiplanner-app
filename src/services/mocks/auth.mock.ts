import type { SignInDto, AuthResponse } from "../../models/auth.model";
import type { IAuthService } from "../interfaces/IAuthService";

export class AuthMock implements IAuthService {
  async login(credentials: SignInDto): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.password === "error") {
          resolve({
            ok: false,
            messages: "Mock error: Credenciales inválidas",
            data: null,
          });
        } else {
          resolve({
            ok: true,
            data: {
              token: "mock-jwt-token-12345",
              user: {
                id: "mock-1",
                email: credentials.username,
                name: credentials.username.split("@")[0],
                role: "ADMIN"
              }
            }
          });
        }
      }, 800);
    });
  }
}
