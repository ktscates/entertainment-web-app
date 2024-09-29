import { Component } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectAllBookmarks } from '../../store/selectors/bookmark.selectors'
import { Movie } from '../../model/model'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [
    SidenavComponent,
    SearchComponent,
    MovieCardComponent,
    CommonModule,
  ],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent {
  bookmarkMovies$!: Observable<Movie[]> // Observable to hold the bookmarks
  searchResults$!: Observable<Movie[]> // Observable for search results
  error$!: Observable<string | null> // Error observable
  searchQuery: string = ''

  constructor(private store: Store) {
    this.bookmarkMovies$ = this.store.select(selectAllBookmarks) // Select bookmarks from the store
  }

  ngOnInit() {
    // You can perform any additional setup or logic here
  }

  // onSearch(query: string): void {
  //   if (query.trim() === '') {
  //     return
  //   }

  //   this.searchQuery = query // Update searchQuery with the new query
  //   console.log('Search Query:', query)
  //   this.store.dispatch(BookmarkActions.searchBookmarkMovies({ query }))
  // }
}
