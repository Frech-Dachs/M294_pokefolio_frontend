import { Routes } from '@angular/router';
import { appCanActivate, appCanActivateChild } from './guard/app.auth.guard';
import { AppRoles } from './app.roles';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/login/login').then(c => c.Login) },
  { path: 'noaccess', loadComponent: () => import('./pages/no-access/no-access').then(c => c.NoAccess) },
  {
    path: 'app',
    loadComponent: () => import('./components/shell/shell').then(c => c.Shell),
    canActivate: [appCanActivate],
    canActivateChild: [appCanActivateChild],
    data: { roles: [AppRoles.Read] },
    children: [
      { path: '', redirectTo: 'collections/1', pathMatch: 'full' },
      {
        path: 'collections/:collectionId',
        loadComponent: () => import('./pages/collection-view/collection-view').then(c => c.CollectionView),
        data: { roles: [AppRoles.Read] }
      },
      {
        path: 'card-database',
        loadComponent: () => import('./pages/card-database/card-database').then(c => c.CardDatabase),
        data: { roles: [AppRoles.Read] }
      },
      {
        path: 'collections/:collectionId/card/:cardId',
        loadComponent: () => import('./pages/card-detail/card-detail').then(c => c.CardDetail),
        data: { roles: [AppRoles.Read] }
      },
      {
        path: 'card/:cardId',
        loadComponent: () => import('./pages/card-detail/card-detail').then(c => c.CardDetail),
        data: { roles: [AppRoles.Read] }
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin-panel/admin-panel').then(c => c.AdminPanel),
        data: { roles: [AppRoles.Admin] }
      }
    ]
  }
];
