<template>
  <div class="home">
    <div class="home__switchButton">
      <button @click="switchList">{{ currentTitle }}</button>
    </div>
    <div v-if="notSearched" class="home__notSearched">
      上の検索欄から検索してください！
    </div>
    <div v-else-if="isEmpty" class="home__isEmpty">
      検索結果がありません
    </div>
    <div v-else class="home__container">
      <table class="home__table">
        <thead>
          <th>タイトル</th>
          <th>言語</th>
          <th>平均評価</th>
          <th>評価数</th>
          <th>公開日</th>
          <th>お気に入り</th>
        </thead>
        <tbody>
          <tr
            v-for="movie in displayMovies"
            :key="movie.id"
            class="home__tableItem"
            @click="selectMovie(movie)"
          >
            <td>{{ movie.title }}</td>
            <td>{{ movie.original_language }}</td>
            <td>{{ movie.vote_average }}</td>
            <td>{{ movie.vote_count }}</td>
            <td>{{ movie.release_date }}</td>
            <td @click="favorite($event, movie)">
              <fa class="home__icon" v-if="isFavorited(movie)" icon="heart" />
              <fa class="home__icon" v-else :icon="['far', 'heart']" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!isFavoirteList" class="home__pager">
        <button v-if="showPrev" @click="movePrev">Prev</button>
        <span class="home__page">{{ currentPage }}/{{ totalPages}}</span>
        <button v-if="showNext" @click="moveNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from "vuex"
import { Movie } from "../models/Movie";

@Options({
})
export default class Home extends Vue {
  store = useStore()
  isFavoirteList: boolean = false;

  selectMovie(movie: Movie) {
    this.store.dispatch("movie/getMovie", movie.id);
  }

  isFavorited(movie: Movie): boolean {
    return this.favoriteMovies.filter(favo => favo.id == movie.id ).length != 0;
  }

  favorite(event: any, movie: Movie) {
    if (this.isFavorited(movie)) {
      this.store.commit("favorite/removeFavorite", movie);
    } else {
      this.store.commit("favorite/addFavorite", movie);
    }
    event.stopPropagation();
  }

  movePrev() {
    this.store.dispatch("movie/searchMovies", { 
      query: this.store.state.movie.query, 
      page: this.store.state.movie.currentPage - 1
    });
  }

  moveNext() {
    this.store.dispatch("movie/searchMovies", { 
      query: this.store.state.movie.query, 
      page: this.store.state.movie.currentPage + 1
    });
  }

  switchList() {
    this.isFavoirteList = !this.isFavoirteList;
  }

  get displayMovies(): Movie[] {
    if (this.isFavoirteList) {
      return this.favoriteMovies;
    } else {
      return this.movies;
    }
  }

  get currentTitle(): string {
    if (this.isFavoirteList) {
      return "検索結果を見る";
    } else {
      return "お気に入り一覧を見る";
    }
  }

  get notSearched(): boolean {
    return this.currentPage == null && !this.isFavoirteList;
  }

  get isEmpty(): boolean {
    return this.totalPages == 0 && this.currentPage == 1 && !this.isFavoirteList;
  }

  get showPrev(): boolean {
    return this.currentPage != 1;
  }

  get showNext(): boolean {
    return this.currentPage != this.totalPages;
  }

  get movies(): Movie[] {
    return this.store.state.movie.movies;
  }

  get favoriteMovies(): Movie[] {
    return this.store.state.favorite.favoriteMovies;
  }

  get currentPage(): number | null {
    return this.store.state.movie.currentPage;
  }

  get totalPages(): number | null {
    return this.store.state.movie.totalPages;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home__switchButton {
  margin-bottom: 20px;
}

.home__table {
  margin: 0 auto;
}

.home__icon {
  color: pink;
}

.home__page {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
