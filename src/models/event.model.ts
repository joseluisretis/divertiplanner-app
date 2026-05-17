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
