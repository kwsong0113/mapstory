export type Region =
  | "Cambridge"
  | "Somerville"
  | "Boston"
  | "Brookline"
  | "Medford"
  | "Watertown"
  | "Everett"
  | "Arlington"
  | "Belmont"
  | "Chelsea"
  | "Malden"
  | "Revere"
  | "Winchester"
  | "Newton"
  | "Winthrop"
  | "Melrose";

export interface HeatMap {
  region: string;
  avgScore: number;
}
