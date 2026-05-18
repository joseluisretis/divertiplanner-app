export interface EventItem {
  id: string;
  title: string;
  status: 'BORRADOR' | 'PENDIENTE' | 'EN PROCESO' | 'TERMINADO';
  customerName: string;
  dateStr: string; // Ejemplo: '24 de Octubre, 2023 • 18:00 - 4h'
  location: string;
  isFeatured?: boolean;
}

export interface EventResponse {
  ok: boolean;
  data: EventItem[];
}

export interface CreateEventDto {
  customerName?: string;
  phone?: string;
  email?: string;
  eventType?: string;
  eventName?: string;
  eventDetails?: string;
  dateStr?: string;
  startTime?: string;
  duration?: number;
  address?: string;
  locationUrl?: string;
  totalCost?: number;
  transportCost?: number;
  advancePayment?: number;
  status?: EventItem["status"];
}
