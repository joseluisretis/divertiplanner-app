export enum CatalogCode {
  TipoEvento   = "TIPO_EVENTO",
  EstadoEvento = "ESTADO_EVENTO",
}

export type CatalogDetail = {
  id: string;
  code: string;
  name: string;
  value: string;
  sequential: number;
};

export type CatalogDetailsResponse = {
  ok: boolean;
  data: CatalogDetail[];
};
