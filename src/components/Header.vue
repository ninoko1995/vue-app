<template>
  <div class="header">
    <div class="header__left">
      <img class="header__logo" alt="Vue logo" src="../assets/logo.png">
      <div class="header__title">MovieSearch</div>
    </div>

    <div class="header__center">
       <input
        class="header__input"
        :value="value"
        :placeholder="'SearchMovie'"
        @input="onInput($event.target.value)"
        @keydown.enter="onKeydownEnter"
      />
    </div>

    <div class="header__right" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  emits: ["keydown-enter"]
})
export default class Header extends Vue {
  value = "";

  onInput(value: string) {
    this.value = value;
  }

  onKeydownEnter(event: any) {
    // 日本語編集中のenterには反応させないようにする
    if (event.keyCode === 13) {
      this.$emit("keydown-enter", this.value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(150, 200, 50, 1);

  align-items: center;
}

.header__left {
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 125px;
}

.header__logo {
  height: 30px;
  width: 30px;
}

.header__title {
  padding-left: 5px;
  height: 40px;
  line-height: 40px;
  color: white;
  font-size: 20px;
  width: 90px;
}

.header__center {
  margin: 0 auto;
} 

.header__input {
  width: 400px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid white;
}

.header__input:focus {
  outline: none;
}

.header__right {
  width: 145px;
}
</style>
