import { useEffect, useRef, useState } from "react";
import { useCatalogStore } from "../../stores/catalogStore";
import { useEmployeeStore } from "../../stores/employeeStore";
import { CatalogCode } from "../../models/catalog.model";
import type { EventFilters } from "../../models/event.model";

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: EventFilters) => void;
}

export default function FilterBottomSheet({ isOpen, onClose, onApply }: FilterBottomSheetProps) {
  const { details, fetchCatalog } = useCatalogStore();
  const tiposEvento = details[CatalogCode.TipoEvento] ?? [];
  const estadosEvento = details[CatalogCode.EstadoEvento] ?? [];

  const { employees, fetchEmployees } = useEmployeeStore();

  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedEstados, setSelectedEstados] = useState<string[]>([]);
  const [selectedPersonal, setSelectedPersonal] = useState<string[]>([]);
  const [personalSearch, setPersonalSearch] = useState("");
  const [personalOpen, setPersonalOpen] = useState(false);
  const personalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCatalog(CatalogCode.TipoEvento);
    fetchCatalog(CatalogCode.EstadoEvento);
    fetchEmployees();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (personalRef.current && !personalRef.current.contains(e.target as Node)) {
        setPersonalOpen(false);
        setPersonalSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleEstado(value: string) {
    setSelectedEstados((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function addPersonal(id: string) {
    setSelectedPersonal((prev) => prev.includes(id) ? prev : [...prev, id]);
    setPersonalSearch("");
    setPersonalOpen(false);
  }

  function removePersonal(id: string) {
    setSelectedPersonal((prev) => prev.filter((v) => v !== id));
  }

  function handleClear() {
    setDate("");
    setEventType("");
    setSelectedEstados([]);
    setSelectedPersonal([]);
    setPersonalSearch("");
    onApply({ date: "", eventType: "", estados: [], personalIds: [] });
    onClose();
  }

  function handleApply() {
    onApply({ date, eventType, estados: selectedEstados, personalIds: selectedPersonal });
    onClose();
  }

  const filteredEmployees = personalSearch.length >= 3
    ? employees.filter(
        (e) =>
          !selectedPersonal.includes(e.id) &&
          e.shortName.toLowerCase().includes(personalSearch.toLowerCase())
      )
    : [];

  const selectedEmployees = employees.filter((e) => selectedPersonal.includes(e.id));

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-end justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full max-w-lg bg-surface rounded-t-[2rem] p-container-padding shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-6" />
        <h3 className="font-h3 text-h3 mb-6">Filtros Avanzados</h3>
        <div className="space-y-6">
          <div>
            <label className="font-label-md block mb-2">Fecha</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container"
            />
          </div>
          <div>
            <label className="font-label-md block mb-2">Tipo de evento</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container"
            >
              <option value="">Todos</option>
              {tiposEvento.map((tipo) => (
                <option key={tipo.id} value={tipo.value}>{tipo.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-label-md block mb-2">Estado</label>
            <div className="flex flex-wrap gap-2">
              {estadosEvento.map((estado) => {
                const isSelected = selectedEstados.includes(estado.value);
                return (
                  <button
                    key={estado.id}
                    onClick={() => toggleEstado(estado.value)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      isSelected
                        ? 'bg-primary border-primary text-white'
                        : 'border-outline-variant text-on-surface hover:bg-primary-container/20'
                    }`}
                  >
                    {estado.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div ref={personalRef}>
            <label className="font-label-md block mb-2">Personal</label>
            <div className="bg-surface-container-low rounded-lg px-3 py-2 flex flex-wrap gap-2 items-center min-h-[52px]">
              {selectedEmployees.map((emp) => (
                <span
                  key={emp.id}
                  className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                >
                  {emp.shortName}
                  <button onClick={() => removePersonal(emp.id)} className="ml-1 hover:text-primary/60">
                    <span className="material-symbols-outlined text-sm leading-none">close</span>
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={personalSearch}
                onChange={(e) => { setPersonalSearch(e.target.value); setPersonalOpen(true); }}
                onFocus={() => setPersonalOpen(true)}
                placeholder={selectedPersonal.length === 0 ? "Buscar personal..." : ""}
                className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder-slate-400"
              />
            </div>
            {personalOpen && filteredEmployees.length > 0 && (
              <ul className="bg-white border border-outline-variant/40 rounded-lg shadow-md mt-1 overflow-hidden">
                {filteredEmployees.map((emp) => (
                  <li
                    key={emp.id}
                    onMouseDown={() => addPersonal(emp.id)}
                    className="px-4 py-2.5 text-sm text-on-surface hover:bg-primary/5 cursor-pointer"
                  >
                    {emp.shortName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="pt-4 flex gap-4">
            <button
              className="flex-1 py-4 border border-primary text-primary rounded-full font-label-md bouncy-press"
              onClick={handleClear}
            >
              Limpiar
            </button>
            <button
              className="flex-1 py-4 bg-primary text-on-primary rounded-full font-label-md bouncy-press shadow-lg shadow-primary/20"
              onClick={handleApply}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
