import { createAction, props } from '@ngrx/store'
import { Movie, TvShow } from '../../model/model'

export const searchMoviesAndShows = createAction(
  '[Search] Search Movies and Shows',
  props<{ query: string }>()
)

export const searchMoviesAndShowsSuccess = createAction(
  '[Search] Search Movies and Shows Success',
  props<{ movies: Movie[] }>()
)

export const searchMoviesAndShowsFailure = createAction(
  '[Search] Search Movies and Shows Failure',
  props<{ error: unknown }>()
)

export const searchMovies = createAction(
  '[Search Movies] Search Movies only ',
  props<{ query: string }>()
)

export const searchMoviesSuccess = createAction(
  '[Search Movies] Search Movies only',
  props<{ movies: Movie[] }>()
)

export const searchMoviesFailure = createAction(
  '[Search Movies] Search Movies only',
  props<{ error: unknown }>()
)

export const searchShows = createAction(
  '[Search Shows] Search Shows only',
  props<{ query: string }>()
)

export const searchShowsSuccess = createAction(
  '[Search Shows] Search Shows only',
  props<{ shows: TvShow[] }>()
)

export const searchShowsFailure = createAction(
  '[Search Shows] Search Shows only',
  props<{ error: unknown }>()
)
