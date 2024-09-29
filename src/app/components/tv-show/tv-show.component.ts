import { Component, OnInit } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { Observable } from 'rxjs'
import { TvShow } from '../../model/model'
import { Store } from '@ngrx/store'
import * as searchSelectors from '../../store/selectors/search.selectors'
import * as ShowSelectors from '../../store/selectors/shows.selectors'
import * as ShowActions from '../../store/actions/shows.actions'
import { CommonModule } from '@angular/common'
import { MovieCardComponent } from '../movie-card/movie-card.component'

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [
    SidenavComponent,
    SearchComponent,
    CommonModule,
    MovieCardComponent,
  ],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.css',
})
export class TvShowComponent implements OnInit {
  shows$!: Observable<TvShow[]>
  searchResults$!: Observable<TvShow[]>
  error$!: Observable<unknown>
  searchQuery: string = ''

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.shows$ = this.store.select(ShowSelectors.selectShows)
    this.searchResults$ = this.store.select(searchSelectors.selectShows)
    this.error$ = this.store.select(searchSelectors.selectError)
    this.store.dispatch(ShowActions.fetchShows())
  }

  onSearch(query: string): void {
    if (query.trim() === '') {
      return
    }
    this.searchQuery = query
  }
}
