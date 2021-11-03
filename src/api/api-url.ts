export namespace ApiUrl {
  export const SEARCH_MOVIE = "/search/movie";
  export const MOVIE_DETAIL = (id: string) => `/movie/${id}`;
  export const MOVIE_IMAGE = (id: string) => `/movie/${id}/images`;
}
