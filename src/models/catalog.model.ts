export const CatalogCode = {
  TipoEvento:   "TIPO_EVENTO",
  EstadoEvento: "ESTADO_EVENTO",
} as const;

export type CatalogCode = typeof CatalogCode[keyof typeof CatalogCode];

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
