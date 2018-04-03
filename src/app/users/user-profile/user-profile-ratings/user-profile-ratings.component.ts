import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Session } from '../../../shared/models/session.model';
import { RatingData } from '../../rating-data';
import { UserService } from '../../../core/services/user.service';
import { Rating, RatingStats } from '../../../shared/models/rating.model';
import { SecurityService } from '../../../core/services/security.service';
import { AlertService } from '../../../core/services/alert.service';
import { AlertType } from '../../../core/components/alert/alert.enum';

const RATING_CREATED_MESSAGE = 'La valoración ha sido creada con éxito!';

@Component({
  selector: 'app-user-profile-ratings',
  templateUrl: './user-profile-ratings.component.html',
  styleUrls: ['./user-profile-ratings.component.scss']
})
export class UserProfileRatingsComponent implements OnInit {

  public userId: string;
  public session: Session;
  public ratings: Rating[];
  public ratingStats: RatingStats;
  public isSendingRequest = false;
  public page = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (params: Params) => {
        this.userId = params.id;
        this.getRatings();
      }
    );
    this.getSession();
  }

  getSession() {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
      }
    );
  }

  getRatings() {
    this.page += 1;

    if (this.page > 1) {
      this.isSendingRequest = true;
    }

    this.userService.getUserRatings(this.userId, this.page).subscribe(
      (res: any) => {
        if (this.page > 1) {
          this.ratings = [...this.ratings, ...res.data.ratings];
          this.isSendingRequest = false;
        } else {
          this.ratings = res.data.ratings;
          this.ratingStats = res.data.stats;
        }
      }
    );
  }

  onSubmitRating(ratingData: RatingData) {
    this.createRating(ratingData);
  }

  createRating(ratingData: RatingData) {
    this.userService.createRating(this.userId, ratingData).subscribe(
      (res: any) => {
        this.alertService.createAlert({ message: RATING_CREATED_MESSAGE, type: AlertType.Success });
        this.getRatings();
      }
    );
  }

  onScroll() {
    console.log('scrolled');
    this.getRatings();
  }

}
