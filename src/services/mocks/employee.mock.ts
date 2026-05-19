import type { IEmployeeService } from "../interfaces/IEmployeeService";
import type { EmployeesResponse } from "../../models/employee.model";

export class EmployeeMock implements IEmployeeService {
  async getEmployees(): Promise<EmployeesResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          data: [
            { id: "1", name: "Carlos Mendoza",  shortName: "Carlos Mendoza",  role: "STAFF" },
            { id: "2", name: "Elena Ramos",     shortName: "Elena Ramos",     role: "STAFF" },
            { id: "3", name: "Lucía Vargas",    shortName: "Lucía Vargas",    role: "STAFF" },
            { id: "4", name: "María Torres",    shortName: "María Torres",    role: "STAFF" },
            { id: "5", name: "Pedro Flores",    shortName: "Pedro Flores",    role: "STAFF" },
          ],
        });
      }, 300);
    });
  }
}
