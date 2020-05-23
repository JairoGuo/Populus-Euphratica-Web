import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/News.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/news',
        name: 'News',
        component: News
    },
    {
        path: '/',
        name: 'Home',
        redirect: '/blog'
    },

    {
        path: '/blog',
        name: 'Blog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/blog/Blog.vue')
    },
    {
        path: '/blog/:id/',
        name: 'BlogView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/blog/BlogView')
    },
    {
        path: "/login",
        name: "LogIn",
        component: () => import('../views/LogIn.vue')
    },
    {
        path: "/users/:username/",
        name: "UserDetail",
        component: () => import('../views/UserDetail.vue')
    },
    {
        path: '/editor',
        name: 'Editor',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/Editor')
    },

    {
        path: '*',
        name: 'NotFound',
        component: () => import('../views/NotFound')
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import( /* webpackChunkName: "about" */ '../components/MDToc')
    }
]

const router = new VueRouter({
    routes
})

export default router
