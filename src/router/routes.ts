import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/index.vue') }],
  // },

  {
    path: '/',
    component: () => import('layouts/GameLayout.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      {
        path: '/game',
        name: 'game',
        component: () => import('pages/game/index.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
