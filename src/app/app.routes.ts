import { Routes } from '@angular/router'
import { AuthGuard } from './guard/auth.guard'

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./components/auth/auth.component').then(m => m.AuthComponent),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/movie/movie.component').then(m => m.MovieComponent),
  },
  {
    path: 'shows',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/tv-show/tv-show.component').then(
        m => m.TvShowComponent
      ),
  },
  {
    path: 'bookmarks',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/bookmark/bookmark.component').then(
        m => m.BookmarkComponent
      ),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
]
