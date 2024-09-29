import { TestBed } from '@angular/core/testing'
import { MovieService } from './movie.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { ApiResponse, Movie, TvShow } from '../../model/model'

describe('MovieService', () => {
  let service: MovieService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    })
    service = TestBed.inject(MovieService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should fetch trending movies and shows', () => {
    const mockResponse: ApiResponse<Movie | TvShow> = {
      results: [
        {
          id: 1,
          title: 'Movie 1',
          media_type: 'movie',
          release_date: '2022-01-01',
        } as Movie,
        {
          id: 2,
          name: 'Show 1',
          media_type: 'tv',
          first_air_date: '2022-01-01',
        } as TvShow,
      ],
    }
    service.getTrendingMoviesShow().subscribe(response => {
      expect(response.results.length).toBe(2)
      expect(response.results[0].media_type).toBe('movie')
      expect(response.results[1].media_type).toBe('tv')
    })
    const req = httpMock.expectOne(
      `${service['apiUrl']}/trending/all/day?api_key=${service['apiKey']}&include_adult=false&language=en-US`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should return an observable of ApiResponse containing Movie objects', () => {
    const mockResponse: ApiResponse<Movie> = {
      results: [
        {
          id: 1,
          title: 'Movie 1',
          media_type: 'movie',
          release_date: '2022-01-01',
        } as Movie,
      ],
    }
    service.getMovies().subscribe(response => {
      expect(response.results.length).toBeGreaterThan(0)
      expect(response.results[0].name).toBe('Test Show')
    })
    const req = httpMock.expectOne(
      `${service['apiUrl']}/movie/popular?api_key=${service['apiKey']}&include_adult=false&language=en-US`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should return an observable of ApiResponse containing TvShow objects', () => {
    const mockResponse: ApiResponse<TvShow> = {
      results: [
        {
          id: 2,
          name: 'Show 1',
          media_type: 'tv',
          first_air_date: '2022-01-01',
        } as TvShow,
      ],
    }
    service.getShows().subscribe(response => {
      expect(response.results.length).toBeGreaterThan(0)
      expect(response.results[0].name).toBe('Test Show')
    })
    const req = httpMock.expectOne(
      `${service['apiUrl']}/tv/popular?api_key=${service['apiKey']}&include_adult=false&language=en-US`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should return an observable of ApiResponse containing recommended Movie objects', () => {
    const mockResponse: ApiResponse<Movie> = {
      results: [
        {
          id: 1,
          title: 'Movie 1',
          media_type: 'movie',
          release_date: '2022-01-01',
        } as Movie,
      ],
    }
    service.getRecommendedMoviesShows().subscribe(response => {
      expect(response.results.length).toBeGreaterThan(0)
      expect(response.results[0].name).toBe('Test Show')
    })
    const req = httpMock.expectOne(
      `${service['apiUrl']}/movie/27205/recommendations?api_key=${service['apiKey']}&language=en-US`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should search movies and shows', () => {
    const mockResponse: ApiResponse<Movie | TvShow> = {
      results: [
        {
          id: 1,
          title: 'Search Movie 1',
          media_type: 'movie',
          release_date: '2022-01-01',
        } as Movie,
        {
          id: 2,
          name: 'Search Show 1',
          media_type: 'tv',
          first_air_date: '2022-01-01',
        } as TvShow,
      ],
    }
    service.searchMoviesAndShows('query').subscribe(results => {
      expect(results.length).toBe(2)
      expect(results[0].media_type).toBe('movie')
      expect(results[1].media_type).toBe('tv')
    })
    const req = httpMock.expectOne(
      `${service['apiUrl']}/search/multi?api_key=${service['apiKey']}&query=query&include_adult=false&language=en-US`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should search movies', () => {
    const mockResponse: ApiResponse<Movie> = {
      results: [
        {
          id: 1,
          title: 'Search Movie 1',
          media_type: 'movie',
          release_date: '2022-01-01',
        } as Movie,
      ],
    }
    service.searchMovies('query').subscribe(results => {
      expect(results.length).toBe(2)
      expect(results[0].media_type).toBe('movie')
      expect(results[1].media_type).toBe('tv')
    })
    const req = httpMock.expectOne(
      `${service['apiUrl']}/search/movie?api_key=${service['apiKey']}&query=query&include_adult=false&language=en-US`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should search shows', () => {
    const mockResponse: ApiResponse<TvShow> = {
      results: [
        {
          id: 2,
          name: 'Search Show 1',
          media_type: 'tv',
          first_air_date: '2022-01-01',
        } as TvShow,
      ],
    }
    service.searchTvShows('query').subscribe(results => {
      expect(results.length).toBe(2)
      expect(results[0].media_type).toBe('movie')
      expect(results[1].media_type).toBe('tv')
    })
    const req = httpMock.expectOne(
      `${service['apiUrl']}/search/tv?api_key=${service['apiKey']}&query=query&include_adult=false&language=en-US`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })
})
