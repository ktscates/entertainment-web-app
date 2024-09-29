import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MovieCardComponent } from './movie-card.component'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { AuthService } from '../../services/auth/auth.service'
import {
  addBookmark,
  removeBookmark,
} from '../../store/actions/bookmark.actions'

class MockStore {
  select = jest.fn()
  dispatch = jest.fn()
}

class MockAuthService {
  someMethod = jest.fn()
}

describe('MovieCardComponent', () => {
  let component: MovieCardComponent
  let fixture: ComponentFixture<MovieCardComponent>
  let mockStore: MockStore

  const mockMovie = {
    adult: false,
    backdrop_path: 'path/to/backdrop.jpg',
    genre_ids: [28, 12],
    id: 1,
    media_type: 'movie',
    original_language: 'en',
    original_title: 'Test Movie',
    overview: 'This is a test movie.',
    popularity: 10,
    poster_path: 'path/to/poster.jpg',
    release_date: '2024-09-30',
    title: 'Test Movie',
    video: false,
    vote_average: 8.5,
    vote_count: 100,
    first_air_date: '',
    name: '',
  }

  beforeEach(async () => {
    mockStore = new MockStore()
    mockStore.select.mockReturnValue(of([]))

    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: AuthService, useValue: new MockAuthService() },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(MovieCardComponent)
    component = fixture.componentInstance
    component.movie = mockMovie
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should subscribe to bookmarks$ observable on initialization', () => {
    const subscribeSpy = jest.spyOn(component.bookmarks$, 'subscribe')
    component.ngOnInit()
    expect(subscribeSpy).toHaveBeenCalled()
  })

  it('should return movie ID when movie is defined', () => {
    component.movie.id = 1
    const result = component.getItemId()
    expect(result).toBe(1)
  })

  it('should dispatch addBookmark or removeBookmark action when movie is provided', () => {
    mockStore.select.mockReturnValue(of([component.movie]))
    component.isBookmarked = false
    component.toggleBookmark()
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addBookmark({ item: component.movie })
    )
    component.isBookmarked = true
    component.toggleBookmark()
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeBookmark({ itemId: component.movie.id })
    )
  })
})
