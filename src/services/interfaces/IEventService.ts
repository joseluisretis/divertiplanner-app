import type { EventResponse } from "../../models/event.model";

export interface IEventService {
  getEvents(): Promise<EventResponse>;
}
