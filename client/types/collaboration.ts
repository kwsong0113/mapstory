export type CollaborationStatus = "idle" | "requested" | "meeting";

export interface contribution {
  by: string;
  item: string;
}

export interface Collaboration {
  waitingFor: string[];
  contributions: contribution[];
  _id: string;
}
