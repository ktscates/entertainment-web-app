import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { SearchEffects } from './store/effects/search.effects'
import { searchReducer } from './store/reducers/search.reducers'
import { TrendingEffects } from './store/effects/trending.effects'
import { trendingReducer } from './store/reducers/trending.reducers'
import { MovieEffects } from './store/effects/movie.effects'
import { movieReducer } from './store/reducers/movie.reducers'
import { ShowEffects } from './store/effects/shows.effects'
import { showReducer } from './store/reducers/shows.reducers'
import { RecommendedMovieReducer } from './store/reducers/recommended.reducers'
import { RecommendedMoviesEffects } from './store/effects/recommended.effects'
import { BookmarkEffects } from './store/effects/bookmark.effects'
import { bookmarkReducer } from './store/reducers/bookmark.reducers'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStore({
      search: searchReducer,
      trending: trendingReducer,
      movie: movieReducer,
      show: showReducer,
      recommended: RecommendedMovieReducer,
      bookmarks: bookmarkReducer,
    }),
    provideEffects([
      SearchEffects,
      TrendingEffects,
      MovieEffects,
      ShowEffects,
      RecommendedMoviesEffects,
      BookmarkEffects,
    ]),
  ],
}
