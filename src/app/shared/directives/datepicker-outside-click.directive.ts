import { Directive, OnInit, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDatepickerOutsideClick]'
})
export class DatepickerOutsideClickDirective {

  @Output() appDatepickerOutsideClick = new EventEmitter<any>();

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  private onClick(event: MouseEvent) {

    if (!event.target) {
      return;
    }

    if (!this.element.nativeElement.contains(event.target)) {
      this.appDatepickerOutsideClick.emit();
    }
  }

  private onDatepickerInputBlur() {

  }

}
