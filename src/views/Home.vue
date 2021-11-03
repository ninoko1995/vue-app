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
      <div v-if="!isFavoirteList" class="home__pager">
        <button v-if="isPrevShown" @click="movePrev">Prev</button>
        <span class="home__pageCount">{{ currentPage }}/{{ totalPages}}</span>
        <button v-if="isNextShown" @click="moveNext">Next</button>
      </div>
      <table class="home__table">
        <thead class="home__tableHeader">
          <th class="home__tableColumn">タイトル</th>
          <th class="home__tableColumn">言語</th>
          <th class="home__tableColumn">平均評価</th>
          <th class="home__tableColumn">評価数</th>
          <th class="home__tableColumn">公開日</th>
          <th class="home__tableColumn">お気に入り</th>
        </thead>
        <tbody>
          <tr
            v-for="movie in displayMovies"
            :key="movie.id"
            class="home__tableRow"
            @click="selectMovie(movie)"
          >
            <td class="home__tableColumnTitle home__tableColumn">{{ movie.original_title }}</td>
            <td class="home__tableColumn">{{ movie.original_language }}</td>
            <td 
              class="home__tableColumn"
              :class="{
                'home__tableColumnAvarage--low': isVoteAverageLow(movie),
                'home__tableColumnAvarage--high': isVoteAverageHigh(movie),
              }"
            >
              {{ voteAverageText(movie) }}
            </td>
            <td class="home__tableColumn">{{ voteCountText(movie) }}</td>
            <td class="home__tableColumn">{{ releaseDateText(movie) }}</td>
            <td class="home__tableColumn" @click="clickFavorite($event, movie)">
              <fa class="home__icon" v-if="isFavorited(movie)" icon="heart" />
              <fa class="home__icon" v-else :icon="['far', 'heart']" />
            </td>
          </tr>
        </tbody>
      </table>
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

  clickFavorite(event: any, movie: Movie) {
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

  isFavorited(movie: Movie): boolean {
    return this.favoriteMovies.filter(favo => favo.id == movie.id ).length != 0;
  }

  voteAverageText(movie: Movie): string {
    return movie.vote_average == 0 ? "-" : String(movie.vote_average); 
  }

  isVoteAverageLow(movie: Movie): boolean {
    return movie.vote_average <= 3;
  }

  isVoteAverageHigh(movie: Movie): boolean {
    return movie.vote_average > 8;
  }

  voteCountText(movie: Movie): string {
    return movie.vote_count == 0 ? "-" : String(movie.vote_count); 
  }

  releaseDateText(movie: Movie): string {
    return movie.release_date == "" ? "-" : String(movie.release_date); 
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

  get isPrevShown(): boolean {
    return this.currentPage != 1;
  }

  get isNextShown(): boolean {
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
  border: 1px solid rgba(150, 200, 50, 1);
  border-radius: 20px;
  padding: 10px;
}

.home__tableColumn {
  padding: 2px 10px 2px 10px;
}

.home__tableColumnAvarage--low {
  color: blue;
}

.home__tableColumnAvarage--high {
  color: rgb(247, 3, 186);
}

.home__tableColumnTitle {
  text-align: left;
  font-weight: bold;
}

.home__icon {
  color: pink;
}

.home__pager {
  margin-top:10px;
  margin-bottom:10px;
}

.home__pageCount {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
