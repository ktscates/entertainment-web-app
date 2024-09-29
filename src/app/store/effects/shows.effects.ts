// effects/trending.effects.ts
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as ShowActions from '../actions/shows.actions'
import { MovieService } from '../../services/movie/movie.service'

@Injectable()
export class ShowEffects {
  private actions$ = inject(Actions)
  constructor(private movieService: MovieService) {}

  fetchShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowActions.fetchShows),
      mergeMap(() =>
        this.movieService.getShows().pipe(
          map(response => {
            const shows = response.results
            console.log('Fetched movies:', shows)

            return ShowActions.fetchShowsSuccess({ shows })
          }),
          catchError(error => of(ShowActions.fetchShowsFailure({ error })))
        )
      )
    )
  )
}
