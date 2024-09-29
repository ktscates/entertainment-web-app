// actions/bookmark.actions.ts
import { createAction, props } from '@ngrx/store'
import { Movie } from '../../model/model'

export const addBookmark = createAction(
  '[Bookmark] Add Bookmark',
  props<{ item: Movie }>()
)

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<{ itemId: number }>()
)
