import { createAction, props } from '@ngrx/store'
import { TvShow } from '../../model/model'

export const fetchShows = createAction('[Load Shows] Fetch Shows')

export const fetchShowsSuccess = createAction(
  '[Load Shows] Fetch Shows Success',
  props<{ shows: TvShow[] }>()
)

export const fetchShowsFailure = createAction(
  '[Load Shows] Fetch Shows Failure',
  props<{ error: string }>()
)
