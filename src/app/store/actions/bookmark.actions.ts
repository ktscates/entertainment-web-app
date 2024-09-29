// actions/bookmark.actions.ts
import { createAction, props } from '@ngrx/store'
import { Movie, TvShow } from '../../model/model'

export const initApp = createAction('[App] Init')

export const loadBookmarks = createAction('[Bookmark] Load Bookmarks')

// Action to handle successful loading of bookmarks
export const loadBookmarksSuccess = createAction(
  '[Bookmark] Load Bookmarks Success',
  props<{ bookmarks: (Movie | TvShow)[] }>()
)

// Action to handle loading bookmarks failure
export const loadBookmarksFailure = createAction(
  '[Bookmark] Load Bookmarks Failure',
  props<{ error: any }>() // You can specify a more detailed error type if necessary
)

export const addBookmark = createAction(
  '[Bookmark] Add Bookmark',
  props<{ item: Movie | TvShow }>()
)

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<{ itemId: number }>()
)
