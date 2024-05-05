import { createRouter, createWebHistory } from "vue-router";

import Login from '../views/login.vue'
import Blank from '../views/Blank.vue'

const routerHistory = createWebHistory();

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        //meta: { layout: 'empty' },
    },
    {
        path: '/blank',
        name: 'Blank',
        component: Blank
    }
]

const router = createRouter({
    history: routerHistory,
    routes
});


export default router