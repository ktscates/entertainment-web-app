// reducers/trending.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as MovieActions from '../actions/movie.actions'
import { Movie } from '../../model/model'

export interface MovieState {
  movies: Movie[]
  error: string | null
}

export const initialState: MovieState = {
  movies: [],
  error: null,
}

export const movieReducer = createReducer(
  initialState,
  on(MovieActions.fetchMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    error: null,
  })),
  on(MovieActions.fetchMoviesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
