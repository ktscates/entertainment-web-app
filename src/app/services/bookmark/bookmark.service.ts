import { Injectable } from '@angular/core'
import { Movie, TvShow } from '../../model/model'
import { Observable, of, switchMap } from 'rxjs'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private BOOKMARK_KEY_PREFIX = 'bookmarks_'

  constructor(private authService: AuthService) {}

  // Helper function to get the current user's bookmark key
  private getUserBookmarkKey(userId: string): string {
    return `${this.BOOKMARK_KEY_PREFIX}${userId}`
  }

  getBookmarks(): Observable<(Movie | TvShow)[]> {
    return this.authService.getCurrentUserId().pipe(
      switchMap(userId => {
        if (userId) {
          const key = this.getUserBookmarkKey(userId)
          const bookmarks = JSON.parse(localStorage.getItem(key) || '[]')
          return of(bookmarks)
        } else {
          return of([]) // Return empty array if no user is logged in
        }
      })
    )
  }

  // Save bookmarks for the current user
  saveBookmarks(bookmarks: (Movie | TvShow)[]): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        const key = this.getUserBookmarkKey(userId)
        localStorage.setItem(key, JSON.stringify(bookmarks))
      }
    })
  }

  // Check if a specific item is bookmarked
  isBookmarked(item: Movie | TvShow): Observable<boolean> {
    return this.getBookmarks().pipe(
      switchMap(bookmarks => {
        return of(bookmarks.some(bookmark => bookmark.id === item.id))
      })
    )
  }

  // Toggle bookmark (add or remove)
  toggleBookmark(item: Movie | TvShow): void {
    this.getBookmarks().subscribe(bookmarks => {
      let updatedBookmarks: (Movie | TvShow)[]

      if (bookmarks.some(bookmark => bookmark.id === item.id)) {
        // Remove the bookmark
        updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== item.id)
      } else {
        // Add the bookmark
        updatedBookmarks = [...bookmarks, item]
      }

      this.saveBookmarks(updatedBookmarks)
    })
  }

  // Method to load bookmarks on app initialization
  loadBookmarks(): void {
    this.getBookmarks().subscribe(bookmarks => {
      console.log('Loading bookmarks from localStorage:', bookmarks)
    })
  }
}
