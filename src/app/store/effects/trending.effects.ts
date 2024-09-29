// effects/trending.effects.ts
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as TrendingActions from '../actions/trending.actions'
import { MovieService } from '../../services/movie/movie.service'

@Injectable()
export class TrendingEffects {
  private actions$ = inject(Actions)
  constructor(private movieService: MovieService) {}

  fetchTrendingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrendingActions.fetchTrendingMovies),
      mergeMap(() =>
        this.movieService.getTrendingMoviesShow().pipe(
          map(response => {
            const movies = response.results
            console.log('Fetched movies:', movies) // Log the response

            return TrendingActions.fetchTrendingMoviesSuccess({ movies })
          }),
          catchError(error =>
            of(TrendingActions.fetchTrendingMoviesFailure({ error }))
          )
        )
      )
    )
  )
}
