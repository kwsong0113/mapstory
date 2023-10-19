export type CollaborationStatus = "idle" | "requested" | "meeting";

export interface Contribution {
  by: string;
  item: string;
}

export interface Collaboration {
  waitingFor: string[];
  contributions: Contribution[];
  _id: string;
}
