import { MutationTree } from "vuex";
import { Movie } from "../../models/Movie";

export class FavoriteState {
  favoriteMovies: Movie[] = [];
}

const mutations: MutationTree<FavoriteState> = {
  initialize(state: FavoriteState) {
    state.favoriteMovies = [];
  },

  setFavoriteMovieIds(state: FavoriteState, movies: Movie[]) {
    state.favoriteMovies = movies;
  },

  addFavorite(state: FavoriteState, movie: Movie) {
    for (let i = 0; i < state.favoriteMovies.length; i++) {
      const fav = state.favoriteMovies[i];
      if (fav.id === movie.id) {
        return;
      }
    }
    state.favoriteMovies.unshift(movie);
  },
  
  removeFavorite(state: FavoriteState, movie: Movie) {
    state.favoriteMovies = state.favoriteMovies.filter(fav => {
      return fav.id != movie.id;
    });
  },
};

export const favorite = {
  namespaced: true,
  state: new FavoriteState(),
  mutations,
};
