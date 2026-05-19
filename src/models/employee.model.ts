export interface Employee {
  id: string;
  name: string;
  shortName: string;
  role: "ADMIN" | "MANAGER" | "SUPERVISOR" | "STAFF";
}

export interface EmployeesResponse {
  ok: boolean;
  data: Employee[];
}

export type StaffEntry = {
  employeeId: string;
  name: string;
  eventRole: string;
};
