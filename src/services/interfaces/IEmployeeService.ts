import type { EmployeesResponse } from "../../models/employee.model";

export interface IEmployeeService {
  getEmployees(): Promise<EmployeesResponse>;
}
