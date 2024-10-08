import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { Movie, TvShow, ApiResponse } from '../../model/model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3'
  private apiKey = environment.apiKey
  private apiToken = environment.apiToken

  constructor(private http: HttpClient) {}

  getTrendingMoviesShow(): Observable<ApiResponse<Movie | TvShow>> {
    const url = `${this.apiUrl}/trending/all/day?api_key=${this.apiKey}&include_adult=false&language=en-US`
    return this.http.get<ApiResponse<Movie | TvShow>>(url, {
      headers: this.getHeaders(),
    })
  }

  getMovies(): Observable<ApiResponse<Movie>> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&include_adult=false&language=en-US`
    return this.http.get<ApiResponse<Movie>>(url, {
      headers: this.getHeaders(),
    })
  }

  getShows(): Observable<ApiResponse<TvShow>> {
    const url = `${this.apiUrl}/tv/popular?api_key=${this.apiKey}&include_adult=false&language=en-US`
    return this.http.get<ApiResponse<TvShow>>(url, {
      headers: this.getHeaders(),
    })
  }

  getRecommendedMoviesShows(): Observable<ApiResponse<Movie>> {
    const url = `${this.apiUrl}/movie/27205/recommendations?api_key=${this.apiKey}&language=en-US`
    return this.http.get<ApiResponse<Movie>>(url, {
      headers: this.getHeaders(),
    })
  }

  searchMoviesAndShows(query: string): Observable<(Movie | TvShow)[]> {
    const url = `${this.apiUrl}/search/multi?api_key=${this.apiKey}&query=${query}&include_adult=false&language=en-US`
    return this.http
      .get<ApiResponse<Movie | TvShow>>(url)
      .pipe(map(response => response.results))
  }

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&include_adult=false&language=en-US`
    return this.http
      .get<ApiResponse<Movie>>(url)
      .pipe(map(response => response.results))
  }

  searchTvShows(query: string): Observable<TvShow[]> {
    const url = `${this.apiUrl}/search/tv?api_key=${this.apiKey}&query=${query}&include_adult=false&language=en-US`
    return this.http
      .get<ApiResponse<TvShow>>(url)
      .pipe(map(response => response.results))
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.apiToken,
    })
  }
}
