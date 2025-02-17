import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import PPTView from '../pages/PPT-To-Video.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/text-to-audio',
      name: 'text-to-audio',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is
      component: () => import('../pages/Gradio.vue'),
    },
    {
      path: '/video-reset',
      name: 'video-reset',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is
      component: () => import('../pages/Video-Reset.vue'),
    },
    {
      path: '/ppt-to-audio',
      name: 'ppt-to-audio',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is
      component: PPTView,
    },
    {
      path: '/setting',
      name: 'setting',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/TextToAudio.vue'),

    }
  ],
})

export default router
