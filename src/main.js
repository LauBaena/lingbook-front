import { createApp } from 'vue'
import App from './App.vue'

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import router from './router'
import { createPinia } from "pinia";

createApp(App).use(VuePlyr, {plyr:{}}).use(createPinia()).use(router).mount('#app')

