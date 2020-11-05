import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent implements OnInit, OnDestroy {

  constructor(private contactService: ContactService) { }
  private destroy$: Subject<boolean> = new Subject<boolean>()
  public contacts$: Contact[]
  private filterBy: string

  ngOnInit(): void {
    this.getContacts()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe
  }

  getContacts(): void {
    this.contactService.getContacts()
    this.contactService.contacts$.
      pipe(takeUntil(this.destroy$)).
      subscribe((contacts: Contact[]) => this.contacts$ = contacts)
  }

  public getContactsToShow(): Contact[] {
    if (!this.filterBy) return this.contacts$
    if (this.filterBy.toLowerCase() === this.filterBy.toUpperCase()) {
      return this.contacts$.filter(contact => contact.phone
        .includes(this.filterBy))
    }
    return this.contacts$.filter(contact => contact.name.toLowerCase()
      .includes(this.filterBy.toLowerCase()))
  }

  public onSetFilter(filterBy): void {
    this.filterBy = filterBy
  }
}
