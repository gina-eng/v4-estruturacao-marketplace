// Tipos compartilhados pelos slides do manual

export type SlideMeta = {
  id: string;
  block: 0 | 1 | 2 | 3 | 4 | 5;
  blockLabel: string;
  topic: string;
  bg?: "cream" | "purple" | "white" | "beige";
};

export type Slide = {
  meta: SlideMeta;
  render: () => React.ReactNode;
};

// Cores oficiais (de manual-data.json)
export const BRAND = {
  purpleDeep: "#4B1C7D",
  purpleShadow: "#2E0F55",
  turquoise: "#00B8BD",
  beige: "#F6EAD8",
  cream: "#FBF4E4",
  white: "#FFFFFF",
  graphite: "#2E2E33",
  magenta: "#A8358C",
  success: "#10B981",
  error: "#DC2626",
  warning: "#F59E0B",
} as const;
