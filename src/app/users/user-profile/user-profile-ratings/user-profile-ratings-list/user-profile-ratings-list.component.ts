import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() deleteRating = new EventEmitter<string>();

  public showDeleteModal = false;
  public ratingId: string;

  constructor() { }

  ngOnInit() { }

  onShowDeleteModal(ratingId: string) {
    this.ratingId = ratingId;
    this.showDeleteModal = true;
  }

  onCloseModal(value: boolean) {
    this.showDeleteModal = false;
    if (value) {
      this.deleteRating.emit(this.ratingId);
    }
  }

}
