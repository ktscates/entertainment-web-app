import { createAction, props } from '@ngrx/store'
import { Movie, TvShow } from '../../model/model'

// Action to initiate the search
export const searchMoviesAndShows = createAction(
  '[Search] Search Movies and Shows',
  props<{ query: string }>()
)

// Action for successful search result
export const searchMoviesAndShowsSuccess = createAction(
  '[Search] Search Movies and Shows Success',
  props<{ movies: Movie[] }>()
)

// Action for failed search result
export const searchMoviesAndShowsFailure = createAction(
  '[Search] Search Movies and Shows Failure',
  props<{ error: unknown }>()
)

// Action to initiate the search
export const searchMovies = createAction(
  '[Search Movies] Search Movies only ',
  props<{ query: string }>()
)

// Action for successful search result
export const searchMoviesSuccess = createAction(
  '[Search Movies] Search Movies only',
  props<{ movies: Movie[] }>()
)

// Action for failed search result
export const searchMoviesFailure = createAction(
  '[Search Movies] Search Movies only',
  props<{ error: unknown }>()
)

// Action to initiate the search
export const searchShows = createAction(
  '[Search Shows] Search Shows only',
  props<{ query: string }>()
)

// Action for successful search result
export const searchShowsSuccess = createAction(
  '[Search Shows] Search Shows only',
  props<{ shows: TvShow[] }>()
)

// Action for failed search result
export const searchShowsFailure = createAction(
  '[Search Shows] Search Shows only',
  props<{ error: unknown }>()
)
