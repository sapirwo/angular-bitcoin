import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Location } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>()
  public contact$: Contact
  private btcRate$: number
  public transferSum: number
  public loggedInUser$: User

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getContact()
    this.getLoggedInUser()
    this.getBtcRate()
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe
  }
  getContact(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.contactService.getContacts()
    this.contactService.getContact(id)
    this.contactService.currContact$.
      pipe(takeUntil(this.destroy$)).
      subscribe(contact => this.contact$ = contact);
  }
  getLoggedInUser(): void {
    const userId = 'user1'
    this.userService.getUser(userId)
    this.userService.currUser$.
      pipe(takeUntil(this.destroy$)).
      subscribe(user => this.loggedInUser$ = user)
  }
  getBtcRate(): void {
    this.bitcoinService.loadRate()
    this.bitcoinService.btcRate$.
      pipe(takeUntil(this.destroy$)).
      subscribe(rate => this.btcRate$ = rate.USD?.last)
  }
  onTransfer() {
    if (!this.transferSum || this.transferSum < 1) return
    const editedUser = this.getUserAfterTransfer()
    const editedContact = this.getContactAfterTransfer()
    this.userService.updateUser(editedUser)
    this.userService.currUser$.
      pipe(takeUntil(this.destroy$)).
      subscribe((updatedUser: User) => this.loggedInUser$ = updatedUser)
    this.contactService.updateContact(editedContact)
    this.contactService.currContact$.
      pipe(takeUntil(this.destroy$)).
      subscribe((updatedContact: Contact) => this.contact$ = updatedContact)
    this.transferSum = null
  }
  getUserAfterTransfer() {
    const newMoveUser = this.getMove('user')
    const editedUser = {
      ...this.loggedInUser$,
      moves: [newMoveUser, ...this.loggedInUser$.moves],
      usd: this.loggedInUser$.usd -= this.transferSum
    }
    return editedUser
  }
  getContactAfterTransfer() {
    const newMoveContact = this.getMove('contact')
    const editedContact = {
      ...this.contact$,
      moves: [newMoveContact, ...this.contact$.moves]
    }
    return editedContact
  }
  getMove(type) {
    if (type === 'user') {
      return this.userService.getMove(
        this.contact$.id,
        this.contact$.name,
        this.contact$.img,
        this.btcRate$,
        this.transferSum
      )
    }
    return this.contactService.getMove(
      this.loggedInUser$.id,
      this.btcRate$,
      this.transferSum)
  }
  goBack(): void {
    this.location.back();
  }
}
