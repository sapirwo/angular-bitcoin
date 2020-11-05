import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertModalComponent {

  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  public visible: boolean = true;

  toggle(ev) {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(ev);
    } else {
      this.close.emit(ev);
    }
  }
}
