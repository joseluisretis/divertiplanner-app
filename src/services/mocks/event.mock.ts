import type { EventResponse } from "../../models/event.model";
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
}
