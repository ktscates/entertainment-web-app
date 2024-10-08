import { Component, Input, OnInit } from '@angular/core'
import { Movie, TvShow } from '../../model/model'
import { CommonModule } from '@angular/common'
import { IconsComponent } from '../icons/icons.component'
import { selectAllBookmarks } from '../../store/selectors/bookmark.selectors'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as BookmarkActions from '../../store/actions/bookmark.actions'

@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [CommonModule, IconsComponent],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.css',
})
export class TrendingCardComponent implements OnInit {
  @Input() movie!: Movie | TvShow
  bookmarks$!: Observable<(Movie | TvShow)[]>
  isBookmarked: boolean = false

  constructor(private store: Store) {
    this.bookmarks$ = this.store.select(selectAllBookmarks)
  }

  ngOnInit() {
    this.bookmarks$.subscribe(bookmarks => {
      this.isBookmarked = bookmarks.some(b => b.id === this.movie?.id)
    })
  }

  toggleBookmark() {
    const item = this.movie
    if (item) {
      if (this.isBookmarked) {
        this.store.dispatch(BookmarkActions.removeBookmark({ itemId: item.id }))
      } else {
        this.store.dispatch(BookmarkActions.addBookmark({ item }))
      }
    }
  }
}
