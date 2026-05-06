export interface SignInDto {
  username: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  ok: boolean;
  statusCode?: number;
  messages?: string | string[];
  errors?: string;
  data: {
    user: User;
    token?: string;
    accessToken?: string;
  } | null;
}
