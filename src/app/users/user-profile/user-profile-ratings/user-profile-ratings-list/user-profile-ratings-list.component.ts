import { Component, OnInit, Input } from '@angular/core';
import { Rating } from '../../../../shared/models/rating.model';
import { Session } from '../../../../shared/models/session.model';

@Component({
  selector: 'app-user-profile-ratings-list',
  templateUrl: './user-profile-ratings-list.component.html',
  styleUrls: ['./user-profile-ratings-list.component.scss']
})
export class UserProfileRatingsListComponent implements OnInit {

  @Input() ratings: Rating[];
  @Input() session: Session;

  constructor() { }

  ngOnInit() { }

}
