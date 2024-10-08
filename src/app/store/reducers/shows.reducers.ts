// reducers/trending.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as ShowActions from '../actions/shows.actions'
import { TvShow } from '../../model/model'

export interface ShowState {
  shows: TvShow[]
  error: string | null
}

export const initialState: ShowState = {
  shows: [],
  error: null,
}

export const showReducer = createReducer(
  initialState,
  on(
    ShowActions.fetchShowsSuccess,
    (state, { shows }): ShowState => ({
      ...state,
      shows,
      error: null,
    })
  ),
  on(
    ShowActions.fetchShowsFailure,
    (state, { error }): ShowState => ({
      ...state,
      error,
    })
  )
)
