import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { Store } from '@ngrx/store'
import { AuthService } from '../../services/auth/auth.service'
import { searchMoviesAndShows } from '../../store/actions/search.actions'

class MockStore {
  select = jest.fn()
  dispatch = jest.fn()
}

class MockAuthService {
  someMethod = jest.fn()
}

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let mockStore: MockStore

  beforeEach(async () => {
    mockStore = new MockStore()

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: AuthService, useValue: new MockAuthService() },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch searchMovies action on search', () => {
    const query = 'Inception'
    component.onSearch(query)
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      searchMoviesAndShows({ query })
    )
    expect(component.searchQuery).toBe(query)
  })

  it('should not search movies if query is empty', () => {
    const query = ' '
    component.onSearch(query)
    expect(component.searchQuery).toBe('')
  })
})
