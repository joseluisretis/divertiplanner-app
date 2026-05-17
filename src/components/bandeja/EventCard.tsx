import type { EventItem } from "../../models/event.model";

const statusColors: Record<string, string> = {
  BORRADOR: "bg-slate-200 text-slate-700",
  PENDIENTE: "bg-amber-100 text-amber-800",
  "EN PROCESO": "bg-cyan-100 text-cyan-800",
  TERMINADO: "bg-green-100 text-green-800",
};

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const isFeatured = event.isFeatured;
  
  return (
    <div className={`${isFeatured ? "lg:col-span-2 " : ""}group relative overflow-hidden rounded-lg bg-surface-container-lowest border border-primary-fixed-dim ambient-shadow-purple bouncy-hover transition-all duration-300`}>
      <div className="p-container-padding flex-1 flex flex-col justify-between h-full">
        <span className={`${statusColors[event.status] || "bg-slate-200 text-slate-700"} px-3 py-1 rounded-full font-label-sm shadow-sm self-start mb-2`}>
          {event.status}
        </span>
        <div className="flex justify-between items-center mb-stack-sm">
          <h3 className="font-h3 text-h3 text-on-background">{event.title}</h3>
        </div>
        <div className="space-y-stack-sm mb-stack-md flex-1">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="font-label-md">{event.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            <span className="font-label-md">{event.dateStr}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            <span className="font-label-md">{event.location}</span>
          </div>
        </div>
        <div className="flex gap-stack-sm mt-auto">
          <button className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-full font-label-md bouncy-press shadow-lg shadow-primary/20">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}
