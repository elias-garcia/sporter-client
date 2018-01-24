import { Sport } from './sport.model';
import { User } from './user.model';
import { EventStatus } from '../../events/event-status.enum';

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
  currencyCode: string;
  maxPlayers: number;
  status: EventStatus;
  host: User;
  players: User[];
  createdAt: string;
  updatedAt: string;
}
