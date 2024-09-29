import { Component } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { Observable } from 'rxjs'
import { TvShow } from '../../model/model'
import { Store } from '@ngrx/store'
import * as searchSelectors from '../../store/selectors/search.selectors'
import * as ShowSelectors from '../../store/selectors/shows.selectors'
import * as ShowActions from '../../store/actions/shows.actions'
import * as SearchActions from '../../store/actions/search.actions'
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
export class TvShowComponent {
  shows$!: Observable<TvShow[]> // Observable for trending movies
  searchResults$!: Observable<TvShow[]> // Observable for search results
  error$!: Observable<string | null> // Error observable
  searchQuery: string = ''

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Initialize observables here
    this.shows$ = this.store.select(ShowSelectors.selectShows)
    this.searchResults$ = this.store.select(searchSelectors.selectShows)
    this.error$ = this.store.select(searchSelectors.selectError)

    // Fetch trending movies on init
    this.store.dispatch(ShowActions.fetchShows())
    this.shows$.subscribe(shows => console.log('Trending Movies:', shows))
    this.searchResults$.subscribe(results =>
      console.log('Search Results:', results)
    )
  }

  onSearch(query: string): void {
    if (query.trim() === '') {
      return
    }

    this.searchQuery = query // Update searchQuery with the new query
    console.log('Search Query:', query)
    this.store.dispatch(SearchActions.searchMovies({ query }))
  }
}
