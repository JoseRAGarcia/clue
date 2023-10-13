import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('pages/home/index.vue')
      },
      {
        path: '/waiting-room',
        name: 'waiting-room',
        component: () => import('pages/waiting-room/index.vue')
      },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/GameLayout.vue'),
    children: [
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
