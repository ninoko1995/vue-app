import Vuex from "vuex";
import { api, ApiState } from "./modules/api";
import { movie, MovieState } from "./modules/movie";

export interface RootState {
  api: ApiState;
  movie: MovieState;
}

export const store = new Vuex.Store<RootState>({
  modules: { api, movie },
});