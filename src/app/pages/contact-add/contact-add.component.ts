import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>()
  public newContact = {
    name: '',
    moves: [],
    email: '',
    phone: '',
    img: 'https://www.w3schools.com/howto/img_avatar.png'
  }

  constructor(
    private location: Location,
    private contactService: ContactService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe
  }
  onSubmit(): void {
    this.contactService.addContact(this.newContact)
    this.contactService.contacts$.
      pipe(takeUntil(this.destroy$)).
      subscribe(() => this.goBack())
  }
  goBack(): void {
    this.location.back();
  }
}
