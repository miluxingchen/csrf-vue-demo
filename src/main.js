import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import LoginView from './Login.vue'
import UserView from './User.vue'

const routes = [
  { path: '/', component: LoginView, name: '登录页' },
  { path: '/user', component: UserView, name: '用户资料' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
