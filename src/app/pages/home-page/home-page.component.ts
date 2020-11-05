import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BitcoinService } from '../../services/bitcoin.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>()
  public user$: User
  public btcRate: any

  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
  ) { }

  ngOnInit(): void {
    this.getLoggedInUser()
    this.getBtcRate()
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe
  }
  getLoggedInUser(): void {
    const loggedInUserId = 'user1'
    this.userService.getUser(loggedInUserId)
    this.userService.currUser$.
      pipe(takeUntil(this.destroy$)).
      subscribe((user: User) => this.user$ = user)
  }
  getBtcRate(): void {
    this.bitcoinService.loadRate()
    this.bitcoinService.btcRate$.
      pipe(takeUntil(this.destroy$)).
      subscribe(rate => this.btcRate = rate.USD?.last)
  }
}