// effects/bookmark.effects.ts
import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as BookmarkActions from '../actions/bookmark.actions'
import { map, switchMap, tap, catchError, of } from 'rxjs'
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
          this.bookmarkService.getBookmarks().subscribe(bookmarks => {
            const updatedBookmarks = bookmarks.filter(b => b.id !== itemId)
            this.bookmarkService.saveBookmarks(updatedBookmarks)
          })
        })
      ),
    { dispatch: false }
  )

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.initApp),
      switchMap(() =>
        this.bookmarkService.getBookmarks().pipe(
          map(bookmarks => BookmarkActions.loadBookmarksSuccess({ bookmarks })),
          catchError(error =>
            of(BookmarkActions.loadBookmarksFailure({ error }))
          )
        )
      )
    )
  )
}
