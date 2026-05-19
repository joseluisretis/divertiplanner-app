import type { CatalogDetailsResponse } from "../../models/catalog.model";
import { CatalogCode } from "../../models/catalog.model";

export interface ICatalogService {
  getCatalogDetails(catalogCode: CatalogCode): Promise<CatalogDetailsResponse>;
}
