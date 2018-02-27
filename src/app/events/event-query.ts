import { EventStatus } from './event-status.enum';

export interface EventQuery {
  userId?: string;
  sportId?: string;
  startDate?: string;
  location?: string | [number, number];
  maxDistance?: number;
  status?: EventStatus;
  offset?: number;
}
