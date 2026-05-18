import { supabase } from "../../lib/supabase";
import type { IEventService } from "../interfaces/IEventService";
import type { EventItem, EventResponse } from "../../models/event.model";

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

    return { ok: true, data: (data as EventRow[]).map(mapRow) };
  }
}

export { mapRow };
export type { EventRow };
