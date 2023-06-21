import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Vue, { createApp } from '@vue/compat';
import App from './App.vue'
import './assets/main.css'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

createApp(App).mount('#app')
