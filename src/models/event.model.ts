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

export interface EventDetailClient {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
}

export interface EventDetailStaff {
  employeeId: string;
  name: string;
  role: string;
}

export interface EventDetail {
  id: string;
  title: string;
  status: EventItem["status"];
  eventType: string | null;
  notes: string | null;
  eventDate: string | null;
  startTime: string | null;
  durationHours: number | null;
  location: string | null;
  mapsUrl: string | null;
  totalCost: number | null;
  mobilityCost: number | null;
  advancePayment: number | null;
  isFeatured: boolean;
  client: EventDetailClient | null;
  staff: EventDetailStaff[];
}

export interface EventDetailResponse {
  ok: boolean;
  data: EventDetail | null;
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
  staff?: { employeeId: string }[];
}

export interface UpdateEventDto extends CreateEventDto {
  clientId: string;
}
