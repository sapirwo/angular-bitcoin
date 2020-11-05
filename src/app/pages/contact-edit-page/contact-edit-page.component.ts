import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrls: ['./contact-edit-page.component.scss']
})
export class ContactEditPageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>()
  public isOpenAlert: boolean = false
  public contact$: Contact
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getContact()
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe
  }
  getContact(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.contactService.getContacts()
    this.contactService.getContact(id)
    this.contactService.currContact$.
      pipe(takeUntil(this.destroy$)).
      subscribe(contact => this.contact$ = contact);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.contactService.updateContact(this.contact$)
    this.contactService.currContact$.
      pipe(takeUntil(this.destroy$)).
      subscribe(() => this.goBack());
  }
  onCloseAlert(removeContact: boolean) {
    this.onToggleAlert()
    if (removeContact) this.onRemoveContact()
  }
  onToggleAlert(): void {
    this.isOpenAlert = !this.isOpenAlert
  }
  onRemoveContact(): void {
    this.contactService.deleteContact(this.contact$)
    this.contactService.contacts$.
      pipe(takeUntil(this.destroy$)).
      subscribe()
    this.onToggleAlert()
    this.router.navigateByUrl('/contact')
  }
}
