import { supabase } from "../../lib/supabase";
import type { IEmployeeService } from "../interfaces/IEmployeeService";
import type { Employee, EmployeesResponse } from "../../models/employee.model";

type EmployeeRow = {
  id: string;
  name: string;
  role: Employee["role"];
  is_active: boolean;
};

export class EmployeeSupabase implements IEmployeeService {
  async getEmployees(): Promise<EmployeesResponse> {
    const { data, error } = await supabase
      .from("employees")
      .select("id, name, role, is_active")
      .eq("is_active", true)
      .order("name");

    if (error) {
      return { ok: false, data: [] };
    }

    return {
      ok: true,
      data: (data as EmployeeRow[] ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role,
      })),
    };
  }
}
