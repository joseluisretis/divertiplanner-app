import { AuthSupabase } from "./api/auth.supabase";
import { AuthMock } from "./mocks/auth.mock";
import type { IAuthService } from "./interfaces/IAuthService";

import { EventSupabase } from "./api/event.supabase";
import { EventMock } from "./mocks/event.mock";
import type { IEventService } from "./interfaces/IEventService";

import { EmployeeSupabase } from "./api/employee.supabase";
import { EmployeeMock } from "./mocks/employee.mock";
import type { IEmployeeService } from "./interfaces/IEmployeeService";

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

export const authService: IAuthService = useMocks ? new AuthMock() : new AuthSupabase();
export const eventService: IEventService = useMocks ? new EventMock() : new EventSupabase();
export const employeeService: IEmployeeService = useMocks ? new EmployeeMock() : new EmployeeSupabase();
