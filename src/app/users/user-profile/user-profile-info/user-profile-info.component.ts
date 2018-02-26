import { Component, OnChanges, Input, SimpleChanges, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Rating } from '../../../shared/models/rating.model';
import { SecurityService } from '../../../core/services/security.service';
import { Session } from '../../../shared/models/session.model';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.scss']
})
export class UserProfileInfoComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() ratings: Rating[];

  public session: Session;
  public avgRating = 0;
  public avgRatingArray = [undefined, undefined, undefined, undefined, undefined];
  public showEditUserInfoModal = false;

  constructor(
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    this.getSession();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ratings.currentValue) {
      this.calculateAvgRating();
    }
  }

  getSession() {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
      }
    );
  }

  calculateAvgRating() {
    if (this.ratings && this.ratings.length) {
      const allRatings = this.ratings
        .map((rating: Rating) => rating.score)
        .reduce((prev, next) => {
          return prev + next;
        });

      this.avgRating = allRatings / this.ratings.length;
    }
  }

}
