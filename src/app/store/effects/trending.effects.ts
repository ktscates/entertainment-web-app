// effects/trending.effects.ts
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as TrendingActions from '../actions/trending.actions'
import { MovieService } from '../../services/movie/movie.service'
import { Movie, TvShow } from '../../model/model'

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
            const movies: Movie[] = response.results.filter(
              (item: Movie | TvShow): item is Movie => 'title' in item
            )
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
