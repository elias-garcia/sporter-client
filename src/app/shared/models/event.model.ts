import { Sport } from './sport.model';
import { User } from './user.model';

export interface EventResponse {
  id: string;
  name: string;
  location: [number, number];
  startDate: string;
  endingDate: string;
  description: string;
  sport: Sport;
  intensity: string;
  fee: number;
  maxPlayers: number;
  status: string;
  host: User;
  players: User[];
  createdAt: string;
  updatedAt: string;
}
