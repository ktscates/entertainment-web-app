// actions/bookmark.actions.ts
import { createAction, props } from '@ngrx/store'
import { Movie, TvShow } from '../../model/model'

export const initApp = createAction('[App] Init')

export const loadBookmarks = createAction('[Bookmark] Load Bookmarks')

export const addBookmark = createAction(
  '[Bookmark] Add Bookmark',
  props<{ item: Movie | TvShow }>()
)

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<{ itemId: number }>()
)
