import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/Index.vue')
    },
    {
        path: '/list',
        name: 'List',
        component: () => import('../views/list/Index.vue')
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: () => import('../views/list/Index.vue')
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('../views/detail/Index.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: () => import('../views/admin/Login.vue')
    },
    {
        path: '/admin',
        name: 'AdminHome',
        component: () => import('../views/admin/Home.vue'),
        meta: { requireAuth: true }
    },
    {
        path: '/admin/medicine',
        name: 'AdminMedicine',
        component: () => import('../views/admin/Medicine.vue'),
        meta: { requireAuth: true }
    },
    {
        path: '/admin/category',
        name: 'AdminCategory',
        component: () => import('../views/admin/Category.vue'),
        meta: { requireAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('adminToken')
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!isAuthenticated) {
            next({ name: 'AdminLogin' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router