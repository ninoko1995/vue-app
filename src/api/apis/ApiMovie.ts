import HttpClient from "../HttpClient";
import { ApiUrl } from "../api-url";

export interface SearchMovieResponse {
  page: number;
  results: MovieResponse[];
  total_pages: number;
	total_results: number;
}

export interface MovieResponse {
  adult: boolean;
  backdrop_path: String,
  genre_ids: number[];
  id: number;
  original_language: String;
  original_title: String;
  overview: String;
  popularity: number;
  poster_path: number;
  release_date: String;
  title: String;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  name:string;
  id: number;
  logo_path?: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface MovieDetailResponse {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: object;
  budget?: number;
  genres: genre[];
  homepage?: string;
  id:  number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default class ApiMovie {
  constructor(private readonly httpClient: HttpClient) {}

  // searchMovie by inputted string
  public searchMovies(query: string, page: number = 1): Promise<SearchMovieResponse> {
    return this.httpClient.get<SearchMovieResponse>(ApiUrl.SEARCH_MOVIE, { "query": query, "page": page });
  }

  // get detailed movie information
  public getMovie(id: string): Promise<MovieDetailResponse> {
    return this.httpClient.get<MovieDetailResponse>(ApiUrl.MOVIE_DETAIL(id));
  }
}
