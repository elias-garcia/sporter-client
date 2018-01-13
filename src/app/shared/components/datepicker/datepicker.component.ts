import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

const TAB_KEY_CODE = 9;
const ESC_KEY_CODE = 27;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() datepickerInput: HTMLElement;
  @Output() pickDate = new EventEmitter<string>();

  @ViewChild('datepickerWrapper') datepickerWrapper: ElementRef;

  /* Current picked date */
  public pickedDate: Moment = moment();

  /* Data for calculations */
  public currentDate: Moment = moment();
  private previousMonth: Moment = moment().subtract(1, 'month');
  private nextMonth: Moment = moment().add(1, 'month');

  /* Data to display in the HTML */
  public years: number[];
  public months: string[];
  public weekDays: string[];
  public currentMonthDays: number[];
  public previousMonthDays: number[];
  public nextMonthDays: number[];

  /* Data to disable the back and forward buttons */
  public isBackButtonDisabled = false;
  public isForwardButtonDisabled = false;

  /* Variable to hold the view status of the datepicker */
  public show = false;

  /* Variable to check if it's needed to send the default value */
  private wasInputClicked = false;

  constructor(
    private renderer: Renderer2
  ) {
    this.initStaticData();
  }

  ngOnInit() {
    this.changeInputPlaceholder();
    this.initInputListeners();
    this.currentMonthDays = [];
    this.previousMonthDays = [];
    this.nextMonthDays = [];
    this.fillCurrentMonthDays(this.currentDate);
    this.fillPreviousMonthDays(this.previousMonth);
    this.fillNextMonthDays(this.nextMonth);
  }

  initStaticData() {
    this.years = Array((this.currentDate.year() + 1) - ((this.currentDate.year() + 1) - 100))
      .fill(0).map((x, i) => (this.currentDate.year() + 1) - i);
    this.months = moment.months();
    this.weekDays = moment.weekdaysMin(true);
  }

  changeInputPlaceholder() {
    this.renderer.setAttribute(this.datepickerInput, 'placeholder',
      this.currentDate.format('L').replace(/[0-9]/g, '_'));
  }

  initInputListeners() {
    this.renderer.listen(this.datepickerInput, 'keydown', (event: KeyboardEvent) => {
      if (event.keyCode !== TAB_KEY_CODE) {
        event.preventDefault();
      }
    });

    this.renderer.listen(this.datepickerInput, 'mousedown', () => {
      if (document.activeElement === this.datepickerInput) {
        this.show = !this.show;
      }
    });

    this.renderer.listen(this.datepickerInput, 'focus', () => {
      this.show = true;
    });

    this.renderer.listen(this.datepickerInput, 'focusout', (event: FocusEvent) => {
      if (!this.datepickerWrapper.nativeElement.contains(event.relatedTarget)) {
        this.show = false;
      }
    });
  }

  onDatepickerWrapperBlur(event: FocusEvent) {
    if (!this.datepickerWrapper.nativeElement.contains(event.relatedTarget)) {
      this.show = false;
    }
  }

  onDatepickerWrapperKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESC_KEY_CODE) {
      this.show = false;
    }
  }

  onDatepickerSelectBlur(event: FocusEvent) {
    event.stopPropagation();
    this.datepickerWrapper.nativeElement.focus();
  }

  fillCurrentMonthDays(currentDate) {
    const lastCurrentMonthDay: number = currentDate.endOf('month').date();

    this.currentMonthDays = Array(lastCurrentMonthDay).fill(0).map((x, i) => i + 1);
  }

  fillPreviousMonthDays(previousMonth: Moment) {
    const lastPreviousMonthDay: number = previousMonth.endOf('month').date();
    const lastPreviousMonthWeekDay: number = previousMonth.endOf('month').weekday();

    if (lastPreviousMonthWeekDay !== 6) {
      for (let i = lastPreviousMonthWeekDay; i >= 0; i--) {
        this.previousMonthDays.push(lastPreviousMonthDay - i);
      }
    }
  }

  fillNextMonthDays(nextMonth: Moment) {
    let firstNextMonthDay: number = nextMonth.startOf('month').date();
    const firstNextMonthWeekDay: number = nextMonth.startOf('month').weekday();

    if (firstNextMonthWeekDay !== 0) {
      for (let i = firstNextMonthWeekDay; i <= 6; i++) {
        this.nextMonthDays.push(firstNextMonthDay);
        firstNextMonthDay++;
      }
    }
  }

  checkBackButtonDisabled() {
    const clonedCurrentDate = this.currentDate.clone();

    if (clonedCurrentDate.subtract(1, 'month').year() < this.years[this.years.length - 1]) {
      this.isBackButtonDisabled = true;
    } else {
      this.isBackButtonDisabled = false;
    }
  }

  checkForwardButtonDisabled() {
    const clonedCurrentDate = this.currentDate.clone();

    if (clonedCurrentDate.add(1, 'month').year() > this.years[0]) {
      this.isForwardButtonDisabled = true;
    } else {
      this.isForwardButtonDisabled = false;
    }
  }

  onPickMonth(month: number) {
    this.currentDate = this.currentDate.clone().month(month);
    this.previousMonth = this.currentDate.clone().subtract(1, 'month');
    this.nextMonth = this.currentDate.clone().add(1, 'month');
    this.checkBackButtonDisabled();
    this.checkForwardButtonDisabled();
    this.ngOnInit();
  }

  onPickYear(year: number) {
    this.currentDate = this.currentDate.clone().year(year);
    this.previousMonth = this.currentDate.clone().subtract(1, 'month');
    this.nextMonth = this.currentDate.clone().add(1, 'month');
    this.checkBackButtonDisabled();
    this.checkForwardButtonDisabled();
    this.ngOnInit();
  }

  onPickDay(day: number) {
    this.pickedDate = this.currentDate.clone().date(day);
    this.pickDate.emit(this.pickedDate.format('L'));
    this.show = false;
  }

  onPreviousMonth() {
    this.currentDate = this.currentDate.clone().subtract(1, 'month');
    this.previousMonth = this.currentDate.clone().subtract(1, 'month');
    this.nextMonth = this.currentDate.clone().add(1, 'month');
    this.isForwardButtonDisabled = false;
    this.checkBackButtonDisabled();
    this.ngOnInit();
  }

  onNextMonth() {
    this.currentDate = this.currentDate.clone().add(1, 'month');
    this.previousMonth = this.currentDate.clone().subtract(1, 'month');
    this.nextMonth = this.currentDate.clone().add(1, 'month');
    this.isBackButtonDisabled = false;
    this.checkForwardButtonDisabled();
    this.ngOnInit();
  }
}
