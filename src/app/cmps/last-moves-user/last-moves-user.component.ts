import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'last-moves-user',
  templateUrl: './last-moves-user.component.html',
  styleUrls: ['./last-moves-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LastMovesUserComponent {
  @Input() user$: User
  private sortBy: string = 'date'
  constructor(private util: UtilsService) { }

  getSortedMoves() {
    return this.util.sortMoves(this.user$, this.sortBy)
  }
}
