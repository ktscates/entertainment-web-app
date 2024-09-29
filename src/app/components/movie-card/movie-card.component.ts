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
  @Input() item!: Movie | TvShow
  bookmarks$!: Observable<(Movie | TvShow)[]>
  isBookmarked: boolean = false // Track if the item is bookmarked

  constructor(private store: Store) {
    this.bookmarks$ = this.store.select(selectAllBookmarks)
  }

  ngOnInit() {
    this.bookmarks$.subscribe(bookmarks => {
      this.isBookmarked = bookmarks.some(b => b.id === this.getItemId())
      console.log('Bookmarked state:', this.isBookmarked) // Check if bookmark state is set
    })
  }

  getItemId(): number | undefined {
    return this.movie?.id || this.show?.id // Return ID from either movie or show
  }

  toggleBookmark() {
    const item = this.movie || this.show
    if (item) {
      console.log('Item toggling:', item)
      if (this.isBookmarked) {
        this.store.dispatch(BookmarkActions.removeBookmark({ itemId: item.id }))
      } else {
        this.store.dispatch(BookmarkActions.addBookmark({ item }))
      }
    }
  }
}
