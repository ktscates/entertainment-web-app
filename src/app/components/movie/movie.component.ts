import { Component, OnInit } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { Observable } from 'rxjs'
import { Movie } from '../../model/model'
import { Store } from '@ngrx/store'
import * as searchSelectors from '../../store/selectors/search.selectors'
import * as MovieActions from '../../store/actions/movie.actions'
import * as MovieSelectors from '../../store/selectors/movie.selectors'
import * as SearchActions from '../../store/actions/search.actions'
import { CommonModule } from '@angular/common'
import { MovieCardComponent } from '../movie-card/movie-card.component'

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    SidenavComponent,
    SearchComponent,
    CommonModule,
    MovieCardComponent,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  movies$!: Observable<Movie[]> // Observable for trending movies
  searchResults$!: Observable<Movie[]> // Observable for search results
  error$!: Observable<unknown> // Error observable
  searchQuery: string = ''

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Initialize observables here
    this.movies$ = this.store.select(MovieSelectors.selectMovies)
    this.searchResults$ = this.store.select(searchSelectors.selectMovies)
    this.error$ = this.store.select(searchSelectors.selectError)

    // Fetch trending movies on init
    this.store.dispatch(MovieActions.fetchMovies())
    this.movies$.subscribe(movies => console.log('Trending Movies:', movies))
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
