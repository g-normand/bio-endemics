import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

// import "./main.scss";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);



new Vue({
    render: (h) => h(App),
}).$mount("#app");