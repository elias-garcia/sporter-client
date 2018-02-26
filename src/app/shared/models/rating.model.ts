import { User } from './user.model';

export interface Rating {
  ratingId: string;
  from: User;
  to: string;
  score: number;
  comments: [{
    version: number,
    value: string,
    date: Date
  }];
}
