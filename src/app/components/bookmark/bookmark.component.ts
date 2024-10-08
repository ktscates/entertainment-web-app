import { Component, OnInit } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { map, Observable } from 'rxjs'
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
export class BookmarkComponent implements OnInit {
  bookmarkMovies$!: Observable<(Movie | TvShow)[]>
  error$!: Observable<string | null>
  searchQuery: string = ''
  searchResults$!: Observable<(Movie | TvShow)[]>
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.bookmarkMovies$ = this.store.select(selectAllBookmarks)
    this.searchResults$ = this.bookmarkMovies$.pipe(
      map(bookmarks => this.filterBookmarks(bookmarks, this.searchQuery))
    )
  }

  onSearch(query: string): void {
    this.searchQuery = query
    this.searchResults$ = this.bookmarkMovies$.pipe(
      map(bookmarks => this.filterBookmarks(bookmarks, this.searchQuery))
    )
  }

  private filterBookmarks(
    bookmarks: (Movie | TvShow)[],
    query: string
  ): (Movie | TvShow)[] {
    if (!query) {
      return bookmarks
    }

    return bookmarks.filter(item => {
      const title = (item as Movie).title || (item as TvShow).name || ''
      return title.toLowerCase().includes(query.toLowerCase())
    })
  }
}
