import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VuePapaParse from 'vue-papa-parse'
import Vue, { createApp } from '@vue/compat';
import App from './App.vue'
import './assets/main.css'

export const eventBus = new Vue();

const app = createApp(App)

app.use(VuePapaParse)
app.use(BootstrapVue);
app.use(BootstrapVueIcons);

app.mount('#app')
