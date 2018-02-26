import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  @Output() appOutsideClick = new EventEmitter();

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  private onClick(event: MouseEvent) {
    if (this.element.nativeElement.offsetParent === null) {
      return;
    }

    if (!this.element.nativeElement.contains(event.target)) {
      this.appOutsideClick.emit();
    }
  }

}
