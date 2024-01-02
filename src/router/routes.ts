// 对外暴露配置路由（常量路由）：全部用户都可以访问到的路由
export const constRoutes = [
    // 这边有个动态导入import，可以实现懒加载节省性能
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            show: false,
        },
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        // 直接跳到 home 中
        redirect: '/home',
        meta: {
            show: false,
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    show: true,
                    icon: 'HomeFilled',
                },
            },
        ],
    },
    {
        //404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentDelete',
        },
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'screen',
        meta: {
            title: '数据大屏',
            show: true,
            icon: 'Platform',
        },
    },
]

// 异步路由：有权限的人有，有权限的没有
export const asnyRoutes = [
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            show: true,
            icon: 'Lock',
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    show: true,
                    icon: 'User',
                },
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    show: true,
                    icon: 'UserFilled',
                },
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    show: true,
                    icon: 'Monitor',
                },
            },
        ],
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            show: true,
            icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    show: true,
                    icon: 'ShoppingCartFull',
                },
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    show: true,
                    icon: 'ChromeFilled',
                },
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    show: true,
                    icon: 'Calendar',
                },
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    show: true,
                    icon: 'Orange',
                },
            },
        ],
    },
]

// 任意路由
export const anyRoute = {
    //任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine',
    },
}
