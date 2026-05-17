import { useEffect, useState } from "react";
import TopAppBar from "./components/shared/TopAppBar";
import HeroSearch from "./components/bandeja/HeroSearch";
import EventGrid from "./components/bandeja/EventGrid";
import FloatingActionBtn from "./components/bandeja/FloatingActionBtn";
import FilterBottomSheet from "./components/bandeja/FilterBottomSheet";
import { useEventStore } from "./store/eventStore";

export default function BandejaScreen() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { events, isLoading, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-container selection:text-white min-h-screen">
      <TopAppBar />

      <main className="pt-24 pb-12 px-container-padding max-w-7xl mx-auto">
        <HeroSearch onOpenFilter={() => setIsFilterOpen(true)} />
        <EventGrid events={events} isLoading={isLoading} />
      </main>

      <FloatingActionBtn />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
