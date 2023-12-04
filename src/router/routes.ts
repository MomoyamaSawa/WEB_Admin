// 对外暴露配置路由

export const constRoutes = [
    // 这边有个动态导入，可以实现懒加载节省xingneng
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'home',
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
    },
]
