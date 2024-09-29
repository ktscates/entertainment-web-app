import { TestBed } from '@angular/core/testing'

import { BookmarkService } from './bookmark.service'
import { AuthService } from '../auth/auth.service'
import { Movie, TvShow } from '../../model/model'
import { of } from 'rxjs'

describe('BookmarkService', () => {
  let service: BookmarkService
  let authServiceMock: jest.Mocked<AuthService>

  beforeEach(() => {
    authServiceMock = {
      getCurrentUserId: jest.fn(),
    } as unknown as jest.Mocked<AuthService>

    TestBed.configureTestingModule({
      providers: [
        BookmarkService,
        { provide: AuthService, useValue: authServiceMock },
      ],
    })
    service = TestBed.inject(BookmarkService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return bookmarks for logged-in user', done => {
    const mockUserId = 'userId'
    const mockBookmarks: Movie[] = [
      { id: 1, title: 'Movie 1', release_date: '2023-01-01' } as Movie,
    ]
    authServiceMock.getCurrentUserId.mockReturnValue(of(mockUserId))
    localStorage.setItem(
      `bookmarks_${mockUserId}`,
      JSON.stringify(mockBookmarks)
    )
    service.getBookmarks().subscribe(bookmarks => {
      expect(bookmarks).toEqual(mockBookmarks)
      done()
    })
  })

  it('should return an empty array if no user is logged in', done => {
    authServiceMock.getCurrentUserId.mockReturnValue(of(null))
    service.getBookmarks().subscribe(bookmarks => {
      expect(bookmarks).toEqual([])
      done()
    })
  })

  it('should save bookmarks for the current user', () => {
    const mockUserId = 'user123'
    const mockBookmarks: Movie[] = [
      { id: 1, title: 'Movie 1', release_date: '2023-01-01' } as Movie,
    ]
    authServiceMock.getCurrentUserId.mockReturnValue(of(mockUserId))
    service.saveBookmarks(mockBookmarks)
    const savedBookmarks = localStorage.getItem(`bookmarks_${mockUserId}`)
    expect(savedBookmarks).toEqual(JSON.stringify(mockBookmarks))
  })

  it('should check if an item is bookmarked', done => {
    const mockUserId = 'userId'
    const mockBookmarks: (Movie | TvShow)[] = [
      { id: 1, title: 'Movie 1', release_date: '2023-01-01' } as Movie,
    ]
    const mockMovie: Movie = {
      id: 1,
      title: 'Movie 1',
      release_date: '2023-01-01',
    } as Movie

    authServiceMock.getCurrentUserId.mockReturnValue(of(mockUserId))
    localStorage.setItem(
      `bookmarks_${mockUserId}`,
      JSON.stringify(mockBookmarks)
    )

    service.isBookmarked(mockMovie).subscribe(isBookmarked => {
      expect(isBookmarked).toBe(true)
      done()
    })
  })

  it('should return false if an item is not bookmarked', done => {
    const mockUserId = 'userId'
    const mockBookmarks: (Movie | TvShow)[] = [
      { id: 1, title: 'Movie 1', release_date: '2023-01-01' } as Movie,
    ]
    const mockMovie: Movie = {
      id: 2,
      title: 'Movie 2',
      release_date: '2023-02-02',
    } as Movie

    authServiceMock.getCurrentUserId.mockReturnValue(of(mockUserId))
    localStorage.setItem(
      `bookmarks_${mockUserId}`,
      JSON.stringify(mockBookmarks)
    )

    service.isBookmarked(mockMovie).subscribe(isBookmarked => {
      expect(isBookmarked).toBe(false)
      done()
    })
  })

  it('should toggle a bookmark (add if not present)', done => {
    const mockUserId = 'user123'
    const mockBookmarks: (Movie | TvShow)[] = [
      { id: 1, title: 'Movie 1', release_date: '2023-01-01' } as Movie,
    ]
    const newBookmark: Movie = {
      id: 2,
      title: 'Movie 2',
      release_date: '2023-02-02',
    } as Movie

    authServiceMock.getCurrentUserId.mockReturnValue(of(mockUserId))
    localStorage.setItem(
      `bookmarks_${mockUserId}`,
      JSON.stringify(mockBookmarks)
    )

    service.toggleBookmark(newBookmark)
    setTimeout(() => {
      const updatedBookmarks = JSON.parse(
        localStorage.getItem(`bookmarks_${mockUserId}`) || '[]'
      )
      expect(updatedBookmarks.length).toBe(2)
      expect(updatedBookmarks).toContainEqual(newBookmark)
      done()
    }, 0)
  })

  it('should toggle a bookmark (remove if present)', done => {
    const mockUserId = 'user123'
    const mockBookmarks: (Movie | TvShow)[] = [
      { id: 1, title: 'Movie 1', release_date: '2023-01-01' } as Movie,
      { id: 2, title: 'Movie 2', release_date: '2023-02-02' } as Movie,
    ]

    const bookmarkToRemove: Movie = {
      id: 2,
      title: 'Movie 2',
      release_date: '2023-02-02',
    } as Movie

    authServiceMock.getCurrentUserId.mockReturnValue(of(mockUserId))
    localStorage.setItem(
      `bookmarks_${mockUserId}`,
      JSON.stringify(mockBookmarks)
    )

    service.toggleBookmark(bookmarkToRemove)
    setTimeout(() => {
      const updatedBookmarks = JSON.parse(
        localStorage.getItem(`bookmarks_${mockUserId}`) || '[]'
      )
      expect(updatedBookmarks.length).toBe(1)
      expect(updatedBookmarks).not.toContainEqual(bookmarkToRemove)
      done()
    }, 0)
  })

  it('should subscribe to getBookmarks observable when loadBookmarks is called', () => {
    const getBookmarksSpy = jest
      .spyOn(service, 'getBookmarks')
      .mockReturnValue(of([]))

    service.loadBookmarks()
    expect(getBookmarksSpy).toHaveBeenCalled()
  })
})
