import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { User } from '../../shared/models/user.model';
import { Rating } from '../../shared/models/rating.model';

const NOT_VALID_ID_MESSAGE = 'El usuario no existe en nuestro sistema';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userId: string;
  public user: User;
  public ratings: Rating[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.id;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    forkJoin([
      this.userService.getUserDetails(this.userId),
      this.userService.getUserRatings(this.userId)]
    ).subscribe(
      ([userResponse, ratingsResponse]: [any, any]) => {
        this.user = userResponse.data.user;
        this.ratings = ratingsResponse.data.ratings;
      },
      (error: any) => {
        this.alertService.createAlert({ message: NOT_VALID_ID_MESSAGE, type: AlertType.Danger });
        this.location.back();
      });
  }

}