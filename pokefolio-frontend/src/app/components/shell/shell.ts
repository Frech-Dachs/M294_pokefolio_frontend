import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Collection } from '../../data/collection';
import { UserBadge } from '../user-badge/user-badge';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIcon,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    UserBadge
  ]
})
export class Shell {
  // TODO(user): replace mock data with the collections loaded for the signed-in user
  public collections: Collection[] = [
    { id: '1', name: 'Collection 1' },
    { id: '2', name: 'Collection 2' }
  ];
}
