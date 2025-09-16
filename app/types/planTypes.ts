export interface PlanTypeOption {
  value: string;
  label: string;
}

export const PLAN_TYPES: PlanTypeOption[] = [
  { value: "cadastral", label: "Cadastral" },
  { value: "topographical", label: "Topographical" },
  { value: "layout", label: "Layout" },
  { value: "route", label: "Route" },
];
