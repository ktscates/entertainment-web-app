// reducers/trending.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as TrendingActions from '../actions/trending.actions'
import { Movie } from '../../model/model'

export interface TrendingState {
  movies: Movie[]
  error: string | null
}

export const initialState: TrendingState = {
  movies: [],
  error: null,
}

export const trendingReducer = createReducer(
  initialState,
  on(
    TrendingActions.fetchTrendingMoviesSuccess,
    (state, { movies }): TrendingState => ({
      ...state,
      movies,
      error: null,
    })
  ),
  on(
    TrendingActions.fetchTrendingMoviesFailure,
    (state, { error }): TrendingState => ({
      ...state,
      error,
    })
  )
)
