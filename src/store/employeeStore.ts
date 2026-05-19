import { create } from "zustand";
import { employeeService } from "../services";
import type { Employee } from "../models/employee.model";

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  fetchEmployees: () => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  isLoading: false,

  fetchEmployees: async () => {
    if (get().employees.length > 0) return;

    set({ isLoading: true });
    const { data } = await employeeService.getEmployees();
    set({ employees: data, isLoading: false });
  },
}));
