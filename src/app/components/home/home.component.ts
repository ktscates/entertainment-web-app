import { Component, OnInit } from '@angular/core'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { SearchComponent } from '../search/search.component'
import { RouterOutlet } from '@angular/router'
import { catchError, Observable, of } from 'rxjs'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import * as SearchActions from '../../store/actions/search.actions'
import { Movie } from '../../model/model'
import * as searchSelectors from '../../store/selectors/search.selectors'
import * as TrendingActions from '../../store/actions/trending.actions'
import * as TrendingSelectors from '../../store/selectors/trending.selectors'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { TrendingCardComponent } from '../trending-card/trending-card.component'
import * as RecommendedActions from '../../store/actions/recommended.actions'
import * as RecommendedSelectors from '../../store/selectors/recommended.selectors'

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
  trendingMovies$!: Observable<Movie[]> // Observable for trending movies
  recommendedMovies$!: Observable<Movie[]>
  searchResults$!: Observable<Movie[]> // Observable for search results
  error$!: Observable<string | null> // Error observable
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

    // Fetch trending movies on init
    this.store.dispatch(TrendingActions.fetchTrendingMovies())
    // Fetch recommended movies on init
    this.store.dispatch(RecommendedActions.fetchRecommendedMovies())
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
