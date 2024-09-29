import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { BookmarkComponent } from './bookmark.component'
import { Movie, TvShow } from '../../model/model'
import { AuthService } from '../../services/auth/auth.service'

class MockStore {
  select = jest.fn()
}

class MockAuthService {
  someMethod = jest.fn()
}

const mockMovies: Movie[] = [
  {
    title: 'Movie 1',
    media_type: 'movie',
    backdrop_path: '',
    genre_ids: [],
    id: 1,
    original_language: 'en',
    original_title: 'Movie 1',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    adult: false,
    first_air_date: '',
    name: '',
  },
]

const mockTvShows: TvShow[] = [
  {
    name: 'TV Show 1',
    media_type: 'tv',
    backdrop_path: '',
    genre_ids: [],
    id: 1,
    first_air_date: '',
    original_language: 'en',
    original_name: 'TV Show 1',
    overview: '',
    popularity: 0,
    poster_path: '',
    vote_average: 0,
    vote_count: 0,
    origin_country: [],
    adult: false,
    title: '',
    release_date: '',
  },
]

describe('BookmarkComponent', () => {
  let component: BookmarkComponent
  let fixture: ComponentFixture<BookmarkComponent>
  let mockStore: MockStore

  beforeEach(async () => {
    mockStore = new MockStore()
    mockStore.select.mockReturnValue(of([...mockMovies, ...mockTvShows]))

    await TestBed.configureTestingModule({
      imports: [BookmarkComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: AuthService, useValue: new MockAuthService() },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BookmarkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should load bookmarks from the store', () => {
    component.bookmarkMovies$.subscribe(bookmarks => {
      expect(bookmarks).toEqual([...mockMovies, ...mockTvShows])
    })
  })
  it('should filter bookmarks based on search query', () => {
    component.onSearch('Movie 1')
    component.searchResults$.subscribe(results => {
      expect(results).toEqual([mockMovies[0]])
    })
    component.onSearch('TV Show 1')
    component.searchResults$.subscribe(results => {
      expect(results).toEqual([mockTvShows[0]])
    })
    component.onSearch('') // Reset the search
    component.searchResults$.subscribe(results => {
      expect(results).toEqual([...mockMovies, ...mockTvShows])
    })
  })
})
