import { AuthApi } from "./api/auth.api";
import { AuthMock } from "./mocks/auth.mock";
import type { IAuthService } from "./interfaces/IAuthService";

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

export const authService: IAuthService = useMocks ? new AuthMock() : new AuthApi();
