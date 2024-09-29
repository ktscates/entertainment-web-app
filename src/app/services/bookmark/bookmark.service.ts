import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private BOOKMARK_KEY = 'bookmarks'

  constructor() {}

  getBookmarks(): any[] {
    return JSON.parse(localStorage.getItem(this.BOOKMARK_KEY) || '[]')
  }

  saveBookmarks(bookmarks: any[]): void {
    localStorage.setItem(this.BOOKMARK_KEY, JSON.stringify(bookmarks))
  }

  isBookmarked(item: any): boolean {
    const bookmarks = this.getBookmarks()
    return bookmarks.some(bookmark => bookmark.id === item.id)
  }

  toggleBookmark(item: any): void {
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
}
