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
  movies$!: Observable<Movie[]>
  searchResults$!: Observable<Movie[]>
  error$!: Observable<unknown>
  searchQuery: string = ''

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.movies$ = this.store.select(MovieSelectors.selectMovies)
    this.searchResults$ = this.store.select(searchSelectors.selectMovies)
    this.error$ = this.store.select(searchSelectors.selectError)

    this.store.dispatch(MovieActions.fetchMovies())
  }

  onSearch(query: string): void {
    if (query.trim() === '') {
      return
    }
    this.searchQuery = query
    this.store.dispatch(SearchActions.searchMovies({ query }))
  }
}
