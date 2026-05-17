import type { EventResponse } from "../../models/event.model";
import type { IEventService } from "../interfaces/IEventService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export class EventApi implements IEventService {
  async getEvents(): Promise<EventResponse> {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Aquí iría el token de autenticación en un escenario real
      },
    });
    
    return response.json();
  }
}
