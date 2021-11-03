import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../../store/";
import { Movie, DetailedMovie } from "../../models/Movie";
import { SearchMovieResponse, MovieDetailResponse } from "../../api/apis/ApiMovie";

export class MovieState {
  query: String = ""
  currentPage: number | null = null;
  totalPages: number | null = null;
  favoriteMovies: Movie[] = [];
  movies: Movie[] = [];
  selectedMovie: DetailedMovie | null = null;
}

const mutations: MutationTree<MovieState> = {
  initialize(state: MovieState) {
    state.query = "";
    state.currentPage = null;
    state.totalPages = null;
    state.favoriteMovies = [];
    state.movies = [];
    state.selectedMovie = null;
  },

  setQuery(state: MovieState, query: string) {
    state.query = query;
  },

  setCurrentPage(state: MovieState, page: number) {
    state.currentPage = page;
  },

  setTotalPages(state: MovieState, totalPages: number) {
    state.totalPages = totalPages;
  },

  setFavoriteMovieIds(state: MovieState, movies: Movie[]) {
    state.favoriteMovies = movies;
  },

  setMovies(state: MovieState, movies: Movie[]) {
    state.movies = movies;
  },

  setSelectedMovie(state: MovieState, movie: DetailedMovie) {
    state.selectedMovie = movie;
  },

  addFavorite(state: MovieState, movie: Movie) {
    for (let i = 0; i < state.favoriteMovies.length; i++) {
      const fav = state.favoriteMovies[i];
      if (fav.id === movie.id) {
        return;
      }
    }
    state.favoriteMovies.unshift(movie);
  },
  
  removeFavorite(state: MovieState, movie: Movie) {
    state.favoriteMovies = state.favoriteMovies.filter(fav => {
      return fav.id != movie.id;
    });
  },
};

const actions: ActionTree<MovieState, RootState> = {
  async searchMovies({ commit, rootState }, data: { query: string, page: number}) {
    const result: SearchMovieResponse = await rootState.api.movie.searchMovies(data.query, data.page);
    const currentPage: number = result["page"];
    const totalPages: number = result["total_pages"];
    const movies: Movie[] = result["results"].map(Movie.fromJson);

    commit("setQuery", data.query);
    commit("setMovies", movies);
    commit("setCurrentPage", currentPage);
    commit("setTotalPages", totalPages);
  },

  async getMovie({ commit, rootState }, movieId: number) {
    const result: MovieDetailResponse = await rootState.api.movie.getMovie(String(movieId));
    const movie: DetailedMovie = DetailedMovie.fromJson(result);

    commit("setSelectedMovie", movie);
  },
};

export const movie = {
  namespaced: true,
  state: new MovieState(),
  mutations,
  actions
};
