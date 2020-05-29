import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'
// import HelloWorld from '../components/HelloWorld'
import Charts from '../components/Сharts.vue'
import Table from '../components/Table.vue'
import Feeds from '../components/Feeds.vue'
import Map from '../components/Map.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'map',
        component: Map
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/charts',
        name: 'charts',
        component: Charts
    },
    {
        path: '/table',
        name: 'table',
        component: Table
    },
    {
        path: '/feeds',
        name: 'feeds',
        component: Feeds
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
