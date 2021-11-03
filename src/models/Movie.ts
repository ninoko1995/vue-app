import { MovieJson, MovieDetailResponse } from "../api/apis/ApiMovie";
/**
 * Movieの検索結果を格納するクラス
 */

export class Movie {
  constructor(
    public readonly adult: boolean,
    public readonly backdrop_path: String,
    public readonly genre_ids: number[],
    public readonly id: number,
    public readonly original_language: String,
    public readonly original_title: String,
    public readonly overview: String,
    public readonly popularity: number,
    public readonly poster_path: number,
    public readonly release_date: String,
    public readonly title: String,
    public readonly video: boolean,
    public readonly vote_average: number,
    public readonly vote_count: number,
  ) {}

  static fromJson(json: MovieJson): Movie {
    return new Movie(
        json["adult"],
        json["backdrop_path"],
        json["genre_ids"],
        json["id"],
        json["original_language"],
        json["original_title"],
        json["overview"],
        json["popularity"],
        json["poster_path"],
        json["release_date"],
        json["title"],
        json["video"],
        json["vote_average"],
        json["vote_count"],
    );
  }
}

export class DetailedMovie {
  constructor(
    public readonly adult: boolean,
    public readonly genres: string[],
    public readonly id:  number,
    public readonly original_language: string,
    public readonly original_title: string,
    public readonly popularity: number,
    public readonly production_companies: string[],
    public readonly production_countries: string[],
    public readonly release_date: string,
    public readonly revenue: number,
    public readonly spoken_languages: string[],
    public readonly status: string,
    public readonly title: string,
    public readonly video: boolean,
    public readonly vote_average: number,
    public readonly vote_count: number,
    public readonly backdrop_path?: string,
    public readonly belongs_to_collection?: object,
    public readonly budget?: number,
    public readonly homepage?: string,
    public readonly imdb_id?: string,
    public readonly overview?: string,
    public readonly poster_path?: string,
    public readonly runtime?: number,
    public readonly tagline?: string,
    
  ) {}

  static fromJson(json: MovieDetailResponse): DetailedMovie {
    return new DetailedMovie(
      json["adult"],
      json["genres"].map((obj) => obj["name"]),
      json["id"],
      json["original_language"],
      json["original_title"],
      json["popularity"],
      json["production_companies"].map((obj) => obj["name"]),
      json["production_countries"].map((obj) => obj["name"]),
      json["release_date"],
      json["revenue"],
      json["spoken_languages"].map((obj) => obj["name"]),
      json["status"],
      json["title"],
      json["video"],
      json["vote_average"],
      json["vote_count"],
      json["backdrop_path"],
      json["belongs_to_collection"],
      json["budget"],
      json["homepage"],
      json["imdb_id"],
      json["overview"],
      json["poster_path"],
      json["runtime"],
      json["tagline"],
    );
  }
}
