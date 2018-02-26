import {
  Component, OnInit, OnChanges, SimpleChanges, Input, Output,
  EventEmitter, Renderer2, ViewChild, ElementRef
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() show = false;

  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContent') modalContentRef: ElementRef;

  public canClose = false;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.show.previousValue && changes.show.currentValue) {
      this.renderer.addClass(document.body, 'modal-open');
    }

    if (changes.show.previousValue && !changes.show.currentValue) {
      this.onClose();
    }
  }

  onClose() {
    this.renderer.removeClass(document.body, 'modal-open');
    this.close.emit();
  }

}
