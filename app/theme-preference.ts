export const THEME_STORAGE_KEY = "dentista-theme";

export const themeOptions = [
  { id: "main", label: "Principal" },
  { id: "rose", label: "Rosa" },
  { id: "mono", label: "Preto e branco" },
] as const;

export type Theme = (typeof themeOptions)[number]["id"];

export function isTheme(value: string | null): value is Theme {
  return themeOptions.some((theme) => theme.id === value);
}

type ThemeRoot = Pick<HTMLElement, "dataset">;
type ThemeStorage = Pick<Storage, "getItem" | "setItem">;

export function restoreThemePreference(root: ThemeRoot, storage: ThemeStorage): Theme {
  try {
    const savedTheme = storage.getItem(THEME_STORAGE_KEY);
    if (isTheme(savedTheme)) {
      if (savedTheme === "main") delete root.dataset.theme;
      else root.dataset.theme = savedTheme;
      return savedTheme;
    }
  } catch {
    // Keep the default theme if browser storage is unavailable.
  }
  delete root.dataset.theme;
  return "main";
}

export function saveThemePreference(theme: Theme, root: ThemeRoot, storage: ThemeStorage) {
  if (theme === "main") delete root.dataset.theme;
  else root.dataset.theme = theme;
  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selected theme still applies for this page if storage is unavailable.
  }
}
