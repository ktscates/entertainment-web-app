// reducers/bookmark.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as BookmarkActions from '../actions/bookmark.actions'
import { Movie } from '../../model/model'

export interface BookmarkState {
  bookmarks: Movie[]
}

const initialState: BookmarkState = {
  bookmarks: [],
}

export const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkActions.addBookmark, (state, { item }) => ({
    ...state,
    bookmarks: [...state.bookmarks, item],
  })),
  on(BookmarkActions.removeBookmark, (state, { itemId }) => ({
    ...state,
    bookmarks: state.bookmarks.filter(item => item.id !== itemId),
  }))
)
