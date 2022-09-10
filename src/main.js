import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios'

const Application = createApp(App)
Application.config.globalProperties.axios=axios
Application.use(router);
Application.use(Toast);
Application.mount('#app');
