<template>
  <div class="modal" @click="$emit('click-close')">
    <div class="modal__container">
      <div class="modal__title">
        <div class="modal__titleTranselated">{{ movie.title }}</div>
        <div class="modal__titleOriginal">({{ movie.original_title }})</div>
      </div>

      <div class="modal__body">
        <div class="modal__images">
          <img width=300 :src="posterUrl">
        </div>

        <div class="modal__descriptions">
          <div>{{ movie.overview }}</div>
          
          <table class="modal__table">
            <tr>
                <th class="modal__rowTitle">タグライン</th>
                <td>{{ movie.tagline }}</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">HP</th>
                <td>{{ movie.homepage }} </td>
            </tr>
            <tr v-if="movie.adult">
                <th class="modal__rowTitle">年齢制限</th>
                <td>不適切な表現を含みます</td>
            </tr>
             <tr>
                <th class="modal__rowTitle">ジャンル</th>
                <td><span v-for="genre in movie.genres" :key="movie.id + '-' + genre"> {{ genre }} /</span></td>
            </tr>
            <tr>
                <th class="modal__rowTitle">オリジナル</th>
                <td>{{ movie.original_language }}</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">吹き替え</th>
                <td><span v-for="lang in movie.spoken_languages" :key="movie.id + '-' + lang"> {{ lang }} /</span></td>
            </tr>
            <tr>
                <th class="modal__rowTitle">評価</th>
                <td>{{ movie.vote_average }} ({{ movie.vote_count }}件)</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">公開日</th>
                <td>{{ movie.release_date }}</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">公開状況</th>
                <td>{{ movie.status }}</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">時間</th>
                <td>{{ movie.runtime }}分</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">人気度</th>
                <td>{{ movie.popularity }}</td>
            </tr>
             <tr>
                <th class="modal__rowTitle">製作会社</th>
                <td><span v-for="comp in movie.production_companies" :key="movie.id + '-' + comp"> {{ comp }} /</span></td>
            </tr>
            <tr>
                <th class="modal__rowTitle">撮影場所</th>
                <td><span v-for="country in movie.production_countries" :key="movie.id + '-' + country"> {{ country }} /</span></td>
            </tr>
            <tr>
                <th class="modal__rowTitle">予算</th>
                <td>{{ movie.budget }}</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">収益</th>
                <td>{{ movie.revenue }}</td>
            </tr>
            <tr>
                <th class="modal__rowTitle">ビデオ化</th>
                <td v-if="movie.video">Yes</td>
                <td v-else>No</td>
            </tr>
            
          </table>
        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { DetailedMovie } from "../models/Movie";

@Options({
  props: {
    movie: DetailedMovie
  },
  emits: ["click-close"]
})
export default class Modal extends Vue {
  movie!: DetailedMovie
  baseUrl = "https://image.tmdb.org/t/p/w500";

  get posterUrl(): string {
    return this.baseUrl + this.movie.poster_path;
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__container {
  border-radius: 10px;
  max-width: 1000px;
  background-color: white;
  padding: 20px;
}

.modal__title {
  margin-bottom: 10px;
}

.modal__titleTranselated {
  line-height: 40px;
  font-size: 40px;
  font-weight: bold;
}

.modal__titleOriginal {
  font-size: 20px;
  font-weight: bold;
}

.modal__body {
  display: flex;
}

.modal__images {
  margin-right: 10px;
}

.modal__table {
  margin-top: 10px;
}

.modal__rowTitle {
  width: 80px;
}
</style>
