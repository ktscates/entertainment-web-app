import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MovieComponent } from './movie.component'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import * as MovieActions from '../../store/actions/movie.actions'
import * as SearchActions from '../../store/actions/search.actions'
import * as searchSelectors from '../../store/selectors/search.selectors'
import * as MovieSelectors from '../../store/selectors/movie.selectors'
import { AuthService } from '../../services/auth/auth.service'

class MockStore {
  select = jest.fn()
  dispatch = jest.fn()
}

class MockAuthService {
  someMethod = jest.fn()
}
describe('MovieComponent', () => {
  let component: MovieComponent
  let fixture: ComponentFixture<MovieComponent>
  let mockStore: MockStore

  beforeEach(async () => {
    mockStore = new MockStore()

    mockStore.select.mockImplementation(selector => {
      switch (selector) {
        case MovieSelectors.selectMovies:
          return of([{ id: 1, title: 'Test Movie' }])
        case searchSelectors.selectMovies:
          return of([])
          return of(null)
        default:
          return of(null)
      }
    })

    await TestBed.configureTestingModule({
      imports: [MovieComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: AuthService, useValue: new MockAuthService() },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(MovieComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch trending movies on init', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(MovieActions.fetchMovies())
    component.movies$.subscribe(movies => {
      expect(movies.length).toBe(1)
      expect(movies[0].title).toBe('Test Movie')
    })
  })

  it('should dispatch searchMovies action on search', () => {
    const query = 'Inception'
    component.onSearch(query)
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      SearchActions.searchMovies({ query })
    )
    expect(component.searchQuery).toBe(query)
  })

  it('should not search movies if query is empty', () => {
    const query = ' '
    component.onSearch(query)
    expect(component.searchQuery).toBe('')
  })
})
