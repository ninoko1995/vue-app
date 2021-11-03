<template>
  <Header @keydown-enter="searchMovie"/>
  <Home />
  <Modal v-if="showModal" :movie="selectedMovie" @click-close="unselectMovie"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from "vuex"
import HelloWorld from './views/HelloWorld.vue';
import Home from './views/Home.vue';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';
import { DetailedMovie } from "./models/Movie";


@Options({
  components: {
    Header,
    HelloWorld,
    Home,
    Modal,
  },
})
export default class App extends Vue {
  store = useStore();

  async searchMovie(value: string) {
    if (value == "") {
      return;
    }

    try {
      this.store.commit("movie/initialize");
      await this.store.dispatch("movie/searchMovies", { query: value, page: 1 });
    } catch (e) {
      console.log(e);
    }
  }

  unselectMovie() {
    this.store.commit("movie/setSelectedMovie", null);
  }

  get selectedMovie(): DetailedMovie {
    return this.store.state.movie.selectedMovie;
  }

  get showModal(): boolean {
    return this.selectedMovie != null;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
