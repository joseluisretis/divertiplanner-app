import type { EventResponse, CreateEventDto } from "../../models/event.model";
import type { IEventService } from "../interfaces/IEventService";

export class EventMock implements IEventService {
  async getEvents(): Promise<EventResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          data: [
            {
              id: "1",
              title: "Gran Gala de Magia Estelar",
              status: "BORRADOR",
              customerName: "Familia Rodriguez",
              dateStr: "24 de Octubre, 2023 • 18:00 - 4h",
              location: "Av. Principal 123, Sala A",
              isFeatured: true
            },
            {
              id: "2",
              title: "Cumpleaños Espacial",
              status: "PENDIENTE",
              customerName: "Marta García",
              dateStr: "Hoy, 18:00 • 3h",
              location: "Calle Luna 45, Jardín",
            },
            {
              id: "3",
              title: "Show de Títeres",
              status: "EN PROCESO",
              customerName: "Andrés Bello",
              dateStr: "28 Oct, 10:00 • 2h",
              location: "Centro Cultural Local",
            },
            {
              id: "4",
              title: "Show de Burbujas Mágicas",
              status: "TERMINADO",
              customerName: "Colegio San José",
              dateStr: "15 Nov, 09:00 • 2h",
              location: "Auditorio Principal",
            }
          ]
        });
      }, 500);
    });
  }

  async createEvent(data: CreateEventDto): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const clientData = {
          name: data.customerName,
          phone: data.phone ?? null,
          email: data.email ?? null,
        };
        const eventData = {
          title: data.eventName,
          status: data.status ?? "PENDIENTE",
          client_id: "mock-client-uuid",
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
        };
        const staffData = (data.staff ?? []).map((s) => ({
          event_id: "mock-event-uuid",
          employee_id: s.employeeId,
        }));
        console.log("[Mock] Client insert:", clientData);
        console.log("[Mock] Event insert:", eventData);
        console.log("[Mock] event_staff insert:", staffData);
        resolve({ ok: true });
      }, 800);
    });
  }
}
