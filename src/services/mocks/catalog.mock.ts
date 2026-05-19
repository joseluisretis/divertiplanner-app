import type { ICatalogService } from "../interfaces/ICatalogService";
import type { CatalogDetail, CatalogDetailsResponse } from "../../models/catalog.model";
import { CatalogCode } from "../../models/catalog.model";

const MOCK_DATA: Record<CatalogCode, CatalogDetail[]> = {
  TIPO_EVENTO: [
    { id: "1", code: "SHOW_INFANTIL",     name: "Show Infantil",        value: "Show Infantil",        sequential: 1 },
    { id: "2", code: "SHOW_ADOLESCENTE",  name: "Show Adolescente",     value: "Show Adolescente",     sequential: 2 },
    { id: "3", code: "BABY_SHOWER",       name: "Baby Shower",          value: "Baby Shower",          sequential: 3 },
    { id: "4", code: "REVELACION_GENERO", name: "Revelación de Género", value: "Revelación de Género", sequential: 4 },
    { id: "5", code: "DESPEDIDA",         name: "Despedida de Soltero", value: "Despedida de Soltero", sequential: 5 },
    { id: "6", code: "HORA_LOCA",         name: "Hora Loca",            value: "Hora Loca",            sequential: 6 },
    { id: "7", code: "SHOW_ADULTO",       name: "Show Adulto",          value: "Show Adulto",          sequential: 7 },
  ],
  ESTADO_EVENTO: [
    { id: "8",  code: "BORRADOR",   name: "Borrador",   value: "BORRADOR",    sequential: 1 },
    { id: "9",  code: "PENDIENTE",  name: "Pendiente",  value: "PENDIENTE",   sequential: 2 },
    { id: "10", code: "EN_PROCESO", name: "En Proceso", value: "EN PROCESO",  sequential: 3 },
    { id: "11", code: "TERMINADO",  name: "Terminado",  value: "TERMINADO",   sequential: 4 },
  ],
};

export class CatalogMock implements ICatalogService {
  async getCatalogDetails(catalogCode: CatalogCode): Promise<CatalogDetailsResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = MOCK_DATA[catalogCode] ?? [];
        resolve({ ok: true, data });
      }, 200);
    });
  }
}
