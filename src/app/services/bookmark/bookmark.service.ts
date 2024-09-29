import { Injectable } from '@angular/core'
import { Movie, TvShow } from '../../model/model'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private BOOKMARK_KEY = 'bookmarks'

  constructor() {}

  getBookmarks(): (Movie | TvShow)[] {
    return JSON.parse(localStorage.getItem(this.BOOKMARK_KEY) || '[]')
  }

  saveBookmarks(bookmarks: (Movie | TvShow)[]): void {
    localStorage.setItem(this.BOOKMARK_KEY, JSON.stringify(bookmarks))
  }

  isBookmarked(item: Movie | TvShow): boolean {
    const bookmarks = this.getBookmarks()
    return bookmarks.some(bookmark => bookmark.id === item.id)
  }

  toggleBookmark(item: Movie | TvShow): void {
    let bookmarks = this.getBookmarks()
    if (this.isBookmarked(item)) {
      // Remove the bookmark
      bookmarks = bookmarks.filter(bookmark => bookmark.id !== item.id)
    } else {
      // Add the bookmark
      bookmarks.push(item)
    }
    this.saveBookmarks(bookmarks)
  }

  // Method to load bookmarks on app initialization
  loadBookmarks(): void {
    const bookmarks = this.getBookmarks()
    console.log('Loading bookmarks from localStorage:', bookmarks)
  }
}
