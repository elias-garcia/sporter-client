import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rating } from '../../../../shared/models/rating.model';
import { Session } from '../../../../shared/models/session.model';

@Component({
  selector: 'app-user-profile-ratings-list-item',
  templateUrl: './user-profile-ratings-list-item.component.html',
  styleUrls: ['./user-profile-ratings-list-item.component.scss']
})
export class UserProfileRatingsListItemComponent implements OnInit {

  @Input() rating: Rating;
  @Input() session: Session;

  @Output() showDeleteModal = new EventEmitter<string>();

  public starArray: boolean[];

  constructor() { }

  ngOnInit() {
    this.starArray = Array(5).fill(false);
    this.calculateStarArray();
  }

  calculateStarArray() {
    for (let i = 0; i < this.rating.score; i++) {
      this.starArray[i] = true;
    }
  }

  onShowDeleteModal(ratingId: string) {
    this.showDeleteModal.emit(ratingId);
  }

}
