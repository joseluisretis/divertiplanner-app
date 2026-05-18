import { useState } from "react";
import type { StaffEntry } from "../../models/employee.model";
import StaffPickerModal from "./StaffPickerModal";

interface StaffDataFormProps {
  staff: StaffEntry[];
  onAdd: (entry: StaffEntry) => void;
  onRemove: (employeeId: string) => void;
}

export default function StaffDataForm({ staff, onAdd, onRemove }: StaffDataFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addedIds = staff.map((s) => s.employeeId);

  return (
    <>
      <div className="bg-surface-container-lowest p-container-padding rounded-lg border border-primary-fixed-dim ambient-shadow-primary">
        <div className="flex items-center justify-between mb-stack-md">
          <div className="flex items-center gap-stack-sm">
            <span className="material-symbols-outlined text-secondary">groups</span>
            <h3 className="font-h3 text-h3 text-on-background">Datos de Personal</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 text-primary font-label-md border-2 border-primary-container/20 hover:bg-primary-container/10 px-4 py-3 rounded-DEFAULT transition-colors mb-stack-md bouncy-hover bouncy-active"
        >
          <span className="material-symbols-outlined text-xl">person_add</span>
          Agregar Personal
        </button>

        {staff.length === 0 ? (
          <p className="text-center text-on-surface-variant font-body-md py-4">
            No hay personal asignado aún.
          </p>
        ) : (
          <div className="space-y-stack-sm">
            {staff.map((entry) => (
              <div
                key={entry.employeeId}
                className="flex items-center justify-between p-4 bg-surface-container rounded-DEFAULT border border-transparent hover:border-primary-container/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <p className="font-label-md text-on-surface">{entry.name}</p>
                    <p className="text-xs text-on-surface-variant">{entry.eventRole}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(entry.employeeId)}
                  className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors"
                >
                  close
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <StaffPickerModal
        isOpen={isModalOpen}
        alreadyAdded={addedIds}
        onAdd={onAdd}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
