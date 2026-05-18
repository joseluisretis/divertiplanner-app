import type { IEmployeeService } from "../interfaces/IEmployeeService";
import type { EmployeesResponse } from "../../models/employee.model";

export class EmployeeMock implements IEmployeeService {
  async getEmployees(): Promise<EmployeesResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          data: [
            { id: "1", name: "Carlos Mendoza", role: "MANAGER" },
            { id: "2", name: "Elena Ramos", role: "STAFF" },
            { id: "3", name: "Pedro Flores", role: "STAFF" },
            { id: "4", name: "María Torres", role: "SUPERVISOR" },
          ],
        });
      }, 300);
    });
  }
}
