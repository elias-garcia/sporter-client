import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rating } from '../../../../shared/models/rating.model';
import { Session } from '../../../../shared/models/session.model';
import { RatingData } from '../../../rating-data';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-profile-ratings-list-item',
  templateUrl: './user-profile-ratings-list-item.component.html',
  styleUrls: ['./user-profile-ratings-list-item.component.scss']
})
export class UserProfileRatingsListItemComponent implements OnInit {

  @Input() rating: Rating;
  @Input() session: Session;

  @Output() showDeleteModal = new EventEmitter<string>();
  @Output() hideRatingsEditMode = new EventEmitter<void>();

  public starArray: boolean[];
  public isInEditMode = false;

  constructor(
    private userService: UserService
  ) { }

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

  onChangeToEditMode() {
    this.hideRatingsEditMode.emit();
    this.isInEditMode = true;
  }

  onHideEditMode() {
    this.hideRatingsEditMode.emit();
  }

  onEditRating(ratingData: RatingData) {
    this.userService.updateRating(this.session.userId, this.rating.id, ratingData).subscribe(
      (res: any) => {
        this.rating = res.data.rating;
        this.hideRatingsEditMode.emit();
      }
    );
  }

}
