import { createAction, props } from '@ngrx/store'
import { Movie } from '../../model/model'

export const fetchMovies = createAction('[Load Movies] Fetch Movies')
export const loadInitialMovies = createAction('[Movies] Load Initial Movies')

export const fetchMoviesSuccess = createAction(
  '[Load Movies] Fetch Movies Success',
  props<{ movies: Movie[] }>()
)

export const fetchMoviesFailure = createAction(
  '[Load Movies] Fetch Movies Failure',
  props<{ error: string }>()
)
