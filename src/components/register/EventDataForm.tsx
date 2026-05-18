export default function EventDataForm() {
  return (
    <div className="bg-surface-container-lowest p-container-padding rounded-lg border border-primary-fixed-dim ambient-shadow-primary">
      <div className="flex items-center gap-stack-sm mb-stack-md">
        <span className="material-symbols-outlined text-secondary">auto_awesome</span>
        <h3 className="font-h3 text-h3 text-on-background">Datos del Evento</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Tipo de evento</label>
          <select className="bg-surface-container border-none rounded-DEFAULT px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md text-on-surface-variant">
            <option>Fiesta Infantil</option>
            <option>Graduación</option>
            <option>Cumpleaños</option>
            <option>Evento Corporativo</option>
          </select>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Nombre del Evento</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="Ej. El 5to Cumple de Mateo" type="text"/>
        </div>
        <div className="flex flex-col gap-unit md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Detalles del Evento</label>
          <textarea className="w-full bg-surface-container border-none rounded-DEFAULT px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md placeholder:text-outline-variant px-6" placeholder="Información adicional sobre la temática o requerimientos..." rows={2}></textarea>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Fecha</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" type="date"/>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Hora de inicio</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" type="time"/>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Duración (horas)</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="4" type="number"/>
        </div>
        <div className="flex flex-col gap-unit">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Dirección</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="Av. Principal 123, Miraflores" type="text"/>
        </div>
        <div className="flex flex-col gap-unit md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant px-1">Ubicación (Link de Google Maps)</label>
          <input className="bg-surface-container border-none rounded-DEFAULT py-3 focus:ring-2 focus:ring-primary-container transition-all font-body-md px-6" placeholder="https://goo.gl/maps/..." type="url"/>
        </div>
      </div>
    </div>
  );
}
