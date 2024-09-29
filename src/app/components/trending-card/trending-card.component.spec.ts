import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TrendingCardComponent } from './trending-card.component'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import * as BookmarkActions from '../../store/actions/bookmark.actions'
import { selectAllBookmarks } from '../../store/selectors/bookmark.selectors'

// Mock Store
class MockStore {
  select = jest.fn()
  dispatch = jest.fn()
}

describe('TrendingCardComponent', () => {
  let component: TrendingCardComponent
  let fixture: ComponentFixture<TrendingCardComponent>
  let mockStore: MockStore

  beforeEach(async () => {
    mockStore = new MockStore()
    mockStore.select.mockReturnValue(of([]))

    await TestBed.configureTestingModule({
      imports: [TrendingCardComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents()

    fixture = TestBed.createComponent(TrendingCardComponent)
    component = fixture.componentInstance

    // Set a valid test movie object
    component.movie = {
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

    mockStore.select.mockReturnValue(of([]))
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set isBookmarked to false initially', () => {
    expect(component.isBookmarked).toBe(false)
  })

  it('should subscribe to bookmarks$ observable on initialization', () => {
    component.ngOnInit()
    expect(mockStore.select).toHaveBeenCalledWith(selectAllBookmarks)
  })

  it('should dispatch addBookmark or removeBookmark action when movie is provided', () => {
    mockStore.select.mockReturnValue(of([component.movie]))
    component.isBookmarked = false
    component.toggleBookmark()
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      BookmarkActions.addBookmark({ item: component.movie })
    )
    component.isBookmarked = true
    component.toggleBookmark()
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      BookmarkActions.removeBookmark({ itemId: component.movie.id })
    )
  })
})
