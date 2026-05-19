import type { EventResponse, EventDetailResponse, CreateEventDto } from "../../models/event.model";

export interface IEventService {
  getEvents(): Promise<EventResponse>;
  getEventById(id: string): Promise<EventDetailResponse>;
  createEvent(data: CreateEventDto): Promise<{ ok: boolean }>;
}
