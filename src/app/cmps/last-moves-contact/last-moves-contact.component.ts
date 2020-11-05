import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { User } from '../../models/user.model';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'last-moves-contact',
  templateUrl: './last-moves-contact.component.html',
  styleUrls: ['./last-moves-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LastMovesContactComponent {
  @Input() contact$: Contact
  @Input() loggedInUser$: User

  private sortBy: string = 'date'
  constructor(private util: UtilsService) { }

  getSortedMoves() {
    return this.util.sortMoves(this.contact$, this.sortBy)
  }
  getMovesToShow() {
    if (!this.loggedInUser$ || !this.contact$) return
    return this.contact$.moves?.filter(move =>
      move.fromUserId === this.loggedInUser$.id)
  }
}
