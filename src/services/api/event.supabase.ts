import { supabase } from "../../lib/supabase";
import type { IEventService } from "../interfaces/IEventService";
import type { EventItem, EventResponse, CreateEventDto } from "../../models/event.model";

type EventRow = {
  id: string;
  title: string;
  status: EventItem["status"];
  clients: { name: string } | null;
  event_date: string | null;
  location: string;
  is_featured: boolean;
};

function mapRow(row: EventRow): EventItem {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    customerName: row.clients?.name ?? "",
    dateStr: row.event_date ?? "",
    location: row.location,
    isFeatured: row.is_featured,
  };
}

export class EventSupabase implements IEventService {
  async getEvents(): Promise<EventResponse> {
    const { data, error } = await supabase
      .from("events")
      .select("*, clients(name)")
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

    const { data: eventRow, error: eventError } = await supabase
      .from("events")
      .insert({
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
      })
      .select("id")
      .single();

    if (eventError) {
      console.error("Supabase createEvent (event) error:", eventError);
      return { ok: false };
    }

    if (data.staff && data.staff.length > 0) {
      const { error: staffError } = await supabase.from("event_staff").insert(
        data.staff.map((s) => ({ event_id: eventRow.id, employee_id: s.employeeId }))
      );
      if (staffError) {
        console.error("Supabase createEvent (staff) error:", staffError);
        return { ok: false };
      }
    }

    return { ok: true };
  }
}

export { mapRow };
export type { EventRow };
