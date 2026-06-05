import { useEffect, useState } from "react";
import TopAppBar from "../components/shared/TopAppBar";
import HeroSearch from "../components/bandeja/HeroSearch";
import EventGrid from "../components/bandeja/EventGrid";
import FloatingActionBtn from "../components/bandeja/FloatingActionBtn";
import FilterBottomSheet from "../components/bandeja/FilterBottomSheet";
import { useEventStore } from "../stores/eventStore";
import type { EventFilters } from "../models/event.model";

const EMPTY_FILTERS: EventFilters = { date: "", eventType: "", estados: [], personalIds: [] };

export default function BandejaScreen() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<EventFilters>(EMPTY_FILTERS);
  const { events, isLoading, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filteredEvents = events.filter((event) => {
    if (activeFilters.date && event.dateStr !== activeFilters.date) return false;
    if (activeFilters.eventType && event.eventType !== activeFilters.eventType) return false;
    if (activeFilters.estados.length > 0 && !activeFilters.estados.includes(event.status)) return false;
    if (activeFilters.personalIds.length > 0 && !activeFilters.personalIds.some((id) => event.staffIds.includes(id))) return false;
    return true;
  });

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-container selection:text-white min-h-screen">
      <TopAppBar />

      <main className="pt-24 pb-12 px-container-padding max-w-7xl mx-auto">
        <HeroSearch onOpenFilter={() => setIsFilterOpen(true)} />
        <EventGrid events={filteredEvents} isLoading={isLoading} />
      </main>

      <FloatingActionBtn />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={setActiveFilters}
      />
    </div>
  );
}
