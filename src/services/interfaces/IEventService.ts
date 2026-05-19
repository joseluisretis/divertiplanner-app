import type { EventResponse, EventDetailResponse, CreateEventDto, UpdateEventDto } from "../../models/event.model";

export interface IEventService {
  getEvents(): Promise<EventResponse>;
  getEventById(id: string): Promise<EventDetailResponse>;
  createEvent(data: CreateEventDto): Promise<{ ok: boolean }>;
  updateEvent(id: string, data: UpdateEventDto): Promise<{ ok: boolean }>;
}
