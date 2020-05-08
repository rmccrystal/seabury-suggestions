import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'posts', component: () => import('pages/Posts.vue') },
      //{ path: 'survey', component: () => import('pages/Survey.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/admin/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: 'survey', component: () => import('pages/admin/Survey.vue') },
      { path: 'posts', component: () => import('pages/admin/Posts.vue') },
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
