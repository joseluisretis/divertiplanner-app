import { create } from "zustand";
import { catalogService } from "../services";
import { CatalogCode } from "../models/catalog.model";
import type { CatalogDetail } from "../models/catalog.model";

interface CatalogState {
  details: Partial<Record<CatalogCode, CatalogDetail[]>>;
  loading: Partial<Record<CatalogCode, boolean>>;
  fetchCatalog: (code: CatalogCode) => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  details: {},
  loading: {},

  fetchCatalog: async (code: CatalogCode) => {
    if (get().details[code]) return;

    set((state) => ({ loading: { ...state.loading, [code]: true } }));

    const { data } = await catalogService.getCatalogDetails(code);

    set((state) => ({
      details: { ...state.details, [code]: data },
      loading: { ...state.loading, [code]: false },
    }));
  },
}));
