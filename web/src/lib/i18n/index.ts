export * from "./types";
export * from "./locales";
export * from "./context";

// Backward-compatible alias for existing imports
import { dictionaries } from "./locales";
export const translations = dictionaries;
