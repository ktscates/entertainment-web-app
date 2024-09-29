// reducers/bookmark.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as BookmarkActions from '../actions/bookmark.actions'
import { Movie, TvShow } from '../../model/model'

export interface BookmarkState {
  bookmarks: (Movie | TvShow)[]
  searchResults: (Movie | TvShow)[]
}

const initialState: BookmarkState = {
  bookmarks: [],
  searchResults: [],
}

export const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkActions.addBookmark, (state, { item }) => {
    console.log('Adding to bookmarks:', item) // Log to check item being added
    return {
      ...state,
      bookmarks: [...state.bookmarks, item],
    }
  }),
  on(BookmarkActions.removeBookmark, (state, { itemId }) => {
    console.log('Removing bookmark with ID:', itemId) // Log to check item being removed
    return {
      ...state,
      bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== itemId),
    }
  }),

  on(BookmarkActions.loadBookmarks, state => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    return {
      ...state,
      bookmarks, // Load the bookmarks from local storage
    }
  }),

  on(BookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks,
    error: null,
  })),
  on(BookmarkActions.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
