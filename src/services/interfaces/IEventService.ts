import type { EventResponse, CreateEventDto } from "../../models/event.model";

export interface IEventService {
  getEvents(): Promise<EventResponse>;
  createEvent(data: CreateEventDto): Promise<{ ok: boolean }>;
}
