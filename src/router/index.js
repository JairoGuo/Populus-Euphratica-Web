import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
    {
        path: '/news',
        name: 'News',
        component: () => import( '../views/News.vue'),
        meta: {
            title: '资讯'
        }
    },
    {
        path: '/',
        name: 'Home',
        redirect: '/bloglist'
    },

    {
        path: '/bloglist',
        name: 'BlogList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( '../views/blog/BlogList.vue'),
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
        path: "/users/:username",
        name: "UserDetail",
        component: () => import('../views/users/UserDetail.vue'),
        redirect: {name: 'UserProfile'},
        children: [

            {
                path: "profile",
                name: "UserProfile",
                component: () => import('@/components/users/UserProfile'),
                meta: {
                    title: '个人档案'
                }
            },

            {
                path: "article",
                name: "UserArticle",
                component: () => import('@/components/users/UserArticle'),
                meta: {
                    title: '我的博客'
                }
            },
            {
                path: "category",
                name: "UserCategory",
                component: () => import('@/components/users/UserCategory'),
                meta: {
                    title: '我的专栏'
                }
            },
            {
                path: "collect",
                name: "UserCollect",
                component: () => import('@/components/users/UserCollect'),
                meta: {
                    title: '我的收藏'
                }
            },
            {
                path: "category-follow",
                name: "UserCategoryFollow",
                component: () => import('@/components/users/UserCategoryFollow'),
                meta: {
                    title: '我关注的专栏'
                }
            },
            {
                path: "follow",
                name: "UserFollow",
                component: () => import('@/components/users/UserFollow'),
                meta: {
                    title: '我的关注'
                }
            },
            {
                path: "fans",
                name: "UserFans",
                component: () => import('@/components/users/UserFans'),
                meta: {
                    title: '我的粉丝'
                }
            },

        ]
    },
    {
        path: '/users/:username/blog',
        name: 'Blog',
        component: () => import( '@/views/blog/Blog'),
        meta: {
            title: '博客'
        }
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
            {
                path: 'collect',
                name: 'CollectCategoryManage',
                component: () => import('@/components/blog/CollectCategoryManage'),
                meta: {
                    title: '收藏管理'
                },

            },
            {
                path: 'collect/:id',
                name: 'CollectManage',
                component: () => import('@/components/blog/CollectManage'),
                meta: {
                    title: '收藏管理'
                }
            },
        ],

    },
    {
        path: '/users/:username/collect/:id',
        name: 'BlogCollectView',
        component: () => import( '@/views/blog/BlogCollectView'),
        meta: {
            title: '收藏夹'
        }
    },

    {
        path: '/users/:username/category-follow/:id',
        name: 'CategoryFollowView',
        component: () => import( '@/views/blog/CategoryFollowView'),
        meta: {
            title: '关注专栏'
        }
    },
    {
        path: '/category/:id',
        name: 'CategoryListView',
        component: () => import( '@/views/blog/CategoryListView'),
        meta: {
            title: '专栏'
        }
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    NProgress.start()
    next()
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach(() => {
    NProgress.done()
})
export default router
