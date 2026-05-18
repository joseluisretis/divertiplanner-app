import { supabase } from "../../lib/supabase";
import type { IEventService } from "../interfaces/IEventService";
import type { EventItem, EventResponse, CreateEventDto } from "../../models/event.model";

type EventRow = {
  id: string;
  title: string;
  status: EventItem["status"];
  customer_name: string;
  date_str: string;
  location: string;
  is_featured: boolean;
};

function mapRow(row: EventRow): EventItem {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    customerName: row.customer_name,
    dateStr: row.date_str,
    location: row.location,
    isFeatured: row.is_featured,
  };
}

export class EventSupabase implements IEventService {
  async getEvents(): Promise<EventResponse> {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { ok: false, data: [] };
    }

    return { ok: true, data: (data as EventRow[] ?? []).map(mapRow) };
  }

  async createEvent(data: CreateEventDto): Promise<{ ok: boolean }> {
    const { data: clientRow, error: clientError } = await supabase
      .from("clients")
      .insert({
        name: data.customerName,
        phone: data.phone ?? null,
        email: data.email ?? null,
      })
      .select("id")
      .single();

    if (clientError) {
      console.error("Supabase createEvent (client) error:", clientError);
      return { ok: false };
    }

    const { error: eventError } = await supabase.from("events").insert({
      title: data.eventName,
      status: data.status ?? "PENDIENTE",
      client_id: clientRow.id,
      event_type: data.eventType,
      notes: data.eventDetails,
      event_date: data.dateStr || null,
      start_time: data.startTime || null,
      duration_hours: data.duration ?? null,
      location: data.address,
      maps_url: data.locationUrl,
      total_cost: data.totalCost,
      mobility_cost: data.transportCost,
      advance_payment: data.advancePayment,
    });

    if (eventError) {
      console.error("Supabase createEvent (event) error:", eventError);
      return { ok: false };
    }

    return { ok: true };
  }
}

export { mapRow };
export type { EventRow };
