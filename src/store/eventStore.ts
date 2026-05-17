import { create } from "zustand";
import { eventService } from "../services";
import type { EventItem } from "../models/event.model";

interface EventState {
  events: EventItem[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await eventService.getEvents();
      if (!response.ok) {
        throw new Error("Error obteniendo eventos");
      }
      set({ events: response.data, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error desconocido",
        isLoading: false,
      });
    }
  },
}));
