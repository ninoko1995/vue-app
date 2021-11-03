import { MutationTree } from "vuex";
import HttpClient from "../../api/HttpClient";
import ApiMovie from "../../api/apis/ApiMovie";
import { RootState } from "../../store/";

export class ApiState {
  httpClient = new HttpClient();
  movie = new ApiMovie(this.httpClient);
}

const mutations: MutationTree<ApiState> = {
  setHttpClient(state: ApiState, client: HttpClient) {
    state.httpClient = client;
    state.movie = new ApiMovie(state.httpClient);
  }
};

export const api = {
  namespaced: true,
  state: new ApiState(),
  mutations,
};
