import { useEffect, useState } from "react";
import { employeeService } from "../../services";
import type { Employee, StaffEntry } from "../../models/employee.model";

const EVENT_ROLES = [
  "Coordinador/a Principal",
  "Animador/a",
  "DJ / Música",
  "Decorador/a",
  "Fotógrafo/a",
  "Payaso/a",
  "Asistente",
];

interface StaffPickerModalProps {
  isOpen: boolean;
  alreadyAdded: string[];
  onAdd: (entry: StaffEntry) => void;
  onClose: () => void;
}

export default function StaffPickerModal({ isOpen, alreadyAdded, onAdd, onClose }: StaffPickerModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [eventRole, setEventRole] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setSelectedId("");
    setEventRole("");
    setIsLoading(true);
    employeeService.getEmployees().then((res) => {
      if (res.ok) setEmployees(res.data);
      setIsLoading(false);
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const canAdd = selectedId !== "" && eventRole !== "";
  const selectedEmployee = employees.find((e) => e.id === selectedId);

  const handleAdd = () => {
    if (!selectedEmployee || !eventRole) return;
    onAdd({ employeeId: selectedEmployee.id, name: selectedEmployee.name, eventRole });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-surface-container-lowest rounded-2xl border border-primary-fixed-dim ambient-shadow-primary w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-container-padding border-b border-primary-fixed-dim">
          <div className="flex items-center gap-stack-sm">
            <span className="material-symbols-outlined text-secondary">person_add</span>
            <h3 className="font-h3 text-h3 text-on-background">Agregar Personal</h3>
          </div>
          <button onClick={onClose} className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">
            close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-container-padding space-y-stack-md">
          <div>
            <p className="font-label-md text-on-surface-variant mb-stack-sm px-1">Selecciona un empleado</p>
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-on-surface-variant">
                <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                Cargando...
              </div>
            ) : (
              <div className="space-y-2">
                {employees.map((emp) => {
                  const isAdded = alreadyAdded.includes(emp.id);
                  const isSelected = selectedId === emp.id;
                  return (
                    <button
                      key={emp.id}
                      disabled={isAdded}
                      onClick={() => setSelectedId(emp.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-DEFAULT text-left transition-all ${
                        isAdded
                          ? "opacity-40 cursor-not-allowed bg-surface-container"
                          : isSelected
                          ? "bg-primary-container/30 border-2 border-primary"
                          : "bg-surface-container hover:bg-surface-container-high border-2 border-transparent"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md text-on-surface truncate">{emp.name}</p>
                        <p className="text-xs text-on-surface-variant">{emp.role}</p>
                      </div>
                      {isAdded && <span className="text-xs text-on-surface-variant">Ya agregado</span>}
                      {isSelected && !isAdded && (
                        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label className="font-label-md text-on-surface-variant mb-1 block px-1">Cargo en el evento</label>
            <select
              value={eventRole}
              onChange={(e) => setEventRole(e.target.value)}
              className="w-full bg-surface-container border-none rounded-DEFAULT px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md text-on-surface-variant"
            >
              <option value="">Seleccionar cargo...</option>
              {EVENT_ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-container-padding border-t border-primary-fixed-dim flex gap-stack-sm">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-full font-label-md border-2 border-primary-container/30 text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-full font-label-md bouncy-press shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
