import type { PropertyCategory } from "@/lib/properties";

export const CATEGORY_FILTER_EVENT = "tessera:filter-category";

export function emitCategoryFilter(category: PropertyCategory | "todos") {
  window.dispatchEvent(
    new CustomEvent<PropertyCategory | "todos">(CATEGORY_FILTER_EVENT, {
      detail: category,
    }),
  );
}
