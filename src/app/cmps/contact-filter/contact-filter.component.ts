import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../../models/contact.model'
@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFilterComponent {
  @Input() contacts: Contact[]
  @Output() onFilter = new EventEmitter();
}
