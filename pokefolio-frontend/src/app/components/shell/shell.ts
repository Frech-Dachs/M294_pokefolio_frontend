import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Collection } from '../../data/collection';
import { UserBadge } from '../user-badge/user-badge';
import { CollectionService } from '../../service/collection.service';

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

  private collectionService = inject(CollectionService);
  
  public collections: Collection[] = [];

  ngOnInit(): void {
     this.collectionService.getAll().subscribe(collections => {
     this.collections = collections;
    });
  }

}
