export interface EventRequest {
  name: string;
  location: [number, number];
  startDate: string;
  endingDate: string;
  description: string;
  sport: number;
  intensity: string;
  fee: number;
  maxPlayers: number;
}

export interface EventResponse {
  name: string;
  location: string;
  startDate: string;
  startTime: string;
  endingDate: string;
  description: string;
  sport: number;
  intensity: string;
  fee: number;
  maxPlayers: number;
  createdAt: string;
  updatedAt: string;
}
