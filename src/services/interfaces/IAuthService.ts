import type { SignInDto, AuthResponse } from "../../models/auth.model";

export interface IAuthService {
  login(credentials: SignInDto): Promise<AuthResponse>;
  logout(): Promise<void>;
}
