import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mobile-side-nav',
  templateUrl: './mobile-side-nav.component.html',
  styleUrls: ['./mobile-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileSideNavComponent {
  public showSideNav = false
}
