interface CostDataFormProps {
  totalCost: string;
  transportCost: string;
  advancePayment: string;
  onChange: (fields: Partial<Pick<CostDataFormProps, "totalCost" | "transportCost" | "advancePayment">>) => void;
}

export default function CostDataForm({ totalCost, transportCost, advancePayment, onChange }: CostDataFormProps) {
  return (
    <div className="bg-surface-container-lowest p-container-padding rounded-lg border border-primary-fixed-dim ambient-shadow-primary">
      <div className="flex items-center gap-stack-sm mb-stack-md">
        <span className="material-symbols-outlined text-secondary">payments</span>
        <h3 className="font-h3 text-h3 text-on-background">Datos del Costo</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Costo Total (S/)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-label-md text-on-surface-variant">S/</span>
            <input className="w-full bg-surface-container border-none rounded-DEFAULT pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="0.00" step="0.01" type="number" value={totalCost} onChange={(e) => onChange({ totalCost: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Movilidad (S/)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-label-md text-on-surface-variant">S/</span>
            <input className="w-full bg-surface-container border-none rounded-DEFAULT pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="0.00" step="0.01" type="number" value={transportCost} onChange={(e) => onChange({ transportCost: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Adelanto (S/)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-label-md text-on-surface-variant">S/</span>
            <input className="w-full bg-surface-container border-none rounded-DEFAULT pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="0.00" step="0.01" type="number" value={advancePayment} onChange={(e) => onChange({ advancePayment: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}
