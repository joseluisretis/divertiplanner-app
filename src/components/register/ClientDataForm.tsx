interface ClientDataFormProps {
  customerName: string;
  phone: string;
  email: string;
  onChange: (fields: Partial<Pick<ClientDataFormProps, "customerName" | "phone" | "email">>) => void;
}

export default function ClientDataForm({ customerName, phone, email, onChange }: ClientDataFormProps) {
  return (
    <div className="bg-surface-container-lowest p-container-padding rounded-lg border border-primary-fixed-dim ambient-shadow-primary">
      <div className="flex items-center gap-stack-sm mb-stack-md">
        <span className="material-symbols-outlined text-secondary">person</span>
        <h3 className="font-h3 text-h3 text-on-background">Datos del Cliente</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Nombre Completo</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline-variant font-body-md px-6" placeholder="Ej. Ana García" type="text" value={customerName} onChange={(e) => onChange({ customerName: e.target.value })} />
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Teléfono</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline-variant font-body-md px-6" placeholder="+51 987 654 321" type="tel" value={phone} onChange={(e) => onChange({ phone: e.target.value })} />
        </div>
        <div className="flex flex-col gap-unit md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Correo Electrónico</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline-variant font-body-md px-6" placeholder="ana@ejemplo.com" type="email" value={email} onChange={(e) => onChange({ email: e.target.value })} />
        </div>
      </div>
    </div>
  );
}
