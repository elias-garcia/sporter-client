import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RatingData } from '../../../rating-data';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-profile-ratings-new',
  templateUrl: './user-profile-ratings-new.component.html',
  styleUrls: ['./user-profile-ratings-new.component.scss']
})
export class UserProfileRatingsNewComponent implements OnInit {

  @Output() public submitRating = new EventEmitter<RatingData>();

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
      score: ['', Validators.required],
      comment: ['', Validators.required]
    });
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

  onSubmit() {
    const ratingData: RatingData = {
      score: this.score.value,
      comment: this.comment.value
    };

    this.submitRating.emit(ratingData);
  }

  get score(): AbstractControl {
    return this.ratingForm.get('score');
  }

  get comment(): AbstractControl {
    return this.ratingForm.get('comment');
  }

}
