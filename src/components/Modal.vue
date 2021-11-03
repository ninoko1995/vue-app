<template>
  <div class="modal" @click="$emit('click-close')">
    <div class="modal__container">
        <div>{{ movie.title }} </div>
        <div>{{ movie.homepage }} </div>
        <div>{{ movie.overview }} </div>
        <div>{{ movie.adult }} </div>
        <div>{{ movie.genres }} </div>
        <div>{{ movie.original_language }} </div>
        <div>{{ movie.original_title }} </div>
        <div>{{ movie.popularity }} </div>
        <div>{{ movie.production_companies }} </div>
        <div>{{ movie.production_countries }} </div>
        <div>{{ movie.release_date }} </div>
        <div>{{ movie.revenue }} </div>
        <div>{{ movie.spoken_languages }} </div>
        <div>{{ movie.status }} </div>
        <div>{{ movie.video }} </div>
        <div>{{ movie.vote_average }} </div>
        <div>{{ movie.vote_count }} </div>
        <div>{{ movie.backdrop_path }} </div>
        <div>{{ movie.belongs_to_collection }} </div>
        <div>{{ movie.budget }} </div>
        <div>{{ movie.imdb_id }} </div>
        <div>{{ movie.poster_path }} </div>
        <div>{{ movie.runtime }} </div>
        <div>{{ movie.tagline }} </div>
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
  value = "";
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
  width: 800px;
  background-color: white;
}
</style>
