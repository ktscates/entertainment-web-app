// reducers/trending.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as RecommendedMovieActions from '../actions/recommended.actions'
import { Movie } from '../../model/model'

export interface RecommendedMovieState {
  movies: Movie[]
  error: string | null
}

export const initialState: RecommendedMovieState = {
  movies: [],
  error: null,
}

export const RecommendedMovieReducer = createReducer(
  initialState,
  on(
    RecommendedMovieActions.fetchRecommendedMoviesSuccess,
    (state, { movies }) => ({
      ...state,
      movies,
      error: null,
    })
  ),
  on(
    RecommendedMovieActions.fetchRecommendedMoviesFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
)
