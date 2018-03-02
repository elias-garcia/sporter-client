import { User } from './user.model';

export interface Rating {
  ratingId: string;
  from: User;
  to: string;
  score: number;
  comment: [{
    version: number,
    value: string,
    date: Date
  }];
}

export interface RatingStats {
  totalCount: number;
  averageRating: number;
  scoresCount: [{
    score: number,
    count: number,
  }];
}
