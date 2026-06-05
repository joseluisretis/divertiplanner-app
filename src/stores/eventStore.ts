import { create } from "zustand";
import { supabase } from "../services/supabase/supabase";
import { eventService } from "../services";
import { mapRow } from "../services/api/event.supabase";
import type { EventItem } from "../models/event.model";
import type { EventRow } from "../services/api/event.supabase";

interface EventState {
  events: EventItem[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  unsubscribe: () => void;
}

export const useEventStore = create<EventState>((set) => {
  const channel = supabase
    .channel("events-realtime")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "events" },
      ({ new: row }) => {
        set((state) => ({
          events: [mapRow(row as EventRow), ...state.events],
        }));
      }
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "events" },
      ({ new: row }) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === (row as EventRow).id ? mapRow(row as EventRow) : e
          ),
        }));
      }
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "events" },
      ({ old: row }) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== (row as { id: string }).id),
        }));
      }
    )
    .subscribe();

  return {
    events: [],
    isLoading: false,
    error: null,

    fetchEvents: async () => {
      set({ isLoading: true, error: null });
      const response = await eventService.getEvents();
      if (!response.ok) {
        set({ error: "Error obteniendo eventos", isLoading: false });
        return;
      }
      set({ events: response.data, isLoading: false });
    },

    unsubscribe: () => {
      supabase.removeChannel(channel);
    },
  };
});
