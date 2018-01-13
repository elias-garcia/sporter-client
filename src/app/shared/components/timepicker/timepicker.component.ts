import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Time } from './time.model';
import { PaddingZeroPipe } from '../../pipes/padding-zero.pipe';

const TAB_KEY_CODE = 9;
const ESC_KEY_CODE = 27;

const INITIAL_VALUE = 0;
const MAX_HOURS = 23;
const MAX_MINUTES = 60;
const HOURS_INCREMENT = 1;
const MINUTES_INCREMENT = 15;

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  @Input() timepickerInput: HTMLInputElement;
  @Output() pickTime: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('timepickerWrapper') timepickerWrapper: ElementRef;

  public show = false;
  public time: Time = { hours: 12, minutes: 0 };

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.checkIfNeeded();
  }

  checkIfNeeded() {
    if (this.timepickerInput.type === 'text') {
      this.addTimepickerinputListeners();
      this.emitFirstValue();
    }
  }

  emitFirstValue() {
    this.pickTime.emit(this.convertTimeToString());
  }

  setInputDefaultValue() {
    this.timepickerInput.value = '__:__';
  }

  addTimepickerinputListeners() {
    this.renderer.listen(this.timepickerInput, 'keydown', (event: KeyboardEvent) => {
      if (event.keyCode !== TAB_KEY_CODE) {
        event.preventDefault();
      }
    });

    this.renderer.listen(this.timepickerInput, ('focusin'), () => {
      this.show = true;
    });

    this.renderer.listen(this.timepickerInput, ('mousedown'), () => {
      if (document.activeElement === this.timepickerInput) {
        this.show = !this.show;
      }
    });

    this.renderer.listen(this.timepickerInput, ('focusout'), (event: FocusEvent) => {
      if (!this.timepickerWrapper.nativeElement.contains(event.relatedTarget)) {
        this.show = false;
      }
    });
  }

  onTimepickerWrapperBlur(event: FocusEvent) {
    if (!this.timepickerWrapper.nativeElement.contains(event.relatedTarget)) {
      this.show = false;
    }
  }

  onTimepickerkerWrapperKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESC_KEY_CODE) {
      this.show = false;
    }
  }

  convertTimeToString(): string {
    const paddingZeroPipe = new PaddingZeroPipe();
    const hours = paddingZeroPipe.transform(this.time.hours);
    const minutes = paddingZeroPipe.transform(this.time.minutes);

    return (`${hours}:${minutes}`);
  }

  onAddHour() {
    if (this.time.hours + HOURS_INCREMENT > MAX_HOURS) {
      this.time.hours = INITIAL_VALUE;
    } else {
      this.time.hours += HOURS_INCREMENT;
    }
    this.pickTime.emit(this.convertTimeToString());
  }

  onSubstractHour() {
    if (this.time.hours - HOURS_INCREMENT < INITIAL_VALUE) {
      this.time.hours = MAX_HOURS;
    } else {
      this.time.hours -= HOURS_INCREMENT;
    }
    this.pickTime.emit(this.convertTimeToString());
  }

  onAddMinutes() {
    if (this.time.minutes + MINUTES_INCREMENT >= MAX_MINUTES) {
      this.time.minutes = INITIAL_VALUE;
    } else {
      this.time.minutes += MINUTES_INCREMENT;
    }
    this.pickTime.emit(this.convertTimeToString());
  }

  onSubstractMinutes() {
    if (this.time.minutes - MINUTES_INCREMENT < INITIAL_VALUE) {
      this.time.minutes = MAX_MINUTES - MINUTES_INCREMENT;
    } else {
      this.time.minutes -= MINUTES_INCREMENT;
    }
    this.pickTime.emit(this.convertTimeToString());
  }

}
