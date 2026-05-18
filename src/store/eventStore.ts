import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { eventService } from "../services";
import { mapRow } from "../services/api/event.supabase";
import type { EventItem } from "../models/event.model";
import type { EventRow } from "../services/api/event.supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface EventState {
  events: EventItem[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  unsubscribe: () => void;
}

// Canal módulo-level para evitar suscripciones duplicadas
let channel: RealtimeChannel | null = null;

export const useEventStore = create<EventState>((set) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await eventService.getEvents();
      if (!response.ok) throw new Error("Error obteniendo eventos");
      set({ events: response.data, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error desconocido",
        isLoading: false,
      });
      return;
    }

    // Evita canales duplicados si fetchEvents se llama más de una vez
    if (channel) return;

    channel = supabase
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
  },

  unsubscribe: () => {
    if (channel) {
      supabase.removeChannel(channel);
      channel = null;
    }
  },
}));
