import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { MovieService } from '../../services/movie/movie.service'
import * as SearchActions from '../actions/search.actions'
import { Movie, TvShow } from '../../model/model'

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions)
  constructor(private movieService: MovieService) {}

  searchMoviesAndShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchMoviesAndShows),
      mergeMap(({ query }) =>
        this.movieService.searchMoviesAndShows(query).pipe(
          map((results: (Movie | TvShow)[]) => {
            const movies = results.filter(
              (item): item is Movie => 'title' in item
            )
            return SearchActions.searchMoviesAndShowsSuccess({ movies })
          }),
          catchError(error =>
            of(SearchActions.searchMoviesAndShowsFailure({ error }))
          )
        )
      )
    )
  )

  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchMovies),
      mergeMap(({ query }) =>
        this.movieService.searchMovies(query).pipe(
          map((movies: Movie[]) =>
            SearchActions.searchMoviesSuccess({ movies })
          ),
          catchError(error => of(SearchActions.searchMoviesFailure({ error })))
        )
      )
    )
  )

  searchShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchShows),
      mergeMap(({ query }) =>
        this.movieService.searchTvShows(query).pipe(
          map((shows: TvShow[]) => SearchActions.searchShowsSuccess({ shows })),
          catchError(error => of(SearchActions.searchShowsFailure({ error })))
        )
      )
    )
  )
}
