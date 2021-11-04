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

      <div class="home__movieCards">
        <div
          v-for="movie in displayMovies"
          :key="movie.id"
          class="home__movieCard"
          @click="selectMovie(movie)"
        >
          <div class="home__image">
            <img v-if="hasBackdrop(movie)" width=210 :src="movie.backdropUrl()">
            <img v-else width=210 src="../assets/noimage.png">
          </div>

          <div class="home__description">
            <div class="home__movieTitle">{{ movie.original_title }}</div>
            <div class="home__movieText">
              <div>
                {{ voteAverageText(movie) }} ({{ voteCountText(movie) }}件)
              </div>
              <div>{{ releaseDateText(movie) }}</div>
              <div @click="clickFavorite($event, movie)">
                <fa class="home__icon" v-if="isFavorited(movie)" icon="heart" />
                <fa class="home__icon" v-else :icon="['far', 'heart']" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isFavoirteList" class="home__pager">
        <button v-if="isPrevShown" @click="movePrev">Prev</button>
        <span class="home__pageCount">{{ currentPage }}/{{ totalPages}}</span>
        <button v-if="isNextShown" @click="moveNext">Next</button>
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

  hasBackdrop(movie: Movie) {
    return movie.backdrop_path !== "" && movie.backdrop_path !== null;
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
      return "See Results";
    } else {
      return "See Favorites";
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

.home__movieCards {
  margin: 0 auto;
  width: 928px;
  display: flex;
  flex-wrap : wrap;
}

.home__movieCard {
  margin: 10px;
  width: 210px;
  height: 200px;
  border: 1px solid rgba(150, 200, 50, 1);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
}

.home__description {
  padding: 0 10px 10px 10px;
}

.home__movieTitle {
  /** 2行以上で省略 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.home__movieText {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
