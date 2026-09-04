import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/login/login').then(c => c.Login) },
  {
    path: 'app',
    loadComponent: () => import('./components/shell/shell').then(c => c.Shell),
    children: [
      { path: '', redirectTo: 'collections/1', pathMatch: 'full' },
      {
        path: 'collections/:collectionId',
        loadComponent: () => import('./pages/collection-view/collection-view').then(c => c.CollectionView)
      },
      {
        path: 'card-database',
        loadComponent: () => import('./pages/card-database/card-database').then(c => c.CardDatabase)
      },
      {
        path: 'collections/:collectionId/card/:cardId',
        loadComponent: () => import('./pages/card-detail/card-detail').then(c => c.CardDetail)
      },
      {
        path: 'card/:cardId',
        loadComponent: () => import('./pages/card-detail/card-detail').then(c => c.CardDetail)
      }
    ]
  }
];
