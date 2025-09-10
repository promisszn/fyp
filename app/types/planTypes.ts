export interface PlanTypeOption {
  value: string;
  label: string;
}

export const PLAN_TYPES: PlanTypeOption[] = [
  { value: 'cadastral', label: 'Cadastral' },
  { value: 'topographical', label: 'Topographical' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'route', label: 'Route' }
];
