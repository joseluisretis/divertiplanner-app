import { supabase } from "../supabase/supabase";
import type { IEventService } from "../interfaces/IEventService";
import type { EventItem, EventResponse, EventDetail, EventDetailResponse, CreateEventDto, UpdateEventDto } from "../../models/event.model";

type EventRow = {
  id: string;
  title: string;
  status: EventItem["status"];
  clients: { name: string } | null;
  event_date: string | null;
  location: string;
  is_featured: boolean;
  event_type: string | null;
  event_staff: { employee_id: string }[];
};

type EventDetailRow = {
  id: string;
  title: string;
  status: EventItem["status"];
  event_type: string | null;
  notes: string | null;
  event_date: string | null;
  start_time: string | null;
  duration_hours: number | null;
  location: string | null;
  maps_url: string | null;
  total_cost: number | null;
  mobility_cost: number | null;
  advance_payment: number | null;
  is_featured: boolean;
  clients: { id: string; name: string; phone: string | null; email: string | null } | null;
  event_staff: { employee_id: string; employees: { id: string; name: string; role: string } | null }[];
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
    eventType: row.event_type ?? null,
    staffIds: (row.event_staff ?? []).map((s) => s.employee_id),
  };
}

function mapDetailRow(row: EventDetailRow): EventDetail {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    eventType: row.event_type,
    notes: row.notes,
    eventDate: row.event_date,
    startTime: row.start_time,
    durationHours: row.duration_hours,
    location: row.location,
    mapsUrl: row.maps_url,
    totalCost: row.total_cost,
    mobilityCost: row.mobility_cost,
    advancePayment: row.advance_payment,
    isFeatured: row.is_featured,
    client: row.clients ?? null,
    staff: (row.event_staff ?? [])
      .filter((s) => s.employees != null)
      .map((s) => ({
        employeeId: s.employee_id,
        name: s.employees!.name,
        role: s.employees!.role,
      })),
  };
}

export class EventSupabase implements IEventService {
  async getEvents(): Promise<EventResponse> {
    const { data, error } = await supabase
      .from("events")
      .select("*, clients(name), event_staff(employee_id)")
      .order("created_at", { ascending: false });

    if (error) {
      return { ok: false, data: [] };
    }

    return { ok: true, data: (data as EventRow[] ?? []).map(mapRow) };
  }

  async getEventById(id: string): Promise<EventDetailResponse> {
    const { data, error } = await supabase
      .from("events")
      .select(`
        *,
        clients(id, name, phone, email),
        event_staff(
          employee_id,
          employees(id, name, role)
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase getEventById error:", error);
      return { ok: false, data: null };
    }

    return { ok: true, data: mapDetailRow(data as EventDetailRow) };
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

  async updateEvent(id: string, data: UpdateEventDto): Promise<{ ok: boolean }> {
    const { error: clientError } = await supabase
      .from("clients")
      .update({
        name: data.customerName,
        phone: data.phone ?? null,
        email: data.email ?? null,
      })
      .eq("id", data.clientId);

    if (clientError) {
      console.error("Supabase updateEvent (client) error:", clientError);
      return { ok: false };
    }

    const { error: eventError } = await supabase
      .from("events")
      .update({
        title: data.eventName,
        status: data.status,
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
      .eq("id", id);

    if (eventError) {
      console.error("Supabase updateEvent (event) error:", eventError);
      return { ok: false };
    }

    const { error: deleteError } = await supabase
      .from("event_staff")
      .delete()
      .eq("event_id", id);

    if (deleteError) {
      console.error("Supabase updateEvent (staff delete) error:", deleteError);
      return { ok: false };
    }

    if (data.staff && data.staff.length > 0) {
      const { error: staffError } = await supabase
        .from("event_staff")
        .insert(data.staff.map((s) => ({ event_id: id, employee_id: s.employeeId })));

      if (staffError) {
        console.error("Supabase updateEvent (staff insert) error:", staffError);
        return { ok: false };
      }
    }

    return { ok: true };
  }
}

export { mapRow, mapDetailRow };
export type { EventRow, EventDetailRow };
