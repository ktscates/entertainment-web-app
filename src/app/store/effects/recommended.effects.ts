// effects/trending.effects.ts
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as RecommendedMovieActions from '../actions/recommended.actions'
import { MovieService } from '../../services/movie/movie.service'

@Injectable()
export class RecommendedMoviesEffects {
  private actions$ = inject(Actions)
  constructor(private movieService: MovieService) {}

  fetchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecommendedMovieActions.fetchRecommendedMovies),
      mergeMap(() =>
        this.movieService.getRecommendedMoviesShows().pipe(
          map(response => {
            const movies = response.results
            console.log('Fetched movies:', movies)

            return RecommendedMovieActions.fetchRecommendedMoviesSuccess({
              movies,
            })
          }),
          catchError(error =>
            of(RecommendedMovieActions.fetchRecommendedMoviesFailure({ error }))
          )
        )
      )
    )
  )
}
