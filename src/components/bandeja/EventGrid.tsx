import type { EventItem } from "../../models/event.model";
import EventCard from "./EventCard";

interface EventGridProps {
  events: EventItem[];
  isLoading: boolean;
}

export default function EventGrid({ events, isLoading }: EventGridProps) {
  if (isLoading) {
    return <div className="text-center p-8 text-on-surface-variant font-body-lg">Cargando eventos...</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
