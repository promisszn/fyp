export interface PlanTypeOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const PLAN_TYPES: PlanTypeOption[] = [
  { value: "cadastral", label: "Cadastral" },
  { value: "route", label: "Route" },
  { value: "topographic", label: "Topographic (coming soon)", disabled: true },
  { value: "layout", label: "Layout (coming soon)", disabled: true },
];
