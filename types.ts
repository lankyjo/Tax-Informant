
export type Role = 'user' | 'model';

export interface Message {
  role: Role;
  text: string;
  timestamp: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TaxResponse {
  text: string;
  sources?: GroundingSource[];
}
