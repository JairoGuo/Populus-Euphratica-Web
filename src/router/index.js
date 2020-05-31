import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/News.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/news',
        name: 'News',
        component: News,
        meta: {
            title: '资讯'
        }
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
        component: () => import( '../views/blog/Blog.vue'),
        meta: {
            title: '博客'
        }
    },
    {
        path: '/blog/:id/',
        name: 'BlogView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( '../views/blog/BlogView')
    },
    {
        path: "/login",
        name: "LogIn",
        component: () => import('../views/LogIn.vue'),
        meta: {
            title: '登录'
        }
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
        component: () => import( '../views/blog/Editor'),
        meta: {
            title: '发表文章'
        }
    },
    {
        path: '/editor/:article',
        name: 'EditorArticle',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( '../views/blog/Editor'),
        meta: {
            title: '编辑文章'
        }
    },

    {
        path: '*',
        name: 'NotFound',
        component: () => import('../views/NotFound'),
        meta: {
            title: '404'
        }
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import( '../components/MDToc')
    },
    {
        path: '/manage',
        name: 'Manage',
        component: () => import( '@/views/blog/Manage'),
        redirect: {name: 'ArticlesManage'},
        children: [
            {
                path: 'articles',
                name: 'ArticlesManage',
                component: () => import( '@/components/blog/ArticlesManage'),
                meta: {
                    title: '文章管理'
                }
            },
            {
                path: 'category',
                name: 'CategoryManage',
                component: () => import('@/components/blog/CategoryManage'),
                meta: {
                    title: '分类管理'
                }
            },
        ],

    },
    // {
    //     path: '/manage/articles-manage',
    //     name: 'Manage',
    //     component: () => import( '@/views/blog/Manage'),
    //     meta: {
    //         title: '内容管理'
    //     }
    // }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
export default router
