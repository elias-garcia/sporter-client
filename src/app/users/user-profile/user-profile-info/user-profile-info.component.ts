import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.scss']
})
export class UserProfileInfoComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() { }

}
