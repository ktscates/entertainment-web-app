import { Component } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { map, Observable, of } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectAllBookmarks } from '../../store/selectors/bookmark.selectors'
import { Movie, TvShow } from '../../model/model'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { CommonModule } from '@angular/common'
import { TrendingCardComponent } from '../trending-card/trending-card.component'

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [
    SidenavComponent,
    SearchComponent,
    MovieCardComponent,
    CommonModule,
    TrendingCardComponent,
  ],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent {
  bookmarkMovies$!: Observable<(Movie | TvShow)[]> // Observable to hold the bookmarks
  error$!: Observable<string | null> // Error observable
  searchQuery: string = ''
  searchResults$!: Observable<(Movie | TvShow)[]> // Observable for search results

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.bookmarkMovies$ = this.store.select(selectAllBookmarks)
    this.searchResults$ = this.bookmarkMovies$.pipe(
      map(bookmarks => this.filterBookmarks(bookmarks, this.searchQuery))
    )
  }

  onSearch(query: string): void {
    this.searchQuery = query
    // Update the search results whenever the query changes
    this.searchResults$ = this.bookmarkMovies$.pipe(
      map(bookmarks => this.filterBookmarks(bookmarks, this.searchQuery))
    )
  }

  private filterBookmarks(
    bookmarks: (Movie | TvShow)[],
    query: string
  ): (Movie | TvShow)[] {
    if (!query) {
      return bookmarks // Return all bookmarks if the query is empty
    }

    return bookmarks.filter(item => {
      const title = (item as Movie).title || (item as TvShow).name || ''
      return title.toLowerCase().includes(query.toLowerCase())
    })
  }
}
