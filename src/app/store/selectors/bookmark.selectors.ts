// selectors/bookmark.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BookmarkState } from '../reducers/bookmark.reducers'

export const selectBookmarkState =
  createFeatureSelector<BookmarkState>('bookmarks')

export const selectAllBookmarks = createSelector(
  selectBookmarkState,
  state => state.bookmarks
)
