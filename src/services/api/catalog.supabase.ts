import { supabase } from "../../lib/supabase";
import type { ICatalogService } from "../interfaces/ICatalogService";
import type { CatalogDetail, CatalogDetailsResponse } from "../../models/catalog.model";
import { CatalogCode } from "../../models/catalog.model";

type CatalogDetailRow = {
  id: string;
  code: string;
  name: string;
  value: string;
  sequential: number;
};

export class CatalogSupabase implements ICatalogService {
  async getCatalogDetails(catalogCode: CatalogCode): Promise<CatalogDetailsResponse> {
    const { data, error } = await supabase
      .from("catalog_details")
      .select("id, code, name, value, sequential, catalogs!inner(code)")
      .eq("catalogs.code", catalogCode)
      .eq("is_active", true)
      .order("sequential");

    if (error) {
      console.error("Supabase getCatalogDetails error:", error);
      return { ok: false, data: [] };
    }

    return {
      ok: true,
      data: (data ?? []).map((row: any): CatalogDetail => ({
        id: row.id,
        code: row.code,
        name: row.name,
        value: row.value,
        sequential: row.sequential,
      })),
    };
  }
}
