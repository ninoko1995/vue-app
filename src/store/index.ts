import Vuex from "vuex";
import { api, ApiState } from "./modules/api";
import { movie, MovieState } from "./modules/movie";
import { favorite, FavoriteState } from "./modules/favorite";

export interface RootState {
  api: ApiState;
  movie: MovieState;
  favorite: FavoriteState;
}

export const store = new Vuex.Store<RootState>({
  modules: { api, movie, favorite },
});