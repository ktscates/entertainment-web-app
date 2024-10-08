// effects/trending.effects.ts
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as MovieActions from '../actions/movie.actions'
import * as TrendingActions from '../actions/trending.actions'
import * as RecommendedActions from '../actions/recommended.actions'
import { MovieService } from '../../services/movie/movie.service'

@Injectable()
export class MovieEffects {
  private actions$ = inject(Actions)
  constructor(private movieService: MovieService) {}

  fetchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.fetchMovies),
      mergeMap(() =>
        this.movieService.getMovies().pipe(
          map(response => {
            const movies = response.results
            console.log('Fetched movies:', movies)

            return MovieActions.fetchMoviesSuccess({ movies })
          }),
          catchError(error => of(MovieActions.fetchMoviesFailure({ error })))
        )
      )
    )
  )

  loadInitialMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadInitialMovies),
      mergeMap(() => [
        TrendingActions.fetchTrendingMovies(),
        RecommendedActions.fetchRecommendedMovies(),
      ])
    )
  )
}
