import { AuthSupabase } from "./api/auth.supabase";
import { AuthMock } from "./mocks/auth.mock";
import type { IAuthService } from "./interfaces/IAuthService";

import { EventApi } from "./api/event.api";
import { EventMock } from "./mocks/event.mock";
import type { IEventService } from "./interfaces/IEventService";

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

export const authService: IAuthService = useMocks ? new AuthMock() : new AuthSupabase();
export const eventService: IEventService = useMocks ? new EventMock() : new EventApi();
