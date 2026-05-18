interface EventDataFormProps {
  eventType: string;
  eventName: string;
  eventDetails: string;
  dateStr: string;
  startTime: string;
  duration: string;
  address: string;
  locationUrl: string;
  onChange: (fields: Partial<Pick<EventDataFormProps, "eventType" | "eventName" | "eventDetails" | "dateStr" | "startTime" | "duration" | "address" | "locationUrl">>) => void;
}

export default function EventDataForm({ eventType, eventName, eventDetails, dateStr, startTime, duration, address, locationUrl, onChange }: EventDataFormProps) {
  return (
    <div className="bg-surface-container-lowest p-container-padding rounded-lg border border-primary-fixed-dim ambient-shadow-primary">
      <div className="flex items-center gap-stack-sm mb-stack-md">
        <span className="material-symbols-outlined text-secondary">auto_awesome</span>
        <h3 className="font-h3 text-h3 text-on-background">Datos del Evento</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Tipo de evento</label>
          <select className="bg-surface-container border-none rounded-DEFAULT px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md text-on-surface-variant" value={eventType} onChange={(e) => onChange({ eventType: e.target.value })}>
            <option value="">Seleccionar...</option>
            <option value="Fiesta Infantil">Fiesta Infantil</option>
            <option value="Graduación">Graduación</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Evento Corporativo">Evento Corporativo</option>
          </select>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Nombre del Evento</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="Ej. El 5to Cumple de Mateo" type="text" value={eventName} onChange={(e) => onChange({ eventName: e.target.value })} />
        </div>
        <div className="flex flex-col gap-unit md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Detalles del Evento</label>
          <textarea className="w-full bg-surface-container border-none rounded-DEFAULT px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md placeholder:text-outline-variant px-6" placeholder="Información adicional sobre la temática o requerimientos..." rows={2} value={eventDetails} onChange={(e) => onChange({ eventDetails: e.target.value })}></textarea>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Fecha</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" type="date" value={dateStr} onChange={(e) => onChange({ dateStr: e.target.value })} />
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Hora de inicio</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" type="time" value={startTime} onChange={(e) => onChange({ startTime: e.target.value })} />
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Duración (horas)</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="4" type="number" value={duration} onChange={(e) => onChange({ duration: e.target.value })} />
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Dirección</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="Av. Principal 123, Miraflores" type="text" value={address} onChange={(e) => onChange({ address: e.target.value })} />
        </div>
        <div className="flex flex-col gap-unit md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Ubicación (Link de Google Maps)</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="https://goo.gl/maps/..." type="url" value={locationUrl} onChange={(e) => onChange({ locationUrl: e.target.value })} />
        </div>
      </div>
    </div>
  );
}
