import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RatingData } from '../../../rating-data';
import { UserService } from '../../../../core/services/user.service';
import { Rating } from '../../../../shared/models/rating.model';

@Component({
  selector: 'app-user-profile-ratings-new',
  templateUrl: './user-profile-ratings-new.component.html',
  styleUrls: ['./user-profile-ratings-new.component.scss']
})
export class UserProfileRatingsNewComponent implements OnInit {

  @Input() public rating: Rating;
  @Output() public submitRating = new EventEmitter<RatingData>();
  @Output() public hideEditMode = new EventEmitter<void>();

  public ratingForm: FormGroup;
  public ratingStars = [
    { value: 1, hover: false },
    { value: 2, hover: false },
    { value: 3, hover: false },
    { value: 4, hover: false },
    { value: 5, hover: false },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ratingForm = this.fb.group({
      score: [this.rating ? this.rating.score : '', Validators.required],
      comment: [this.rating ? this.rating.comment[this.rating.comment.length - 1].value : '', Validators.required]
    });
    if (this.rating) {
      this.changeStars(this.rating.score);
    }
  }

  changeStars(index: number) {
    this.ratingStars.map(ratingStar => {
      if (ratingStar.value <= index) {
        ratingStar.hover = true;
      } else {
        ratingStar.hover = false;
      }
    });
  }

  resetStars() {
    this.ratingStars.map(ratingStar => {
      ratingStar.hover = false;
    });
  }

  resetPreviousStarsState(index: number) {
    this.ratingStars.map(ratingStar => {
      if (ratingStar.value <= index) {
        ratingStar.hover = true;
      } else {
        ratingStar.hover = false;
      }
    });
  }

  onStarGroupMouseLeave() {
    if (this.score.invalid) {
      this.resetStars();
    } else {
      this.resetPreviousStarsState(this.score.value);
    }
  }

  onStarMouseOver(index: number) {
    this.changeStars(index);
  }

  onPickRating(value: number) {
    this.changeStars(value);
    this.score.patchValue(value);
  }

  onNewRating() {
    const ratingData: RatingData = {
      score: this.score.value,
      comment: this.comment.value
    };

    this.submitRating.emit(ratingData);
    this.ratingForm.reset();
  }

  onEditRating() {
    const ratingData: RatingData = {
      score: this.score.value,
      comment: this.comment.value
    };

    this.submitRating.emit(ratingData);
  }

  onHideEditMode() {
    this.hideEditMode.emit();
  }

  get score(): AbstractControl {
    return this.ratingForm.get('score');
  }

  get comment(): AbstractControl {
    return this.ratingForm.get('comment');
  }

}
