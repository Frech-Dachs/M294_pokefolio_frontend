import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreateCollectionDialog } from '../create-collection-dialog/create-collection-dialog';
import { Collection } from '../../data/collection';
import { UserBadge } from '../user-badge/user-badge';
import { CollectionService } from '../../service/collection.service';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';
import { AppRoles } from '../../app.roles';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIcon,
    MatIconButton,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    UserBadge,
    IsInRolesDirective
  ]
})
export class Shell implements OnInit {
  private collectionService = inject(CollectionService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  public readonly roles = AppRoles;
  public collections = signal<Collection[]>([]);

  ngOnInit(): void {
    this.loadCollections();
  }

  private loadCollections(): void {
    this.collectionService.getAll().subscribe(collections => {
      this.collections.set(collections);
    });
  }

  public createCollection(): void {
    const dialogRef = this.dialog.open(CreateCollectionDialog, { width: '400px' });

    dialogRef.afterClosed().subscribe((created?: Collection) => {
      if (created) {
        this.loadCollections();
        this.router.navigate(['/app/collections', created.id]);
      }
    });
  }
}
