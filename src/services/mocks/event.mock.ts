import type { EventResponse, EventDetailResponse, CreateEventDto, UpdateEventDto } from "../../models/event.model";
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
              dateStr: "2023-10-24",
              location: "Av. Principal 123, Sala A",
              isFeatured: true,
              eventType: "Show Infantil",
              staffIds: ["1", "2"],
            },
            {
              id: "2",
              title: "Cumpleaños Espacial",
              status: "PENDIENTE",
              customerName: "Marta García",
              dateStr: "2023-10-28",
              location: "Calle Luna 45, Jardín",
              eventType: "Baby Shower",
              staffIds: ["3"],
            },
            {
              id: "3",
              title: "Show de Títeres",
              status: "EN PROCESO",
              customerName: "Andrés Bello",
              dateStr: "2023-10-28",
              location: "Centro Cultural Local",
              eventType: "Show Infantil",
              staffIds: ["1", "4"],
            },
            {
              id: "4",
              title: "Show de Burbujas Mágicas",
              status: "TERMINADO",
              customerName: "Colegio San José",
              dateStr: "2023-11-15",
              location: "Auditorio Principal",
              eventType: "Hora Loca",
              staffIds: [],
            }
          ]
        });
      }, 500);
    });
  }

  async getEventById(id: string): Promise<EventDetailResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          data: {
            id,
            title: "Gran Gala de Magia Estelar",
            status: "BORRADOR",
            eventType: "Cumpleaños",
            notes: "Temática espacial, globos plateados y azules.",
            eventDate: "2023-10-24",
            startTime: "18:00",
            durationHours: 4,
            location: "Av. Principal 123, Sala A",
            mapsUrl: "https://goo.gl/maps/mock",
            totalCost: 1250,
            mobilityCost: 50,
            advancePayment: 300,
            isFeatured: true,
            client: {
              id: "mock-client-1",
              name: "Familia Rodriguez",
              phone: "+51 987 654 321",
              email: "rodriguez@example.com",
            },
            staff: [
              { employeeId: "1", name: "Carlos Mendoza", role: "STAFF" },
              { employeeId: "2", name: "Elena Ramos", role: "STAFF" },
            ],
          },
        });
      }, 400);
    });
  }

  async updateEvent(id: string, data: UpdateEventDto): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("[Mock] Client update (id:", data.clientId, "):", { name: data.customerName, phone: data.phone, email: data.email });
        console.log("[Mock] Event update (id:", id, "):", {
          title: data.eventName, status: data.status, event_type: data.eventType,
          notes: data.eventDetails, event_date: data.dateStr, start_time: data.startTime,
          duration_hours: data.duration, location: data.address, maps_url: data.locationUrl,
          total_cost: data.totalCost, mobility_cost: data.transportCost, advance_payment: data.advancePayment,
        });
        console.log("[Mock] event_staff replace:", (data.staff ?? []).map((s) => ({ event_id: id, employee_id: s.employeeId })));
        resolve({ ok: true });
      }, 800);
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
