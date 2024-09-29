// effects/bookmark.effects.ts
import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { addBookmark, removeBookmark } from '../actions/bookmark.actions'
import { tap } from 'rxjs/operators'
import { BookmarkService } from '../../services/bookmark/bookmark.service'

@Injectable()
export class BookmarkEffects {
  private actions$ = inject(Actions)
  constructor(private bookmarkService: BookmarkService) {}

  saveBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addBookmark),
        tap(({ item }) => this.bookmarkService.toggleBookmark(item))
      ),
    { dispatch: false }
  )

  removeBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeBookmark),
        tap(({ itemId }) => {
          const bookmarks = this.bookmarkService.getBookmarks()
          const updatedBookmarks = bookmarks.filter(b => b.id !== itemId)
          this.bookmarkService.saveBookmarks(updatedBookmarks)
        })
      ),
    { dispatch: false }
  )
}
