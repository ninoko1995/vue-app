import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(solidHeart);
library.add(regularHeart);

const app = createApp(App).use(store)
app.component('fa', FontAwesomeIcon )

app.mount('#app')