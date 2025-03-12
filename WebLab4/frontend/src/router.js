import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import MainPage from './views/MainPage.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/main', component: MainPage, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router