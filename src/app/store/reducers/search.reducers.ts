import { createReducer, on } from '@ngrx/store'
import { Movie, TvShow } from '../../model/model'
import * as SearchActions from '../actions/search.actions'

export interface SearchState {
  movies: Movie[] // Now typed with Movie[]
  shows: TvShow[]
  loading: boolean
  error: unknown
}

export const initialState: SearchState = {
  shows: [],
  movies: [],
  loading: false,
  error: null,
}

export const searchReducer = createReducer(
  initialState,
  on(
    SearchActions.searchMoviesAndShows,
    (state): SearchState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    SearchActions.searchMoviesAndShowsSuccess,
    (state, { movies }): SearchState => ({
      ...state,
      loading: false,
      movies: movies, // Update with Movie[] data
    })
  ),
  on(
    SearchActions.searchMoviesAndShowsFailure,
    (state, { error }): SearchState => ({
      ...state,
      loading: false,
      error: error,
    })
  ),
  on(
    SearchActions.searchMovies,
    (state): SearchState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    SearchActions.searchMoviesSuccess,
    (state, { movies }): SearchState => ({
      ...state,
      loading: false,
      movies: movies, // Update with Movie[] data
    })
  ),
  on(
    SearchActions.searchMoviesFailure,
    (state, { error }): SearchState => ({
      ...state,
      loading: false,
      error: error,
    })
  ),

  on(
    SearchActions.searchShows,
    (state): SearchState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    SearchActions.searchShowsSuccess,
    (state, { shows }): SearchState => ({
      ...state,
      loading: false,
      shows: shows,
    })
  ),
  on(
    SearchActions.searchShowsFailure,
    (state, { error }): SearchState => ({
      ...state,
      loading: false,
      error: error,
    })
  )
)
