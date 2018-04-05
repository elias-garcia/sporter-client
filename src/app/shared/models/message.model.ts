import { User } from './user.model';

export interface Message {
  id: string;
  event: string;
  user: User;
  message: string;
  createdAt: string;
  updatedAt: string;
}
