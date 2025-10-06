export interface PlanTypeOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const PLAN_TYPES: PlanTypeOption[] = [
  { value: "cadastral", label: "Cadastral" },
  { value: "topographic", label: "Topographic" },
  { value: "layout", label: "Layout" },
  { value: "route", label: "Route" },
];
