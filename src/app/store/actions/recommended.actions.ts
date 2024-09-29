import { createAction, props } from '@ngrx/store'
import { Movie } from '../../model/model'

export const fetchRecommendedMovies = createAction(
  '[Load Recommended Movies] Fetch Recommended Movies'
)

export const fetchRecommendedMoviesSuccess = createAction(
  '[Load Recommended Movies] Fetch Recommended Movies Success',
  props<{ movies: Movie[] }>()
)

export const fetchRecommendedMoviesFailure = createAction(
  '[Load Recommended Movies] Fetch Recommended Movies Failure',
  props<{ error: string }>()
)
