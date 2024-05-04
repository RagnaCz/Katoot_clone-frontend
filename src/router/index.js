import { createRouter, createWebHistory } from "vue-router";

import Login from '../views/login.vue'
import Dashboard from "../views/dashboard.vue"
import Mainmenu from '../components/mainmenu.vue'

const routerHistory = createWebHistory();

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        children: [
            { path: '/mainmenu', component: Mainmenu },
        ]
    }
]

const router = createRouter({
    history: routerHistory,
    routes
});


export default router