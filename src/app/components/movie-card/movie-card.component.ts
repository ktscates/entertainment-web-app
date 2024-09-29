import { Component, Input } from '@angular/core'
import { Movie, TvShow } from '../../model/model'
import { CommonModule } from '@angular/common'
import { IconsComponent } from '../icons/icons.component'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectAllBookmarks } from '../../store/selectors/bookmark.selectors'
import * as BookmarkActions from '../../store/actions/bookmark.actions'

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, IconsComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: Movie
  @Input() show!: TvShow
  bookmarks$!: Observable<Movie[]>
  isBookmarked: boolean = false // Track if the item is bookmarked

  constructor(private store: Store) {
    this.bookmarks$ = this.store.select(selectAllBookmarks)
  }

  ngOnInit() {
    this.bookmarks$.subscribe(bookmarks => {
      this.isBookmarked = bookmarks.some(
        b => b.id === (this.movie?.id || this.show?.id)
      )
    })
  }

  toggleBookmark() {
    const item = this.movie || this.show // Determine if it's a movie or show
    if (item) {
      console.log('items', item)
      if (this.isBookmarked) {
        // If already bookmarked, remove it
        this.store.dispatch(BookmarkActions.removeBookmark({ itemId: item.id }))
      } else {
        // If not bookmarked, add it
        this.store.dispatch(BookmarkActions.addBookmark({ item }))
      }
    }
  }
}
