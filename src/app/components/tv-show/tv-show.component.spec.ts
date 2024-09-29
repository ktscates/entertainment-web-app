import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TvShowComponent } from './tv-show.component'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { AuthService } from '../../services/auth/auth.service'
import { selectShows } from '../../store/selectors/search.selectors'
import { fetchShows } from '../../store/actions/shows.actions'

// Mock Store
class MockStore {
  select = jest.fn().mockReturnValue(of([]))
  dispatch = jest.fn()
}

class MockAuthService {
  someMethod = jest.fn()
}

describe('TvShowComponent', () => {
  let component: TvShowComponent
  let fixture: ComponentFixture<TvShowComponent>
  let mockStore: MockStore
  let mockAuthService: MockAuthService

  beforeEach(async () => {
    mockStore = new MockStore()
    mockAuthService = new MockAuthService()

    await TestBed.configureTestingModule({
      imports: [TvShowComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TvShowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize observables and dispatch fetchShows action on ngOnInit', () => {
    component.ngOnInit()
    expect(mockStore.select).toHaveBeenCalledWith(selectShows)
    expect(mockStore.select).toHaveBeenCalledWith(selectShows)
    expect(mockStore.dispatch).toHaveBeenCalledWith(fetchShows())
  })

  it('should search shows action on onSearch', () => {
    const query = 'Breaking Bad'
    component.onSearch(query)
    expect(component.searchQuery).toBe(query)
  })

  it('should not search shows if query is empty', () => {
    const query = ' '
    component.onSearch(query)
    expect(component.searchQuery).toBe('')
  })
})
