// effects/bookmark.effects.ts
import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as BookmarkActions from '../actions/bookmark.actions'
import { map, tap } from 'rxjs/operators'
import { BookmarkService } from '../../services/bookmark/bookmark.service'

@Injectable()
export class BookmarkEffects {
  private actions$ = inject(Actions)
  constructor(private bookmarkService: BookmarkService) {}

  saveBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.addBookmark),
        tap(({ item }) => this.bookmarkService.toggleBookmark(item))
      ),
    { dispatch: false }
  )

  removeBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.removeBookmark),
        tap(({ itemId }) => {
          const bookmarks = this.bookmarkService.getBookmarks()
          const updatedBookmarks = bookmarks.filter(b => b.id !== itemId)
          this.bookmarkService.saveBookmarks(updatedBookmarks)
        })
      ),
    { dispatch: false }
  )

  // Effect to load bookmarks when the app initializes
  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.initApp), // Listen for the initApp action
      map(() => BookmarkActions.loadBookmarks()) // Dispatch loadBookmarks
    )
  )
}
