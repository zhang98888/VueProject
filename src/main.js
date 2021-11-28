import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import './assets/css/global.less';
import $ from "jquery" ;
import tabs from './store/tabs'

const app = createApp(App);
app.provide('$axios', axios);
axios.defaults.baseURL = 'http://8.208.82.237:9000/'
app.config.globalProperties.$http = axios
axios.interceptors.request.use(config =>{
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

app.use(store).use(router).use(ElementPlus).mount('#app')

app.use(tabs)


