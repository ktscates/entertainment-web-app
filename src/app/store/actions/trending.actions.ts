import { createAction, props } from '@ngrx/store'
import { Movie, TvShow } from '../../model/model'

export const fetchTrendingMovies = createAction(
  '[Movies] Fetch Trending Movies'
)

export const fetchTrendingMoviesSuccess = createAction(
  '[Movies] Fetch Trending Movies Success',
  props<{ movies: (Movie | TvShow)[] }>()
)

export const fetchTrendingMoviesFailure = createAction(
  '[Movies] Fetch Trending Movies Failure',
  props<{ error: string }>()
)
