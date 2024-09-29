import { Component, OnInit } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { RouterOutlet } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import * as SearchActions from '../../store/actions/search.actions'
import { Movie, TvShow } from '../../model/model'
import * as searchSelectors from '../../store/selectors/search.selectors'
import * as TrendingSelectors from '../../store/selectors/trending.selectors'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { TrendingCardComponent } from '../trending-card/trending-card.component'
import * as RecommendedSelectors from '../../store/selectors/recommended.selectors'
import { loadInitialMovies } from '../../store/actions/movie.actions'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    SidenavComponent,
    SearchComponent,
    CommonModule,
    MovieCardComponent,
    TrendingCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  trendingMovies$!: Observable<(Movie | TvShow)[]> // Observable for trending movies
  recommendedMovies$!: Observable<Movie[]>
  searchResults$!: Observable<Movie[]> // Observable for search results
  error$!: Observable<unknown> // Error observable
  searchQuery: string = ''

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Initialize observables here
    this.trendingMovies$ = this.store.select(
      TrendingSelectors.selectTrendingMovies
    )
    this.recommendedMovies$ = this.store.select(
      RecommendedSelectors.selectRecommendedMovies
    )
    this.searchResults$ = this.store.select(
      searchSelectors.selectMoviesAndShows
    )
    this.error$ = this.store.select(searchSelectors.selectError)

    this.store.dispatch(loadInitialMovies())
  }

  onSearch(query: string): void {
    if (query.trim() === '') {
      return
    }

    this.searchQuery = query
    console.log('Search Query:', query)
    this.store.dispatch(SearchActions.searchMoviesAndShows({ query }))
  }
}
