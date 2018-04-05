import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;
  @Input() show = false;

  @Output() close = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  onClose(value: boolean) {
    this.renderer.removeClass(document.body, 'modal-open');
    this.close.emit(value);
  }

}
