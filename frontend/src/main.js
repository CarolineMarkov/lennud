import { createApp } from 'vue';
import router from './router';
import store from './store';
import LennuValimine from './views/LennuValimine.vue';



createApp(LennuValimine).use(store).use(router).mount('#app');