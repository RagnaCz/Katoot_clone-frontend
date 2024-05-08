import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Login from '../views/login.vue'
import Dashboard from "../views/dashboard.vue"
import Register from '../views/register.vue'
import Editor from '../views/editor.vue'
import Join from '../views/join.vue'

import Library from '../components/Library.vue'
import History from '../components/History.vue'
import Config from '../components/Config.vue'

const routerHistory = createWebHistory();

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        
        path: '/dashboard',
        redirect: '/library'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/join',
        name: 'join',
        component: Join,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        },
        children: [
            { path: '/library', name: 'library', component: Library },
            { path: '/history', name: 'history', component: History },
            { path: '/config', name: 'config', component: Config },
        ]
    },
    {
        path: '/editor',
        name: 'editor',
        component: Editor,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: routerHistory,
    routes
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener()
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth) {
        if (await getCurrentUser()) {
            console.log("You are authorized to access this area.");
            next()
        } else {
            console.log("You are not authorized to access this area.")
            next('login')
        }
    } else {
        next()
    }
})

export default router