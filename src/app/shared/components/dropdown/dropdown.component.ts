import { Component, OnInit, Input } from '@angular/core';
import { DropdownType } from './dropdown-type.enum';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() type: DropdownType;
  @Input() text: string;

  public show = false;

  constructor() { }

  ngOnInit() {
  }

  onOutsideClick() {
    this.show = false;
  }

  onButtonClick() {
    this.show = !this.show;
  }

}
