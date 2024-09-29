import { createAction, props } from '@ngrx/store'
import { Movie } from '../../model/model'

export const fetchTrendingMovies = createAction(
  '[Movies] Fetch Trending Movies'
)

export const fetchTrendingMoviesSuccess = createAction(
  '[Movies] Fetch Trending Movies Success',
  props<{ movies: Movie[] }>()
)

export const fetchTrendingMoviesFailure = createAction(
  '[Movies] Fetch Trending Movies Failure',
  props<{ error: string }>()
)
