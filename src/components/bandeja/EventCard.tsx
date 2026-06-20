import type { EventItem } from "../../models/event.model";
import { useNavigate } from "react-router-dom";

const statusColors: Record<string, string> = {
  BORRADOR: "bg-primary-fixed text-on-primary-fixed",
  PENDIENTE: "bg-tertiary-fixed text-on-tertiary-fixed",
  "EN PROCESO": "bg-secondary-fixed text-on-secondary-fixed",
  TERMINADO: "bg-primary-fixed text-on-primary-fixed",
};

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  const isFeatured = event.isFeatured;
  
  return (
    <article className="bg-surface-container-lowest rounded-[24px] p-stack-lg border border-outline-variant/30 shadow-[0_4px_24px_rgba(56,145,255,0.06)] relative overflow-hidden transition-all hover:translate-y-[-4px]">
      <div className="flex justify-between items-start mb-stack-md">
        <span className={`${statusColors[event.status] || "bg-primary-fixed text-on-primary-fixed"} px-3 py-1 rounded-full text-label-md font-label-md uppercase tracking-wider`}>
          {event.status}
        </span>
        <div className="bg-surface-container-high rounded-full p-2">
          <span className="material-symbols-outlined text-primary">celebration</span>
        </div>
      </div>
      <h3 className="font-headline-lg-mobile text-on-surface mb-stack-md leading-tight text-[20px] font-bold">
        {event.title}
      </h3>
      <div className="space-y-base mb-stack-lg">
        <div className="flex items-center gap-stack-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">person</span>
          <span className="text-label-md font-label-md">{event.customerName}</span>
        </div>
        <div className="flex items-center gap-stack-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          <span className="text-label-md font-label-md">{event.dateStr}</span>
        </div>
        <div className="flex items-center gap-stack-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">location_on</span>
          <span className="text-label-md font-label-md">{event.location}</span>
        </div>
      </div>
      <button
        onClick={() => navigate(`/event/${event.id}`)}
        className="w-full py-4 bg-transparent border border-primary text-primary rounded-xl text-button font-button flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:bg-primary-fixed-dim/20"
      >
        Ver detalles
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </article>
  );
}
